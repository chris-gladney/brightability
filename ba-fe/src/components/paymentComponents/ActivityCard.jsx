function ActivityCard({ name, location, date, setAddedEvents }) {
  return (
    <div className="upcoming-event">
      <h3>{name}</h3>
      <p>{location}</p>
      <p>{date}</p>
      <button
        className="add-to-cart"
        onClick={() => {
          setAddedEvents((prevEventsArray) => {
            const highlightedEventObj = { name, location, date };

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
