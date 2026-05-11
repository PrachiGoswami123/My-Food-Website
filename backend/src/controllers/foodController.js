const Food = require("../models/food");

// Get all food
exports.getFoods = async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
};

// Add food
exports.addFood = async (req, res) => {
  const food = await Food.create(req.body);
  res.json(food);
};

// Delete food
exports.deleteFood = async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Food deleted" });
};