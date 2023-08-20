require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const userRoutes = require("./routes/user");
// const adminRoutes = require("./routes/admin");

const gameRoutes = require("./routes/game");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRoutes);

app.use("/api/games", gameRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on PORT: " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
