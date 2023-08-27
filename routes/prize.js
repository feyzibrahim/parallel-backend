const express = require("express");

const {
  getPrize,
  createPrize,
  updatePrize,
  deletePrize,
} = require("../controller/prizeController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getPrize);

router.post("/", createPrize);

router.patch("/", updatePrize);

router.delete("/:id", deletePrize);

module.exports = router;
