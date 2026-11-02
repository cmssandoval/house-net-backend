import request from 'supertest';
import app from '../src/app.js';

describe('GET /api', () => {
    it('Returns statusCode 200, online status, and welcome message', async () => {
        const response = await request(app).get('/api');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('info');
        expect(response.body.info).toHaveProperty('status');
        expect(response.body.info.status).toBe('Online');
        expect(response.body.info).toHaveProperty('message');
        expect(response.body.info.message).toMatch('Welcome');
    });
});