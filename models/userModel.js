const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:  [true, 'The firstname is required'],
    trim: true,
    minlength: [3, 'The name must have at least 3 letters'], 
    maxlength: [50, 'The name must be less than 50 letters']
  },
  lastName: {
    type: String,
    required:  [true, 'The lastname is required'],
    trim: true,
    minlength: [3, 'The name must have at least 3 letters'], 
    maxlength: [50, 'The name must be less than 50 letters']
  },
  email: {
    type: String,
    required:  [true, 'The email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      maxlength: [128, 'Password must be less than 128 characters'],
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
    isActive: {
      type: Boolean,
      default: true,
    },
}, { timestamps: true } )

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
