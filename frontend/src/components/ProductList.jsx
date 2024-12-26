import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Importing custom CSS

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        alert('Error fetching product data');
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Error deleting product');
    }
  };

  // Filter products based on search term (by name or category)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Product List</h1>

      <div className="actions">
        <Link to="/" className="button button-info mb-3">Go to Dashboard</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/add-product" className="button button-info mb-3 ms-2">Add New Product</Link>
      </div>

      <br></br>
      {/* Search Input */}
      <div className="search-container mb-3">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <div className="product-card" key={product._id}>
            <div className="product-info">
              <h2 className="product-title">{product.name}</h2>
              
              <p className="product-category">
                <i className="fas fa-tags"></i> <strong>Category:</strong> {product.category}
              </p>
              <p className="product-price">
                <i className="fas fa-dollar-sign"></i> <strong>Price:</strong> ${product.price}
              </p>
              <p className="product-quantity">
                <i className="fas fa-cogs"></i> <strong>Quantity:</strong> {product.quantity}
              </p>
              <p className="product-description">
                <i className="fas fa-align-left"></i> <strong>Description:</strong> {product.description}
              </p>
            </div>
            <div className="action-buttons">
              <button
                className="button button-danger btn-sm"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
              <Link to={`/edit-product/${product._id}`} className="button button-primary btn-sm ms-2">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

