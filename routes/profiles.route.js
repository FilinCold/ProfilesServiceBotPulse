const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProfile,
  createProfile,
  updateProduct,
  deleteProduct,
  updateProfileSubscription,
} = require("../controllers/profiles.controller.js");

router.get("/", getProducts);
router.get("/:id", getProfile);

router.post("/", createProfile);

// update a profile subscription
router.put("/:id", updateProfileSubscription);

// delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
