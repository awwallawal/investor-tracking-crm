/// <reference types="jest" />
import request from 'supertest';
import { app, server } from '../src/index'; // Assuming your Express app is exported from src/index.ts

describe('Health Check', () => {

  // This hook runs after all tests in this describe block are done.
  afterAll((done) => {
    // Gracefully close the server to allow Jest to exit.
    server.close(done);
  });



  it('should return 200 OK and status: ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
