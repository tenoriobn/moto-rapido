export default function useAuth() {
  return {
    signin: jest.fn(() => Promise.resolve(null)), // Mock da função signin
  };
}
