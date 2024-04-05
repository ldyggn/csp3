import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'; 
import { Link, useNavigate } from "react-router-dom"; 

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
    const handleUpdateQuantity = (productId, newQuantity) => {
        newQuantity = parseInt(newQuantity) || 0;
        if (newQuantity < 0) {
            newQuantity = 0;
        }

        fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/cart/update-cart-quantity`, {
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
                setCart(prevCart => {
                    const updatedCart = prevCart.map(item => {
                        if (item.productId === productId) {
                            const updatedSubtotal = item.price * newQuantity;
                            return { ...item, quantity: newQuantity, subtotal: updatedSubtotal };
                        }
                        return item;
                    });
                    return updatedCart;
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
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update product quantity.'
            });
        });
    };

    const handleRemoveItem = (productId) => {
        fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/cart/:productId/remove-from-cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Item removed from cart successfully') {
                const updatedCart = cart.filter(item => item.productId !== productId);
                setCart(updatedCart);
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
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to remove item from cart.'
            });
        });
    };

    const handleClearCart = () => {
        fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/cart/clear-cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Cart cleared successfully') {
                setCart([]);
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
            const response = await fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/order/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                navigate("/order"); 
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Order placed successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                setCart([]);
            } else {
                throw new Error(data.error || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to place order. Please try again later.',
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
                    {cart.cartItems.length === 0? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div>
                            {cart.cartItems.map(item => (
                                <Card key={item._id} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{item.productId.name}</Card.Title>
                                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                                        <Card.Text>Subtotal: {item.subtotal}</Card.Text>
                                        <Button variant="outline-primary" style={{ marginRight: '5px', backgroundColor: '#934647', borderColor: '#934647' }} onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>
                                            +
                                        </Button>
                                        <Button variant="outline-danger" style={{ marginRight: '5px', backgroundColor: '#934647', borderColor: '#934647' }} onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}>
                                            -
                                        </Button>
                                        <Button variant="outline-danger" style={{ backgroundColor: '#934647', borderColor: '#934647' }} onClick={() => handleRemoveItem(item._id)}>
                                            Remove
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

