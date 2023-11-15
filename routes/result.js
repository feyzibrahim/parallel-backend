const express = require("express");

const { getResultsByDate } = require("../controller/resultController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/byDate/", getResultsByDate);

module.exports = router;
