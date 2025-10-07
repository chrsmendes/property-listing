const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { 
  validateObjectId, 
  validatePagination 
} = require('../middleware/validationMiddleware');
const { 
  getAllUsers, 
  getUserById, 
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/UserCtrl');

// Route definitions
router.get('/',
  /* #swagger.tags = ['Users']
     #swagger.description = 'Get all users from database' */
  validatePagination, getAllUsers);

router.get('/:id',
  /* #swagger.tags = ['Users']
     #swagger.description = 'Get a single user by ID' */
  validateObjectId, getUserById);

router.post('/',
   /* #swagger.tags = ['Users']
     #swagger.description = 'Create a new user' */
  createUser);

router.put('/:id',
    /* #swagger.tags = ['Users']
     #swagger.description = 'Update a user' */
     validateObjectId, updateUser);

router.delete('/:id',
    /* #swagger.tags = ['Users']
     #swagger.description = 'Update a user' */
    validateObjectId, deleteUser); 

module.exports = router;