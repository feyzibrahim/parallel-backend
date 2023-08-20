const express = require("express");

const {
  getGames,
  getOneGame,
  createGame,
  updateGame,
  deleteGame,
} = require("../controller/gameController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getGames);

router.post("/", createGame);

router.get("/:id", getOneGame);

router.patch("/:id", updateGame);

router.delete("/:id", deleteGame);

module.exports = router;
