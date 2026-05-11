const Order = require("../models/order");

// Create order
exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
};

// Get orders
exports.getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};