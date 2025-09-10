/// <reference types="jest" />
import request from 'supertest';
import app from '../src/index';

let server: any;

describe('Health Check', () => {
  beforeAll((done) => {
    server = app.listen(3001, done); // Use a different port for tests
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return 200 OK and status: ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('database');
  });
});
