const { default: mongoose } = require("mongoose");
const Booking = require("../models/bookingModel");
const Counter = require("../models/counterModel");

const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("customerId");

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

const createBookings = async (req, res) => {
  try {
    const bookingsData = req.body; // Array of booking data objects

    // Get the current bill number from the counter collection and increment it
    const counter = await Counter.findOneAndUpdate(
      { counterName: "billNumber" },
      { $inc: { value: bookingsData.length } },
      { new: true, upsert: true }
    );

    const startingBillNumber = counter.value - bookingsData.length;

    // Generate unique bill numbers for each booking
    for (let i = 0; i < bookingsData.length; i++) {
      bookingsData[i].billNumber = startingBillNumber + i;
    }

    const bookings = await Booking.insertMany(bookingsData);
    return res.status(200).json(bookings);
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

const deleteAllBookings = async (req, res) => {
  try {
    const result = await Booking.deleteMany({});
    return res
      .status(200)
      .json({ message: `${result.deletedCount} documents deleted` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBookings,
  createBooking,
  createBookings,
  getOneBooking,
  updateBooking,
  deleteBooking,
  deleteAllBookings,
};
