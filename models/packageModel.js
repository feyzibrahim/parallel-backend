const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define Booking schema
const packageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    single: {
      rate: {
        type: Number,
        default: 12,
      },
      commission: {
        type: Number,
        default: 0,
      },
    },
    double: {
      rate: {
        type: Number,
        default: 10,
      },
      commission: {
        type: Number,
        default: 0,
      },
    },
    lskSuper: {
      rate: {
        type: Number,
        default: 10,
      },
      commission: {
        type: Number,
        default: 0,
      },
    },
    box: {
      rate: {
        type: Number,
        default: 10,
      },
      commission: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
