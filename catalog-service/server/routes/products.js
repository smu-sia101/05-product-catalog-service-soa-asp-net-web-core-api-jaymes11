const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Get all products
// GET /api/products
router.get('/', productController.getAllProducts);

// Get product by ID
// GET /api/products/:id
router.get('/:id', productController.getProductById);

// Create a product
// POST /api/products
router.post('/', auth, productController.createProduct);

// Update a product
// PUT /api/products/:id
router.put('/:id', auth, productController.updateProduct);

// Delete a product
// DELETE /api/products/:id
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router; 