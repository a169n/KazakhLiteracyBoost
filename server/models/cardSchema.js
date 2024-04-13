const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
  {
    definition: String,
    image: String,
    translation: String,
    transcription: String,
  },
  {
    timestamps: true,
    collection: "card",
  }
);

module.exports = mongoose.model("Card", cardSchema);
