const Game = require("../models/gameModel");
const mongoose = require("mongoose");

// Get all the games
const getGames = async (req, res) => {
  const games = await Game.find();
  res.status(200).json(games);
};

const getOneGame = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const game = await Game.findById(id);

  if (!game) {
    return res.status(404).json({ error: "No Such Game" });
  }

  res.status(200).json(game);
};

module.exports = {
  getGames,
  getOneGame,
};
