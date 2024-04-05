import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'; 
import { Link, useNavigate } from "react-router-dom"; 
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';

function Cart() {
    const [cart, setCart] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartData();
    }, []);



    const fetchCartData = () => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/carts/get-cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCart(data.cart);
                const totalPrice = data.cart.cartItems.reduce((total, item) => total + item.subtotal, 0);
                setTotalPrice(totalPrice);
                setIsLoading(false);
               
            })
            .catch(err => {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch cart data.'
                });
            });
    };
     console.log("data from cart state", cart)
   
     const handleUpdateQuantity = (productId, newQuantity, fetchCartData, setCart, setTotalPrice) => {
        newQuantity = parseInt(newQuantity) || 0;
        if (newQuantity < 0) {
            newQuantity = 0;
        }
    
        fetch(`${process.env.REACT_APP_API_URL}/carts/update-cart-quantity`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId,
                quantity: newQuantity
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Product quantity updated successfully') {
               
                fetchCartData(); 
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product quantity updated successfully.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update product quantity.'
                });
            }
        })
        .catch(err => {
            console.error('Error updating product quantity:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update product quantity.'
            });
        });
    };
    
    const handleRemoveItem = (productId, fetchCartData, setCart, setTotalPrice) => {
        fetch(`${process.env.REACT_APP_API_URL}/carts/${productId}/remove-from-cart`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to remove item from cart.');
            }
            return res.json();
        })
        .then(data => {
            if (data.message === 'Item removed from cart successfully') {
                fetchCartData(); 
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Item removed from cart successfully.'
                });
            } else if (data.error === 'Item not found in cart') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'The item you are trying to remove is not in your cart.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to remove item from cart.'
                });
            }
        })
        .catch(err => {
            console.error('Error removing item from cart:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to remove item from cart.'
            });
        });
    };
    
       
    
    const handleClearCart = () => {
        fetch(`${process.env.REACT_APP_API_URL}/carts/clear-cart`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Cart cleared successfully') {
                setCart({ cartItems: [] });
                setTotalPrice(0); 
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to clear cart.'
                });
            }
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to clear cart.'
            });
        });
    };

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }
    
            const response = await fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/orders/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(`Failed to place order: ${errorMessage.error}`);
            }
    
            navigate("/order");
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Order placed successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            // Assuming setCart is a function to clear the cart state
            setCart([]);
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to place order. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
    };
    
     return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                {isLoading? <p>Loading</p>:
                <Col lg={8}>
                    <h2>Your Cart</h2>
                    {cart?.cartItems?.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div>
                            {cart.cartItems.map(item => (
                                <Card key={item._id} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{item.productId.name}</Card.Title>
                                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                                        <Card.Text>Subtotal: {item.subtotal}</Card.Text>
                                        <Button variant="outline-primary" style={{ marginRight: '5px', backgroundColor: '#934647', borderColor: '#934647', color: 'white' }} onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>
                                        <AiOutlinePlus />
                                    </Button>
                                    <Button variant="outline-danger" style={{ marginRight: '5px', backgroundColor: '#934647', borderColor: '#934647', color: 'white' }} onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}>
                                        <AiOutlineMinus />
                                    </Button>
                                    <Button variant="outline-danger" style={{ backgroundColor: '#934647', borderColor: '#934647', color: 'white' }} onClick={() => handleRemoveItem(item._id)}>
                                        <AiOutlineDelete />
                                    </Button>

                                    </Card.Body>
                                </Card>
                            ))}
                            <p>Total Price: {totalPrice}</p>
                            <Button variant="success" onClick={handleCheckout}>
                                Checkout
                            </Button>
                            <Button variant="danger" onClick={handleClearCart} style={{ marginLeft: '5px' }}>
                                Clear Cart
                            </Button>
                            <Link to="/products">
                                <Button variant="primary" style={{ marginLeft: '5px', backgroundColor: '#934647', borderColor: '#934647' }}>Add More Items</Button>
                            </Link>
                        </div>
                    )}
                </Col>
            }
            </Row>
        </Container>
    );
}   

export default Cart;
