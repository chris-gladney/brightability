const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  createCheckoutSession,
  retreiveCheckoutSession,
} = require("../utils/stripe");
const { updateAttendeesSocial } = require("../utils/socialEvents");

// Creates a checkout session

router.post("/pay-social", (req, res) => {
  const { name, email, addedEvents } = req.body;
  const socialPriceInPennies = "2000";
  createCheckoutSession(name, email, addedEvents, socialPriceInPennies)
    .then((data) => {
      res.json({ url: data.url });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
});

// Checks a previous checkout session to see whether payment is completed

router.get("/order-details/:sessionId", (req, res) => {
  const { sessionId } = req.params;

  retreiveCheckoutSession(sessionId)
    .then(({ customer_details, metadata }) => {
      Object.values(metadata).forEach((id) => {
        updateAttendeesSocial(
          customer_details.name,
          customer_details.email,
          id
        );
      });
    })
    .then(() => {
      res.status(204);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
  // Sudo code
  /* 
    checkSessionIsPaid(session_id)
    .then
    updateAttendees()
    .then
    emailAttendee 
  */
});

module.exports = router;
