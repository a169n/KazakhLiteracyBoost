const express = require("express");
const { processTextHandler, getAllReadings, getReadingById } = require("../controllers/readingController")

const router = express.Router();

router.post("/getAnswer", processTextHandler);
router.get("/", getAllReadings);
router.get("/:id", getReadingById);

module.exports = router;
