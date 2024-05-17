import {API_ENDPOINTS, buildApiUrl, DEFAULT_API_HEADERS} from '@config/apiConfig';
import axios from "axios";

const suggestionApi = {

    // Fetch company plants by companyId
// Fetch company plants by companyId
   Suggestion: async (companyId, endpoint,searchQuery) => {
        try {
            const apiUrl = buildApiUrl(`${API_ENDPOINTS.SUGGEST_API}/${endpoint}/${companyId}`);
            const params = {};

            if (searchQuery) {
                params.keyword = searchQuery;
            }

            const response = await axios.get(apiUrl, {
                headers: DEFAULT_API_HEADERS,
                params: params
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch company plants: ' + error.message);
        }
    },


    // Fetch all companies
    allCompanySuggestion: async (searchQuery) => {
            try {
                const apiUrl = buildApiUrl(`${API_ENDPOINTS.SUGGEST_API}/companies/${searchQuery}`);
                const params = {};

                if (searchQuery) {
                    params.keyword = searchQuery;
                }

                const response = await axios.get(apiUrl, {
                    headers: DEFAULT_API_HEADERS,
                    params: params
                });
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch company plants: ' + error.message);
            }
        },

    // Fetch all suppliers
        allSupplierSuggestion: async (searchQuery) => {
            try {
                const apiUrl = buildApiUrl(`${API_ENDPOINTS.SUGGEST_API}/companies/${searchQuery}`);
                const params = {};

                if (searchQuery) {
                    params.keyword = searchQuery;
                }

                const response = await axios.get(apiUrl, {
                    headers: DEFAULT_API_HEADERS,
                    params: params
                });
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch company plants: ' + error.message);
            }
        },

};

export  default  suggestionApi;
