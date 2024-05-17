import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS } from '@config/apiConfig';

const employeeApi = {
    create: async (data) => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.EMPLOYEE);
            const response = await axios.post(apiUrl, data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create employee: ${error.message}`);
        }
    },

    getAll: async () => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.EMPLOYEE);
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch employees: ${error.message}`);
        }
    },

    update: async (id, data) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.EMPLOYEE}/${id}`);
            const response = await axios.put(apiUrl, data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update employee: ${error.message}`);
        }
    },

    delete: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.EMPLOYEE}/${id}`);
            const response = await axios.delete(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to delete employee: ${error.message}`);
        }
    },

    getById: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.EMPLOYEE}/${id}`);
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch employee by ID: ${error.message}`);
        }
    },

    getByName: async (name) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.EMPLOYEE}/name/${name}`);  // Assuming you need "/name/" in the URL for fetching by name
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch employee by name: ${error.message}`);
        }
    },

    getPlantsByEmployee: async (employeeId) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.EMPLOYEE}/${employeeId}/plants`);
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch plants for employee: ${error.message}`);
        }
    },

    updateStatus: async (id, status) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.EMPLOYEE}/${id}/updateStatus`);
            const response = await axios.put(apiUrl, { status });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update employee status: ${error.message}`);
        }
    },
};

export default employeeApi;
