const mongoose = require("mongoose");

const textSchema = mongoose.Schema(
  {
    title: String,
    text: String,
    difficulty: String,
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
    collection: "text",
  }
);

module.exports = mongoose.model("Text", textSchema);
