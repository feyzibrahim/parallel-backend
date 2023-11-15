const { default: mongoose } = require("mongoose");
const Result = require("../../models/resultModel");

const getResults = async (req, res) => {
  const Results = await Result.find();

  res.status(200).json(Results);
};

const createResult = async (req, res) => {
  try {
    const result = await Result.create({ ...req.body });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateResult = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  try {
    const result = await Result.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteResult = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const result = await Result.findByIdAndDelete({ _id: id });
  if (!result) {
    return res.status(400).json({ error: "No such Result" });
  }

  return res.status(200).json(result);
};

const getResultsByDate = async (req, res) => {
  const { date, gameId } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date must be passed along the api" });
  }
  if (!gameId) {
    return res
      .status(400)
      .json({ error: "gameId must be passed along the api" });
  }

  try {
    const result = await Result.findOne({ date, gameId });

    if (!result) {
      return res
        .status(404)
        .json({ error: "No results found for the given date." });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
};

module.exports = {
  getResults,
  createResult,
  updateResult,
  deleteResult,
  getResultsByDate,
};
