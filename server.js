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

// Step 2: Get route for all inventory items
app.get('/api/inventory', (req, res) => {
    res.status(200).json(inventoryItems);
});

// Step 2: GET route for a specific inventory item
app.get('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    const item = inventoryItems.find(item => item.id === parseInt(id, 10));

    if (!item) {
        return res.status(404).send('Item not found.');
    }

    res.status(200).json(item);
});


// Step 3: PUT Route for Updating an item
app.put('/api/inventory/:id', (req, res) => {
    // Extract the item ID from the URL parameters
    const { id } = req.params;
    
    // Attempt to find the item in the inventory
    const itemIndex = inventoryItems.findIndex(item => item.id === parseInt(id, 10));
    if (itemIndex === -1) {
        // If the item is not found, return a 404 Not Found response
        return res.status(404).send('Item not found.');
    }
    
    // Extract the details to update from the request body
    const { name, quantity, description } = req.body;
    
    // Update the item details
    const updatedItem = { id: inventoryItems[itemIndex].id, name, quantity, description };
    inventoryItems[itemIndex] = updatedItem;
    
    // Send back the updated item
    res.status(200).json(updatedItem);
});



// Start the server
app.listen(port, () => {
    console.log(`Inventory Management Microservice running at http://localhost:${port}`);
});
