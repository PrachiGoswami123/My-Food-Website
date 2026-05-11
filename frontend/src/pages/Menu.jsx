import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL + "/api";

export default function Menu({ dark }) {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(`${API}/foods`)
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex((item) => item._id === food._id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const filteredFoods = foods.filter((food) => {
    return (
      (category === "All" ||
        food.category.toLowerCase() === category.toLowerCase()) &&
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 py-6 transition-all duration-500 ${
        dark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-orange-50 via-white to-yellow-50 text-black"
      }`}
    >

      {/* HEADER (UNCHANGED) */}
      <div className="text-center mb-10 relative">
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="w-80 h-28 bg-gradient-to-r from-orange-300 via-pink-300 to-yellow-300 blur-3xl opacity-30 rounded-full"></div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold flex justify-center items-center gap-3 animate-bounce">
          🍔
          <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-transparent bg-clip-text tracking-wide">
            Flavour House
          </span>
          🍕
        </h1>

        <p className={`${dark ? "text-gray-300" : "text-gray-600"} mt-3 text-sm sm:text-base flex justify-center items-center gap-2`}>
          ✨ Taste the happiness 🔥 Fresh • Fast • Delicious ✨
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search your favorite food 🍕"
          className={`w-full sm:w-2/3 md:w-1/2 p-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
            dark ? "bg-gray-800 text-white border-gray-600" : ""
          }`}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER */}
      <div className="flex justify-center flex-wrap gap-3 mt-6">
        {["All", "Veg", "Non-Veg", "Drinks", "Desserts"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-sm hover:scale-105 ${
              category === cat
                ? "bg-orange-500 text-white"
                : dark
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white hover:bg-orange-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID (UNCHANGED except card fix) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className={`rounded-2xl shadow-lg border flex flex-col overflow-hidden h-[420px] hover:scale-105 transition-all duration-300 ${
              dark ? "bg-gray-800 border-gray-700 text-white" : "bg-white"
            }`}
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <span className="text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full w-fit">
                {food.category}
              </span>

              <h3 className="text-lg font-bold mt-2">{food.name}</h3>

              <p className={`${dark ? "text-gray-300" : "text-gray-500"} text-sm mt-1 line-clamp-2`}>
                {food.description}
              </p>

              <h4 className="text-lg font-semibold mt-2 text-green-600">
                ₹{food.price}
              </h4>

              <button
                onClick={() => addToCart(food)}
                className="mt-auto w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-md"
              >
                🍕 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}