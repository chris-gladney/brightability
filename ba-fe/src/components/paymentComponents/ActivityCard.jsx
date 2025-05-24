function ActivityCard({ id, name, location, date, setAddedEvents }) {
  return (
    <div className="upcoming-event">
      <h3>Event: {name}</h3>
      <p>Location: {location}</p>
      <p>Date: {date}</p>
      <button
        className="add-to-cart"
        onClick={() => {
          setAddedEvents((prevEventsArray) => {
            const highlightedEventObj = { id, name, location, date };

            return [...prevEventsArray, highlightedEventObj];
          });
        }}
      >
        Add
      </button>
    </div>
  );
}

export default ActivityCard;
