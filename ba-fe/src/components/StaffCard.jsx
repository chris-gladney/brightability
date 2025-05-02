import placeholderImg from "../assets/placeholderImg.png";

function StaffCard({ name, job_title, description }) {
  return (
    <div className="staff-card">
      <div className="staff-description">
        <h4>{name}</h4>
        <h5>{job_title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default StaffCard;
