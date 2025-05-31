const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  createCheckoutSession,
  retreiveCheckoutSession,
} = require("../utils/stripe");
const { updateAttendeesSocial, socialById } = require("../utils/socialEvents");
const { emailAttendeeSocial } = require("../utils/email");

// Creates a checkout session

router.post("/pay-social", (req, res) => {
  const { email, addedEvents } = req.body;
  const socialPriceInPennies = "2000";
  createCheckoutSession(email, addedEvents, socialPriceInPennies)
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
    .then(({ customer_details, metadata, payment_status }) => {
      const customerEventArray = [];
      // Check to see if event is paid for
      if (payment_status !== "unpaid") {
        // If events are paid for, data is being returned for the next then block
        Object.values(metadata).forEach((id) => {
          customerEventArray.push({
            name: customer_details.name,
            email: customer_details.email,
            id,
          });
        });
      }
      return customerEventArray;
      // CustomerEventArray is the an array of objects containing { name, email, eventId }
    })
    .then((customerEventArray) => {
      const customerEventArrayOneId = [];
      const customerDetails = {
        name: customerEventArray[0].name,
        email: customerEventArray[0].email,
      };
      customerEventArray.forEach((eventObject) => {
        if (!customerEventArrayOneId.includes(eventObject.id)) {
          customerEventArrayOneId.push(eventObject.id);
        }
      });
      customerEventArrayOneId.forEach((customerEventId) => {
        // Iterates over the CustomerEventArray and updates each event within by Id using the imported func
        // Has been changed that an event's attendees are only updated once
        updateAttendeesSocial(
          customerDetails.name,
          customerDetails.email,
          customerEventId
        );
      });
      return { customerDetails, customerEventArrayOneId };
      // Returns the customer name and email as an object { name, email } and an array of event ids that have been purchased
    })
    .then(({ customerDetails, customerEventArrayOneId }) => {
      // Need to retreive event objects for all event Ids
      // Return the previous data and the eventsById
    })
    // Next step is to create a string that will be emailed to Brightability's client describing the event as follows:
    // "Thanks for your purchase! We look forward to seeing you at ${event.location} on ${event.date}"
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
