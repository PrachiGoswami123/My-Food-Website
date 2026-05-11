import React, { useEffect, useState } from "react";

export default function Orders({ dark }) {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (index) => {
    const updated = [...cart];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 py-6 transition-all duration-500 ${
        dark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-orange-50 via-white to-yellow-50 text-black"
      }`}
    >

      {/* HEADER */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 flex justify-center items-center gap-2 animate-bounce">
        🛒 Your Orders 🍽️
      </h1>

      {/* EMPTY */}
      {cart.length === 0 ? (
        <div className="text-center text-gray-400 mt-10 text-lg">
          😔 No food in cart yet
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT ITEMS */}
          <div className="flex-1 space-y-4">

            {cart.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ${
                  dark ? "bg-gray-800" : "bg-white"
                }`}
              >

                {/* ITEM INFO */}
                <div className="flex flex-col gap-1">

                  <h2 className="font-bold text-lg flex items-center gap-2">
                    🍕 {item.name}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    ₹{item.price} × {item.quantity}
                  </p>

                  <p className="font-semibold text-green-500 flex items-center gap-1">
                    💰 ₹{item.price * item.quantity}
                  </p>

                </div>

                {/* CONTROLS */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() => decreaseQty(index)}
                    className="w-9 h-9 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition text-lg"
                  >
                    −
                  </button>

                  <span className="font-bold text-lg">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(index)}
                    className="w-9 h-9 rounded-full bg-orange-400 text-white hover:bg-orange-500 transition text-lg"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(index)}
                    className="ml-2 text-red-500 hover:scale-125 transition text-lg"
                  >
                    🗑️
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* BILL SECTION */}
          <div className="w-full lg:w-1/3">

            <div
              className={`rounded-2xl shadow-xl p-5 sticky top-6 hover:scale-[1.02] transition ${
                dark ? "bg-gray-800" : "bg-white"
              }`}
            >

              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                💰 Bill Summary 📄
              </h2>

              <div className="space-y-2 text-gray-300">

                <p>🍽 Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p>🧾 Tax (5%): ₹{tax.toFixed(2)}</p>

                <hr />

                <h3 className="text-lg font-bold text-green-400">
                  💳 Total: ₹{total.toFixed(2)}
                </h3>

              </div>

              {/* BUTTONS */}
              <div className="mt-5 space-y-3">

                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:scale-105 transition shadow-md">
                  🚀 Generate Bill
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:scale-105 transition shadow-md"
                >
                  🗑️ Clear Cart
                </button>

              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}