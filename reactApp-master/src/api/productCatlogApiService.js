import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS } from '@config/apiConfig';

const productCatlogApiService = {
    createProductCatalog: async (data) => {
        try {
            console.log(data);
            const apiUrl = buildApiUrl(API_ENDPOINTS.PRODUCT_CATALOG);
            const response = await axios.post(apiUrl, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create product catalog: ' + error.message);
        }
    },

    getProductCatalog: async () => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.PRODUCT_CATALOG);
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch product catalog: ' + error.message);
        }
    },

    updateProductCatalog: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.PRODUCT_CATALOG}/${id}`);
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update product catalog: ' + error.message);
        }
    },

    deleteProductCatalog: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.PRODUCT_CATALOG}/${id}`);
            const response = await axios.delete(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete product catalog: ' + error.message);
        }
    }
};

export default productCatlogApiService;
