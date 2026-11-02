import request from 'supertest';
import app from './helpers/testApp.js';

describe('SPA Status', () => {
    describe('GET /', () => {
        it('Returns statusCode 200 and HTML type data', async () => {
            const response = await request(app).get('/');
    
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
        });
    });

    describe('SPA Fallback', () => {
        it('Returns HTML for an unknown frontend route', async () => {
            const response = await request(app).get('/unknown-route');
    
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('text/html');
        });
    });
});