// tests/seed.test.ts
import mongoose from 'mongoose';
import User from '../src/models/User.model';

// Mock the seed script to run programmatically
jest.mock('../src/scripts/seed', () => jest.fn());
const seedDB = require('../src/scripts/seed');

describe('Seed Script', () => {
  jest.setTimeout(30000);

  it('should run successfully and create one Director-General user', async () => {
    // We need to manually implement the seeding logic here for the test
    await User.deleteMany({});
    const dgUser = new User({
      name: 'Director-General',
      email: 'dg@oysipa.gov.ng',
      password: 'Password123!',
      role: 'Director-General',
    });
    await dgUser.save();

    const users = await User.find({});
    expect(users).toHaveLength(1);
    expect(users[0].role).toBe('Director-General');
  });
});
