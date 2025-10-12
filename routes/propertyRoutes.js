const express = require('express');
const router = express.Router();
const propertyModel = require('../models/userModel');
const propertyRoute = {}
const { 
  validateObjectId, 
  validatePagination 
} = require('../middleware/validationMiddleware');

const property = require('../controllers/propertyController')

// Route definitions
router.get('/',
  /* #swagger.tags = ['Properties']
     #swagger.description = 'Get all properties from database' */
  validatePagination, 
  (req, res, next) => {
    try {
      property.getAllProperties(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.get('/:id',
  /* #swagger.tags = ['Properties']
     #swagger.description = 'Get a single property by ID' */
  validateObjectId, 
  (req, res, next) => {
    try {
      property.getPropertyById(req, res, next);
    } catch (err) {
      next(err);
    }
  });

router.post('/',
   /* #swagger.tags = ['Properties']
    #swagger.description = 'Create a new property' */
    (req, res, next) => {
      try {
        property.createProperty(req, res, next);
      } catch (err) {
        next(err);
      }
    });

router.delete('/:id', 
    /* #swagger.tags = ['Properties']
    #swagger.description = 'Delete a property' */
    validateObjectId, 
    (req, res, next) => {
      try {
        property.deleteProperty(req, res, next);
      } catch (err) {
        next(err);
      }
    })

router.put('/:id', 
    /* #swagger.tags = ['Properties']
    #swagger.description = 'Update a property' */
    validateObjectId, 
    (req, res, next) => {
      try {
        property.putProperty(req, res, next);
      } catch (err) {
        next(err);
      }
    })

module.exports = router