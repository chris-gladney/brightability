import { useEffect, useState } from "react";
import axios from "axios";

function Staff() {
  const [newName, setNewName] = useState("");
  const [newJob, setNewJob] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [existingStaff, setExistingStaff] = useState([]);

  const handleNewStaff = (name, job, description) => {
    axios
      .post(
        "http://localhost:3000/admin/staff",
        {
          name,
          job,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        alert(data.message);
      })
      .then(() => {
        window.location.reload();
      });
  };

  const handleStaffDeletion = (staffId) => {
    if (
      confirm("Are you sure you want to delete this member of staff?") === true
    ) {
      axios
        .delete(`http://localhost:3000/admin/staff/${staffId}`)
        .then(({ data }) => {
          alert(data.message);
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/admin/staff").then(({ data }) => {
      setExistingStaff(data);
    });
  }, []);

  return (
    <section className="staff-control">
      <section className="upload-staff">
        <h3>Staff</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNewStaff(newName, newJob, newDescription);
          }}
        >
          <h4>Upload New Staff</h4>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          ></input>
          <br />
          <label htmlFor="job">Job: </label>
          <input
            id="job"
            name="job"
            type="text"
            onChange={(e) => {
              setNewJob(e.target.value);
            }}
          ></input>
          <br />
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
          ></textarea>
          <br />
          <button disabled={newName && newJob && newDescription ? false : true}>
            Add Staff Member
          </button>
        </form>
      </section>
      <section className="existing-staff">
        {existingStaff.length > 0
          ? existingStaff.map((staff, i) => {
              return (
                <div key={i} className="existing-staff">
                  <h5>{staff.name}</h5>
                  <p>{staff.job}</p>
                  <p>{staff.description}</p>
                  <button
                    className="delete-staff"
                    onClick={() => {
                      handleStaffDeletion(staff._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : ""}
      </section>
      <button
        onClick={() => {
          console.log(existingStaff, "<<< existingStaff");
          console.log(newName, "<<< newName");
          console.log(newJob, "<<< newJob");
          console.log(newDescription, "<<< newDescription");
        }}
      >
        Staff development button
      </button>
    </section>
  );
}

export default Staff;
