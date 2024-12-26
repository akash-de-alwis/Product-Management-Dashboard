import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast for notifications
import './EditProduct.css'; // Include the CSS styles

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Failed to fetch product details');
      }
    };
    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission with validations
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Price and Quantity validations
    if (parseFloat(product.price) <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    if (parseInt(product.quantity) <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    // Validate that required fields are filled
    if (!product.name || !product.category || !product.description) {
      toast.error('All fields are required');
      return;
    }

    try {
      // Update the product
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      toast.success('Product updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to update product');
    }
  };

  return (
    <div className="add-product-container">
      <div className="form-card">
        <h1>Edit Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-input"
              value={product.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-input"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-input"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
          </div>

          <button 
              type="submit" 
              className="button button-primary" 
              style={{ float: 'right' }}
              >
              Update Product
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

export default EditProduct;
