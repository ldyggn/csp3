import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ productsData, fetchData }) {
    
    // State to manage products displayed in the table
    const [products, setProducts] = useState([]);

    // State to manage order history of regular users
    const [orderHistory, setOrderHistory] = useState([]);

    // Function to format products and quantities
    const formatProducts = (productsOrdered) => {
        return productsOrdered.map(item => `${item.productName} (${item.quantity})`).join(', ');
    };

    useEffect(() => {
        // Map through productsData to create table rows for each product
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    {/* Display availability status */}
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    {/* Edit Product button */}
                    <td><EditProduct product={product._id} className="btn btn-success" /></td>
                    {/* Archive Product button */}
                    <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>
                </tr>
            );
        });
        // Update state with the newly mapped products
        setProducts(productsArr);
    }, [productsData, fetchData]);

    // Function to fetch order history of all regular users
    const fetchOrderHistory = async () => {
        try {
            // Make an API call to fetch order history
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/all-orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                // Update state with the order history data
                setOrderHistory(data.orders || data);
            } else {
                throw new Error(data.error || 'Failed to fetch order history');
            }
        } catch (error) {
            console.error('Error fetching order history:', error);
        }
    };

    // Fetch order history on component mount
    useEffect(() => {
        fetchOrderHistory();
    }, []);

    return (
        <div className="admin-table-container">
            <h1 className="admin-dashboard">Admin Dashboard</h1>
            <div className="table-responsive">
                {/* Table to display products */}
                <Table striped bordered hover className="admin-table">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render the products in the table body */}
                        {products}
                    </tbody>
                </Table>
            </div>
            <div className="order-history-table">
                {/* Order history table for all regular users */}
                <h2 className='order-history'>Order History</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Ordered On</th>
                            <th>Products</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.orderedOn).toLocaleString()}</td>
                                <td>{formatProducts(order.productsOrdered)}</td>
                                <td>₱{order.totalPrice.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
