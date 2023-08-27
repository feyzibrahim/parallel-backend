const Prize = require("../models/prizeModel");
const mongoose = require("mongoose");

const getPrize = async (req, res) => {
  const prize = await Prize.find({});

  if (!prize) {
    return res.status(404).json({ error: "No Such prize" });
  }

  res.status(200).json(prize[0]);
};

const createPrize = async (req, res) => {
  try {
    const prize = await Prize.create({ ...req.body });
    res.status(200).json(prize);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePrize = async (req, res) => {
  const sp = await Prize.find({});
  try {
    const prize = await Prize.findByIdAndUpdate(
      { _id: sp[0]._id },
      {
        ...req.body,
      },
      { new: true }
    );
    return res.status(200).json(prize);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deletePrize = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const prize = await Prize.findByIdAndDelete({ _id: id });
  if (!prize) {
    return res.status(400).json({ error: "No such prize" });
  }

  return res.status(200).json(prize);
};

module.exports = {
  getPrize,
  createPrize,
  updatePrize,
  deletePrize,
};
