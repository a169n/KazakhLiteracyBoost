const express = require("express");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz
} = require("../controllers/quizController");

const router = express.Router();

router.post("/quizzes", createQuiz);
router.get("/quizzes", getAllQuizzes);
router.get("/quizzes/:id", getQuizById);
router.put("/quizzes/:id", updateQuiz);
router.delete("/quizzes/:id", deleteQuiz);

module.exports = router;
