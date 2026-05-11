const express = require("express");
const router = express.Router();

const foodController = require("../controllers/foodController"); // ✅ correct name

router.get("/", foodController.getFoods);
router.post("/", foodController.addFood);
router.delete("/:id", foodController.deleteFood);

module.exports = router;