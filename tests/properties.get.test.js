const {
  createModelMock: mockCreateModel,
  createQueryChain,
  createFindByIdChain,
  createRequest,
  createResponse,
} = require('./utils/testUtils');

jest.mock('../models/propertyModel', () => mockCreateModel());

const { getAllProperties, getPropertyById } = require('../controllers/propertyController');
const Property = require('../models/propertyModel');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Properties GET endpoints', () => {
  it('returns a paginated list of properties', async () => {
    const properties = [{ id: 'p1' }];
    Property.find.mockImplementation(() => createQueryChain(properties));
    Property.countDocuments.mockResolvedValue(properties.length);

    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    await getAllProperties(req, res, next);

    expect(Property.find).toHaveBeenCalledTimes(1);
    expect(Property.countDocuments).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: GET /properties response structure verification
    // This ensures compatibility - any change here requires version bump
    const response = res.json.mock.calls[0][0];
    
    // Verify top-level response structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(typeof response.success).toBe('boolean');
    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    
    // Verify pagination object structure and types
    expect(response.pagination).toHaveProperty('currentPage');
    expect(response.pagination).toHaveProperty('totalPages');
    expect(response.pagination).toHaveProperty('totalProperties');
    expect(response.pagination).toHaveProperty('hasNextPage');
    expect(response.pagination).toHaveProperty('hasPrevPage');
    expect(typeof response.pagination.currentPage).toBe('number');
    expect(typeof response.pagination.totalPages).toBe('number');
    expect(typeof response.pagination.totalProperties).toBe('number');
    expect(typeof response.pagination.hasNextPage).toBe('boolean');
    expect(typeof response.pagination.hasPrevPage).toBe('boolean');
    
    // Verify exact pagination values
    expect(response.pagination.currentPage).toBe(1);
    expect(response.pagination.totalPages).toBe(1);
    expect(response.pagination.totalProperties).toBe(1);
    expect(response.pagination.hasNextPage).toBe(false);
    expect(response.pagination.hasPrevPage).toBe(false);
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 404 when property is not found by id', async () => {
    Property.findById.mockImplementation(() => createFindByIdChain(null));

    const req = createRequest({ params: { id: 'missing' } });
    const res = createResponse();
    const next = jest.fn();

    await getPropertyById(req, res, next);

    expect(Property.findById).toHaveBeenCalledWith('missing');
    expect(res.status).toHaveBeenCalledWith(404);
    
    // API Contract: GET /properties/:id 404 error response structure
    // Any change in error response format requires version consideration
    const response = res.json.mock.calls[0][0];
    
    // Verify error response structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('message');
    expect(typeof response.success).toBe('boolean');
    expect(typeof response.message).toBe('string');
    expect(response.success).toBe(false);
    expect(response.message).toBe('property not found');
    
    // Ensure no extra fields in error response
    expect(Object.keys(response).sort()).toEqual(['message', 'success'].sort());
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns a property by id when found', async () => {
    const property = { 
      _id: 'prop123', 
      title: 'Beach House',
      description: 'Beautiful beach house with ocean view and modern amenities',
      address: {
        street: '123 Ocean Drive',
        city: 'Miami Beach',
        state: 'Florida',
        country: 'USA',
        zipCode: '33139'
      },
      propertyType: 'house',
      size: 120,
      rooms: {
        bedrooms: 3,
        bathrooms: 2,
        livingRooms: 1,
        kitchens: 1
      },
      amenities: {
        wifi: true,
        tv: true,
        airConditioning: true,
        heating: false,
        parking: true,
        pool: true,
        kitchen: true,
        washer: true,
        dryer: true
      },
      pricePerNight: 150,
      maxGuests: 6,
      images: [],
      rules: {
        smokingAllowed: false,
        petsAllowed: false,
        partiesAllowed: false,
        checkInTime: '15:00',
        checkOutTime: '11:00'
      },
      propertyManager: '652a9a2b4f3c2234b91a12fb',
      createdAt: '2025-10-10T01:44:42.339Z',
      updatedAt: '2025-10-10T01:44:42.339Z',
      __v: 0
    };
    Property.findById.mockImplementation(() => createFindByIdChain(property));

    const req = createRequest({ params: { id: 'prop123' } });
    const res = createResponse();
    const next = jest.fn();

    await getPropertyById(req, res, next);

    expect(Property.findById).toHaveBeenCalledWith('prop123');
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: GET /properties/:id success response structure
    // Validates COMPLETE property response schema for compatibility testing
    const response = res.json.mock.calls[0][0];
    
    // Verify top-level structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(typeof response.success).toBe('boolean');
    expect(response.success).toBe(true);
    
    // Verify all required property fields exist
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('description');
    expect(response.data).toHaveProperty('address');
    expect(response.data).toHaveProperty('propertyType');
    expect(response.data).toHaveProperty('size');
    expect(response.data).toHaveProperty('rooms');
    expect(response.data).toHaveProperty('amenities');
    expect(response.data).toHaveProperty('pricePerNight');
    expect(response.data).toHaveProperty('maxGuests');
    expect(response.data).toHaveProperty('images');
    expect(response.data).toHaveProperty('rules');
    expect(response.data).toHaveProperty('propertyManager');
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data).toHaveProperty('updatedAt');
    expect(response.data).toHaveProperty('__v');
    
    // Verify basic field types
    expect(typeof response.data._id).toBe('string');
    expect(typeof response.data.title).toBe('string');
    expect(typeof response.data.description).toBe('string');
    expect(typeof response.data.propertyType).toBe('string');
    expect(typeof response.data.size).toBe('number');
    expect(typeof response.data.pricePerNight).toBe('number');
    expect(typeof response.data.maxGuests).toBe('number');
    expect(typeof response.data.propertyManager).toBe('string');
    expect(typeof response.data.createdAt).toBe('string');
    expect(typeof response.data.updatedAt).toBe('string');
    expect(typeof response.data.__v).toBe('number');
    expect(Array.isArray(response.data.images)).toBe(true);
    
    // Verify address nested object structure and types
    expect(typeof response.data.address).toBe('object');
    expect(response.data.address).toHaveProperty('street');
    expect(response.data.address).toHaveProperty('city');
    expect(response.data.address).toHaveProperty('state');
    expect(response.data.address).toHaveProperty('country');
    expect(response.data.address).toHaveProperty('zipCode');
    expect(typeof response.data.address.street).toBe('string');
    expect(typeof response.data.address.city).toBe('string');
    expect(typeof response.data.address.state).toBe('string');
    expect(typeof response.data.address.country).toBe('string');
    expect(typeof response.data.address.zipCode).toBe('string');
    
    // Verify rooms nested object structure and types
    expect(typeof response.data.rooms).toBe('object');
    expect(response.data.rooms).toHaveProperty('bedrooms');
    expect(response.data.rooms).toHaveProperty('bathrooms');
    expect(response.data.rooms).toHaveProperty('livingRooms');
    expect(response.data.rooms).toHaveProperty('kitchens');
    expect(typeof response.data.rooms.bedrooms).toBe('number');
    expect(typeof response.data.rooms.bathrooms).toBe('number');
    expect(typeof response.data.rooms.livingRooms).toBe('number');
    expect(typeof response.data.rooms.kitchens).toBe('number');
    
    // Verify amenities nested object structure and types (all boolean)
    expect(typeof response.data.amenities).toBe('object');
    expect(response.data.amenities).toHaveProperty('wifi');
    expect(response.data.amenities).toHaveProperty('tv');
    expect(response.data.amenities).toHaveProperty('airConditioning');
    expect(response.data.amenities).toHaveProperty('heating');
    expect(response.data.amenities).toHaveProperty('parking');
    expect(response.data.amenities).toHaveProperty('pool');
    expect(response.data.amenities).toHaveProperty('kitchen');
    expect(response.data.amenities).toHaveProperty('washer');
    expect(response.data.amenities).toHaveProperty('dryer');
    expect(typeof response.data.amenities.wifi).toBe('boolean');
    expect(typeof response.data.amenities.tv).toBe('boolean');
    expect(typeof response.data.amenities.airConditioning).toBe('boolean');
    expect(typeof response.data.amenities.heating).toBe('boolean');
    expect(typeof response.data.amenities.parking).toBe('boolean');
    expect(typeof response.data.amenities.pool).toBe('boolean');
    expect(typeof response.data.amenities.kitchen).toBe('boolean');
    expect(typeof response.data.amenities.washer).toBe('boolean');
    expect(typeof response.data.amenities.dryer).toBe('boolean');
    
    // Verify rules nested object structure and types
    expect(typeof response.data.rules).toBe('object');
    expect(response.data.rules).toHaveProperty('smokingAllowed');
    expect(response.data.rules).toHaveProperty('petsAllowed');
    expect(response.data.rules).toHaveProperty('partiesAllowed');
    expect(response.data.rules).toHaveProperty('checkInTime');
    expect(response.data.rules).toHaveProperty('checkOutTime');
    expect(typeof response.data.rules.smokingAllowed).toBe('boolean');
    expect(typeof response.data.rules.petsAllowed).toBe('boolean');
    expect(typeof response.data.rules.partiesAllowed).toBe('boolean');
    expect(typeof response.data.rules.checkInTime).toBe('string');
    expect(typeof response.data.rules.checkOutTime).toBe('string');
    
    // Verify propertyType enum value
    expect(['apartment', 'house', 'studio', 'villa', 'cabin']).toContain(response.data.propertyType);
    
    // Verify exact values match
    expect(response.data).toEqual(property);
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns empty array when no properties exist', async () => {
    Property.find.mockImplementation(() => createQueryChain([]));
    Property.countDocuments.mockResolvedValue(0);

    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    await getAllProperties(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: Empty result set response structure
    // Ensures consistent response format even with no data
    const response = res.json.mock.calls[0][0];
    
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data).toEqual([]);
    expect(response.data.length).toBe(0);
    
    // Pagination for empty result set
    expect(response.pagination.currentPage).toBe(1);
    expect(response.pagination.totalPages).toBe(0);
    expect(response.pagination.totalProperties).toBe(0);
    expect(response.pagination.hasNextPage).toBe(false);
    expect(response.pagination.hasPrevPage).toBe(false);
  });
});
