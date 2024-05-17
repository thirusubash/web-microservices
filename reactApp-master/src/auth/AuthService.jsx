import axios from 'axios';
import decode from 'jwt-decode';
import store from '@redux/store';
import { loginSuccess, logoutSuccess } from '@redux/actions/authActions';
import { buildApiUrl, API_ENDPOINTS } from '@config/apiConfig';
import userApi from '@api/userApi';

const AuthService = {
  async login(username, password) {
    try {
      const response = await axios.post(buildApiUrl(API_ENDPOINTS.LOGIN), {
        username,
        password,
      });

      const { jwttoken } = response.data;
      this.setToken(jwttoken);

      // Use Promise.all to fetch user profile and dispatch login success action in parallel
      const userid = AuthService.getUserId();
      const userProfilePromise = userApi.getUserData(userid);
      const [userProfile] = await Promise.all([userProfilePromise]);

      store.dispatch(loginSuccess(userProfile, jwttoken));
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  },

  isAuthenticated() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  },

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  },

  setToken(idToken) {
    localStorage.setItem('gk_token', idToken);
  },

  getToken() {
    return localStorage.getItem('gk_token');
  },

  logout() {
    localStorage.removeItem('gk_token');
    store.dispatch(logoutSuccess());
  },

  getProfile() {
    return decode(this.getToken());
  },

  getUserId() {
    const decodedToken = this.getProfile();
    return decodedToken && decodedToken.id;
  },

  hasRole(role) {
    const decodedToken = this.getProfile();
    return decodedToken && decodedToken.role === role;
  },
};

export default AuthService;
