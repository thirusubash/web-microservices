import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id:
          "95285931293-p9tkds9a5bptifbsuu053trlfjvq46g3.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        ux_mode: "popup",
        context: "signin",
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-sign-in-button"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
    axios
      .get("https://localhost:80/auth-service/login/oauth2/code/google", {
        token: response.credential,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return <div id="google-sign-in-button"></div>;
};

export default Login;
