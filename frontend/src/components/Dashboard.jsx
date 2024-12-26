import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setTotalProducts(response.data.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching total products:', error);
        setLoading(false);
      }
    };
    fetchTotalProducts();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to the Product Management Dashboard</h1>
        <p className="dashboard-subtext">Manage your products efficiently and effectively.</p>
      </header>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaBoxOpen size={50} />
          </div>
          <div className="stat-info">
            <h2>{loading ? 'Loading...' : totalProducts}</h2>
            <p>Total Products</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/product-list" className="action-button">View Product List</Link>
        <Link to="/add-product" className="action-button ">Add New Product</Link>
      </div>
    </div>
  );
};

export default Dashboard;
