import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Bill({ dark }) {
  const [cart, setCart] = useState([]);
  const [billGenerated, setBillGenerated] = useState(false);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () =>
      window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;

  const total = subtotal + tax;

  // =========================
  // GENERATE PDF
  // =========================

  const generateBill = () => {
    setBillGenerated(true);

    const doc = new jsPDF();

    // =========================
    // HEADER
    // =========================

    doc.setFillColor(255, 140, 0);

    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(24);

    doc.setFont("helvetica", "bold");

    doc.text("Flavour House", 105, 18, {
      align: "center",
    });

    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    doc.text(
      "Delicious Food & Fast Delivery",
      105,
      27,
      {
        align: "center",
      }
    );

    // =========================
    // BILL INFO
    // =========================

    doc.setTextColor(0, 0, 0);

    const date = new Date().toLocaleString();

    const orderId =
      "ORD" + Math.floor(Math.random() * 100000);

    doc.setFontSize(11);

    doc.text(`Bill Date : ${date}`, 14, 50);

    doc.text(`Order ID : ${orderId}`, 14, 58);

    // =========================
    // TABLE
    // =========================

    const tableColumn = [
      "Food Item",
      "Price",
      "Qty",
      "Total",
    ];

    const tableRows = [];

    cart.forEach((item) => {
      tableRows.push([
        item.name,
        `Rs.${item.price}`,
        item.quantity,
        `Rs.${item.price * item.quantity}`,
      ]);
    });

    autoTable(doc, {
      startY: 70,

      head: [tableColumn],

      body: tableRows,

      theme: "grid",

      headStyles: {
        fillColor: [255, 140, 0],
        textColor: [255, 255, 255],
        halign: "center",
        fontStyle: "bold",
      },

      bodyStyles: {
        halign: "center",
      },

      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // =========================
    // TOTAL SECTION
    // =========================

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setTextColor(40, 40, 40);

    doc.setFontSize(10);

    doc.setFont("helvetica", "normal");

    doc.text(
      `Subtotal : Rs.${subtotal.toFixed(2)}`,
      145,
      finalY
    );

    doc.text(
      `Tax (5%) : Rs.${tax.toFixed(2)}`,
      145,
      finalY + 7
    );

    doc.setFont("helvetica", "bold");

    doc.setFontSize(13);

    doc.setTextColor(0, 128, 0);

    doc.text(
      `Grand Total : Rs.${total.toFixed(2)}`,
      128,
      finalY + 16
    );

    // =========================
    // FOOTER
    // =========================

    doc.setDrawColor(180);

    doc.line(
      14,
      finalY + 24,
      195,
      finalY + 24
    );

    doc.setFontSize(12);

    doc.setTextColor(255, 140, 0);

    doc.text(
      "Thank You For Ordering From Flavour House",
      105,
      finalY + 33,
      {
        align: "center",
      }
    );

    // =========================
    // SAVE PDF
    // =========================

    doc.save(`Food_Bill_${orderId}.pdf`);
  };

  const clearAll = () => {
    localStorage.removeItem("cart");

    setCart([]);

    setBillGenerated(false);
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

      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 animate-bounce">
        🧾 Bill Summary
      </h1>

      {/* EMPTY STATE */}

      {cart.length === 0 ? (
        <div className="text-center mt-16 text-gray-500 text-lg">
          😔 No items found in cart
        </div>
      ) : (
        <div
          className={`max-w-4xl mx-auto rounded-2xl shadow-xl p-5 sm:p-8 transition ${
            dark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* ITEMS */}

          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-3 rounded-lg p-2 transition ${
                  dark
                    ? "hover:bg-gray-700"
                    : "hover:bg-orange-50"
                }`}
              >
                <div>
                  <h3 className="font-bold text-lg">
                    🍽️ {item.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-green-500 text-lg">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* BILL SUMMARY */}

          <div
            className={`mt-6 border-t pt-4 space-y-2 ${
              dark
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            <p className="flex justify-between">
              <span>Subtotal</span>

              <span>₹{subtotal.toFixed(2)}</span>
            </p>

            <p className="flex justify-between">
              <span>Tax (5%)</span>

              <span>₹{tax.toFixed(2)}</span>
            </p>

            <hr />

            <h2 className="flex justify-between text-xl font-bold text-green-500">
              <span>💰 Total</span>

              <span>₹{total.toFixed(2)}</span>
            </h2>
          </div>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={generateBill}
              className="w-full sm:w-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg hover:scale-105 transition shadow-md"
            >
              🧾 Generate PDF Bill
            </button>

            <button
              onClick={clearAll}
              className="w-full sm:w-1/2 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg hover:scale-105 transition shadow-md"
            >
              🗑️ Clear Bill
            </button>
          </div>

          {/* SUCCESS MESSAGE */}

          {billGenerated && (
            <div className="mt-5 p-3 bg-green-100 text-green-700 rounded-lg text-center animate-pulse">
              🎉 PDF Bill Downloaded Successfully!
            </div>
          )}
        </div>
      )}
    </div>
  );
}