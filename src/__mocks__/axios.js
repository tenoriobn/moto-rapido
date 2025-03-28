const mockAxios = {
  create: jest.fn(() => mockAxios),
  interceptors: {
    request: {
      use: jest.fn(),
    },
  },
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
};

export default mockAxios;
