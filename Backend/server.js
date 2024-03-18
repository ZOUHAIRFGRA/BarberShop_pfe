const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config()
const cors = require("cors");
const errorMiddleware = require('./middlewares/errorHandler');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const barberRoutes = require("./routes/barberRoutes");
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db')
// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the origin of your frontend application
  credentials: true // Allow credentials (cookies) to be sent and received
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static('public'));

// Connect to MongoDB
connectDB();  // Call the MongoDB connection function
app.use('/',(req,res)=>{
  res.send('Server is running')
})
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

app.use(errorMiddleware);


