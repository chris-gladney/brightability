import { useState, useEffect } from "react";
import axios from "axios";

function SocialEvents() {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [existingEvents, setExistingEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // This section of state is for the new event form
  const [newEventName, setNewEventName] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventDate, setNewEventDate] = useState("");

  // The function that handles the checkboxes for events
  // The checked events are added to selectedEvents
  const handleEventSelection = (eventId) => {
    setSelectedEvents((prevEventsArray) => {
      const eventArrayToReturn = [];
      if (prevEventsArray.includes(eventId)) {
        prevEventsArray.forEach((event) => {
          if (eventId !== event) {
            eventArrayToReturn.push(event);
          }
        });
        return eventArrayToReturn;
      } else {
        return [...prevEventsArray, eventId];
      }
    });
  };

  // Function handling upload of new event
  const handleNewEvent = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/admin/social/events",
        {
          name: newEventName,
          location: newEventLocation,
          date: newEventDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        alert(`${data.message}\n${data.event}`);
      });
  };

  // Function to handle getting attendees of selectedEvents
  const handleAttendees = (e, selectedEvents) => {
    e.preventDefault();
    selectedEvents.forEach((event) => {
      const currentEventObj = {
        name: event.name,
        attendees: event.attendees,
      };
      alert(
        `Event: ${currentEventObj.name} has the following attendees: \n${currentEventObj.attendees}`
      );
    });
  };

  // Function to handle deleting events
  const deleteEvents = (e, selectedEvents) => {
    e.preventDefault();
  };

  useEffect(() => {
    axios.get("http://localhost:3000/admin/social/events").then(({ data }) => {
      setExistingEvents(data);
    });
  }, []);

  return (
    <section className="social-control">
      <section className="upload-social">
        <h3>Social Events</h3>
        <form onSubmit={handleNewEvent}>
          <h4>Upload New Event</h4>
          <label htmlFor="event-name">Event Name: </label>
          <input
            type="text"
            id="event-name"
            name="event-name"
            onChange={(e) => {
              setNewEventName(e.target.value);
            }}
          ></input>
          <br />
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={(e) => {
              setNewEventLocation(e.target.value);
            }}
          ></input>
          <br />
          <label htmlFor="date">Time and Date: </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            min={new Date().toISOString().slice(0, -8)}
            onChange={(e) => {
              setNewEventDate(e.target.value);
            }}
          ></input>
          <br />
          <button>Submit</button>
        </form>
      </section>
      <section className="existing-events">
        <button onClick={() => setShowAllEvents(!showAllEvents)}>
          {showAllEvents ? "Collapse Events" : "Show Events"}
        </button>
        {showAllEvents
          ? existingEvents.map((event, i) => {
              return (
                <div key={i} className="existing-event">
                  <h5>{event.name}</h5>
                  <p>{event.location}</p>
                  <p>{event.date}</p>
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleEventSelection(event._id);
                    }}
                  ></input>
                </div>
              );
            })
          : ""}
        <form
          className="get-social-attendees"
          onSubmit={(e) => {
            e.preventDefault()
            handleAttendees(selectedEvents);
          }}
        >
          <button>Get Attendees</button>
        </form>
        <form
          className="delete-event"
          onSubmit={(e) => {
            deleteEvents(e.target.value, selectedEvents);
          }}
        >
          <button disabled={selectedEvents.length > 0 ? false : true}>
            Delete Selected Events
          </button>
        </form>
        <form className="email-social-attendees">
          <label htmlFor="email-header">Email Header: </label>
          <input type="text" id="email-header" htmlFor="email-header"></input>
          <br />
          <label htmlFor="email-body">Email Body: </label>
          <br />
          <textarea id="email-body" name="email-body"></textarea>
          <br />
          <button>Email Attendees</button>
        </form>
      </section>
      <button
        onClick={() => {
          console.log(newEventName, "<<< newEventName");
          console.log(newEventLocation, "<<< newEventLocation");
          console.log(newEventDate, "<<< newEventDate");
        }}
      >
        Development Button Social
      </button>
    </section>
  );
}

export default SocialEvents;
