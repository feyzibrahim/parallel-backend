const { default: mongoose } = require("mongoose");
const Booking = require("../models/bookingModel");

const getBookings = async (req, res) => {
  const bookings = await Booking.find();

  res.status(200).json(bookings);
};

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body });
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getOneBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid. Please Check Again" });
  }
  const booking = await Booking.findById(id);
  if (!booking) {
    return res.status(404).json({ error: "No such Booking" });
  }

  return res.status(200).json(booking);
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Id is not valid please check again" });
  }

  const booking = await Booking.findByIdAndDelete({ _id: id });
  if (!booking) {
    return res.status(400).json({ error: "No such Booking" });
  }

  return res.status(200).json(booking);
};

module.exports = {
  getBookings,
  createBooking,
  getOneBooking,
  updateBooking,
  deleteBooking,
};
