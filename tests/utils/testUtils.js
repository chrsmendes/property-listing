const createModelMock = () => ({
  find: jest.fn(),
  countDocuments: jest.fn(),
  findById: jest.fn(),
});

const createQueryChain = (results) => ({
  select: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  sort: jest.fn().mockResolvedValue(results),
});

const createFindByIdChain = (result) => ({
  select: jest.fn().mockResolvedValue(result),
});

const createRequest = (overrides = {}) => ({
  pagination: { page: 1, limit: 10 },
  params: {},
  ...overrides,
});

const createResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

module.exports = {
  createModelMock,
  createQueryChain,
  createFindByIdChain,
  createRequest,
  createResponse,
};
