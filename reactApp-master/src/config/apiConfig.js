// Define the base API URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8007/api/auth';
const API_IMAGE_BASEURL = process.env.REACT_APP_API_IMAGE_BASE_URL || 'http://localhost:8081';

// Define API endpoints
const API_ENDPOINTS = {
    LOGIN: '/authenticate',
    REGISTER: '/register',
    RENEW_TOKEN: "/renew",
    GET_USER_INFO: '/users',
    GET_USER_PROFILE: '/users',
    GET_PRODUCTS: '/products',
    GET_IMAGE_OBJECT: '/api/short-image/image',
    GET_THUMB_IMAGE: '/api/short-image',
    COMPANY: "/api/companies",
    PLANT: "/api/plants",
    EMPLOYEE: "/api/employees",
    HOMEPAGE: "/api/homepages",
    HOMEPAGE_PRODUCT: "/api/homepages",
    HOMEPAGE_SERVICE: "/api/homepages",
    HOMEPAGE_MARBLES: "/api/homepages",
    HOMEPAGE_GRANITE: "/api/homepages",
    SUGGEST_API: "/api/suggest",
    DESIGNATION_GROUP_ROLE: "/api/company",
    PRODUCT_CATALOG: "/api/product-catalogs",
    PRODUCT: "/api/products",
    PRODUCT_MARBLES: "/api/marbles",
    PRODUCT_GRANITES: "/api/granites",
    PRODUCT_HOLLOW: "/api/hollow-bricks",

};

// Define headers for API requests
const DEFAULT_API_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${localStorage.getItem('gk_token')}`,
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'public, max-age=31536000',
};



// Define headers for API requests with multipart/form-data
const MULTIPART_API_HEADERS = {
    ...DEFAULT_API_HEADERS,
    'Content-Type': 'multipart/form-data',
};

// Utility function to build API URL
function buildApiUrl(endpoint) {
    return `${API_BASE_URL}${endpoint}`;
}

export { API_ENDPOINTS, DEFAULT_API_HEADERS, MULTIPART_API_HEADERS, API_IMAGE_BASEURL, buildApiUrl };
