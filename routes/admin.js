const express = require("express");

const { getAllUsers, updateUser } = require("../controller/adminController");

const router = express.Router();

router.get("/users/", getAllUsers);

router.patch("/users/:id", updateUser);

module.exports = router;
