import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

function OrderHistory() {
    // Access user state from context
    const { user } = useContext(UserContext);

    // State to store orders and error
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        // Check if screen size is small
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); 
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); 

        return () => window.removeEventListener('resize', handleResize); 

    }, []);

    // Fetch orders on component mount or when user changes
    useEffect(() => {
        fetchOrders();
    }, []);

    // Function to fetch order
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
    
            if (response.status === 404) {
                // Handle the case where no orders are found
                setOrders([]);
                setError(null);
                return;
            }
    
            const data = await response.json();
            if (response.ok) {
                if (data.orders && data.orders.length > 0) {
                    setOrders(data.orders);
                    setError(null); // Reset error if successful
                } else {
                    setOrders([]);
                    setError(null); // Reset error if no orders found
                }
            } else {
                throw new Error(data.error || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Display error message only if it's not due to no orders found
            if (error.message !== 'Failed to fetch orders') {
                setError('Failed to fetch orders. Please try again later.');
                // Display error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch orders. Please try again later.',
                    confirmButtonText: 'OK'
                });
            } else {
                setError(null); // Reset error if no orders found
            }
        }
    };
    
    // Function to format products and quantities
    const formatProducts = (productsOrdered) => {
        return productsOrdered.map(item => `${item.productName} (${item.quantity})`).join(', ');
    };

    return (
        <Container className="orderhistory-container">
            <h1 className='my-5'>Order History</h1>
            {/* Display error message only if there's an error and the user has previously placed orders */}
            {error && orders.length > 0 && (
                <p>{error}</p>
            )}
            {/* Render order table */}
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <>
                    {isSmallScreen ? (
                        // Render vertical layout for smaller screens
                        orders.map(order => (
                            <div key={order._id} className="order-details">
                                <p><strong>Order ID:</strong> {order._id}</p>
                                <p><strong>Ordered On:</strong> {new Date(order.orderedOn).toLocaleString()}</p>
                                <p><strong>Products:</strong> {formatProducts(order.productsOrdered)}</p>
                                <p><strong>Total Price:</strong> ₱{order.totalPrice.toFixed(2)}</p>
                            </div>
                        ))
                    ) : (
                        // Render table layout for larger screens
                        <Row>
                            <Col>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: 'middle' }}>Order ID</th>
                                            <th style={{ verticalAlign: 'middle' }}>Ordered On</th>
                                            <th style={{ verticalAlign: 'middle' }}>Products</th>
                                            <th style={{ verticalAlign: 'middle' }}>Total Price</th>
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
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </Container>
    );
}

export default OrderHistory;
