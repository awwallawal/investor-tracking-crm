import mongoose from 'mongoose';

describe('Database Connection', () => {
  jest.setTimeout(30000);

  it('should connect to the test database', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 for connected
  });
});
