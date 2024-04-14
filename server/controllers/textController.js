const Text = require("../models/textSchema");

const createText = async (req, res) => {
  try {
    const newText = await Text.create(req.body);
    res.status(201).json(newText);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllTexts = async (req, res) => {
  try {
    const texts = await Text.find();
    res.status(200).json(texts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTextById = async (req, res) => {
  try {
    const text = await Text.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ message: "Text not found" });
    }
    res.status(200).json(text);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTextById = async (req, res) => {
  try {
    const updatedText = await Text.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedText) {
      return res.status(404).json({ message: "Text not found" });
    }
    res.status(200).json(updatedText);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTextById = async (req, res) => {
  try {
    const deletedText = await Text.findByIdAndDelete(req.params.id);
    if (!deletedText) {
      return res.status(404).json({ message: "Text not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createText,
  getAllTexts,
  getTextById,
  updateTextById,
  deleteTextById,
};
