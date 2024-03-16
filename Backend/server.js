const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config()
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const barberRoutes = require("./routes/barberRoutes");
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db')
// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/public', express.static('public'));

// Connect to MongoDB
connectDB();  // Call the MongoDB connection function

// Routes
app.use('/auth', authRoutes);
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.use('/barber',barberRoutes)
// Server port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

