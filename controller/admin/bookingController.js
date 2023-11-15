const { default: mongoose } = require("mongoose");
const Booking = require("../../models/bookingModel");

const getBookings = async (req, res) => {
  const { gameId, startDate, endDate, filterNumber } = req.query;

  try {
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      throw Error("Invalid Game Id");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let filter = { gameId };

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
    const bookings = await Booking.find(filter)
      .populate("userId", { username: 1 })
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBookings,
};
