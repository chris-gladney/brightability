import { useState } from "react";

function ActivityCard({ name, location, date }) {
  const [addToCart, setAddToCart] = useState(false);
  return (
    <div className={`activity-card ${addToCart ? "in-cart" : ""}`}>
      <div className="add-to-cart">
        <button
          onClick={() => {
            setAddToCart(!addToCart);
          }}
          className={`${addToCart ? "remove-from-cart" : ""}`}
        >
          {addToCart ? "-" : "+"}
        </button>
      </div>
      <h3>{name}</h3>
      <p>{location}</p>
      <p>{date}</p>
      <p>Price: £20</p>
    </div>
  );
}

export default ActivityCard;
