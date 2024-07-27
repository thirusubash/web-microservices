

/**
 * API Configuration
 * @type {Object}
 * @property {string} apiBaseUrl - Base URL for the API, defaults to 'https://localhost:80'
 * @property {string} [googleMapsApiKey] - Optional Google Maps API Key
 */
export const API_CONFIG = {
  apiBaseUrl: process.env.REACT_APP_API_GATEWAY_BASE_URL || 'https://localhost:80', // Default URL
};


/**
 * Google Maps API Configuration
 * @type {Object}
 * @property {string} [googleMapsApiKey] - Google Maps API Key
 */
export const MAPS_API_CONFIG = {
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Optional, set in environment variables
};

/**
 * OAuth 2.0 Configuration
 * @type {Object}
 * @property {Object} google - Google OAuth 2.0 Configuration
 * @property {string} google.clientId - Client ID for Google OAuth 2.0
 * @property {string} google.clientSecret - Client Secret for Google OAuth 2.0
 * @property {string} google.authorizationEndpoint - Google OAuth 2.0 Authorization Endpoint
 * @property {string} google.tokenEndpoint - Google OAuth 2.0 Token Endpoint
 * @property {string} google.redirectUri - Redirect URI for Google OAuth 2.0
 * @property {string} google.scopes - Scopes for Google OAuth 2.0
 * 
 * @property {Object} microsoft - Microsoft OAuth 2.0 Configuration
 * @property {string} microsoft.clientId - Client ID for Microsoft OAuth 2.0
 * @property {string} microsoft.tenantId - Tenant ID for Microsoft OAuth 2.0
 * @property {string} microsoft.redirectUri - Redirect URI for Microsoft OAuth 2.0
 * 
 * @property {Object} github - GitHub OAuth 2.0 Configuration
 * @property {string} github.clientId - Client ID for GitHub OAuth 2.0
 * @property {string} github.redirectUri - Redirect URI for GitHub OAuth 2.0
 */
export const OAUTH_CONFIG = {
  // Google OAuth 2.0 Configuration
  google: {
    clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
    authorizationEndpoint: process.env.REACT_APP_GOOGLE_AUTH_AUTHORIZATION_ENDPOINT,
    tokenEndpoint: process.env.REACT_APP_GOOGLE_OAUTH_TOKEN_ENDPOINT,
    redirectUri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI,
    scopes: process.env.REACT_APP_GOOGLE_OAUTH_SCOPES,
  },
  
  // Microsoft OAuth 2.0 Configuration
  microsoft: {
    clientId: process.env.REACT_APP_MICROSOFT_OAUTH_CLIENT_ID,
    tenantId: process.env.REACT_APP_MICROSOFT_OAUTH_TENANT_ID,
    redirectUri: process.env.REACT_APP_MICROSOFT_OAUTH_REDIRECT_URI,
  },
  
  // GitHub OAuth 2.0 Configuration
  github: {
    clientId: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
    redirectUri: process.env.REACT_APP_GITHUB_OAUTH_REDIRECT_URI,
  },
};
