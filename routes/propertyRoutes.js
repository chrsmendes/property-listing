const express = require('express');
const router = express.Router();
const propertyModel = require('../models/userModel');
const propertyRoute = {}
const { 
  validateObjectId, 
  validatePagination 
} = require('../middleware/validationMiddleware');

const property = require('../controllers/propertyController');
const {isAuthenticated, authMiddleware} = require('../middleware/Authenticate');

// Route definitions
router.get('/',
  /* #swagger.tags = ['Properties']
     #swagger.description = 'Get all properties from database with pagination'
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
       description: 'List of properties retrieved successfully',
       schema: {
         success: true,
         data: [{
           _id: '68e8650a9ed715d5d9994bb7',
           title: 'Monolocale Romantico a Verona',
           description: 'Accogliente monolocale perfetto per coppie, a pochi passi dall\'Arena di Verona.',
           address: {
             street: 'Via Roma 77',
             city: 'Verona',
             state: 'Veneto',
             country: 'Italy',
             zipCode: '37121'
           },
           propertyType: 'studio',
           size: 45,
           rooms: {
             bedrooms: 1,
             bathrooms: 1,
             livingRooms: 1,
             kitchens: 1
           },
           amenities: {
             wifi: true,
             tv: true,
             airConditioning: false,
             heating: true,
             parking: true,
             pool: false,
             kitchen: true,
             washer: false,
             dryer: false
           },
           pricePerNight: 75,
           maxGuests: 2,
           images: [],
           rules: {
             smokingAllowed: false,
             petsAllowed: true,
             partiesAllowed: false,
             checkInTime: '15:00',
             checkOutTime: '11:00'
           },
           propertyManager: '652a9a2b4f3c2234b91a12fb',
           createdAt: '2025-10-10T01:44:42.339Z',
           updatedAt: '2025-10-10T01:44:42.339Z',
           __v: 0
         }],
         pagination: {
           currentPage: 1,
           totalPages: 5,
           totalProperties: 50,
           hasNextPage: true,
           hasPrevPage: false
         }
       }
     }
  */
  validatePagination, 
  property.getAllProperties);

router.get('/:id',
  /* #swagger.tags = ['Properties']
     #swagger.description = 'Get a single property by ID with complete details'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Property ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Property retrieved successfully',
       schema: {
         success: true,
         data: {
           _id: '68e8650a9ed715d5d9994bb7',
           title: 'Monolocale Romantico a Verona',
           description: 'Accogliente monolocale perfetto per coppie, a pochi passi dall\'Arena di Verona.',
           address: {
             street: 'Via Roma 77',
             city: 'Verona',
             state: 'Veneto',
             country: 'Italy',
             zipCode: '37121'
           },
           propertyType: 'studio',
           size: 45,
           rooms: {
             bedrooms: 1,
             bathrooms: 1,
             livingRooms: 1,
             kitchens: 1
           },
           amenities: {
             wifi: true,
             tv: true,
             airConditioning: false,
             heating: true,
             parking: true,
             pool: false,
             kitchen: true,
             washer: false,
             dryer: false
           },
           pricePerNight: 75,
           maxGuests: 2,
           images: [],
           rules: {
             smokingAllowed: false,
             petsAllowed: true,
             partiesAllowed: false,
             checkInTime: '15:00',
             checkOutTime: '11:00'
           },
           propertyManager: '652a9a2b4f3c2234b91a12fb',
           createdAt: '2025-10-10T01:44:42.339Z',
           updatedAt: '2025-10-10T01:44:42.339Z',
           __v: 0
         }
       }
     }
     #swagger.responses[404] = {
       description: 'Property not found',
       schema: {
         success: false,
         message: 'property not found'
       }
     }
  */
  validateObjectId, 
  property.getPropertyById
    );

router.post('/',
   /* #swagger.tags = ['Properties']
      #swagger.description = 'Create a new property with complete details'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Property information',
        required: true,
        schema: {
          title: 'Monolocale Romantico a Verona',
          description: 'Accogliente monolocale perfetto per coppie, a pochi passi dall\'Arena di Verona.',
          address: {
            street: 'Via Roma 77',
            city: 'Verona',
            state: 'Veneto',
            country: 'Italy',
            zipCode: '37121'
          },
          propertyType: 'studio',
          size: 45,
          rooms: {
            bedrooms: 1,
            bathrooms: 1,
            livingRooms: 1,
            kitchens: 1
          },
          amenities: {
            wifi: true,
            tv: true,
            airConditioning: false,
            heating: true,
            parking: true,
            pool: false,
            kitchen: true,
            washer: false,
            dryer: false
          },
          pricePerNight: 75,
          maxGuests: 2,
          images: [],
          rules: {
            smokingAllowed: false,
            petsAllowed: true,
            partiesAllowed: false,
            checkInTime: '15:00',
            checkOutTime: '11:00'
          },
          propertyManager: '652a9a2b4f3c2234b91a12fb'
        }
      }
      #swagger.responses[201] = {
        description: 'Property created successfully',
        schema: {
          success: true,
          message: 'Property created successfully',
          data: {
            _id: '68e8650a9ed715d5d9994bb7',
            title: 'Monolocale Romantico a Verona',
            description: 'Accogliente monolocale perfetto per coppie, a pochi passi dall\'Arena di Verona.',
            address: {
              street: 'Via Roma 77',
              city: 'Verona',
              state: 'Veneto',
              country: 'Italy',
              zipCode: '37121'
            },
            propertyType: 'studio',
            size: 45,
            rooms: {
              bedrooms: 1,
              bathrooms: 1,
              livingRooms: 1,
              kitchens: 1
            },
            amenities: {
              wifi: true,
              tv: true,
              airConditioning: false,
              heating: true,
              parking: true,
              pool: false,
              kitchen: true,
              washer: false,
              dryer: false
            },
            pricePerNight: 75,
            maxGuests: 2,
            images: [],
            rules: {
              smokingAllowed: false,
              petsAllowed: true,
              partiesAllowed: false,
              checkInTime: '15:00',
              checkOutTime: '11:00'
            },
            propertyManager: '652a9a2b4f3c2234b91a12fb',
            createdAt: '2025-10-10T01:44:42.339Z',
            updatedAt: '2025-10-10T01:44:42.339Z',
            __v: 0
          }
        }
      }
   */
    isAuthenticated,
    property.createProperty);

router.delete('/:id', 
    /* #swagger.tags = ['Properties']
       #swagger.security = [{ BearerAuth: [] }]
       #swagger.description = 'Delete a property by ID'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'Property ID',
         required: true,
         type: 'string'
       }
       #swagger.responses[200] = {
         description: 'Property deleted successfully',
         schema: {
           success: true,
           message: 'Property has been deleted'
         }
       }
       #swagger.responses[404] = {
         description: 'Property not found',
         schema: {
           success: false,
           message: 'Property not found'
         }
       }
    */
    validateObjectId, 
    authMiddleware,
    property.deleteProperty)

router.put('/:id', 
    /* #swagger.tags = ['Properties']
       #swagger.security = [{ BearerAuth: [] }]
       #swagger.description = 'Update a property with complete details'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'Property ID',
         required: true,
         type: 'string'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Property information to update',
         required: true,
         schema: {
           title: 'Monolocale Romantico a Verona',
           description: 'Accogliente monolocale perfetto per coppie, a pochi passi dall\'Arena di Verona.',
           address: {
             street: 'Via Roma 77',
             city: 'Verona',
             state: 'Veneto',
             country: 'Italy',
             zipCode: '37121'
           },
           propertyType: 'studio',
           size: 45,
           rooms: {
             bedrooms: 1,
             bathrooms: 1,
             livingRooms: 1,
             kitchens: 1
           },
           amenities: {
             wifi: true,
             tv: true,
             airConditioning: false,
             heating: true,
             parking: true,
             pool: false,
             kitchen: true,
             washer: false,
             dryer: false
           },
           pricePerNight: 75,
           maxGuests: 2,
           images: [],
           rules: {
             smokingAllowed: false,
             petsAllowed: true,
             partiesAllowed: false,
             checkInTime: '15:00',
             checkOutTime: '11:00'
           },
           propertyManager: '652a9a2b4f3c2234b91a12fb'
         }
       }
       #swagger.responses[200] = {
         description: 'Property updated successfully',
         schema: {
           success: true,
           message: 'Property has been updated successfully',
           property: {
             _id: '68e8650a9ed715d5d9994bb7',
             title: 'Monolocale Romantico a Verona',
             description: 'Accogliente monolocale perfetto per coppie, a pochi passi dall\'Arena di Verona.',
             address: {
               street: 'Via Roma 77',
               city: 'Verona',
               state: 'Veneto',
               country: 'Italy',
               zipCode: '37121'
             },
             propertyType: 'studio',
             size: 45,
             rooms: {
               bedrooms: 1,
               bathrooms: 1,
               livingRooms: 1,
               kitchens: 1
             },
             amenities: {
               wifi: true,
               tv: true,
               airConditioning: false,
               heating: true,
               parking: true,
               pool: false,
               kitchen: true,
               washer: false,
               dryer: false
             },
             pricePerNight: 75,
             maxGuests: 2,
             images: [],
             rules: {
               smokingAllowed: false,
               petsAllowed: true,
               partiesAllowed: false,
               checkInTime: '15:00',
               checkOutTime: '11:00'
             },
             propertyManager: '652a9a2b4f3c2234b91a12fb',
             createdAt: '2025-10-10T01:44:42.339Z',
             updatedAt: '2025-10-10T01:44:42.339Z',
             __v: 0
           }
         }
       }
       #swagger.responses[404] = {
         description: 'Property not found',
         schema: {
           success: false,
           message: 'Property not found'
         }
       }
    */
    validateObjectId, 
    authMiddleware,
    property.putProperty)

module.exports = router