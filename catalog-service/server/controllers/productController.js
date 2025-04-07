const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, imageUrl } = req.body;
    
    // Create new product
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl
    });
    
    const product = await newProduct.save();
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, imageUrl } = req.body;
    
    // Build product update object
    const productFields = {};
    if (name) productFields.name = name;
    if (price) productFields.price = price;
    if (description) productFields.description = description;
    if (category) productFields.category = category;
    if (stock !== undefined) productFields.stock = stock;
    if (imageUrl) productFields.imageUrl = imageUrl;
    
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update product
    product = await Product.findByIdAndUpdate(
      req.params.id, 
      { $set: productFields }, 
      { new: true }
    );
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.deleteOne();
    
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
}; 