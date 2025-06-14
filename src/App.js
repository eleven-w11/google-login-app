// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GooGle from "./pages/GooGle";
import UserProfile from "./pages/UserProfile";

function Home() {
  return (
    <div>
      <p>Home</p>
      <Link to="/GooGle">Google</Link>
      <br />
      <Link to="/UserProfile">UserProfile</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GooGle" element={<GooGle />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
