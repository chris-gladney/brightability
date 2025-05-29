const express = require("express");
const router = express.Router();
const {
  socialNoAttendees,
  socialById,
  createSocial,
  updateAttendeesSocial,
} = require("../utils/socialEvents");
const SocialEvent = require("../models.js/SocialEvent");

// SOCIAL EVENTS
// Posts event to mongodb.socialEvents
router.post("/social", (req, res) => {
  const { name, date, location } = req.body;

  createSocial(name, date, location)
    .then((newEvent) => {
      res.status(201).json({
        message: "Event Created",
        newEvent: newEvent,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
});
// Retrieves all social events
router.get("/social", (req, res) => {
  socialNoAttendees()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
});

// Get social event by id
router.get("/social/:id", (req, res) => {
  const { id } = req.params;
  socialById(id)
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

// Updates attendees
router.put("/social/:id", (req, res) => {
  const { name, email } = req.body;
  const eventId = req.params;

  updateAttendeesSocial(name, email, eventId)
    .then((data) => {
      res.json({ message: "Event updated" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
});

// CONNECT EVENTS

router.post("/connect", async (req, res) => {});

module.exports = router;
