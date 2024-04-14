const express = require("express");
const {
  getAllUsers,
  getUser,
  deleteUserById,
  saveCompletedQuiz,
  getCompletedTestsForWeek,
  addPointsToUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user", protect, getUser);
router.put("/users/quiz", protect, saveCompletedQuiz);
router.put("/user/addPoints", protect, addPointsToUser);
router.delete("/users/:userId", deleteUserById);
router.get("/getCompletedTestsForWeek", getCompletedTestsForWeek)

module.exports = router;
