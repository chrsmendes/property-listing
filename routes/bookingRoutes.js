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
     #swagger.description = 'Get all Bookings from database' */
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
     #swagger.description = 'Get a single Booking by ID' */
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
     #swagger.description = 'Create a new Booking' */
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
     #swagger.description = 'Update a Booking' */
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
     #swagger.description = 'Update a Booking' */
    validateObjectId, 
    (req, res, next) => {
      try {
        deleteBooking(req, res, next);
      } catch (err) {
        next(err);
      }
    }); 

module.exports = router;