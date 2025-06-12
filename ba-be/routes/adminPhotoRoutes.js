const express = require("express");
const router = express.Router();
const parser = require("../middleware/upload");
const Image = require("../models/Image");

router.post("/upload", parser.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file received" });
  }

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

module.exports = router;
