const swaggerAutogen = require('swagger-autogen')();
//test
const doc = {
  info: {
    title: 'Property Listing',
    description: 'RESTful API for booking properties and reviews.',
    version: '1.0.0',
    contact: {
      name: 'CSE341 Team 15',
      url: 'https://github.com/chrsmendes/property-listing'
    }
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  tags: [
    {
      name: 'User',
      description: 'Operations related to users'
    },
    {
      name: 'Booking',
      description: 'Operations related to bookings'
    },
    {
      name: 'Property',
      description: 'Operations related to properties'
    },
    {
      name: 'Review',
      description: 'Operations related to reviews'
    }
  ],
  definitions: {
    User: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'oauthProvider', 'oauthId'],
      properties: {
        _id: {
          type: 'string',
          description: 'Unique identifier for the user',
          example: '60d0fe4f5311236168a109ca'
        },
        firstName: {
          type: 'string',
          description: 'User first name',
          minLength: 3,
          maxLength: 50,
          example: 'John'
        },
        lastName: {
          type: 'string',
          description: 'User last name',
          minLength: 3,
          maxLength: 50,
          example: 'Doe'
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'User email address',
          example: 'john.doe@example.com'
        },
        profileImage: {
          type: 'string',
          description: 'URL to user profile image',
          example: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },
        role: {
          type: 'string',
          enum: ['user', 'property_manager', 'admin'],
          description: 'User role',
          example: 'user'
        },
        oauthProvider: {
          type: 'string',
          enum: ['github', 'facebook'],
          description: 'OAuth provider',
          example: 'github'
        },
        oauthId: {
          type: 'string',
          description: 'OAuth provider ID',
          example: '12345678'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'User creation timestamp'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'User last update timestamp'
        }
      }
    },
    UserUpdate: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: 'User first name',
          minLength: 3,
          maxLength: 50,
          example: 'John'
        },
        lastName: {
          type: 'string',
          description: 'User last name',
          minLength: 3,
          maxLength: 50,
          example: 'Doe'
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'User email address',
          example: 'john.doe@example.com'
        },
        profileImage: {
          type: 'string',
          description: 'URL to user profile image',
          example: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },
        role: {
          type: 'string',
          enum: ['user', 'property_manager', 'admin'],
          description: 'User role',
          example: 'user'
        }
      }
    },
    Address: {
      type: 'object',
      required: ['street', 'city', 'state', 'country', 'zipCode'],
      properties: {
        street: {
          type: 'string',
          description: 'Street address',
          example: '123 Main St'
        },
        city: {
          type: 'string',
          description: 'City',
          example: 'New York'
        },
        state: {
          type: 'string',
          description: 'State or province',
          example: 'NY'
        },
        country: {
          type: 'string',
          description: 'Country',
          example: 'USA'
        },
        zipCode: {
          type: 'string',
          description: 'ZIP or postal code',
          example: '10001'
        }
      }
    },
    Rooms: {
      type: 'object',
      required: ['bedrooms', 'bathrooms'],
      properties: {
        bedrooms: {
          type: 'integer',
          minimum: 1,
          description: 'Number of bedrooms',
          example: 2
        },
        bathrooms: {
          type: 'integer',
          minimum: 1,
          description: 'Number of bathrooms',
          example: 1
        },
        livingRooms: {
          type: 'integer',
          default: 1,
          description: 'Number of living rooms',
          example: 1
        },
        kitchens: {
          type: 'integer',
          default: 1,
          description: 'Number of kitchens',
          example: 1
        }
      }
    },
    Amenities: {
      type: 'object',
      properties: {
        wifi: {
          type: 'boolean',
          default: false,
          description: 'WiFi available',
          example: true
        },
        tv: {
          type: 'boolean',
          default: false,
          description: 'TV available',
          example: true
        },
        airConditioning: {
          type: 'boolean',
          default: false,
          description: 'Air conditioning available',
          example: false
        },
        heating: {
          type: 'boolean',
          default: false,
          description: 'Heating available',
          example: true
        },
        parking: {
          type: 'boolean',
          default: false,
          description: 'Parking available',
          example: true
        },
        pool: {
          type: 'boolean',
          default: false,
          description: 'Pool available',
          example: false
        },
        kitchen: {
          type: 'boolean',
          default: true,
          description: 'Kitchen available',
          example: true
        },
        washer: {
          type: 'boolean',
          default: false,
          description: 'Washer available',
          example: false
        },
        dryer: {
          type: 'boolean',
          default: false,
          description: 'Dryer available',
          example: false
        }
      }
    },
    Rules: {
      type: 'object',
      properties: {
        smokingAllowed: {
          type: 'boolean',
          default: false,
          description: 'Smoking allowed',
          example: false
        },
        petsAllowed: {
          type: 'boolean',
          default: false,
          description: 'Pets allowed',
          example: true
        },
        partiesAllowed: {
          type: 'boolean',
          default: false,
          description: 'Parties allowed',
          example: false
        },
        checkInTime: {
          type: 'string',
          default: '15:00',
          description: 'Check-in time',
          example: '15:00'
        },
        checkOutTime: {
          type: 'string',
          default: '11:00',
          description: 'Check-out time',
          example: '11:00'
        }
      }
    },
    Property: {
      type: 'object',
      required: ['title', 'description', 'address', 'propertyType', 'size', 'rooms', 'pricePerNight', 'maxGuests', 'propertyManager'],
      properties: {
        _id: {
          type: 'string',
          description: 'Unique identifier for the property',
          example: '60d0fe4f5311236168a109ca'
        },
        title: {
          type: 'string',
          description: 'Property title',
          minLength: 5,
          maxLength: 100,
          example: 'Beautiful Downtown Apartment'
        },
        description: {
          type: 'string',
          description: 'Property description',
          minLength: 20,
          example: 'A beautiful and spacious downtown apartment with modern amenities'
        },
        address: {
          $ref: '#/definitions/Address'
        },
        propertyType: {
          type: 'string',
          enum: ['apartment', 'house', 'studio', 'villa', 'cabin'],
          description: 'Type of property',
          example: 'apartment'
        },
        size: {
          type: 'number',
          minimum: 10,
          description: 'Property size in square meters',
          example: 85
        },
        rooms: {
          $ref: '#/definitions/Rooms'
        },
        amenities: {
          $ref: '#/definitions/Amenities'
        },
        pricePerNight: {
          type: 'number',
          minimum: 10,
          description: 'Price per night in USD',
          example: 120
        },
        maxGuests: {
          type: 'integer',
          minimum: 1,
          description: 'Maximum number of guests',
          example: 4
        },
        images: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of image URLs',
          example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
        },
        rules: {
          $ref: '#/definitions/Rules'
        },
        propertyManager: {
          type: 'string',
          description: 'Property manager user ID',
          example: '60d0fe4f5311236168a109ca'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Property creation timestamp'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Property last update timestamp'
        }
      }
    },
    PropertyCreate: {
      type: 'object',
      required: ['title', 'description', 'address', 'propertyType', 'size', 'rooms', 'pricePerNight', 'maxGuests', 'propertyManager'],
      properties: {
        title: {
          type: 'string',
          description: 'Property title',
          minLength: 5,
          maxLength: 100,
          example: 'Beautiful Downtown Apartment'
        },
        description: {
          type: 'string',
          description: 'Property description',
          minLength: 20,
          example: 'A beautiful and spacious downtown apartment with modern amenities'
        },
        address: {
          $ref: '#/definitions/Address'
        },
        propertyType: {
          type: 'string',
          enum: ['apartment', 'house', 'studio', 'villa', 'cabin'],
          description: 'Type of property',
          example: 'apartment'
        },
        size: {
          type: 'number',
          minimum: 10,
          description: 'Property size in square meters',
          example: 85
        },
        rooms: {
          $ref: '#/definitions/Rooms'
        },
        amenities: {
          $ref: '#/definitions/Amenities'
        },
        pricePerNight: {
          type: 'number',
          minimum: 10,
          description: 'Price per night in USD',
          example: 120
        },
        maxGuests: {
          type: 'integer',
          minimum: 1,
          description: 'Maximum number of guests',
          example: 4
        },
        images: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of image URLs',
          example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
        },
        rules: {
          $ref: '#/definitions/Rules'
        },
        propertyManager: {
          type: 'string',
          description: 'Property manager user ID',
          example: '60d0fe4f5311236168a109ca'
        }
      }
    },
    PropertyUpdate: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Property title',
          minLength: 5,
          maxLength: 100,
          example: 'Beautiful Downtown Apartment'
        },
        description: {
          type: 'string',
          description: 'Property description',
          minLength: 20,
          example: 'A beautiful and spacious downtown apartment with modern amenities'
        },
        address: {
          $ref: '#/definitions/Address'
        },
        propertyType: {
          type: 'string',
          enum: ['apartment', 'house', 'studio', 'villa', 'cabin'],
          description: 'Type of property',
          example: 'apartment'
        },
        size: {
          type: 'number',
          minimum: 10,
          description: 'Property size in square meters',
          example: 85
        },
        rooms: {
          $ref: '#/definitions/Rooms'
        },
        amenities: {
          $ref: '#/definitions/Amenities'
        },
        pricePerNight: {
          type: 'number',
          minimum: 10,
          description: 'Price per night in USD',
          example: 120
        },
        maxGuests: {
          type: 'integer',
          minimum: 1,
          description: 'Maximum number of guests',
          example: 4
        },
        images: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of image URLs',
          example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
        },
        rules: {
          $ref: '#/definitions/Rules'
        }
      }
    },
    Booking: {
      type: 'object',
      required: ['user', 'property', 'checkIn', 'checkOut', 'totalPrice'],
      properties: {
        _id: {
          type: 'string',
          description: 'Unique identifier for the booking',
          example: '60d0fe4f5311236168a109ca'
        },
        user: {
          type: 'string',
          description: 'User ID who made the booking',
          example: '60d0fe4f5311236168a109ca'
        },
        property: {
          type: 'string',
          description: 'Property ID being booked',
          example: '60d0fe4f5311236168a109cb'
        },
        checkIn: {
          type: 'string',
          format: 'date',
          description: 'Check-in date',
          example: '2024-01-15'
        },
        checkOut: {
          type: 'string',
          format: 'date',
          description: 'Check-out date (must be after check-in)',
          example: '2024-01-20'
        },
        totalPrice: {
          type: 'number',
          minimum: 1,
          description: 'Total price for the booking',
          example: 600
        },
        status: {
          type: 'string',
          enum: ['pending', 'confirmed', 'cancelled'],
          default: 'pending',
          description: 'Booking status',
          example: 'confirmed'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Booking creation timestamp'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Booking last update timestamp'
        }
      }
    },
    BookingCreate: {
      type: 'object',
      required: ['user', 'property', 'checkIn', 'checkOut', 'totalPrice'],
      properties: {
        user: {
          type: 'string',
          description: 'User ID who made the booking',
          example: '60d0fe4f5311236168a109ca'
        },
        property: {
          type: 'string',
          description: 'Property ID being booked',
          example: '60d0fe4f5311236168a109cb'
        },
        checkIn: {
          type: 'string',
          format: 'date',
          description: 'Check-in date',
          example: '2024-01-15'
        },
        checkOut: {
          type: 'string',
          format: 'date',
          description: 'Check-out date (must be after check-in)',
          example: '2024-01-20'
        },
        totalPrice: {
          type: 'number',
          minimum: 1,
          description: 'Total price for the booking',
          example: 600
        },
        status: {
          type: 'string',
          enum: ['pending', 'confirmed', 'cancelled'],
          description: 'Booking status',
          example: 'pending'
        }
      }
    },
    BookingUpdate: {
      type: 'object',
      properties: {
        checkIn: {
          type: 'string',
          format: 'date',
          description: 'Check-in date',
          example: '2024-01-15'
        },
        checkOut: {
          type: 'string',
          format: 'date',
          description: 'Check-out date (must be after check-in)',
          example: '2024-01-20'
        },
        totalPrice: {
          type: 'number',
          minimum: 1,
          description: 'Total price for the booking',
          example: 600
        },
        status: {
          type: 'string',
          enum: ['pending', 'confirmed', 'cancelled'],
          description: 'Booking status',
          example: 'confirmed'
        }
      }
    },
    Review: {
      type: 'object',
      required: ['user', 'property', 'rating'],
      properties: {
        _id: {
          type: 'string',
          description: 'Unique identifier for the review',
          example: '60d0fe4f5311236168a109ca'
        },
        user: {
          type: 'string',
          description: 'User ID who wrote the review',
          example: '60d0fe4f5311236168a109ca'
        },
        property: {
          type: 'string',
          description: 'Property ID being reviewed',
          example: '60d0fe4f5311236168a109cb'
        },
        rating: {
          type: 'integer',
          minimum: 1,
          maximum: 5,
          description: 'Rating from 1 to 5 stars',
          example: 4
        },
        comment: {
          type: 'string',
          maxLength: 300,
          description: 'Review comment (max 300 characters)',
          example: 'Great property with excellent amenities!'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Review creation timestamp'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Review last update timestamp'
        }
      }
    },
    ReviewCreate: {
      type: 'object',
      required: ['user', 'property', 'rating'],
      properties: {
        user: {
          type: 'string',
          description: 'User ID who wrote the review',
          example: '60d0fe4f5311236168a109ca'
        },
        property: {
          type: 'string',
          description: 'Property ID being reviewed',
          example: '60d0fe4f5311236168a109cb'
        },
        rating: {
          type: 'integer',
          minimum: 1,
          maximum: 5,
          description: 'Rating from 1 to 5 stars',
          example: 4
        },
        comment: {
          type: 'string',
          maxLength: 300,
          description: 'Review comment (max 300 characters)',
          example: 'Great property with excellent amenities!'
        }
      }
    },
    ReviewUpdate: {
      type: 'object',
      properties: {
        rating: {
          type: 'integer',
          minimum: 1,
          maximum: 5,
          description: 'Rating from 1 to 5 stars',
          example: 4
        },
        comment: {
          type: 'string',
          maxLength: 300,
          description: 'Review comment (max 300 characters)',
          example: 'Great property with excellent amenities!'
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';

// Add routes for API Endpoints
const routes = ['./routes/users.js', './routes/propertyRoutes.js'];

swaggerAutogen(outputFile, routes, doc);
