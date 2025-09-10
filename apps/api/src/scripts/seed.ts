// src/scripts/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model';

dotenv.config();

// Export the function for programmatic use
export const seedDB = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set.');
        }
        await mongoose.connect(process.env.DATABASE_URL);

        await User.deleteMany({});

        const dgUser = new User({
            name: 'Director-General',
            email: 'dg@oysipa.gov.ng',
            password: 'Password123!',
            role: 'Director-General',
        });

        await dgUser.save();

        console.log('Database seeded successfully');
        await mongoose.connection.close();
        // Do not call process.exit() here
    } catch (error: any) {
        console.error(`Error seeding database: ${error.message}`);
        await mongoose.connection.close();
    }
};

// This section allows the script to be run as a standalone file from the command line
if (require.main === module) {
    seedDB()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}