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
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  phoneNumber: {
    type: String,
    required: false,
    unique : false
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
