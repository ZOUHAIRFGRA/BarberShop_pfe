const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
   
  },
  lastName: {
    type: String,
    required: false,
   
  },
  CIN: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    unique: true,
  },
  address: {
    type: String,
    required: false,
    
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
