import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './AddProduct.css'; // Import the custom CSS file

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;

    // Name validation
    if (!product.name) {
      toast.error('Product name is required.');
      valid = false;
    }

    // Category validation
    if (!product.category) {
      toast.error('Category is required.');
      valid = false;
    }

    // Price validation (must be a valid number greater than 0)
    if (!product.price || isNaN(product.price) || product.price <= 0) {
      toast.error('Please enter a valid price greater than 0.');
      valid = false;
    }

    // Quantity validation (must be a valid number greater than 0)
    if (!product.quantity || isNaN(product.quantity) || product.quantity <= 0) {
      toast.error('Please enter a valid quantity greater than 0.');
      valid = false;
    }

    // Description validation
    if (!product.description) {
      toast.error('Description is required.');
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post('http://localhost:5000/api/products', product);
        toast.success('Product added successfully!');
        navigate('/');
      } catch (error) {
        toast.error('Error adding product.');
        console.error('Error adding product:', error);
      }
    }
  };

  return (
    <div className="add-product-container">
      <div className="form-card">
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Enter product name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-input"
              placeholder="Enter category"
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-input"
              placeholder="Enter price"
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-input"
              placeholder="Enter quantity"
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              placeholder="Enter description"
              onChange={handleChange}
              required
            />
          </div>
          {/* Submit Button */}
          <button 
              type="submit" 
              className="button button-primary" 
              style={{ float: 'right' }}
              >
              Add Product
          </button>
          
          <button
              type="button"
              className="button button-primary"
              style={{ float: 'left' }}
              onClick={() => navigate('/')}
            >
              Go to Dashboard
            </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
