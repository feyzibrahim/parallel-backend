const Result = require("../models/resultModel");

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
  getResultsByDate,
};
