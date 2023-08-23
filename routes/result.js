const express = require("express");

const {
  getResults,
  createResult,
  updateResult,
  deleteResult,
  getResultsByDate,
} = require("../controller/resultController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getResults);

router.post("/", createResult);

router.get("/byDate/", getResultsByDate);

router.patch("/:id", updateResult);

router.delete("/:id", deleteResult);

module.exports = router;
