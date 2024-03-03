const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for inventory items
let inventoryItems = [];

// Serve static files from the 'public' directory
app.use(express.static('public'));

// POST route for adding new inventory items
app.post('/api/inventory', (req, res) => {
    // Extract item details from request body
    const { name, quantity, description } = req.body;

    // Simple validation to ensure name and quantity are provided
    if (!name || quantity === undefined) {
        return res.status(400).send('Item name and quantity are required.');
    }

    // Create a new inventory item
    const newItem = {
        id: inventoryItems.length + 1, // Simple way to generate unique IDs
        name,
        quantity,
        description
    };

    // Add the new item to the inventory
    inventoryItems.push(newItem);

    // Send the new item back in the response
    res.status(201).send(newItem);
});


app.get('/test', (req, res) => {
    res.send('Server is working!');
});



// Start the server
app.listen(port, () => {
    console.log(`Inventory Management Microservice running at http://localhost:${port}`);
});
