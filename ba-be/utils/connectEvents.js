const ConnectEvent = require("../models/ConnectEvent");

const createConnect = (name, zoomLink, date) => {
  return ConnectEvent.create({
    name,
    zoomLink,
    date,
  }).catch((err) => {
    return err;
  });
};

const connectNoAttendees = () => {
  return ConnectEvent.find({})
    .then((events) => {
      const eventsNoAttendees = [];
      events.forEach((event) => {
        eventsNoAttendees.push({
          _id: event._id,
          name: event.name,
          date: event.date,
        });
      });
      return eventsNoAttendees;
    })
    .catch((err) => {
      return err;
    });
};

const connectWithAttendees = () => {
  return ConnectEvent.find({})
    .then((event) => {
      return event;
    })
    .catch((err) => {
      return err;
    });
};

const connectById = (eventId) => {
  return ConnectEvent.find({ _id: eventId })
    .then((event) => {
      const eventNoAttendees = [];
      event.forEach((event) => {
        eventNoAttendees.push({
          _id: event._id,
          name: event.name,
          date: event.date,
        });
      });
      return eventNoAttendees;
    })
    .catch((err) => {
      return err;
    });
};

const updateAttendeesConnect = (name, email, eventId) => {
  return ConnectEvent.findOneAndUpdate(
    { _id: eventId },
    { $push: { attendees: { name, email } } }
    // Returns the updated event with the relevent eventId
  ).catch((err) => {
    return err;
  });
};

const deleteConnectById = (eventId) => {
  return ConnectEvent.deleteOne({ _id: eventId }).catch((err) => {
    return err;
  });
};

module.exports = {
  createConnect,
  connectNoAttendees,
  connectWithAttendees,
  connectById,
  updateAttendeesConnect,
  deleteConnectById
};
