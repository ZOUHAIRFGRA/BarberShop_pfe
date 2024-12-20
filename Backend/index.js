const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config()
const cors = require("cors");
const errorMiddleware = require('./middlewares/errorHandler');
const fileUpload = require('express-fileupload');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const barberRoutes = require("./routes/barberRoutes");
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db')
// Initialize express app
const app = express();
// On Master Branch :
// Middleware
app.use(cors({
  origin: 'https://barber-shop-pfe.vercel.app', // Replace with the origin of your frontend application
  credentials: true ,
  // Allow credentials (cookies) to be sent and received
}));
// On main branch
// Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with the origin of your frontend application
//   credentials: true ,
//   // Allow credentials (cookies) to be sent and received
// }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static('public'));

// Connect to MongoDB
connectDB();  // Call the MongoDB connection function
app.get('/',(req,res)=>{
  res.json('Server is running')
})
// Routes
app.use('/auth', authRoutes);
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.use('/barber',barberRoutes)

const cron = require('node-cron');
const resetAvailableSlots = require('./utils/resetAvailableSlots');

// Schedule the function to run every Sunday just before midnight
cron.schedule('59 23 * * 0', async () => {
  console.log('Running resetAvailableSlots function...');
  await resetAvailableSlots();
}, {
  timezone: 'Africa/Casablanca' // Set the timezone to your local timezone
});
// Server port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(errorMiddleware);


