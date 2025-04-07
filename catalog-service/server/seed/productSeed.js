const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const products = [
  {
    name: 'Smartphone X Pro',
    price: 899.99,
    description: 'The latest flagship smartphone with 5G capabilities, 6.7-inch AMOLED display, 128GB storage, and an advanced camera system.',
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Wireless Noise Cancelling Headphones',
    price: 249.99,
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    category: 'Electronics',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Classic Cotton T-Shirt',
    price: 19.99,
    description: 'Soft and comfortable 100% cotton t-shirt, perfect for everyday wear. Available in multiple colors.',
    category: 'Clothing',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    description: 'Double-walled insulated water bottle that keeps beverages cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    category: 'Home & Kitchen',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1602142946018-34606aa83259?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Smart Fitness Watch',
    price: 179.99,
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, sleep tracking, and 7-day battery life.',
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Ergonomic Office Chair',
    price: 199.99,
    description: 'Comfortable ergonomic chair with lumbar support, adjustable height, and breathable mesh back. Perfect for your home office.',
    category: 'Home & Kitchen',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1595515106883-2a61b6fae4a5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Bestselling Novel',
    price: 14.99,
    description: 'The latest bestselling fiction novel that has taken the literary world by storm. Available in hardcover.',
    category: 'Books',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Professional Kitchen Knife Set',
    price: 129.99,
    description: 'Complete set of high-quality stainless steel kitchen knives with ergonomic handles. Includes chef knife, bread knife, utility knife, and more.',
    category: 'Home & Kitchen',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1000&auto=format&fit=crop'
  }
];

const seedProducts = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Deleted all existing products');
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully added ${createdProducts.length} products to the database`);
    
    console.log('Database seeding completed');
    
    // Disconnect from database
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seeding function
seedProducts(); 