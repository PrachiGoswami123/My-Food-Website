import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ dark, setDark }) {
  const [cartCount, setCartCount] = useState(0);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    setCartCount(count);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdated", updateCount);

    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 py-3 transition-all duration-500
      shadow-xl border-b backdrop-blur-xl
      ${
        dark
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white border-gray-700"
          : "bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white border-transparent"
      }`}
    >

      {/* 🔥 LOGO */}
      <h1 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2 hover:scale-105 transition">
        <span className="text-2xl animate-bounce">🍽️</span>
        <span className="tracking-wide drop-shadow-lg">
          Flavour House
        </span>
      </h1>

      {/* 🔗 LINKS */}
      <div className="flex items-center gap-4 sm:gap-8 font-semibold text-sm sm:text-base">

        <Link className="hover:scale-110 transition" to="/">
          🍔 Menu
        </Link>

        <Link
          className="relative hover:scale-110 transition"
          to="/orders"
        >
          🛒 Orders

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-bounce shadow-md">
              {cartCount}
            </span>
          )}
        </Link>

        <Link className="hover:scale-110 transition" to="/bill">
          🧾 Bill
        </Link>

        <Link className="hover:scale-110 transition" to="/admin">
          ⚙️ Admin
        </Link>
      </div>

      {/* 🌙 DARK MODE */}
      <button
        onClick={() => setDark(!dark)}
        className="px-3 sm:px-4 py-1 rounded-full font-medium transition-all duration-300 hover:scale-110 shadow-lg bg-black/30 hover:bg-black/50"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}