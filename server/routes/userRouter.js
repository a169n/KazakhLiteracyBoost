const express = require("express");
const {
  getAllUsers,
  getUser,
  deleteUserById,
  saveCompletedQuiz,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user", protect, getUser);
router.put("/users/quiz", protect, saveCompletedQuiz);
router.delete("/users/:userId", deleteUserById);

module.exports = router;
