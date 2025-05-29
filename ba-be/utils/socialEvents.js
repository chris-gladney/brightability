const SocialEvent = require("../models.js/SocialEvent");

const socialNoAttendees = () => {
  return SocialEvent.find({})
    .then((events) => {
      const eventsNoAttendees = [];
      events.forEach((event) => {
        eventsNoAttendees.push({
          _id: event._id,
          name: event.name,
          location: event.location,
          date: event.date,
        });
      });
      return eventsNoAttendees;
    })
    .catch((err) => {
      return err;
    });
};

const socialById = (eventId) => {
  return SocialEvent.find({ _id: eventId })
    .then((event) => {
      const eventNoAttendees = [];
      event.forEach((event) => {
        eventNoAttendees.push({
          _id: event._id,
          name: event.name,
          location: event.location,
          date: event.date,
        });
      });
      return eventNoAttendees;
    })
    .catch((err) => {
      return err;
    });
};

const createSocial = (name, date, location) => {
  return SocialEvent.create({
    name,
    location,
    date,
  }).catch((err) => {
    return err;
  });
};

const updateAttendeesSocial = (name, email, eventId) => {
  return SocialEvent.findOneAndUpdate(
    { _id: eventId },
    { $push: { attendees: { name, email } } }
  ).catch((err) => {
    return err;
  });
};

module.exports = {
  socialNoAttendees,
  socialById,
  createSocial,
  updateAttendeesSocial,
};
