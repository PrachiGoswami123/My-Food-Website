import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL + "/api";

export default function Admin({ dark }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  const loadFoods = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/foods`);
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const addFood = async () => {
    if (!form.name || !form.price)
      return alert("Fill required fields");

    await fetch(`${API}/foods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
      description: ""
    });

    loadFoods();
  };

  const deleteFood = async (id) => {
    await fetch(`${API}/foods/${id}`, {
      method: "DELETE"
    });

    loadFoods();
  };

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 py-6 transition-all duration-500 ${
        dark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-orange-50 text-black"
      }`}
    >

      {/* HEADER */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 animate-bounce">
        🔧 Admin Dashboard
      </h1>

      {/* FORM CARD */}
      <div
        className={`max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl shadow-xl mb-8 transition ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >

        <h2 className="text-xl font-bold mb-4">
          ➕ Add New Food Item
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <input
            placeholder="Food Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className={`p-3 border rounded-lg outline-none transition ${
              dark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className={`p-3 border rounded-lg outline-none transition ${
              dark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />

          <input
            placeholder="Category (veg/non-veg/drinks)"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className={`p-3 border rounded-lg outline-none transition ${
              dark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
            className={`p-3 border rounded-lg outline-none transition ${
              dark
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className={`w-full mt-3 p-3 border rounded-lg outline-none transition ${
            dark
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />

        <button
          onClick={addFood}
          className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg hover:scale-105 transition"
        >
          🍽️ Add Food Item
        </button>
      </div>

      {/* LIST TITLE */}
      <h2 className="text-2xl font-bold text-center mb-4">
        🍔 Menu Items
      </h2>

      {/* LOADING */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">

          {foods.map((food) => (
            <div
              key={food._id}
              className={`rounded-2xl shadow-lg p-4 flex flex-col hover:scale-105 transition duration-300 ${
                dark ? "bg-gray-800" : "bg-white"
              }`}
            >

              <img
                src={food.image}
                alt={food.name}
                className="h-40 w-full object-cover rounded-xl mb-3"
              />

              <h3 className="font-bold text-lg">{food.name}</h3>

              <p className="text-gray-400 text-sm">
                {food.category}
              </p>

              <p className="text-green-500 font-semibold mt-1">
                ₹{food.price}
              </p>

              <button
                onClick={() => deleteFood(food._id)}
                className="mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                🗑️ Delete
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}