import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Bill from "./pages/Bill";
import Admin from "./pages/Admin";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <BrowserRouter>
        <Navbar dark={dark} setDark={setDark} />

        {/* 👇 IMPORTANT: pages inherit theme */}
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Menu dark={dark} />} />
            <Route path="/orders" element={<Orders dark={dark} />} />
            <Route path="/bill" element={<Bill dark={dark} />} />
            <Route path="/admin" element={<Admin dark={dark} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}