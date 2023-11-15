const express = require("express");

const { getGames, getOneGame } = require("../controller/gameController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getGames);

router.get("/:id", getOneGame);

module.exports = router;
