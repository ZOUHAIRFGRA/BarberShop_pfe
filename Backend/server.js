const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config()
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require('./config/db')

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();  // Call the MongoDB connection function

// Routes
app.use('/auth', authRoutes);

// Server port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

