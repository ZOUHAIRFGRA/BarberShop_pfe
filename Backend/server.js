const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config()
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const barberRoutes = require("./routes/barberRoutes");
const connectDB = require('./config/db')
const resetAvailableSlots = require('./utils/resetAvailableSlots');
// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();  // Call the MongoDB connection function

// Routes
app.use('/auth', authRoutes);
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.use('/barber',barberRoutes)
// Server port
const PORT = process.env.PORT || 3000;
const cron = require('node-cron');

// Schedule the resetAvailableSlots function to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  await resetAvailableSlots();
  console.log('Available slots reset for all barbers');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

