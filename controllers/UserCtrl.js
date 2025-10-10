const express = require('express');
const User = require('../models/userModel');
const { asyncHandler } = require('../middleware/errorMiddleware');

const router = express.Router();

const getAllUsers = asyncHandler(async (req, res) => {
  const { page, limit } = req.pagination;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select('-oauthId') // Exclude sensitive OAuth ID
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / limit);

  res.status(200).json({
    success: true,
    data: users,
    pagination: {
      currentPage: page,
      totalPages,
      totalUsers,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .select('-oauthId'); // Exclude sensitive OAuth ID

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// {
//   "firstName": "Christopher",
//   "lastName": "Mendes",
//   "email": "christopher@mendes.com",
//   "oauthProvider": "github",
//   "oauthId": "github123456789",
//   "profileImage": "https://avatars.githubusercontent.com/u/77082167",
//   "role": "user"
// }
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, profileImage, role, oauthProvider, oauthId } = req.body;

  // Check if user already exists by email
  const existingUserByEmail = await User.findOne({ email: email.toLowerCase() });
  if (existingUserByEmail) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Check if user already exists by OAuth ID
  const existingUserByOAuth = await User.findOne({ oauthId });
  if (existingUserByOAuth) {
    return res.status(409).json({
      success: false,
      message: 'User with this OAuth account already exists'
    });
  }

    if (!firstName || !lastName || !email) {
    return res.status(400).json({
      success: false,
      message: 'firstName, lastName, and email are required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }


  const user = new User({
    firstName,
    lastName,
    email,
    oauthProvider,
    oauthId,
    ...(profileImage && { profileImage }),
    ...(role && { role })
  });

  const savedUser = await user.save();

  // Remove sensitive OAuth ID from response
  const userResponse = savedUser.toObject();
  delete userResponse.oauthId;

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: userResponse
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, profileImage, role } = req.body;
  const { id } = req.params;
 
  // Find the user by their ID
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
 
  // Only update the provided fields
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email.toLowerCase();
  if (profileImage) user.profileImage = profileImage;
  if (role) user.role = role;
 
  const updatedUser = await user.save();
 
  const userResponse = updatedUser.toObject();
  delete userResponse.oauthId;
 
  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: userResponse
  });
});
 
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
 
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
 
  await User.findByIdAndDelete(id);
 
  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
}); 
 


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser

};