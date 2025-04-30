import { useState } from "react";

function ExploreCard({ element, description }) {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseOver = () => {
    setShowDescription(true);
  };

  const handleMouseOut = () => {
    setShowDescription(false);
  };

  return (
    <a>
      <div
        className="explore-card"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {!showDescription ? <h3>{element}</h3> : <p>{description}</p>}
      </div>
    </a>
  );
}

export default ExploreCard;
