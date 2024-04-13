const express = require("express");
const router = express.Router();
const {
  getAllCards,
  getCardById,
  createCard,
  updateCardById,
  deleteCardById,
} = require("../controllers/cardController");

const upload = require("../multer");

router.get("/cards", getAllCards);
router.get("/cards/:id", getCardById);
router.post("/cards", upload.single("image"), createCard);
router.put("/cards/:id", updateCardById);
router.delete("/cards/:id", deleteCardById);

module.exports = router;
