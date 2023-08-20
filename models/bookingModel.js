const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
    },

    // Uncomment after testing.
    // number: {
    //   type: Number,
    // },
    // letter: {
    //   type: String,
    // },
    // count: {
    //   type: Number,
    // },
    // amountC: {
    //   type: Number,
    // },
    // amountD: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
