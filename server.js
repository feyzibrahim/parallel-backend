// importing process
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Importing routes created by me
const workoutRoutes = require("./routes/workouts");

const app = express();

// Middleware
app.use(express.json());

// use the imported routes here
app.use("/api/workouts", workoutRoutes);

// Printing the API routes // Remove before publishing
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Connect to atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listens on app
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
