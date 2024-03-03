const request = require('supertest');
const app = require('../server'); // Adjust the path to correctly import your Express app

describe('PUT /api/inventory/:id', () => {
    let createdItemId;

    // Setup: Add an item to update
    beforeAll(async () => {
        const newItem = { name: 'Initial Item', quantity: 5, description: 'Initial Description' };
        const response = await request(app)
            .post('/api/inventory')
            .send(newItem);
        createdItemId = response.body.id; // Assuming the response body contains the ID of the created item
    });

    it('should update an existing inventory item', async () => {
        const updatedItem = { name: 'Updated Item', quantity: 10, description: 'Updated Description' };
        
        await request(app)
            .put(`/api/inventory/${createdItemId}`)
            .send(updatedItem)
            .expect(200);
        
        // Verify the item was updated
        const response = await request(app)
            .get(`/api/inventory/${createdItemId}`)
            .expect(200);

        expect(response.body).toEqual(expect.objectContaining(updatedItem));
    });

    it('should return a 404 status code if the item does not exist', async () => {
        const nonExistentItemId = 9999;
        const updatedItem = { name: 'Non-existent Item', quantity: 10, description: 'Non-existent Description' };
        
        await request(app)
            .put(`/api/inventory/${nonExistentItemId}`)
            .send(updatedItem)
            .expect(404);
    });
});
