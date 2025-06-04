function ActivityCard({
  id,
  name,
  location,
  date,
  setAddedEvents,
  cartAction,
  price,
}) {
  return (
    <div className="upcoming-event">
      <h3>Event: {name}</h3>
      <p>Location: {location ? location : "Zoom Session"}</p>
      <p>Date: {date}</p>
      <p>Price: {price}</p>
      <button
        className={`${
          cartAction === "Add" ? "add-to-cart" : "remove-from-cart"
        }`}
        onClick={() => {
          if (cartAction === "Add") {
            setAddedEvents((prevEventsArray) => {
              const highlightedEventObj = { id, name, location, date };

              return [...prevEventsArray, highlightedEventObj];
            });
          } else {
            setAddedEvents((prevEventsArray) => {
              const newEventsArray = [];
              prevEventsArray.forEach((event) => {
                if (event.id !== id) {
                  newEventsArray.push(event);
                }
              });
              return newEventsArray;
            });
          }
        }}
      >
        {cartAction}
      </button>
    </div>
  );
}

export default ActivityCard;
