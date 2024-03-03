const request = require('supertest');
const app = require('../server'); // Adjust the path to correctly import your Express app

describe('DELETE /api/inventory/:id', () => {
    let itemIdToDelete;

    // Setup: Add an item to delete
    beforeAll(async () => {
        const newItem = { name: 'Item to Delete', quantity: 5, description: 'Description of item to delete' };
        const response = await request(app)
            .post('/api/inventory')
            .send(newItem);
        itemIdToDelete = response.body.id; // Assuming the response body contains the ID of the created item
    });

    it('should delete an existing inventory item', async () => {
        await request(app)
            .delete(`/api/inventory/${itemIdToDelete}`)
            .expect(200);

        // Verify the item was deleted by attempting to fetch it
        await request(app)
            .get(`/api/inventory/${itemIdToDelete}`)
            .expect(404);
    });

    it('should return a 404 status code if the item does not exist', async () => {
        // Attempting to delete an item with an ID that doesn't exist
        const nonExistentItemId = 9999; 
        await request(app)
            .delete(`/api/inventory/${nonExistentItemId}`)
            .expect(404);
    });
});
