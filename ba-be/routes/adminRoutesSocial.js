const express = require("express");
const router = express.Router();
const parser = require("../middleware/upload");
const Image = require("../models/Image");
const {
  socialWithAttendees,
  createSocial,
  deleteSocialById,
} = require("../utils/socialEvents");

// Get all events with attendees
router.get("/events", (req, res) => {
  socialWithAttendees()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
});

router.post("/events", (req, res) => {
  const { name, location, date } = req.body;
  createSocial(name, location, date)
    .then((data) => {
      res.status(201).json({
        message: "Event Successfully Created",
        event: `Name: ${data.name}, location: ${data.location}, date: ${data.date}`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

router.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  deleteSocialById(id)
    .then(() => {
      res.status(200).json({ message: "Event Successfully Deleted" });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
