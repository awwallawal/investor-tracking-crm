require('dotenv').config({ path: './.env.test' });
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const app = require('./src/index').default; // Import Express app from index.ts
const supertest = require('supertest');

let httpServer;

beforeAll(async () => {
  if (!process.env.TEST_DATABASE_URL) {
    throw new Error('TEST_DATABASE_URL environment variable is not set.');
  }

  // Connect to the test database
  await mongoose.connect(process.env.TEST_DATABASE_URL);

  // Drop the database for a clean state
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }

  // Start the API server on a random available port
  httpServer = app.listen(0);
});

afterAll(async () => {
  // Disconnect from database
  await mongoose.disconnect();

  // Close the server
  if (httpServer) {
    await new Promise(resolve => httpServer.close(resolve));
  }
});
