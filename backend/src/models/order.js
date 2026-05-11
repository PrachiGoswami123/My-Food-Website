const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      foodId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);