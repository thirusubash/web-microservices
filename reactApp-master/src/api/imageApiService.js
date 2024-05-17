import axios from 'axios';
import { API_ENDPOINTS, buildApiUrl, DEFAULT_API_HEADERS } from '@config/apiConfig';

const imageApiService = {
    getShortImage: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.GET_IMAGE_OBJECT}/${id}`);
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch short image: ' + error.message);
        }
    },

    getThumbImage: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.GET_THUMB_IMAGE}/${id}`);
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch thumbnail image: ' + error.message);
        }
    },
};

export default imageApiService;
