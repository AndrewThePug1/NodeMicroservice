const request = require('supertest');
const app = require('../server'); // Adjust the path to correctly import your Express app

describe('Error Handling Middleware', () => {
    it('should handle errors by returning a 500 status code and a specific error message', async () => {
        const response = await request(app)
            .get('/test-error')
            .expect(500);

        // Check the response body for the expected error message
        expect(response.text).toEqual('Something went wrong!');

      
    });
});
