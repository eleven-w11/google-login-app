import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GooGle from "./pages/GooGle";

function App() {
  return (
    <GoogleOAuthProvider clientId="680383410681-9ouf6rc4jl852tkf72m04ddipndc1q0n.apps.googleusercontent.com">
      <GooGle />
    </GoogleOAuthProvider>
  );
}

export default App; // ✅ ye line zaroori hai!