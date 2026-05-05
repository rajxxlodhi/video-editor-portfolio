const express = require("express");
const { getUploadSignature } = require("../controllers/uploadController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signature", protect, admin, getUploadSignature);

module.exports = router;
