const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const { 
  validateObjectId, 
  validatePagination ,
  validateBookingDates
} = require('../middleware/validationMiddleware');
const { 
  getAllBookings, 
  getBookingById, 
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

// Route definitions
router.get('/',
  /* #swagger.tags = ['Bookings']
     #swagger.description = 'Get all Bookings from database with pagination'
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
       description: 'List of bookings retrieved successfully',
       schema: {
         success: true,
         data: [{
           _id: '68e94c411ac3ddb459fa3c11',
           user: '68e56819023f6b1125b11ad0',
           property: '68e56819023f6b1125b11ad0',
           checkIn: '2025-10-15T06:00:00.000Z',
           checkOut: '2025-10-17T06:00:00.000Z',
           totalPrice: 200,
           status: 'pending',
           createdAt: '2025-10-10T18:11:13.974Z',
           updatedAt: '2025-10-10T18:11:13.974Z',
           __v: 0
         }],
         pagination: {
           currentPage: 1,
           totalPages: 4,
           totalBookings: 35,
           hasNextPage: true,
           hasPrevPage: false
         }
       }
     }
  */
  validatePagination, 
  (req, res, next) => {
    try {
      getAllBookings(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.get('/:id',
  /* #swagger.tags = ['Bookings']
     #swagger.description = 'Get a single Booking by ID with complete details'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Booking ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Booking retrieved successfully',
       schema: {
         success: true,
         data: {
           _id: '68e94c411ac3ddb459fa3c11',
           user: '68e56819023f6b1125b11ad0',
           property: '68e56819023f6b1125b11ad0',
           checkIn: '2025-10-15T06:00:00.000Z',
           checkOut: '2025-10-17T06:00:00.000Z',
           totalPrice: 200,
           status: 'pending',
           createdAt: '2025-10-10T18:11:13.974Z',
           updatedAt: '2025-10-10T18:11:13.974Z',
           __v: 0
         }
       }
     }
     #swagger.responses[404] = {
       description: 'Booking not found',
       schema: {
         success: false,
         message: 'Booking not found'
       }
     }
  */
  validateObjectId, 
  (req, res, next) => {
    try {
      getBookingById(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.post('/',
   /* #swagger.tags = ['Bookings']
      #swagger.description = 'Create a new Booking'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Booking information',
        required: true,
        schema: {
          user: '68e56819023f6b1125b11ad0',
          property: '68e56819023f6b1125b11ad0',
          checkIn: '2025-10-15T06:00:00.000Z',
          checkOut: '2025-10-17T06:00:00.000Z',
          totalPrice: 200,
          status: 'pending'
        }
      }
      #swagger.responses[201] = {
        description: 'Booking created successfully',
        schema: {
          success: true,
          message: 'Booking created successfully',
          data: {
            _id: '68e94c411ac3ddb459fa3c11',
            user: '68e56819023f6b1125b11ad0',
            property: '68e56819023f6b1125b11ad0',
            checkIn: '2025-10-15T06:00:00.000Z',
            checkOut: '2025-10-17T06:00:00.000Z',
            totalPrice: 200,
            status: 'pending',
            createdAt: '2025-10-10T18:11:13.974Z',
            updatedAt: '2025-10-10T18:11:13.974Z',
            __v: 0
          }
        }
      }
   */
  validateBookingDates,
  (req, res, next) => {
    try {
      createBooking(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.put('/:id',
    /* #swagger.tags = ['Bookings']
       #swagger.description = 'Update a Booking'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'Booking ID',
         required: true,
         type: 'string'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Booking information to update',
         required: true,
         schema: {
           user: '68e56819023f6b1125b11ad0',
           property: '68e56819023f6b1125b11ad0',
           checkIn: '2025-10-16T06:00:00.000Z',
           checkOut: '2025-10-18T06:00:00.000Z',
           totalPrice: 250,
           status: 'confirmed'
         }
       }
       #swagger.responses[200] = {
         description: 'Booking updated successfully',
         schema: {
           success: true,
           message: 'Booking updated successfully',
           data: {
             _id: '68e94c411ac3ddb459fa3c11',
             user: '68e56819023f6b1125b11ad0',
             property: '68e56819023f6b1125b11ad0',
             checkIn: '2025-10-16T06:00:00.000Z',
             checkOut: '2025-10-18T06:00:00.000Z',
             totalPrice: 250,
             status: 'confirmed',
             createdAt: '2025-10-10T18:11:13.974Z',
             updatedAt: '2025-10-11T10:30:45.123Z',
             __v: 0
           }
         }
       }
       #swagger.responses[404] = {
         description: 'Booking not found',
         schema: {
           success: false,
           message: 'Booking not found'
         }
       }
    */
     validateObjectId, 
     validateBookingDates,
     (req, res, next) => {
       try {
         updateBooking(req, res, next);
       } catch (err) {
         next(err);
       }
     });

router.delete('/:id',
    /* #swagger.tags = ['Bookings']
       #swagger.description = 'Delete a Booking by ID'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'Booking ID',
         required: true,
         type: 'string'
       }
       #swagger.responses[200] = {
         description: 'Booking deleted successfully',
         schema: {
           success: true,
           message: 'Booking deleted successfully'
         }
       }
       #swagger.responses[404] = {
         description: 'Booking not found',
         schema: {
           success: false,
           message: 'Booking not found'
         }
       }
    */
    validateObjectId, 
    (req, res, next) => {
      try {
        deleteBooking(req, res, next);
      } catch (err) {
        next(err);
      }
    }); 

module.exports = router;