const express = require("express");

const {
  getBookings,
  createBooking,
  createBookings,
  getOneBooking,
  getBookingsByGameId,
  updateBooking,
  deleteBooking,
  deleteAllBookings,
} = require("../controller/bookingController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getBookings);

router.get("/by-game-id/", getBookingsByGameId);

router.post("/", createBooking);

router.post("/insert-many/", createBookings);

router.get("/:id", getOneBooking);

router.patch("/:id", updateBooking);

router.delete("/:id", deleteBooking);

router.post("/delete-many/", deleteAllBookings);

module.exports = router;
