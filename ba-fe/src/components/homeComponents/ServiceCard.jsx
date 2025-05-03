import { useState } from "react";
import { Link } from "react-router-dom";

function ServiceCard({ name, cost, description, bookableOnline, imageId }) {
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
      <div className="service-image" id={imageId}></div>
      {!showDescription ? (
        <div className="service-preview">
          <h3>{name}</h3>
          <p>{cost}</p>
        </div>
      ) : (
        <div className="service-description">
          <p>{description}</p>
          {!bookableOnline ? (
            <Link to="/moreinfo">
              <button>Learn More</button>
            </Link>
          ) : (
            <Link to={`/${name.split(" ")[1].toLowerCase()}`}>
              <button>Book</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default ServiceCard;
