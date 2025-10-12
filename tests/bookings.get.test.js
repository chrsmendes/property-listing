const {
  createModelMock: mockCreateModel,
  createQueryChain,
  createFindByIdChain,
  createRequest,
  createResponse,
} = require('./utils/testUtils');

jest.mock('../models/bookingModel', () => mockCreateModel());

const { getAllBookings, getBookingById } = require('../controllers/bookingController');
const Booking = require('../models/bookingModel');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Bookings GET endpoints', () => {
  it('returns a paginated list of bookings', async () => {
    const bookings = [{ id: 'b1' }];
    Booking.find.mockImplementation(() => createQueryChain(bookings));
    Booking.countDocuments.mockResolvedValue(bookings.length);

    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    await getAllBookings(req, res, next);

    expect(Booking.find).toHaveBeenCalledTimes(1);
    expect(Booking.countDocuments).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: GET /bookings response structure verification
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
    expect(response.pagination).toHaveProperty('totalBookings');
    expect(response.pagination).toHaveProperty('hasNextPage');
    expect(response.pagination).toHaveProperty('hasPrevPage');
    expect(typeof response.pagination.currentPage).toBe('number');
    expect(typeof response.pagination.totalPages).toBe('number');
    expect(typeof response.pagination.totalBookings).toBe('number');
    expect(typeof response.pagination.hasNextPage).toBe('boolean');
    expect(typeof response.pagination.hasPrevPage).toBe('boolean');
    
    // Verify exact pagination values
    expect(response.pagination.currentPage).toBe(1);
    expect(response.pagination.totalPages).toBe(1);
    expect(response.pagination.totalBookings).toBe(1);
    expect(response.pagination.hasNextPage).toBe(false);
    expect(response.pagination.hasPrevPage).toBe(false);
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 404 when booking is not found by id', async () => {
    Booking.findById.mockImplementation(() => createFindByIdChain(null));

    const req = createRequest({ params: { id: 'missing' } });
    const res = createResponse();
    const next = jest.fn();

    await getBookingById(req, res, next);

    expect(Booking.findById).toHaveBeenCalledWith('missing');
    expect(res.status).toHaveBeenCalledWith(404);
    
    // API Contract: GET /bookings/:id 404 error response structure
    // Any change in error response format requires version consideration
    const response = res.json.mock.calls[0][0];
    
    // Verify error response structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('message');
    expect(typeof response.success).toBe('boolean');
    expect(typeof response.message).toBe('string');
    expect(response.success).toBe(false);
    expect(response.message).toBe('Booking not found');
    
    // Ensure no extra fields in error response
    expect(Object.keys(response).sort()).toEqual(['message', 'success'].sort());
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns a booking by id when found', async () => {
    const booking = { 
      _id: 'book123',
      user: 'user123',
      property: 'prop123',
      checkIn: '2025-10-15T06:00:00.000Z',
      checkOut: '2025-10-20T06:00:00.000Z',
      totalPrice: 500,
      status: 'confirmed',
      createdAt: '2025-10-10T18:11:13.974Z',
      updatedAt: '2025-10-10T18:11:13.974Z',
      __v: 0
    };
    Booking.findById.mockImplementation(() => createFindByIdChain(booking));

    const req = createRequest({ params: { id: 'book123' } });
    const res = createResponse();
    const next = jest.fn();

    await getBookingById(req, res, next);

    expect(Booking.findById).toHaveBeenCalledWith('book123');
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: GET /bookings/:id success response structure
    // Validates COMPLETE booking response schema for compatibility testing
    const response = res.json.mock.calls[0][0];
    
    // Verify top-level structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(typeof response.success).toBe('boolean');
    expect(response.success).toBe(true);
    
    // Verify all required booking fields exist
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('user');
    expect(response.data).toHaveProperty('property');
    expect(response.data).toHaveProperty('checkIn');
    expect(response.data).toHaveProperty('checkOut');
    expect(response.data).toHaveProperty('totalPrice');
    expect(response.data).toHaveProperty('status');
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data).toHaveProperty('updatedAt');
    expect(response.data).toHaveProperty('__v');
    
    // Verify field types
    expect(typeof response.data._id).toBe('string');
    expect(typeof response.data.user).toBe('string');
    expect(typeof response.data.property).toBe('string');
    expect(typeof response.data.checkIn).toBe('string');
    expect(typeof response.data.checkOut).toBe('string');
    expect(typeof response.data.totalPrice).toBe('number');
    expect(typeof response.data.status).toBe('string');
    expect(typeof response.data.createdAt).toBe('string');
    expect(typeof response.data.updatedAt).toBe('string');
    expect(typeof response.data.__v).toBe('number');
    
    // Verify status enum value
    expect(['pending', 'confirmed', 'cancelled']).toContain(response.data.status);
    
    // Verify totalPrice is positive
    expect(response.data.totalPrice).toBeGreaterThan(0);
    
    // Verify exact values match
    expect(response.data).toEqual(booking);
    
    expect(next).not.toHaveBeenCalled();
  });

  it('handles multiple bookings with pagination', async () => {
    const bookings = [
      { id: 'b1', status: 'confirmed' },
      { id: 'b2', status: 'pending' },
    ];
    Booking.find.mockImplementation(() => createQueryChain(bookings));
    Booking.countDocuments.mockResolvedValue(15);

    const req = createRequest({ pagination: { page: 1, limit: 10 } });
    const res = createResponse();
    const next = jest.fn();

    await getAllBookings(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: Pagination calculation verification
    // Tests multi-page scenario to ensure pagination logic consistency
    const response = res.json.mock.calls[0][0];
    
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data).toEqual(bookings);
    
    // Detailed pagination verification for multi-page scenario
    expect(response.pagination.currentPage).toBe(1);
    expect(response.pagination.totalPages).toBe(2); // 15 items / 10 per page = 2 pages
    expect(response.pagination.totalBookings).toBe(15);
    expect(response.pagination.hasNextPage).toBe(true); // Page 1 of 2
    expect(response.pagination.hasPrevPage).toBe(false); // First page
  });
});
