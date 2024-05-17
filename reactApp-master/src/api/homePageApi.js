import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS, DEFAULT_API_HEADERS } from '@config/apiConfig';

const homepageApi = {
    create: async (data) => {
        const apiUrl = buildApiUrl(API_ENDPOINTS.HOMEPAGE);
        const response = await axios.post(apiUrl, data, { headers: DEFAULT_API_HEADERS });
        return response.data;
    },

    getById: async (id) => {
        const apiUrl = buildApiUrl(`${API_ENDPOINTS.HOMEPAGE}/${id}`);
        const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
        return response.data;
    },

    getAll: async (pageable) => {
        const apiUrl = buildApiUrl(API_ENDPOINTS.HOMEPAGE);
        const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS, params: { ...pageable } });
        return response.data;
    },

    search: async (pageable, search) => {
        const apiUrl = buildApiUrl(`${API_ENDPOINTS.HOMEPAGE}/search`);
        const response = await axios.get(apiUrl, {
            headers: DEFAULT_API_HEADERS,
            params: { ...pageable, search }
        });
        return response.data;
    },

    addImage: async (id, image) => {
        const apiUrl = buildApiUrl(`${API_ENDPOINTS.HOMEPAGE}/add-image`);
        const response = await axios.patch(apiUrl, null, {
            headers: DEFAULT_API_HEADERS,
            params: { id, image }
        });
        return response.data;
    },

    removeImage: async (id, image) => {
        const apiUrl = buildApiUrl(`${API_ENDPOINTS.HOMEPAGE}/remove-image`);
        const response = await axios.patch(apiUrl, null, {
            headers: DEFAULT_API_HEADERS,
            params: { id, image }
        });
        return response.data;
    },

    updateVisibility: async (id, isVisibility) => {
        const apiUrl = buildApiUrl(`${API_ENDPOINTS.HOMEPAGE}/status`);
        const response = await axios.patch(apiUrl, null, {
            headers: DEFAULT_API_HEADERS,
            params: { id, isVisibility }
        });
        return response.data;
    },

    update: async (id, data) => {
        const apiUrl = buildApiUrl(`${API_ENDPOINTS.HOMEPAGE}/${id}`);
        const response = await axios.put(apiUrl, data, { headers: DEFAULT_API_HEADERS });
        return response.data;
    },

    delete: async (id) => {
        const apiUrl = buildApiUrl(`${API_ENDPOINTS.HOMEPAGE}/${id}`);
        const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
        return response.data;
    },
};

export default homepageApi;
