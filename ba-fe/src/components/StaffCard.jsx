import { useState } from "react";
import placeholderImg from "../assets/placeholderImg.png";

function StaffCard({ name, job_title, description }) {
  const [infoToDisplay, setinfoToDisplay] = useState("description");

  return (
    <div
      className="staff-card"
      onMouseOver={() => {
        setinfoToDisplay("image");
      }}
      onMouseOut={() => {
        setinfoToDisplay("description");
      }}
    >
      <div
        className={`staff-img ${
          infoToDisplay !== "image" ? "hidden-staff-info" : ""
        }`}
      ></div>
      <div
        className={`staff-description ${
          infoToDisplay !== "description" ? "hidden-staff-info" : ""
        }`}
      >
        <h4>{name}</h4>
        <h5>{job_title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default StaffCard;
