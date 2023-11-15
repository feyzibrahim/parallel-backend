const Game = require("../../models/gameModel");
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

const createGame = async (req, res) => {
  try {
    const game = await Game.create({ ...req.body });
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  try {
    const game = await Game.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    return res.status(200).json(game);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const game = await Game.findByIdAndDelete({ _id: id });
  if (!game) {
    return res.status(400).json({ error: "No such Game" });
  }

  return res.status(200).json(game);
};

module.exports = {
  getGames,
  getOneGame,
  createGame,
  updateGame,
  deleteGame,
};
