import request from 'supertest';
import { jest } from '@jest/globals';
import argon2 from 'argon2';

jest.unstable_mockModule('../src/models/UserModel.js', () => ({
    default: {
        create: jest.fn(),
        findByEmailWithHash: jest.fn(),
        findAll: jest.fn(),
    }
}));

const { default: UserModel } = await import('../src/models/UserModel.js');
const { default: app } = await import('./helpers/testApp.js');

describe('API endpoints of /api/users', () => {
    beforeEach(() => jest.clearAllMocks());

    const loginData = {
        email: 'admin@admin.com',
        password: 'password123'
    };

    it('GET /api/users make login and returns statusCode 200 and users array', async () => {
        const hashedPassword = await argon2.hash(
            loginData.password
        );
        const fakeUser = {
            id: '1',
            email: loginData.email,
            fullName: 'admin admin',
            passwordHash: hashedPassword,
            isActive: true,
            role: 'admin',
        };

        UserModel.findByEmailWithHash.mockResolvedValue(fakeUser);
        UserModel.findAll.mockResolvedValue([fakeUser]);
        
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(loginData);
        
        expect(loginResponse.statusCode).toBe(200)
        const receivedCookies = loginResponse.get('Set-Cookie');
        expect(receivedCookies).toBeDefined()
        const cleanCookie = receivedCookies[0].split(';')[0];

        const userResponse = await request(app)
            .get('/api/users')
            .set('Cookie', cleanCookie);

        expect(userResponse.statusCode).toBe(200);
        expect(Array.isArray(userResponse.body)).toBe(true);
        expect(userResponse.body.length).toBeGreaterThan(0);
        expect(UserModel.findAll).toHaveBeenCalledTimes(1);
    });
});