// configValidation.js
export const validateEnvVariables = () => {
    const requiredEnvVars = [
      'REACT_APP_API_GATEWAY_BASE_URL',
      'REACT_APP_GOOGLE_OAUTH_CLIENT_ID',
      'REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET',
      'REACT_APP_GOOGLE_AUTH_AUTHORIZATION_ENDPOINT',
      'REACT_APP_GOOGLE_OAUTH_TOKEN_ENDPOINT',
      'REACT_APP_GOOGLE_OAUTH_REDIRECT_URI',
      'REACT_APP_GOOGLE_OAUTH_SCOPES',
      'REACT_APP_MICROSOFT_OAUTH_CLIENT_ID',
      'REACT_APP_MICROSOFT_OAUTH_TENANT_ID',
      'REACT_APP_MICROSOFT_OAUTH_REDIRECT_URI',
      'REACT_APP_GITHUB_OAUTH_CLIENT_ID',
      'REACT_APP_GITHUB_OAUTH_REDIRECT_URI',
    ];
  
    requiredEnvVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        console.error(`Environment variable ${envVar} is not set.`);
      }
    });
  };
  