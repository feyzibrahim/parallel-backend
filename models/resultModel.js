const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    firstPrize: {
      type: Number,
    },
    secondPrize: {
      type: Number,
    },
    thirdPrize: {
      type: Number,
    },
    fourthPrize: {
      type: Number,
    },
    fifthPrize: {
      type: Number,
    },
    guarantee: [Number],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
