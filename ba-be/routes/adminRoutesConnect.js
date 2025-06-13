const express = require("express");
const router = express.Router();
const {
  connectWithAttendees,
  createConnect,
  deleteConnectById,
} = require("../utils/connectEvents");

router.get("/events", (req, res) => {
  connectWithAttendees()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

router.post("/events", (req, res) => {
  const { name, zoomLink, date } = req.body;
  createConnect(name, zoomLink, date)
    .then((data) => {
      res.status(201).json({
        message: "Event Successfully Created",
        event: `Name: ${data.name}, date: ${data.date}`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

router.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  deleteConnectById(id)
    .then(() => {
      res.status(200).json({ message: "Event Successfully Deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = router;
