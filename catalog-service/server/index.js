//lest Start Server
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Product Catalog API is running');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
