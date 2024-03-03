const request = require('supertest');
const app = require('../server'); // Adjust the path to correctly import your Express app

// Setup: Add an item before running the tests
beforeAll(async () => {
    await request(app)
        .post('/api/inventory')
        .send({ name: 'Test Item', quantity: 10, description: 'A test item description' });
});

describe('GET /api/inventory', () => {
    it('should retrieve all inventory items', async () => {
        const response = await request(app)
            .get('/api/inventory')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a specific inventory item by ID', async () => {
        // Now assuming the item added in beforeAll is the first item and thus has ID 1
        // This assumption depends on how your ID assignment logic works
        const response = await request(app)
            .get('/api/inventory/1') // Adjust the ID based on your application's behavior
            .expect(200);

        expect(response.body).toHaveProperty('id', 1);
    });

    it('should return a 404 status code if the item does not exist', async () => {
        await request(app)
            .get('/api/inventory/9999') // Using an ID that presumably doesn't exist
            .expect(404);
    });
});
