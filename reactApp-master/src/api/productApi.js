import axios from 'axios';
import {buildApiUrl, API_ENDPOINTS, DEFAULT_API_HEADERS} from '@config/apiConfig';

const productApi = {
    getAllProductsByCompanyID: async (companyId, pageable, searchQuery) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/company/${companyId}/search`;
        const params = {
            ...pageable,
            search: searchQuery && searchQuery.trim() ? searchQuery : undefined
        };
        const response = await axios.get(apiUrl, { params });
        return response.data;
    },
    addImage: async (companyId, productId, image) => {
        try {
            const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/image`;
            const params = {
                companyId: companyId,
                id: productId,
                image: image
            };
            const response = await axios.patch(apiUrl, null, { params: params, headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            console.error("Error adding image:", error);
            throw error;
        }
    },
    removeImage: async (companyId, productId, imageUrl) => {
        try {
            const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/${companyId}/${productId}/remove-image/${imageUrl}`;
            const response = await axios.patch(apiUrl, {}, { // Send an empty body, as the necessary data is now in the URL
                headers: DEFAULT_API_HEADERS
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },



    addProductForCompany: async (productData) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}`;
        const response = await axios.post(apiUrl, productData);
        return response.data;
    },

    getCompanyProductById: async (companyId, productId) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/${productId}`;
        const response = await axios.get(apiUrl);
        return response.data;
    },

    updateCompanyProduct: async (companyId, productId, updatedProductData) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/${companyId}/${productId}`;
        const response = await axios.put(apiUrl, updatedProductData);
        return response.data;
    },

    updateProductVisibility: async (companyId, productId, visibility) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/visibility/${companyId}/${productId}?visibility=${visibility}`;
        const response = await axios.patch(apiUrl);
        return response.data;
    },

    updateStatus: async (companyId, productId, status) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/status/${companyId}/${productId}?status=${status}`;
        const response = await axios.patch(apiUrl);
        return response.data;
    },

    deleteCompanyProduct: async (companyId, productId) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/${companyId}/${productId}`;
        const response = await axios.delete(apiUrl);
        return response.data;
    },

    searchProductsByCompany: async (companyId, search, pageable) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/company/${companyId}/search`;
        const params = {
            ...pageable,
            search
        };
        const response = await axios.get(apiUrl, { params });
        return response.data;
    },

    searchProducts: async (color, pattern, brand, pageable) => {
        const apiUrl = `${buildApiUrl(API_ENDPOINTS.PRODUCT)}/search`;
        const params = {
            ...pageable,
            color,
            pattern,
            brand
        };
        const response = await axios.get(apiUrl, { params });
        return response.data;
    }
};

export default productApi;
