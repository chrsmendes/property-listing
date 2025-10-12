const {
  createModelMock: mockCreateModel,
  createQueryChain,
  createFindByIdChain,
  createRequest,
  createResponse,
} = require('./utils/testUtils');

jest.mock('../models/reviewModel', () => mockCreateModel());

const { getAllReviews, getReviewById } = require('../controllers/reviewController');
const Review = require('../models/reviewModel');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Reviews GET endpoints', () => {
  it('returns a paginated list of reviews', async () => {
    const reviews = [{ id: 'r1' }];
    Review.find.mockImplementation(() => createQueryChain(reviews));
    Review.countDocuments.mockResolvedValue(reviews.length);

    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    await getAllReviews(req, res, next);

    expect(Review.find).toHaveBeenCalledTimes(1);
    expect(Review.countDocuments).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: GET /reviews response structure verification
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
    expect(response.pagination).toHaveProperty('totalReviews');
    expect(response.pagination).toHaveProperty('hasNextPage');
    expect(response.pagination).toHaveProperty('hasPrevPage');
    expect(typeof response.pagination.currentPage).toBe('number');
    expect(typeof response.pagination.totalPages).toBe('number');
    expect(typeof response.pagination.totalReviews).toBe('number');
    expect(typeof response.pagination.hasNextPage).toBe('boolean');
    expect(typeof response.pagination.hasPrevPage).toBe('boolean');
    
    // Verify exact pagination values
    expect(response.pagination.currentPage).toBe(1);
    expect(response.pagination.totalPages).toBe(1);
    expect(response.pagination.totalReviews).toBe(1);
    expect(response.pagination.hasNextPage).toBe(false);
    expect(response.pagination.hasPrevPage).toBe(false);
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 404 when review is not found by id', async () => {
    Review.findById.mockImplementation(() => createFindByIdChain(null));

    const req = createRequest({ params: { id: 'missing' } });
    const res = createResponse();
    const next = jest.fn();

    await getReviewById(req, res, next);

    expect(Review.findById).toHaveBeenCalledWith('missing');
    expect(res.status).toHaveBeenCalledWith(404);
    
    // API Contract: GET /reviews/:id 404 error response structure
    // Any change in error response format requires version consideration
    const response = res.json.mock.calls[0][0];
    
    // Verify error response structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('message');
    expect(typeof response.success).toBe('boolean');
    expect(typeof response.message).toBe('string');
    expect(response.success).toBe(false);
    expect(response.message).toBe('review not found');
    
    // Ensure no extra fields in error response
    expect(Object.keys(response).sort()).toEqual(['message', 'success'].sort());
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns a review by id when found', async () => {
    const review = { 
      _id: 'rev123',
      user: 'user123',
      property: 'prop123',
      rating: 5,
      comment: 'Excellent property!',
      createdAt: '2025-10-12T01:40:26.749Z',
      updatedAt: '2025-10-12T01:40:26.749Z',
      __v: 0
    };
    Review.findById.mockImplementation(() => createFindByIdChain(review));

    const req = createRequest({ params: { id: 'rev123' } });
    const res = createResponse();
    const next = jest.fn();

    await getReviewById(req, res, next);

    expect(Review.findById).toHaveBeenCalledWith('rev123');
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: GET /reviews/:id success response structure
    // Validates COMPLETE review response schema for compatibility testing
    const response = res.json.mock.calls[0][0];
    
    // Verify top-level structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(typeof response.success).toBe('boolean');
    expect(response.success).toBe(true);
    
    // Verify all required review fields exist
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('user');
    expect(response.data).toHaveProperty('property');
    expect(response.data).toHaveProperty('rating');
    expect(response.data).toHaveProperty('comment');
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data).toHaveProperty('updatedAt');
    expect(response.data).toHaveProperty('__v');
    
    // Verify field types
    expect(typeof response.data._id).toBe('string');
    expect(typeof response.data.user).toBe('string');
    expect(typeof response.data.property).toBe('string');
    expect(typeof response.data.rating).toBe('number');
    expect(typeof response.data.comment).toBe('string');
    expect(typeof response.data.createdAt).toBe('string');
    expect(typeof response.data.updatedAt).toBe('string');
    expect(typeof response.data.__v).toBe('number');
    
    // Verify rating is within valid range (1-5)
    expect(response.data.rating).toBeGreaterThanOrEqual(1);
    expect(response.data.rating).toBeLessThanOrEqual(5);
    
    // Verify exact values match
    expect(response.data).toEqual(review);
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns multiple reviews with correct sorting', async () => {
    const reviews = [
      { id: 'r1', rating: 5, comment: 'Great!' },
      { id: 'r2', rating: 4, comment: 'Good' },
      { id: 'r3', rating: 3, comment: 'Okay' },
    ];
    Review.find.mockImplementation(() => createQueryChain(reviews));
    Review.countDocuments.mockResolvedValue(reviews.length);

    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    await getAllReviews(req, res, next);

    expect(Review.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: Multiple reviews response validation
    // Ensures array structure and data consistency
    const response = res.json.mock.calls[0][0];
    
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data).toEqual(reviews);
    expect(response.data.length).toBe(3);
    
    // Verify each review item structure
    response.data.forEach((reviewItem) => {
      expect(reviewItem).toHaveProperty('id');
      expect(reviewItem).toHaveProperty('rating');
      expect(reviewItem).toHaveProperty('comment');
      expect(typeof reviewItem.rating).toBe('number');
      expect(typeof reviewItem.comment).toBe('string');
    });
    
    // Pagination for this result set
    expect(response.pagination.currentPage).toBe(1);
    expect(response.pagination.totalPages).toBe(1);
    expect(response.pagination.totalReviews).toBe(3);
  });
});
