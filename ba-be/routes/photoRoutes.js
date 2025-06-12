const express = require("express");
const router = express.Router();
const parser = require("../middleware/upload");
const Image = require("../models/Image");

// Get all images
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find({});
  } catch (err) {
    res.status(500).json({ error: "Fetching failed" });
  }
});

// Get images by category
router.get("/images/:category", async (req, res) => {
  try {
    const images = await Image.find({ category: req.params.category });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Fetching failed" });
  }
});

module.exports = router;
