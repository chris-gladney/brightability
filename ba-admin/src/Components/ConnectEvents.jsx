import { useState, useEffect } from "react";
import axios from "axios";

function ConnectEvents() {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [existingEvents, setExistingEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // This section of state is for the new event form
  const [newEventName, setNewEventName] = useState("");
  const [newEventZoomLink, setNewEventZoomLink] = useState("");
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
        "http://localhost:3000/admin/connect/events",
        {
          name: newEventName,
          zoomLink: newEventZoomLink,
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
      })
      .then(() => {
        window.location.reload();
      });
  };

  // Function to handle getting attendees of selectedEvents
  const handleAttendees = (e) => {
    e.preventDefault();
    selectedEvents.forEach((eventId) => {
      existingEvents.forEach((event) => {
        if (eventId === event._id) {
          let attendeesString = "";
          event.attendees.forEach((attendee) => {
            attendeesString += `\n${attendee.name}`;
          });
          alert(
            `Event: ${event.name} on ${event.date} has ${
              attendeesString.length > 0
                ? `the following attendees: \n${attendeesString}`
                : `has no attendees`
            }`
          );
        }
      });
    });
  };

  // Function to handle deleting events
  const deleteEvents = (e) => {
    e.preventDefault();
    if (
      confirm(
        `Are you sure you want to delete the ${selectedEvents.length} selected events? \nAny refunds will have to be processed manually.`
      ) === true
    ) {
      Promise.all(
        selectedEvents.map((eventId) => {
          return axios
            .delete(`http://localhost:3000/admin/connect/events/${eventId}`)
            .then(({ data }) => {
              alert(data.message);
            });
        })
      )
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/admin/connect/events").then(({ data }) => {
      setExistingEvents(data);
    });
  }, []);

  return (
    <>
      <section className="connect-control">
        <section className="upload-connect">
          <h3>Connect Events</h3>
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
            <label htmlFor="zoomlink">Zoom Link: </label>
            <input
              type="text"
              id="zoomlink"
              name="zoomlink"
              onChange={(e) => {
                setNewEventZoomLink(e.target.value);
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
            <button
              disabled={
                newEventName && newEventZoomLink && newEventDate ? false : true
              }
            >
              Submit
            </button>
          </form>
        </section>
        <section className="existing-events">
          <button onClick={() => setShowAllEvents(!showAllEvents)}>
            {showAllEvents ? "Collapse Events" : "Show Existing Events"}
          </button>
          {showAllEvents
            ? existingEvents.map((event, i) => {
                return (
                  <div key={i} className="existing-event">
                    <h5>{event.name}</h5>
                    <p>{event.zoomLink}</p>
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
            className="get-connect-attendees"
            onSubmit={(e) => {
              handleAttendees(e);
            }}
          >
            <button disabled={selectedEvents.length > 0 ? false : true}>
              Get Attendees
            </button>
          </form>
          <form
            className="delete-event"
            onSubmit={(e) => {
              deleteEvents(e);
            }}
          >
            <button disabled={selectedEvents.length > 0 ? false : true}>
              Delete Selected Events
            </button>
          </form>
          <form className="email-connect-attendees">
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
            console.log(newEventZoomLink, "<<< newEventZoomLink");
            console.log(newEventDate, "<<< newEventDate");
            console.log(existingEvents, "<<< existingEvents");
            console.log(selectedEvents, "<<< selectedEvents");
          }}
        >
          Development Button Connect
        </button>
      </section>
      <h3>Connect Events</h3>
      <section className="update-zoom-link">
        <form>
          <label htmlFor="event-id">Event ID: </label>
          <input type="text" id="event-id" name="event-id"></input>
          <br />
          <label htmlFor="new-link">New Link: </label>
          <input type="text" id="new-link" name="new-link"></input>
          <br />
          <button>Submit</button>
        </form>
      </section>
      <form></form>
    </>
  );
}

export default ConnectEvents;
