// imports
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { connectDB } = require("./config/db");

corsOptions = {
  origin: "http://localhost:5173",
};

// Serving static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../client")));

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// DB connection
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/userRouter"));
app.use("/", require("./routes/quizRoutes"));
app.use("/", require("./routes/cardRouter"));
app.use("/", require("./routes/chatRoutes"));
app.use("/", require("./routes/textRouter"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
