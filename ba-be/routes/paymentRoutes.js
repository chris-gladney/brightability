const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createCheckoutSession } = require("../utils/stripe");

// Creates a checkout session

router.post("/pay-social", (req, res) => {
  const { name, email, addedEvents } = req.body;
  const socialPriceInPennies = "2000"
  createCheckoutSession(name, email, addedEvents, socialPriceInPennies).then((data) => {
    res.json({ url: data.url });
  });
});

// Checks a previous checkout session to see whether payment is completed

router.post("/fulfill-checkout", (req, res) => {
  const { sessionId, name, email } = req.body;
  // Sudo code
  /* 
    checkSessionIsPaid(session_id)
    .then
    updateAttendees()
    .then
    emailAttendee 
  */
  console.log(sessionId, name, email);
  res.status(200);
});

module.exports = router;
