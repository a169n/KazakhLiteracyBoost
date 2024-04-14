const express = require("express");
const {
  getAllTexts,
  getTextById,
  createText,
  updateTextById,
  deleteTextById,
} = require("../controllers/textController");

const router = express.Router();

router.get("/texts", getAllTexts);
router.get("/texts/:id", getTextById);
router.post("/texts", createText);
router.put("/texts/:id", updateTextById);
router.delete("/texts/:id", deleteTextById);

module.exports = router;
