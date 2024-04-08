import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

function OrderHistory({ user }) { 

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders(); 
    }, [user]);

    const fetchOrders = async () => {
        try {
            let url = `${process.env.REACT_APP_API_URL}/orders/my-orders`;

            // Check if the user is an admin
            const isAdmin = user && user.isAdmin;

            // If the user is not an admin, fetch their own orders
            if (!isAdmin) {
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
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch orders. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Container className="mt-5">
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Ordered On</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.orderedOn).toLocaleString()}</td>
                                <td>
                                    {order.productsOrdered.map((item, index) => (
                                        <div key={index}>
                                            {item.productName}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {order.productsOrdered.map((item, index) => (
                                        <div key={index}>
                                            {item.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td>₱{order.totalPrice.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default OrderHistory;
