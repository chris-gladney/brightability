const express = require("express");
const router = express.Router();
const Event = require("../models.js/Event");

router.post("/social", async (req, res) => {
  try {
    const { name, location, date } = req.body;

    const event = await Event.create({
      name: name,
      location: location,
      date: date,
      category: "Social",
    });

    res.status(201).json({
      message: "Event Created",
      newEvent: { name, location, date, category: "Social" },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/connect", async (req, res) => {
  try {
    const { name, date, zoomLink } = req.body;

    const event = await Event.create({
      name: name,
      date: date,
      zoomLink: zoomLink,
      category: "Connect",
    });

    res.status(201).json({
      message: "Event Created",
      newEvent: { name, date, zoomLink, category: "Connect" },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/allevents", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
