const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  createCheckoutSession,
  retreiveCheckoutSession,
} = require("../utils/stripe");
const { updateAttendeesSocial } = require("../utils/socialEvents");
const { updateAttendeesConnect } = require("../utils/connectEvents");
const { emailAttendeeSocial, emailAttendeeConnect } = require("../utils/email");

// Creates a checkout session for social events

router.post("/pay-social", (req, res) => {
  const { email, addedEvents } = req.body;
  const socialPriceInPennies = "2000";
  createCheckoutSession(email, addedEvents, socialPriceInPennies, "social")
    .then((data) => {
      res.json({ url: data.url });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
});

// Checks a previous checkout session to see whether payment is completed

router.get("/order-details-social/:sessionId", (req, res) => {
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
      const arrayOfEvents = Promise.all(
        customerEventArrayOneId.map((customerEventId) => {
          // Iterates over the CustomerEventArray and updates each event within by Id using the imported func
          // Has been changed that an event's attendees are only updated once

          return updateAttendeesSocial(
            customerDetails.name,
            customerDetails.email,
            customerEventId
          );
        })
      );

      return arrayOfEvents.then((resolvedEvents) => ({
        customerDetails,
        arrayOfEvents: resolvedEvents,
      }));
      // Returns the customer name and email as an object: { name, email } and an array of purchased event ids: [id1, id2]
    })
    .then(({ customerDetails, arrayOfEvents }) => {
      const { name, email } = customerDetails;
      arrayOfEvents.forEach((event) => {
        emailAttendeeSocial(name, email, event);
      });
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

// Creates a checkout session for connect events

router.post("/pay-connect", (req, res) => {
  const { email, addedEvents } = req.body;
  const socialPriceInPennies = "400";
  createCheckoutSession(email, addedEvents, socialPriceInPennies, "connect")
    .then((data) => {
      res.json({ url: data.url });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    });
});

router.get("/hello", (req, res) => {
  console.log("Reaches hello endpoint");
});

router.get("/order-details-connect/:sessionId", (req, res) => {
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
      const arrayOfEvents = Promise.all(
        customerEventArrayOneId.map((customerEventId) => {
          // Iterates over the CustomerEventArray and updates each event within by Id using the imported func
          // Has been changed that an event's attendees are only updated once

          return updateAttendeesConnect(
            customerDetails.name,
            customerDetails.email,
            customerEventId
          );
        })
      );

      return arrayOfEvents.then((resolvedEvents) => ({
        customerDetails,
        arrayOfEvents: resolvedEvents,
      }));
      // Returns the customer name and email as an object: { name, email } and an array of purchased event ids: [id1, id2]
    })
    .then(({ customerDetails, arrayOfEvents }) => {
      console.log(arrayOfEvents, "<<< array of events");
      const { name, email } = customerDetails;
      arrayOfEvents.forEach((event) => {
        emailAttendeeConnect(name, email, event);
      });
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
