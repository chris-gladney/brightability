import { useState, useEffect } from "react";
import axios from "axios";

function ConnectEvents() {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [existingEvents, setExistingEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

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

  useEffect(() => {
    axios.get("http://localhost:3000/connect").then(({ data }) => {
      setExistingEvents(data);
    });
  }, []);

  return (
    <>
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
