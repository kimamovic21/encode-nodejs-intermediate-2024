import request from 'supertest';
import app from '../index.js';

describe('Index Route', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/api');

    expect(response.status).toBe(200);
  });
});
