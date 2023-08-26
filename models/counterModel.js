const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define Counter schema
const counterSchema = new Schema({
  counterName: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Counter", counterSchema);
