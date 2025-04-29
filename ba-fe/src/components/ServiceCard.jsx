import { useState } from "react";

function ServiceCard({ name, cost, description, bookableOnline }) {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseOver = () => {
    setShowDescription(true);
  };

  const handleMouseOut = () => {
    setShowDescription(false);
  };

  return (
    <div
      className="service-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {!showDescription ? (
        <>
          <h3>{name}</h3>
          <p>{cost}</p>
        </>
      ) : (
        <>
          <p>{description}</p>
          <button>{!bookableOnline ? "Learn More" : "Book"}</button>
        </>
      )}
    </div>
  );
}

export default ServiceCard;
