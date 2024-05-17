import axios from 'axios';
import { API_ENDPOINTS, buildApiUrl, DEFAULT_API_HEADERS } from '@config/apiConfig';

const userApiService = {

    createUser(data) {
        const apiUrl = buildApiUrl(API_ENDPOINTS.REGISTER);
        return axios.post(apiUrl, data).then((response) => response.data);
    },


    login() {
        const apiUrl = buildApiUrl(API_ENDPOINTS.LOGIN);
        return axios.get(apiUrl).then((response) => response.data);
    },
    getAllUsers() {
        const apiUrl = buildApiUrl(API_ENDPOINTS.GET_USER_INFO);
        return axios.get(apiUrl, { headers: DEFAULT_API_HEADERS }) // <- Change this line
            .then((response) => response.data);
    },
    getUserData(id) {
        const apiUrl = buildApiUrl(`${API_ENDPOINTS.GET_USER_PROFILE}/${id}`);
        return axios.get(apiUrl, { headers: DEFAULT_API_HEADERS })
            .then((response) => response.data);
    },

    // ... other methods
};

export default userApiService;
