const express = require("express");
const router = express.Router();
const { getAllStaff, deleteStaff, createNewStaff } = require("../utils/staff");

router.get("/", (req, res) => {
  getAllStaff()
    .then((staff) => {
      res.status(200).json(staff);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

router.post("/", (req, res) => {
  const { name, job, description } = req.body;
  createNewStaff(name, job, description)
    .then((data) => {
      res.status(201).json({ message: "Staff Member Added" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteStaff(id)
    .then(() => {
      res.status(200).json({ message: "Staff Member Deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = router;
