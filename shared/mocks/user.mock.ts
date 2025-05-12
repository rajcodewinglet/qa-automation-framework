export const testUsers = {
  validUser: {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
    name: 'Invalid User'
  }
};

export const generateRandomUser = () => {
  const randomId = Math.floor(Math.random() * 1000);
  return {
    email: `user${randomId}@example.com`,
    password: `password${randomId}`,
    name: `User ${randomId}`
  };
}; 