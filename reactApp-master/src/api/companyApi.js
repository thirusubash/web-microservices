import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS, DEFAULT_API_HEADERS } from '@config/apiConfig';

const companyApi = {
    create: async (data) => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.COMPANY);
            const response = await axios.post(apiUrl, data, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to create company: ' + error.message);
        }
    },

    get: async (page, rowsPerPage, searchQuery) => {
        try {
            const apiUrl = buildApiUrl(API_ENDPOINTS.COMPANY);
            const params = new URLSearchParams({
                page: page.toString(),
                size: rowsPerPage.toString()
            });
            if (searchQuery) {
                params.append('keyword', searchQuery);
            }
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS, params: params });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch companies: ' + error.message);
        }
    },


    update: async (id, data) => {
        console.log( " company api "+data.companyName);
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${id}`);
            const response = await axios.put(apiUrl, data, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to update company: ' + error.message);
        }
    },

    delete: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${id}`);
            const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete company: ' + error.message);
        }
    },

    getById: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${id}`);
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            console.log("company api response", response.data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch company by ID: ' + error.message);
        }
    },
    getBasicCompany: async (id) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${id}`);
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            console.log("company api response", response.data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch company by ID: ' + error.message);
        }
    },


    getAddress: async (companyId, page = 0, rowsPerPage = 10, searchQuery = "") => {
        try {
            let apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/address`);
            apiUrl += `?page=${page}&size=${rowsPerPage}`;

            if(searchQuery) {
                apiUrl += `&keyword=${encodeURIComponent(searchQuery)}`;
            }

            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch employees: ' + error.message);
        }
    },


    getPlants: async (companyId, page = 0, rowsPerPage = 10, searchQuery = "") => {
        try {
            let apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/1/plants`);
            apiUrl += `?page=${page}&size=${rowsPerPage}`;

            if(searchQuery) {
                apiUrl += `&keyword=${encodeURIComponent(searchQuery)}`;
            }

            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch plant: ' + error.message);
        }
        },

    getEmployees: async (companyId, page = 0, rowsPerPage = 10, searchQuery = "") => {
        try {
            let apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/employees`);
            apiUrl += `?page=${page}&size=${rowsPerPage}`;

            if(searchQuery) {
                apiUrl += `&keyword=${encodeURIComponent(searchQuery)}`;
            }

            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch employees: ' + error.message);
        }
    },
    getBankdetails : async (companyId, page = 0, rowsPerPage = 10, searchQuery = "") => {
        try {
            let apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/bank-details`); // Corrected 'bank details' to 'bank-details'
            apiUrl += `?page=${page}&size=${rowsPerPage}`;

            if (searchQuery) {
                apiUrl += `&keyword=${encodeURIComponent(searchQuery)}`;
            }

            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch bank details: ' + error.message);
        }
    },

    updateBankdetailsStatus : async (companyId, bankDetailId, status) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/bank-details/${bankDetailId}/status?status=${status}`);
            const response = await axios.patch(apiUrl, null, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to update bank detail status: ' + error.message);
        }
    },



    updateStatus: async (companyId, status) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/status?status=${status}`);
            const response = await axios.patch(apiUrl, null, { headers: DEFAULT_API_HEADERS });
            // Note: using patch instead of put
            return response.data;
        } catch (error) {
            throw new Error('Failed to update company status: ' + error.message);
        }
        },

    updateAddressStatus: async (companyId,addressId, status) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/address/${addressId}/status?status=${status}`);
            const response = await axios.patch(apiUrl, null, { headers: DEFAULT_API_HEADERS });
            // Note: using patch instead of put
            return response.data;
        } catch (error) {
            throw new Error('Failed to update company status: ' + error.message);
        }
    },




    updatePlantStatus: async (companyId, plantId, status) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/plants/${plantId}/status?status=${status}`);
            const response = await axios.patch(apiUrl, null, { headers: DEFAULT_API_HEADERS });
            // Note: using patch instead of put
            return response.data;
        } catch (error) {
            throw new Error('Failed to update plant status: ' + error.message);
        }
    },

    addPlant: async (companyId, plantData) => {
        console.log(companyId);
        console.log(plantData);
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/plants`);
            const response = await axios.post(apiUrl, plantData, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add employee: ' + error.message);
        }
    },




    removePlant: async (companyId, plantId) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/plants/${plantId}`);
            const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to remove plant: ' + error.message);
        }
    },

    updateEmployeeStatus: async (companyID, empId, status) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyID}/employee/${empId}/status?status=${status}`);
            const response = await axios.patch(apiUrl, null, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to update employee status: ' + error.message);
        }
    },

    addEmployee: async (companyId, employeeData) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/employees`);
            const response = await axios.post(apiUrl, employeeData, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add employee: ' + error.message);
        }
    },

    removeEmployee: async (companyId, employeeId) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/employees/${employeeId}`);
            const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to remove employee: ' + error.message);
        }
    },

    addSupplier: async (companyId, supplierData) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/suppliers`);
            const response = await axios.post(apiUrl, supplierData, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add supplier: ' + error.message);
        }
    },

    removeSupplier: async (companyId, supplierId) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/suppliers/${supplierId}`);
            const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to remove supplier: ' + error.message);
        }
    },

    addAddress: async (companyId, address) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/address`);
            const response = await axios.post(apiUrl, address, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add address: ' + error.message);
        }
    },

    removeAddress: async (companyId, addressId) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/address/${addressId}`);
            const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to remove address: ' + error.message);
        }
    },

    addLocation: async (companyId, location) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/location`);
            const response = await axios.post(apiUrl, location, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add location: ' + error.message);
        }
    },

    removeLocation: async (companyId, locationId) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/location/${locationId}`);
            const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to remove location: ' + error.message);
        }
    },

    addBankDetail: async (companyId, bankDetail) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/bank-details`);
            const response = await axios.post(apiUrl, bankDetail, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to add bank detail: ' + error.message);
        }
    },

    removeBankDetail: async (companyId, bankDetailId) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.COMPANY}/${companyId}/bank-details/${bankDetailId}`);
            const response = await axios.delete(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to remove bank detail: ' + error.message);
        }
    },


    getCompanyProducts : async ( companyId, page, rowsPerPage, searchTerm) => {
        try {
            // Adjust the URL to your needs
            const apiUrl = `${API_ENDPOINTS.COMPANY}/${companyId}/products?page=${page}&size=${rowsPerPage}&searchTerm=${searchTerm}`;
            const response = await axios.get(apiUrl, { headers: DEFAULT_API_HEADERS });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch roles: ' + error.message);
        }
    }
}



export default companyApi;
