// backend/routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: Retrieve all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add a new product
router.post('/', async (req, res) => {
  const { name, category, price, quantity, description } = req.body;

  try {
    const newProduct = new Product({ name, category, price, quantity, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update an existing product
router.put('/:id', async (req, res) => {
  const { name, category, price, quantity, description } = req.body;
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name, category, price, quantity, description
    }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
