import axios from 'axios';
import { API_ENDPOINTS, buildApiUrl, DEFAULT_API_HEADERS } from '@config/apiConfig';

const userApi = {
    create: async (data) => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.REGISTER);
            const response = await axios.post(apiUrl, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create user: ' + error.response.data.message);
        }
    },

    login: async (data) => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.LOGIN);
            const response = await axios.post(apiUrl, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to log in: ' + error.response.data.message);
        }
    },

    get: async () => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.GET_USER_INFO);
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user info: ' + error.response.data.message);
        }
    },

    getAllUsers: async () => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.GET_USER_INFO);
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch all users: ' + error.response.data.message);
        }
    },

    getUserData: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.GET_USER_PROFILE}/${id}`);
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user data: ' + error.response.data.message);
        }
    },

    renewToken: async (refreshToken) => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.RENEW_TOKEN);
            const response = await axios.post(apiUrl, { refreshToken }, { headers: DEFAULT_API_HEADERS });

            if (response.status === 200) {
                localStorage.setItem('gk_token', response.data.accessToken);
                return response.data.accessToken;
            } else {
                throw new Error("Failed to renew the token");
            }
        } catch (error) {
            console.error("Error renewing the token:", error);
            throw new Error('Error renewing the token: ' + error.response.data.message);
        }
    }
};

export default userApi;
