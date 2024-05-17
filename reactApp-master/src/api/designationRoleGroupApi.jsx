import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS, DEFAULT_API_HEADERS } from '@config/apiConfig';

const designationRoleGroupApi = {
    create: async (companyId,service, data) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.DESIGNATION_GROUP_ROLE}/${companyId}/${service}`);
            const response = await axios.post(apiUrl, data, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to create entity: ' + error.message);
        }
    },


    update: async (companyId, service, id, data) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.DESIGNATION_GROUP_ROLE}/${companyId}/${service}/${id}`);
            const response = await axios.put(apiUrl, data, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to update: ' + error.message);
        }
    },



    delete: async (companyId, service,id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.DESIGNATION_GROUP_ROLE}/${companyId}/${service}/${id}`);
            const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete company: ' + error.message);
        }
    },

    getById: async (service,id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.DESIGNATION_GROUP_ROLE}/${service}/${id}`);
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            console.log("company api response", response.data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch company by ID: ' + error.message);
        }
    },



    updateStatus: async (companyId,service,id, status) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.DESIGNATION_GROUP_ROLE}/${companyId}/${service}/${id}?status=${status}`);
            const response = await axios.patch(apiUrl, null, { headers: DEFAULT_API_HEADERS });
            // Note: using patch instead of put
            return response.data;
        } catch (error) {
            throw new Error('Failed to update company status: ' + error.message);
        }
    },

    updateDefaultStatus: async (companyId,service,id, defaultStatus) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.DESIGNATION_GROUP_ROLE}/${companyId}/${service}/${id}/default?status=${defaultStatus}`);
            const response = await axios.patch(apiUrl, null, { headers: DEFAULT_API_HEADERS });
            // Note: using patch instead of put
            return response.data;
        } catch (error) {
            throw new Error('Failed to update company status: ' + error.message);
        }
    },

    updateDefaultForUserStatus: async (companyId,service,id, defaultStatus) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.DESIGNATION_GROUP_ROLE}/${companyId}/${service}/${id}/user-default?status=${defaultStatus}`);
            const response = await axios.patch(apiUrl, null, { headers: DEFAULT_API_HEADERS });
            // Note: using patch instead of put
            return response.data;
        } catch (error) {
            throw new Error('Failed to update company status: ' + error.message);
        }
    },

    getCompanyDesignationAndGroupsAndRoles : async (service, companyId, page, rowsPerPage, searchTerm) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.DESIGNATION_GROUP_ROLE}/${companyId}/${service}?page=${page}&size=${rowsPerPage}&searchTerm=${searchTerm}`);
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch roles: ' + error.message);
        }
    }


}



export default designationRoleGroupApi ;
