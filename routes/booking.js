const express = require("express");

const {
  getBookings,
  createBooking,
  getOneBooking,
  updateBooking,
  deleteBooking,
} = require("../controller/bookingController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getBookings);

router.post("/", createBooking);

router.get("/:id", getOneBooking);

router.patch("/:id", updateBooking);

router.delete("/:id", deleteBooking);

module.exports = router;
