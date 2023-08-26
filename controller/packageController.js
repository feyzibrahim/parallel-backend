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

const createPackage = async (req, res) => {
  try {
    const package = await Package.create({ ...req.body });
    res.status(200).json(package);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePackage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  try {
    const package = await Package.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    return res.status(200).json(package);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deletePackage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const package = await Package.findByIdAndDelete({ _id: id });
  if (!package) {
    return res.status(400).json({ error: "No such Package" });
  }

  return res.status(200).json(package);
};

module.exports = {
  getPackages,
  getOnePackage,
  createPackage,
  updatePackage,
  deletePackage,
};
