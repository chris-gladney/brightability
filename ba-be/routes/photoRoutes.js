const express = require("express");
const router = express.Router();
const parser = require("../middleware/upload");
const Image = require("../models/Image");

// Upload Image
router.post("/images/upload", parser.single("image"), async (req, res) => {
  console.log(req.body, "<<< req.body");
  try {
    const { category } = req.body;
    const image = await Image.create({
      url: req.file.path,
      public_id: req.file.filename,
      category,
    });
    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload Failed" });
  }
});

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
