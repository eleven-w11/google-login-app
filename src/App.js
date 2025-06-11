import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GooGle from "./pages/GooGle";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GooGle />
    </GoogleOAuthProvider >
  );
}

export default App; // ✅ ye line zaroori hai!