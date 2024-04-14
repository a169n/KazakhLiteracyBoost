const Reading = require('../models/readingSchema');

const getAllReadings = async (req, res) => {
    try {
        const readings = await Reading.find({});
        res.status(200).json(readings);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getReadingById = async (req, res) => {
    const readingId = req.params.id;

    try {
        const reading = await Reading.findById(readingId);
        if (!reading) {
            return res.status(404).json({ message: "Reading not found" });
        }
        res.status(200).json(reading);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const processText = async (text) => {
    try {
        const data = { "inputs": text };
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Kyrmasch/t5-kazakh-qa",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Failed to process text");
    }
};

const processTextHandler = async (req, res) => {
    const text = req.body.text;
    try {
        const response = await processText(text);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getAllReadings, getReadingById, processTextHandler };