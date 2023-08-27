const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define Booking schema
const prizeSchema = new Schema(
  {
    first: {
      prize: {
        type: Number,
        default: 5000,
      },
      commission: {
        type: Number,
        default: 400,
      },
    },
    second: {
      prize: {
        type: Number,
        default: 500,
      },
      commission: {
        type: Number,
        default: 50,
      },
    },
    third: {
      prize: {
        type: Number,
        default: 250,
      },
      commission: {
        type: Number,
        default: 20,
      },
    },
    fourth: {
      prize: {
        type: Number,
        default: 100,
      },
      commission: {
        type: Number,
        default: 20,
      },
    },
    fifth: {
      prize: {
        type: Number,
        default: 50,
      },
      commission: {
        type: Number,
        default: 10,
      },
    },
    guarantee: {
      prize: {
        type: Number,
        default: 20,
      },
      commission: {
        type: Number,
        default: 10,
      },
    },
    boxFirst: {
      prize: {
        type: Number,
        default: 3000,
      },
      commission: {
        type: Number,
        default: 300,
      },
    },
    boxSeries: {
      prize: {
        type: Number,
        default: 800,
      },
      commission: {
        type: Number,
        default: 30,
      },
    },
    single: {
      prize: {
        type: Number,
        default: 100,
      },
      commission: {
        type: Number,
        default: 0,
      },
    },
    double: {
      prize: {
        type: Number,
        default: 700,
      },
      commission: {
        type: Number,
        default: 30,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prize", prizeSchema);
