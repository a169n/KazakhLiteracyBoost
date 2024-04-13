const Card = require("../models/cardSchema");

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCardById = async (req, res) => {
  const cardId = req.params.id;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCard = async (req, res) => {
  try {
    const { definition, translation, transcription } = req.body;
    const imagePath = req.file.path;

    const card = await Card.create({
      definition: definition,
      translation: translation,
      transcription: transcription,
      image: imagePath,
    });

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create card" });
  }
};

const updateCardById = async (req, res) => {
  const cardId = req.params.id;
  const { title, image } = req.body;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { title, image },
      { new: true }
    );
    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCardById = async (req, res) => {
  const cardId = req.params.id;

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCardById,
  deleteCardById,
};
