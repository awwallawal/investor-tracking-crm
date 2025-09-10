import request from 'supertest';
import app from '../src/index';
import mongoose from 'mongoose';
import User from '../src/models/User.model';
import bcrypt from 'bcryptjs';

describe('Auth Endpoint', () => {
  jest.setTimeout(30000);

  let testUser: any;
  const userPassword = 'password123';

  // beforeEach(async () => {
  //   await User.deleteMany({});
  //   await User.createIndexes();
  //   // Ensure the password is hashed before creating the test user
  //   const hashedPassword = await bcrypt.hash(userPassword, 10);

  //   // Create a test user for authentication
  //   testUser = new User({
  //     name: 'Auth Test User',
  //     email: 'auth@example.com',
  //     password: hashedPassword,
  //     role: 'Staff',
  //   });
  //   await testUser.save();
  // });

  beforeEach(async () => {
  await User.deleteMany({});
  await User.createIndexes();

  // Create a test user for authentication using the plaintext password
  testUser = new User({
    name: 'Auth Test User',
    email: 'auth@example.com',
    password: userPassword, // Use the plaintext password
    role: 'Staff',
  });
  // The pre-save hook in the User model will automatically hash this password
  await testUser.save();
});

  it('should authenticate a user and return a token on successful login', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: userPassword,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', testUser.email);
  });

  it('should return 401 for invalid credentials (wrong password)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid Credentials');
  });

  it('should return 401 for invalid credentials (non-existent email)', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: userPassword,
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid Credentials');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Please enter all fields');
  });
});
