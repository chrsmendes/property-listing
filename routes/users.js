const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { asyncHandler } = require('../middleware/errorMiddleware');
const { 
  validateObjectId, 
  validatePagination 
} = require('../middleware/validationMiddleware');

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

// Route definitions
router.get('/', validatePagination, getAllUsers);
router.get('/:id', validateObjectId, getUserById);
router.post('/', createUser);

module.exports = router;