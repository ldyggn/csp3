import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

// Component for displaying order history
function OrderHistory({ user }) {

    // State to store orders
    const [orders, setOrders] = useState([]);

    // Fetch orders on component mount or when user changes
    useEffect(() => {
        fetchOrders();
    }, [user]);

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            let url;
            // Determine URL based on user's role
            if (user && user.isAdmin) {
                url = `${process.env.REACT_APP_API_URL}/orders/all-orders`;
            } else {
                url = `${process.env.REACT_APP_API_URL}/orders/my-orders`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setOrders(data.orders || data);
            } else {
                throw new Error(data.error || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Display error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch orders. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
    };


    // Function to format products and quantities
    const formatProducts = (productsOrdered) => {
        return productsOrdered.map(item => `${item.productName} (${item.quantity})`).join(', ');
    };

    return (
        <Container className="orderhistory-container mt-5">
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="table-responsive">
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
                            {orders.map(order => (
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
            )}
        </Container>
    );
}

export default OrderHistory;
