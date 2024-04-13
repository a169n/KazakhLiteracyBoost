// imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
