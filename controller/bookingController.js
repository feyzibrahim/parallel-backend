const { default: mongoose } = require("mongoose");
const Booking = require("../models/bookingModel");
const Counter = require("../models/counterModel");

const getBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", { username: 1 })
    .sort({ createdAt: -1 });

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

    const populatedBookings = await Booking.insertMany(bookingsData);
    const bookings = await Booking.populate(populatedBookings, {
      path: "userId",
      select: "username",
    });

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

const getBookingsByGameId = async (req, res) => {
  const { userId, gameId, startDate, endDate, filterNumber } = req.query;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  let filter = { gameId, userId };

  // If either startDate or endDate is provided, use it in the filter
  if (startDate || endDate) {
    filter.createdAt = {};

    if (startDate) {
      filter.createdAt.$gte = new Date(startDate);
    } else {
      filter.createdAt.$gte = startOfDay;
    }

    if (endDate) {
      // Set the end time to the last moment of the end day
      const endDay = new Date(endDate);
      endDay.setHours(23, 59, 59, 999);
      filter.createdAt.$lt = endDay;
    } else {
      filter.createdAt.$lt = endOfDay;
    }
  } else {
    // If neither startDate nor endDate is provided, use the default start and end of the day
    filter.createdAt = { $gte: startOfDay, $lt: endOfDay };
  }

  if (filterNumber) {
    filter.number = parseInt(filterNumber, 10);
  }

  try {
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings." });
  }
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
      .json({ error: "Id is not valid, please check again" });
  }

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(400).json({ error: "No such Booking" });
    }

    // Calculate the time difference in minutes
    const currentTime = new Date();
    const creationTime = booking.createdAt;
    const timeDifferenceInMinutes = Math.floor(
      (currentTime - creationTime) / (1000 * 60)
    );

    // Allow deletion only if the time difference is within 30 minutes
    if (timeDifferenceInMinutes > 30) {
      return res
        .status(403)
        .json({ error: "Cannot delete after 30 minutes of creation" });
    }

    // Delete the booking
    const deletedBooking = await Booking.findByIdAndDelete(id);
    return res.status(200).json(deletedBooking);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the booking" });
  }
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
  getBookingsByGameId,
};
