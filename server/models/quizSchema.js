const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    questions: [
      {
        questionText: String,
        options: [
          {
            optionText: String,
            isCorrect: Boolean,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    collection: "quiz",
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
