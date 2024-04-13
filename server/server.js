// imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const multer = require("multer");
const FormData = require("form-data");
const { Readable } = require("stream");
const axios = require("axios");
const upload = multer();

const bufferToStream = (buffer) => {
  return Readable.from(buffer);
};

app.post("/api/transcribe", upload.single("file"), async (req, res) => {
  try {
    const audioFile = req.file;
    if (!audioFile) {
      return res.status(400).json({ error: "No audio file provided" });
    }
    const formData = new FormData();
    const audioStream = bufferToStream(audioFile.buffer);
    formData.append("file", audioStream, {
      filename: "audio.mp3",
      contentType: audioFile.mimetype,
    });
    formData.append("model", "whisper-1");
    formData.append("response_format", "json");
    const config = {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };
    // Call the OpenAI Whisper API to transcribe the audio
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      config
    );
    const transcription = response.data.text;
    res.json({ transcription });
  } catch (error) {
    res.status(500).json({ error: "Error transcribing audio" });
  }
});

const { connectDB } = require("./config/db");

corsOptions = {
  origin: "http://localhost:5173",
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// DB connection
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/userRouter"));
app.use("/", require("./routes/quizRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
