const express = require("express");

const {
  getPackages,
  getOnePackage,
} = require("../controller/packageController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getPackages);

router.get("/:id", getOnePackage);

module.exports = router;
