import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS, DEFAULT_API_HEADERS } from '@config/apiConfig';

const baseApiUrls = {
    hollowBricks: buildApiUrl(API_ENDPOINTS.PRODUCT_HOLLOW),
    granites: buildApiUrl(API_ENDPOINTS.PRODUCT_GRANITES),
    marbles: buildApiUrl(API_ENDPOINTS.PRODUCT_MARBLES),
};

const apiHandler = {
    get: async (url, params = {}) => {
        try {
            const response = await axios.get(url, {
                headers: DEFAULT_API_HEADERS,
                params
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    post: async (url, data) => {
        try {
            const response = await axios.post(url, data, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    put: async (url, data) => {
        try {
            const response = await axios.put(url, data, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (url) => {
        try {
            await axios.delete(url, { headers: DEFAULT_API_HEADERS });
        } catch (error) {
            throw error;
        }
    }
};

const allProductApi = {
    // Fetch all products by company ID
    getCompanyAll: async (type, companyId, pageable = {}, searchTerm = '') => {
        return apiHandler.get(`${baseApiUrls[type]}/company`, { companyId, ...pageable, searchTerm });
    },

    // Fetch product by ID
    getById: async (type, id) => {
        if(!id || isNaN(id)) {
            throw new Error("Invalid ID provided.");
        }
        return apiHandler.get(`${baseApiUrls[type]}/${id}`);
    },

    // Create a new product entry
    create: async (type, data) => {
        return apiHandler.post(baseApiUrls[type], data);
    },

    // Update an existing product entry by ID
    update: async (type, id, data) => {
        return apiHandler.put(`${baseApiUrls[type]}/${id}`, data);
    },

    // Delete a product entry by ID
    delete: async (type, id) => {
        return apiHandler.delete(`${baseApiUrls[type]}/${id}`);
    },

    // Fetch products by their type (e.g., Granite, Marble, etc.)
    getByType: async (type, productType) => {
        return apiHandler.get(`${baseApiUrls[type]}/type/${productType}`);
    },

    // Fetch active products based on endpoint and search criteria
    // Fetch active products based on product type and search criteria
    fetchActiveProduct: async (type = "marbles", { searchKeyword = "", ...restParams } = {}) => {
        const url = `${baseApiUrls[type]}/active-product`;
        return apiHandler.get(url, { searchKeyword, ...restParams });
    }

};

export default allProductApi;
