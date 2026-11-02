import request from 'supertest';
import { jest } from '@jest/globals';
import argon2 from 'argon2';

jest.unstable_mockModule('../src/models/UserModel.js', () => ({
    default: { create: jest.fn(), findByEmailWithHash: jest.fn() }
}));

jest.unstable_mockModule('../src/models/InventoryModel.js', () => ({
    default: { getItems: jest.fn() }
}));

const { default: UserModel } = await import('../src/models/UserModel.js');
const { default: InventoryModel } = await import('../src/models/InventoryModel.js');
const { default: app } = await import('./helpers/testApp.js');

describe('API endpoints of /api/inventory', () => {
    beforeEach(() => jest.clearAllMocks());

    it('GET /api/inventory returns 200 and items array', async () => {
        const passwordHash = await argon2.hash('password123');

        UserModel.findByEmailWithHash.mockResolvedValue({
            id: '1',
            email: 'admin@admin.com',
            fullName: 'admin admin',
            passwordHash,
            isActive: true,
        });

        InventoryModel.getItems.mockResolvedValue([
            { id: '1', name: 'Item', stock: 5 }
        ]);

        const login = await request(app)
            .post('/api/auth/login')
            .send({ email: 'admin@admin.com', password: 'password123' });
        const cookie = login.get('Set-Cookie')[0].split(';')[0];

        const response = await request(app)
            .get('/api/inventory')
            .set('Cookie', cookie);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
});