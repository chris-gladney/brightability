const express = require("express");
const router = express.Router();
const Event = require("../models.js/Event");

router.post("/", async (req, res) => {
  try {
    const { name, date } = req.body;

    const event = await Event.insertOne({
      name: name,
      date: date,
    });
    

    res.status(201).json({message: "Event Created"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
 
module.exports = router;
