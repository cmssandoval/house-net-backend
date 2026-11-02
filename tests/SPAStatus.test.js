import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
    it('Returns statusCode 200 and HTML type data', async () => {
        const response = await request(app).get('/')
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html');
    });
});