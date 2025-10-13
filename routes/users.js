const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { authMiddleware } = require('../middleware/Authenticate');


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
     #swagger.description = 'Get all users from database with pagination'
     #swagger.parameters['page'] = {
       in: 'query',
       description: 'Page number for pagination (default: 1)',
       required: false,
       type: 'integer'
     }
     #swagger.parameters['limit'] = {
       in: 'query',
       description: 'Number of items per page (default: 10)',
       required: false,
       type: 'integer'
     }
     #swagger.responses[200] = {
       description: 'List of users retrieved successfully',
       schema: {
         success: true,
         data: [{
           _id: '68e56819023f6b1125b11ad0',
           firstName: 'Adriana',
           lastName: 'Gonzales',
           email: 'adrianagoznales_@example.com',
           profileImage: 'https://static.wikia.nocookie.net/pussinbootsnetflix/images/3/3e/Perrito.webp/revision/latest?cb=20221207130123',
           role: 'user',
           oauthProvider: 'github',
           createdAt: '2025-10-07T19:20:57.932Z',
           updatedAt: '2025-10-07T19:23:03.550Z',
           __v: 0
         }],
         pagination: {
           currentPage: 1,
           totalPages: 2,
           totalUsers: 15,
           hasNextPage: true,
           hasPrevPage: false
         }
       }
     }
  */
  validatePagination, 
  getAllUsers  
  );

router.get('/:id',
  /* #swagger.tags = ['Users']
     #swagger.description = 'Get a single user by ID with complete details'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'User ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'User retrieved successfully',
       schema: {
         success: true,
         data: {
           _id: '68e56819023f6b1125b11ad0',
           firstName: 'Adriana',
           lastName: 'Gonzales',
           email: 'adrianagoznales_@example.com',
           profileImage: 'https://static.wikia.nocookie.net/pussinbootsnetflix/images/3/3e/Perrito.webp/revision/latest?cb=20221207130123',
           role: 'user',
           oauthProvider: 'github',
           createdAt: '2025-10-07T19:20:57.932Z',
           updatedAt: '2025-10-07T19:23:03.550Z',
           __v: 0
         }
       }
     }
     #swagger.responses[404] = {
       description: 'User not found',
       schema: {
         success: false,
         message: 'User not found'
       }
     }
  */
  validateObjectId, 
  getUserById  
  );

router.post('/',
   /* #swagger.tags = ['Users']
      #swagger.description = 'Create a new user'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'User information',
        required: true,
        schema: {
          firstName: 'Adriana',
          lastName: 'Gonzales',
          email: 'adrianagoznales_@example.com',
          profileImage: 'https://static.wikia.nocookie.net/pussinbootsnetflix/images/3/3e/Perrito.webp/revision/latest?cb=20221207130123',
          role: 'user',
          oauthProvider: 'github',
          oauthId: 'github123456'
        }
      }
      #swagger.responses[201] = {
        description: 'User created successfully',
        schema: {
          success: true,
          message: 'User created successfully',
          data: {
            _id: '68e56819023f6b1125b11ad0',
            firstName: 'Adriana',
            lastName: 'Gonzales',
            email: 'adrianagoznales_@example.com',
            profileImage: 'https://static.wikia.nocookie.net/pussinbootsnetflix/images/3/3e/Perrito.webp/revision/latest?cb=20221207130123',
            role: 'user',
            oauthProvider: 'github',
            createdAt: '2025-10-07T19:20:57.932Z',
            updatedAt: '2025-10-07T19:23:03.550Z',
            __v: 0
          }
        }
      }
   */
  validateObjectId,
  createUser  
  );

router.put('/:id',
    /* #swagger.tags = ['Users']
       #swagger.security = [{ BearerAuth: [] }]
       #swagger.description = 'Update a user'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'User ID',
         required: true,
         type: 'string'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'User information to update',
         required: true,
         schema: {
           firstName: 'Adriana',
           lastName: 'Gonzales',
           email: 'adrianagoznales_updated@example.com',
           profileImage: 'https://static.wikia.nocookie.net/pussinbootsnetflix/images/3/3e/Perrito.webp/revision/latest?cb=20221207130123',
           role: 'property_manager'
         }
       }
       #swagger.responses[200] = {
         description: 'User updated successfully',
         schema: {
           success: true,
           message: 'User updated successfully',
           data: {
             _id: '68e56819023f6b1125b11ad0',
             firstName: 'Adriana',
             lastName: 'Gonzales',
             email: 'adrianagoznales_updated@example.com',
             profileImage: 'https://static.wikia.nocookie.net/pussinbootsnetflix/images/3/3e/Perrito.webp/revision/latest?cb=20221207130123',
             role: 'property_manager',
             oauthProvider: 'github',
             createdAt: '2025-10-07T19:20:57.932Z',
             updatedAt: '2025-10-08T14:45:30.123Z',
             __v: 0
           }
         }
       }
       #swagger.responses[404] = {
         description: 'User not found',
         schema: {
           success: false,
           message: 'User not found'
         }
       }
    */
     validateObjectId, 
     authMiddleware,
     updateUser  
     );

router.delete('/:id',
    /* #swagger.tags = ['Users']
       #swagger.security = [{ BearerAuth: [] }]
       #swagger.description = 'Delete a user by ID'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'User ID',
         required: true,
         type: 'string'
       }
       #swagger.responses[200] = {
         description: 'User deleted successfully',
         schema: {
           success: true,
           message: 'User deleted successfully'
         }
       }
       #swagger.responses[404] = {
         description: 'User not found',
         schema: {
           success: false,
           message: 'User not found'
         }
       }
    */
    validateObjectId, 
    authMiddleware,
    deleteUser); 

module.exports = router;