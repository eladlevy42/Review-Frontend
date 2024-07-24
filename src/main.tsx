import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/user.context";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!googleId) {
  console.error("Google Client ID is not defined");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={googleId}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
