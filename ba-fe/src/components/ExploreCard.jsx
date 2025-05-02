import { useState } from "react";
import { Link } from "react-router-dom";

function ExploreCard({ link, element, description }) {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseOver = () => {
    setShowDescription(true);
  };

  const handleMouseOut = () => {
    setShowDescription(false);
  };

  return (
    <Link to={`/${link}`}>
      <div
        className="explore-card"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {!showDescription ? <h3>{element}</h3> : <p>{description}</p>}
      </div>
    </Link>
  );
}

export default ExploreCard;
