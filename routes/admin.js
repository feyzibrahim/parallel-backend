const express = require("express");

const { getAllUsers } = require("../controller/adminController");

const router = express.Router();

router.get("/users/", getAllUsers);

module.exports = router;
