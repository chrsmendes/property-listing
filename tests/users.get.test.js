const {
  createModelMock: mockCreateModel,
  createQueryChain,
  createFindByIdChain,
  createRequest,
  createResponse,
} = require('./utils/testUtils');

jest.mock('../models/userModel', () => mockCreateModel());

const { getAllUsers, getUserById } = require('../controllers/UserCtrl');
const User = require('../models/userModel');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Users GET endpoints', () => {
  it('returns a paginated list of users', async () => {
    const users = [{ id: 'u1' }];
    User.find.mockImplementation(() => createQueryChain(users));
    User.countDocuments.mockResolvedValue(users.length);

    const req = createRequest();
    const res = createResponse();
    const next = jest.fn();

    await getAllUsers(req, res, next);

    expect(User.find).toHaveBeenCalledTimes(1);
    expect(User.countDocuments).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: GET /users response structure verification
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
    expect(response.pagination).toHaveProperty('totalUsers');
    expect(response.pagination).toHaveProperty('hasNextPage');
    expect(response.pagination).toHaveProperty('hasPrevPage');
    expect(typeof response.pagination.currentPage).toBe('number');
    expect(typeof response.pagination.totalPages).toBe('number');
    expect(typeof response.pagination.totalUsers).toBe('number');
    expect(typeof response.pagination.hasNextPage).toBe('boolean');
    expect(typeof response.pagination.hasPrevPage).toBe('boolean');
    
    // Verify exact pagination values
    expect(response.pagination.currentPage).toBe(1);
    expect(response.pagination.totalPages).toBe(1);
    expect(response.pagination.totalUsers).toBe(1);
    expect(response.pagination.hasNextPage).toBe(false);
    expect(response.pagination.hasPrevPage).toBe(false);
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 404 when user is not found by id', async () => {
    User.findById.mockImplementation(() => createFindByIdChain(null));

    const req = createRequest({ params: { id: 'missing' } });
    const res = createResponse();
    const next = jest.fn();

    await getUserById(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('missing');
    expect(res.status).toHaveBeenCalledWith(404);
    
    // API Contract: GET /users/:id 404 error response structure
    // Any change in error response format requires version consideration
    const response = res.json.mock.calls[0][0];
    
    // Verify error response structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('message');
    expect(typeof response.success).toBe('boolean');
    expect(typeof response.message).toBe('string');
    expect(response.success).toBe(false);
    expect(response.message).toBe('User not found');
    
    // Ensure no extra fields in error response
    expect(Object.keys(response).sort()).toEqual(['message', 'success'].sort());
    
    expect(next).not.toHaveBeenCalled();
  });

  it('returns a user by id when found', async () => {
    const user = { 
      _id: 'user123', 
      firstName: 'John', 
      lastName: 'Doe', 
      email: 'john@example.com',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      role: 'user',
      oauthProvider: 'github',
      createdAt: '2025-10-07T19:20:57.932Z',
      updatedAt: '2025-10-07T19:23:03.550Z',
      __v: 0
    };
    User.findById.mockImplementation(() => createFindByIdChain(user));

    const req = createRequest({ params: { id: 'user123' } });
    const res = createResponse();
    const next = jest.fn();

    await getUserById(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: GET /users/:id success response structure
    // Validates COMPLETE user response schema for compatibility testing
    const response = res.json.mock.calls[0][0];
    
    // Verify top-level structure
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(typeof response.success).toBe('boolean');
    expect(response.success).toBe(true);
    
    // Verify all required user fields exist
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('firstName');
    expect(response.data).toHaveProperty('lastName');
    expect(response.data).toHaveProperty('email');
    expect(response.data).toHaveProperty('profileImage');
    expect(response.data).toHaveProperty('role');
    expect(response.data).toHaveProperty('oauthProvider');
    expect(response.data).toHaveProperty('createdAt');
    expect(response.data).toHaveProperty('updatedAt');
    expect(response.data).toHaveProperty('__v');
    
    // Verify field types
    expect(typeof response.data._id).toBe('string');
    expect(typeof response.data.firstName).toBe('string');
    expect(typeof response.data.lastName).toBe('string');
    expect(typeof response.data.email).toBe('string');
    expect(typeof response.data.profileImage).toBe('string');
    expect(typeof response.data.role).toBe('string');
    expect(typeof response.data.oauthProvider).toBe('string');
    expect(typeof response.data.createdAt).toBe('string');
    expect(typeof response.data.updatedAt).toBe('string');
    expect(typeof response.data.__v).toBe('number');
    
    // Verify email format (basic validation)
    expect(response.data.email).toMatch(/\S+@\S+\.\S+/);
    
    // Verify role enum value
    expect(['user', 'property_manager', 'admin']).toContain(response.data.role);
    
    // Verify oauthProvider enum value
    expect(['github', 'facebook']).toContain(response.data.oauthProvider);
    
    // Verify exact values match
    expect(response.data).toEqual(user);
    
    expect(next).not.toHaveBeenCalled();
  });

  it('handles pagination with page 2', async () => {
    const users = [{ id: 'u3' }, { id: 'u4' }];
    User.find.mockImplementation(() => createQueryChain(users));
    User.countDocuments.mockResolvedValue(25);

    const req = createRequest({ pagination: { page: 2, limit: 10 } });
    const res = createResponse();
    const next = jest.fn();

    await getAllUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    
    // API Contract: Pagination on page 2 scenario
    // Tests middle-page navigation and calculation accuracy
    const response = res.json.mock.calls[0][0];
    
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data).toEqual(users);
    
    // Detailed pagination verification for middle page
    expect(response.pagination.currentPage).toBe(2);
    expect(response.pagination.totalPages).toBe(3); // 25 items / 10 per page = 3 pages
    expect(response.pagination.totalUsers).toBe(25);
    expect(response.pagination.hasNextPage).toBe(true); // Page 2 of 3, has next
    expect(response.pagination.hasPrevPage).toBe(true); // Page 2 of 3, has previous
  });
});
