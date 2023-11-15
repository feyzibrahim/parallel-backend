const express = require("express");

const { getPrize } = require("../controller/prizeController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getPrize);

module.exports = router;
