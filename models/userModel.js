const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'The firstname is required'],
    trim: true,
    minlength: [3, 'The name must have at least 3 letters'], 
    maxlength: [50, 'The name must be less than 50 letters']
  },
  lastName: {
    type: String,
    required: [true, 'The lastname is required'],
    trim: true,
    minlength: [3, 'The name must have at least 3 letters'], 
    maxlength: [50, 'The name must be less than 50 letters']
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  profileImage: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', // default avatar
  },
  role: {
    type: String,
    enum: ['user', 'property_manager', 'admin'],
    default: 'user',
  },
  oauthProvider: {
    type: String,
    enum: ['github', 'facebook'],
    required: [true, 'OAuth provider is required']
  },
  oauthId: {
    type: String,
    required: [true, 'OAuth ID is required'],
    unique: true
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

