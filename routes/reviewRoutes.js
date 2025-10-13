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
     #swagger.description = 'Get all Reviews from database with pagination'
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
       description: 'List of reviews retrieved successfully',
       schema: {
         success: true,
         data: [{
           _id: '68eb070a567cf5904b729ea6',
           user: '652a9a2b4f3c2234b91a12e8',
           property: '68e578aa6b7220cb02d85adc',
           rating: 5,
           comment: 'Excellent property! Highly recommended.',
           createdAt: '2025-10-12T01:40:26.749Z',
           updatedAt: '2025-10-12T01:40:26.749Z',
           __v: 0
         }],
         pagination: {
           currentPage: 1,
           totalPages: 3,
           totalReviews: 25,
           hasNextPage: true,
           hasPrevPage: false
         }
       }
     }
  */
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
     #swagger.description = 'Get a single Review by ID with complete details'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Review ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Review retrieved successfully',
       schema: {
         success: true,
         data: {
           _id: '68eb070a567cf5904b729ea6',
           user: '652a9a2b4f3c2234b91a12e8',
           property: '68e578aa6b7220cb02d85adc',
           rating: 5,
           comment: 'Excellent property! Highly recommended.',
           createdAt: '2025-10-12T01:40:26.749Z',
           updatedAt: '2025-10-12T01:40:26.749Z',
           __v: 0
         }
       }
     }
     #swagger.responses[404] = {
       description: 'Review not found',
       schema: {
         success: false,
         message: 'review not found'
       }
     }
  */
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
      #swagger.description = 'Create a new Review'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Review information',
        required: true,
        schema: {
          user: '652a9a2b4f3c2234b91a12e8',
          property: '68e578aa6b7220cb02d85adc',
          rating: 5,
          comment: 'Excellent property! Highly recommended.'
        }
      }
      #swagger.responses[201] = {
        description: 'Review created successfully',
        schema: {
          success: true,
          message: 'Review created successfully',
          data: {
            _id: '68eb070a567cf5904b729ea6',
            user: '652a9a2b4f3c2234b91a12e8',
            property: '68e578aa6b7220cb02d85adc',
            rating: 5,
            comment: 'Excellent property! Highly recommended.',
            createdAt: '2025-10-12T01:40:26.749Z',
            updatedAt: '2025-10-12T01:40:26.749Z',
            __v: 0
          }
        }
      }
   */
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
       #swagger.description = 'Update a Review'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'Review ID',
         required: true,
         type: 'string'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Review information to update',
         required: true,
         schema: {
           user: '652a9a2b4f3c2234b91a12e8',
           property: '68e578aa6b7220cb02d85adc',
           rating: 4,
           comment: 'Good property, would recommend.'
         }
       }
       #swagger.responses[200] = {
         description: 'Review updated successfully',
         schema: {
           success: true,
           message: 'Review updated successfully',
           data: {
             _id: '68eb070a567cf5904b729ea6',
             user: '652a9a2b4f3c2234b91a12e8',
             property: '68e578aa6b7220cb02d85adc',
             rating: 4,
             comment: 'Good property, would recommend.',
             createdAt: '2025-10-12T01:40:26.749Z',
             updatedAt: '2025-10-12T02:15:30.123Z',
             __v: 0
           }
         }
       }
       #swagger.responses[404] = {
         description: 'Review not found',
         schema: {
           success: false,
           message: 'Review not found'
         }
       }
    */
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
       #swagger.description = 'Delete a Review by ID'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'Review ID',
         required: true,
         type: 'string'
       }
       #swagger.responses[200] = {
         description: 'Review deleted successfully',
         schema: {
           success: true,
           message: 'Review deleted successfully'
         }
       }
       #swagger.responses[404] = {
         description: 'Review not found',
         schema: {
           success: false,
           message: 'Review not found'
         }
       }
    */
    validateObjectId, 
    (req, res, next) => {
      try {
        deleteReview(req, res, next);
      } catch (err) {
        next(err);
      }
    }); 

module.exports = router;