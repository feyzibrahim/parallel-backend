const express = require("express");

const {
  getPackages,
  getOnePackage,
  createPackage,
  updatePackage,
  deletePackage,
} = require("../controller/packageController");

const router = express.Router();
// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", getPackages);

router.post("/", createPackage);

router.get("/:id", getOnePackage);

router.patch("/:id", updatePackage);

router.delete("/:id", deletePackage);

module.exports = router;
