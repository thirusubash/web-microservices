// src/authConfig.js
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MICROSOFT_OAUTH_CLIENT_ID,
    authority: "https://login.microsoftonline.com/common",
    redirectUri: process.env.REACT_APP_MICROSOFT_OAUTH_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
