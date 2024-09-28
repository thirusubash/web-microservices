import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { API_CONFIG, OAUTH_CONFIG } from "api/apiConfig";

const apiGateway = API_CONFIG.apiBaseUrl;
const googleClientId = OAUTH_CONFIG.google.clientId;

const OauthLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post(`${apiGateway}/auth/login`, { username, password }) // Use backticks here
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token); // Store token
        window.location.href = "/home"; // Redirect to home page
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed. Please check your username and password.");
      });
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    axios
      .post(`${apiGateway}/auth/oauth2/google`, {
        token: response.credential,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token); // Store token
        window.location.href = "/home"; // Redirect to home page
      })
      .catch((error) => {
        console.error(error);
        alert("Google login failed. Please try again.");
      });
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
    alert("Google login failed. Please try again.");
  };

  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleLoginSuccess,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        {
          theme: "outline",
          size: "large",
        }
      );
    } else {
      console.error("Google accounts API not loaded.");
    }
  }, [googleClientId]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box marginTop={2}>
        <div id="googleSignInButton"></div>
      </Box>
    </Box>
  );
};

export default OauthLogin;
