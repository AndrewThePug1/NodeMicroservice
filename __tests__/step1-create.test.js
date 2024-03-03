const request = require('supertest');
const app = require('../server'); // Adjust this path to correctly import your Express app

describe('POST /api/inventory', () => {
  it('should create a new inventory item and return it', async () => {
    const newItem = {
      name: 'Test Item',
      quantity: 10,
      description: 'A test item description'
    };

    const response = await request(app)
      .post('/api/inventory')
      .send(newItem)
      .expect(201);

    // Check if the response body has the newItem data
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      ...newItem
    });
  });

  it('should return a 400 status code if name or quantity is not provided', async () => {
    const incompleteItem = {
      description: 'Missing name and quantity'
    };

    await request(app)
      .post('/api/inventory')
      .send(incompleteItem)
      .expect(400);
  });
});
