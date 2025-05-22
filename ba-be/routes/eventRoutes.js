const express = require("express");
const router = express.Router();
const SocialEvent = require("../models.js/SocialEvent");

// SOCIAL EVENTS
// Posts event to mongodb.socialEvents
router.post("/social", async (req, res) => {
  try {
    const { name, date, location } = req.body;

    const event = await SocialEvent.create({
      name: name,
      date: date,
      location: location,
    });

    res.status(201).json({
      message: "Event Created",
      newEvent: { name, date, location },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// Retrieves all social events
router.get("/social", async (req, res) => {
  try {
    const event = await SocialEvent.find({});

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// CONNECT EVENTS

router.post("/connect", async (req, res) => {});

module.exports = router;
