const express = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUserById,
  saveCompletedQuiz,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/quiz", protect, saveCompletedQuiz);
router.delete("/users/:userId", deleteUserById);

module.exports = router;
