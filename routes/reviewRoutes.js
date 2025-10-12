const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const { 
  validateObjectId, 
  validatePagination,
  validateReviewInput
} = require('../middleware/validationMiddleware');
const { 
  getAllReviews, 
  getReviewById, 
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

// Route definitions
router.get('/',
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Get all Reviews from database' */
  validatePagination, 
  (req, res, next) => {
    try {
      getAllReviews(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.get('/:id',
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Get a single Review by ID' */
  validateObjectId, 
  (req, res, next) => {
    try {
      getReviewById(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.post('/',
   /* #swagger.tags = ['Reviews']
     #swagger.description = 'Create a new Review' */
  validateReviewInput,
  (req, res, next) => {
    try {
      createReview(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.put('/:id',
    /* #swagger.tags = ['Reviews']
     #swagger.description = 'Update a Review' */
     validateObjectId,
     validateReviewInput, 
     (req, res, next) => {
       try {
         updateReview(req, res, next);
       } catch (err) {
         next(err);
       }
     });

router.delete('/:id',
    /* #swagger.tags = ['Reviews']
     #swagger.description = 'Update a Review' */
    validateObjectId, 
    (req, res, next) => {
      try {
        deleteReview(req, res, next);
      } catch (err) {
        next(err);
      }
    }); 

module.exports = router;