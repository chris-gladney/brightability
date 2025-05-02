import { useState } from "react";

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
      <div className="service-image" id={imageId}>
        <img className="services-img" src={imageId} alt="" />
      </div>
      {!showDescription ? (
        <div className="service-preview">
          <h3>{name}</h3>
          <p>{cost}</p>
        </div>
      ) : (
        <div className="service-description">
          <p>{description}</p>
          <button>{!bookableOnline ? "Learn More" : "Book"}</button>
        </div>
      )}
    </div>
  );
}

export default ServiceCard;
