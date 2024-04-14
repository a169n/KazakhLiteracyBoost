const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    surname: String,
    username: String,
    password: String,
    email: String,
    points: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    completedQuizzes: [
      {
        quiz: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
        },
        score: Number,
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
