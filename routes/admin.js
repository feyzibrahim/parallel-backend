const express = require("express");

const {
  getAllUsers,
  updateUser,
  createUser,
} = require("../controller/admin/userController");
const { getBookings } = require("../controller/admin/bookingController");
const {
  getPrize,
  createPrize,
  deletePrize,
  updatePrize,
} = require("../controller/admin/prizeController");
const {
  getGames,
  getOneGame,
  createGame,
  updateGame,
  deleteGame,
} = require("../controller/admin/gameController");
const {
  getResults,
  createResult,
  updateResult,
  deleteResult,
  getResultsByDate,
} = require("../controller/admin/resultController");
const {
  createPackage,
  deletePackage,
  getOnePackage,
  getPackages,
  updatePackage,
  deleteAllPackage,
} = require("../controller/admin/packageController");

const router = express.Router();

router.get("/users/", getAllUsers);
router.patch("/users/:id", updateUser);
router.post("/create-user/", createUser);

// Bookings
router.get("/bookings/", getBookings);

// Price
router.get("/prize", getPrize);
router.post("/prize", createPrize);
router.delete("/prize", deletePrize);
router.patch("/prize", updatePrize);

// Game
router.get("/game", getGames);
router.post("/game", createGame);
router.get("/game/:id", getOneGame);
router.patch("/game/:id", updateGame);
router.delete("/game/:id", deleteGame);

// Result
router.get("/result/", getResults);
router.post("/result/", createResult);
router.get("/result/byDate/", getResultsByDate);
router.patch("/result/:id", updateResult);
router.delete("/result/:id", deleteResult);

// Result
router.get("/packages/", getPackages);
router.get("/package/:id", getOnePackage);
router.post("/package/", createPackage);
router.patch("/package/:id", updatePackage);
router.delete("/package/:id", deletePackage);
router.delete("/package-all/", deleteAllPackage);

module.exports = router;
