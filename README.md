# Microservice Lab

This project is an inventory management microservice developed with Node.js and Express. It demonstrates creating, reading, updating, and deleting (CRUD) inventory items. Additionally, it includes input validation and error handling middleware.

## Getting Started

### Prerequisites

- Node.js (v14.x or newer recommended)
- npm (usually comes with Node.js)

### Installation

Clone the repository and install its dependencies:

git clone https://github.com/AndrewThePug1/NodeMicroservice/tree/FinalCodeWithUI
cd MicroserviceLab
npm install

## Running the Application

To start the server, run:

npm start

This will launch the server on http://localhost:3000. 

### Running Tests

To execute the tests, use the following command:

npm test

This project uses Jest for testing the API endpoints and middleware functionality.

## API Endpoints

- POST /api/inventory: Add a new inventory item.
- GET /api/inventory: Get all inventory items.
- GET /api/inventory/:id: Get an inventory item by its ID.
- PUT /api/inventory/:id: Update an existing inventory item.
- DELETE /api/inventory/:id: Delete an inventory item.

