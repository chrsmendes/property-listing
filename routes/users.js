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
  validatePagination, 
  (req, res, next) => {
    try {
      getAllUsers(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.get('/:id',
  /* #swagger.tags = ['Users']
     #swagger.description = 'Get a single user by ID' */
  validateObjectId, 
  (req, res, next) => {
    try {
      getUserById(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.post('/',
   /* #swagger.tags = ['Users']
     #swagger.description = 'Create a new user' */
  (req, res, next) => {
    try {
      createUser(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.put('/:id',
    /* #swagger.tags = ['Users']
     #swagger.description = 'Update a user' */
     validateObjectId, 
     (req, res, next) => {
       try {
         updateUser(req, res, next);
       } catch (err) {
         next(err);
       }
     });

router.delete('/:id',
    /* #swagger.tags = ['Users']
     #swagger.description = 'Update a user' */
    validateObjectId, 
    (req, res, next) => {
      try {
        deleteUser(req, res, next);
      } catch (err) {
        next(err);
      }
    }); 

module.exports = router;