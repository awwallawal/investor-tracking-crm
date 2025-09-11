// src/scripts/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model';

dotenv.config();

export const seedDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set.');
    }

    await mongoose.connect(process.env.DATABASE_URL);

    // Check if DG user already exists
    const existingDG = await User.findOne({ email: 'dg@oysipa.gov.ng' });

    if (!existingDG) {
      const dgUser = new User({
        name: 'Director-General',
        email: 'dg@oysipa.gov.ng',
        password: 'Password123!', // will be hashed by your model pre-save hook
        role: 'Director-General',
      });

      await dgUser.save();
      console.log('DG user created successfully');
    } else {
      console.log('DG user already exists, skipping seed.');
    }

    await mongoose.connection.close();
  } catch (error: any) {
    console.error(`Error seeding database: ${error.message}`);
    await mongoose.connection.close();
  }
};

// Allow running as standalone script
if (require.main === module) {
  seedDB().catch(console.error); // Do NOT call process.exit() in dev/live
}
