const mongoose = require("mongoose");

const Counter = require("./counterModel");
const Schema = mongoose.Schema;

// Define Booking schema
const bookingSchema = new Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Game",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    lsk: {
      type: String,
    },
    number: {
      type: Number,
    },
    count: {
      type: Number,
    },
    amountC: {
      type: Number,
    },
    amountD: {
      type: Number,
    },
    billNumber: {
      type: Number, // You can use any data type that fits your requirement
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware to set the billNumber before saving a new booking
bookingSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next(); // Skip if not a new booking
  }

  try {
    const counterName = "billNumber"; // Use a unique name for the counter
    const counter = await Counter.findOneAndUpdate(
      { counterName },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    this.billNumber = counter.value;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
