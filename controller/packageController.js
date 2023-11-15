const Package = require("../models/packageModel");
const mongoose = require("mongoose");

// Get all the packages
const getPackages = async (req, res) => {
  const { userId } = req.query;

  const packages = await Package.find({ userId });
  res.status(200).json(packages);
};

const getOnePackage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const package = await Package.findById(id);

  if (!package) {
    return res.status(404).json({ error: "No Such Package" });
  }

  res.status(200).json(package);
};

module.exports = {
  getPackages,
  getOnePackage,
};
