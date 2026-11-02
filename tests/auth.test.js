import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/models/UserModel.js', () => ({
    default: { create: jest.fn()}
}));

const { default: UserModel } = await import('../src/models/UserModel.js');
const { default: app } = await import('./helpers/testApp.js');

describe('API endpoints of /api/auth', () => {   
    beforeEach(() => jest.clearAllMocks());

    const registerData = {
        fullName: 'admin admin',
        email: 'admin@admin.com',
        password: 'password123'
    };

    it('POST /api/auth/register returns 409 and email already exists', async () => {
        
        UserModel.create.mockRejectedValue(
            Object.assign(new Error('Unique constraint failed'), { code: 'P2002' }),
        );
        
        const response = await request(app)
            .post('/api/auth/register')
            .send(registerData);

        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Conflict: Email already exists');
    });

    it('POST /api/auth/register returns 201 and success message', async () => {
        
        UserModel.create.mockResolvedValue({ id: '1' });
        
        const response = await request(app)
            .post('/api/auth/register')
            .send(registerData);

        expect(response.statusCode).toBe(201);
        expect(UserModel.create).toHaveBeenCalledTimes(1);
        expect(UserModel.create).toHaveBeenCalledWith(
            expect.objectContaining({
                email: 'admin@admin.com',
                fullName: 'admin admin'
            })
        );
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User registered successfully!');
    });
});