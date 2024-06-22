import axios from 'axios';
import { config } from './config';

const axiosInstance = axios.create({
  baseURL: config.apibaseurl,
  withCredentials: true,
});

const multipartAxiosInstance = axios.create({
  baseURL: config.apibaseurl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

export default axiosInstance;
export { multipartAxiosInstance };
