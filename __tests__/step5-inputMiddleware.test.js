const request = require('supertest');
const app = require('../server'); // Adjust the path to correctly import your Express app

describe('Input Validation Middleware', () => {
    describe('POST /api/inventory', () => {
        it('should reject requests with missing name or quantity', async () => {
            const invalidItem = { description: 'Missing name and quantity' };
            await request(app)
                .post('/api/inventory')
                .send(invalidItem)
                .expect(400);
        });

        it('should accept valid item data', async () => {
            const validItem = { name: 'Valid Item', quantity: 10, description: 'A valid item description' };
            await request(app)
                .post('/api/inventory')
                .send(validItem)
                .expect(201);
        });
    });

    describe('PUT /api/inventory/:id', () => {
        let itemIdToUpdate;

        beforeAll(async () => {
            // Setup: Create an item to update
            const newItem = { name: 'Item for PUT Validation', quantity: 5, description: 'Description before update' };
            const response = await request(app)
                .post('/api/inventory')
                .send(newItem);
            itemIdToUpdate = response.body.id;
        });

        it('should reject updates with invalid quantity', async () => {
            const invalidUpdate = { name: 'Updated Name', quantity: -1, description: 'Invalid quantity update' };
            await request(app)
                .put(`/api/inventory/${itemIdToUpdate}`)
                .send(invalidUpdate)
                .expect(400);
        });

        it('should allow updates with valid data', async () => {
            const validUpdate = { name: 'Updated Name', quantity: 20, description: 'Valid update data' };
            await request(app)
                .put(`/api/inventory/${itemIdToUpdate}`)
                .send(validUpdate)
                .expect(200);
        });
    });
});
