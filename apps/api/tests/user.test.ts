import request from 'supertest';
import app from '../src/index';
import mongoose from 'mongoose';
import User from '../src/models/User.model';

describe('User Management Endpoints', () => {
  let token: string;
  let adminUserId: any;

  beforeAll(async () => {
    // Create an admin user for testing
    const admin = new User({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'Portal Administrator',
      status: 'Active',
    });
    await admin.save();
    adminUserId = admin._id;

    // Login as admin to get a token
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123',
      });
    token = res.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should get all users for an admin', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should invite a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users/invite')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'newuser@test.com',
        role: 'Staff',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User invited successfully.');
  });

  it('should revoke a user\'s access', async () => {
    const userToRevoke = new User({
        name: 'User to Revoke',
        email: 'revoke@test.com',
        password: 'password123',
        role: 'Staff',
        status: 'Active',
    });
    await userToRevoke.save();

    const res = await request(app)
      .post(`/api/v1/users/${userToRevoke._id}/revoke`)
      .set('Authorization', `Bearer ${token}`);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('User access has been revoked.');

    const revokedUser = await User.findById(userToRevoke._id);
    expect(revokedUser?.status).toBe('Revoked');
  });

});
