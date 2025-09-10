import mongoose from 'mongoose';
import User from '../src/models/User.model';
import bcrypt from 'bcryptjs';

describe('User Model', () => {
  jest.setTimeout(30000);

  beforeEach(async () => {
    await User.deleteMany({});
    await User.syncIndexes(); // Ensure unique index is built and synchronized
  });

  it('should create a new user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'Staff',
    };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe(userData.role);
  });

  it('should hash the password before saving', async () => {
    const userData = {
      name: 'Test User 2',
      email: 'test2@example.com',
      password: 'password123',
      role: 'Staff',
    };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.password).not.toBe(userData.password);
  });

  it('should fail if required fields are missing', async () => {
    const user = new User({});
    let err: any;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
    expect(err.errors.role).toBeDefined();
  });

  it('should fail if email is not unique', async () => {
    const userData = {
      name: 'Test User 3',
      email: 'test3@example.com',
      password: 'password123',
      role: 'Staff',
    };
    await new User(userData).save();

    const duplicateUser = new User(userData);
    let err: any;
    try {
      await duplicateUser.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.code).toBe(11000);
  });
});
