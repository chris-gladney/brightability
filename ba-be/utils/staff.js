const Staff = require("../models/Staff");

const getAllStaff = () => {
  return Staff.find({}).catch((err) => {
    return err;
  });
};

const createNewStaff = (name, job, description) => {
  return Staff.create({ name, job, description }).catch((err) => {
    return err
  });
};

const deleteStaff = (staffId) => {
  return Staff.deleteOne({ _id: staffId }).catch((err) => {
    return err;
  });
};

module.exports = { getAllStaff, createNewStaff, deleteStaff };
