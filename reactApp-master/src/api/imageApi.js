import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS } from '@config/apiConfig';

const BASE_API_URL = buildApiUrl(API_ENDPOINTS.GET_THUMB_IMAGE);

const imageApi = {
    // Upload an image
    upload: async (file, description,altText, onUploadProgress) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('altText', altText);

        try {
            const response = await axios.post(BASE_API_URL, formData, {
                onUploadProgress
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading the image:", error);
            throw error;
        }
    },


    // Get thumbnail data for a given image ID
    getThumbnail: async (id) => {
        const response = await axios.get(`${BASE_API_URL}/${id}`);
        return response.data;
    },

    // Get image data for a given image ID
    getImage: async (id) => {
        const response = await axios.get(`${BASE_API_URL}/image/${id}`);
        return response.data;
    },

    // Get only the raw image data for a given image ID
    getOnlyImage: async (id) => {
        const response = await axios.get(`${BASE_API_URL}/onlyimage/${id}`);
        return response.data;
    },

    // Delete an image by its ID
    delete: async (id) => {
        const response = await axios.delete(`${BASE_API_URL}/${id}`);
        return response.data;
    }
};

export default imageApi;
