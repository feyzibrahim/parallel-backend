const Prize = require("../models/prizeModel");

const getPrize = async (req, res) => {
  try {
    const prize = await Prize.findOne({});

    if (!prize) {
      throw Error("No Such prize");
    }

    res.status(200).json(prize);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getPrize,
};
