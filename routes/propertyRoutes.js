const express = require('express');
const router = express.Router();

const { 
  validateObjectId, 
  validatePagination 
} = require('../middleware/validationMiddleware');

const property = require('../controllers/propertyController')

// Route definitions
router.get('/',
  /* #swagger.tags = ['Properties']
     #swagger.description = 'Get all properties from database' */
  validatePagination, property.getAllProperties);

router.get('/:id',
  /* #swagger.tags = ['Properties']
     #swagger.description = 'Get a single property by ID' */
  validateObjectId, property.getPropertyById);

router.post('/',
   /* #swagger.tags = ['Properties']
    #swagger.description = 'Create a new property' */
    property.createProperty);

router.delete('/:id', 
    /* #swagger.tags = ['Properties']
    #swagger.description = 'Delete a property' */
    validateObjectId, property.deleteProperty)

router.put('/:id', 
    /* #swagger.tags = ['Properties']
    #swagger.description = 'Update a property' */
    validateObjectId, property.putProperty)

module.exports = router