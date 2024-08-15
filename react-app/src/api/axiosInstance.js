import axios from 'axios';
import { API_CONFIG } from './apiConfig';

const apiGatewayUrl = API_CONFIG.apiGatewayUrl;
// Create a general Axios instance
const axiosInstance = axios.create({
  baseURL: apiGatewayUrl, // Ensure this matches the key in your API_CONFIG
  withCredentials: true,
});

// Create an Axios instance specifically for multipart/form-data requests
const multipartAxiosInstance = axios.create({
  baseURL: apiGatewayUrl, // Ensure this matches the key in your API_CONFIG
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});



export default axiosInstance;
export { multipartAxiosInstance };