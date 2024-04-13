const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    surname: String,
    username: String,
    password: String,
    email: String,
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);