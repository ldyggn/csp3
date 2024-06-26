import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'; 
import { useNavigate } from "react-router-dom"; 
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';

function Cart() {
    // State variables to store cart data and total price
    const [cart, setCart] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchCartData();
        } else {
            setIsLoading(false);
        }
    }, []);
    
 // Function to fetch cart data from the server
 const fetchCartData = () => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/get-cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // Update state with fetched cart data and calculate total price
            setCart(data.cart);
            const totalPrice = data.cart.cartItems.reduce((total, item) => total + item.subtotal, 0);
            setTotalPrice(totalPrice);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false)
            // Display error message if fetching cart data fails
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch cart data.'
            });
        });
};

     // Function to handle updating quantity of items in the cart
     const handleUpdateQuantity = (productId, newQuantity) => {
        const token = localStorage.getItem('token');
        // Ensure quantity is not negative
        newQuantity = parseInt(newQuantity) || 0;
        if (newQuantity < 0) {
            newQuantity = 0;
        }

        // Update quantity on the server
        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/update-cart-quantity`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId,
                quantity: newQuantity
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update product quantity.');
            }
            return res.json();
        })
        .then(data => {
            if (data.message === 'Product quantity updated successfully') {
                // If successful, update the quantity in the cart state
                const updatedCart = { ...cart };
                const updatedItemIndex = updatedCart.cartItems.findIndex(item => item.productId._id === productId);
                if (updatedItemIndex !== -1) {
                    updatedCart.cartItems[updatedItemIndex].quantity = newQuantity;
                    // Calculate the new subtotal for the updated item
                    updatedCart.cartItems[updatedItemIndex].subtotal = newQuantity * updatedCart.cartItems[updatedItemIndex].productId.price;
                    // Update the cart state
                    setCart(updatedCart);
                    // Recalculate total price
                    const totalPrice = updatedCart.cartItems.reduce((total, item) => total + item.subtotal, 0);
                    setTotalPrice(totalPrice);
                }
                // Display success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product quantity updated successfully.'
                });
            } else {
                // Display error message if updating quantity fails
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update product quantity.'
                });
            }
        })
        .catch(err => {
            // Display error message if updating quantity fails
            console.error('Error updating product quantity:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update product quantity.'
            });
        });
    };

    
    // Function to handle removing an item from the cart
    const handleRemoveItem = (productId) => {
        // Remove item from the server
        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${productId}/remove-from-cart`, {
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
                // If successful, fetch updated cart data
                fetchCartData(); 
                // Display success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Item removed from cart successfully.'
                });
            } else if (data.error === 'Item not found in cart') {
                // Display error message if item not found in cart
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'The item you are trying to remove is not in your cart.'
                });
            } else {
                // Display error message if removing item fails
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to remove item from cart.'
                });
            }
        })
        .catch(err => {
            // Display error message if removing item fails
            console.error('Error removing item from cart:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to remove item from cart.'
            });
        });
    };
    
    // Function to clear the entire cart
    const handleClearCart = () => {
        // Clear cart on the server
        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/clear-cart`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Cart cleared successfully') {
                // If successful, reset cart state and total price
                setCart({ cartItems: [] });
                setTotalPrice(0); 
                // Display success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Cart cleared successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // Display error message if clearing cart fails
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to clear cart.'
                });
            }
        })
        .catch(err => {
            // Display error message if clearing cart fails
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to clear cart.'
            });
        });
    };
    
    // Function to handle the checkout process
    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }
    
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
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
    
            // Redirect to the order page on successful checkout
            navigate("/order");
            // Display success message
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Order placed successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            // Clear the cart
            setCart([]);
        } catch (error) {
            // Display error message if checkout fails
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
        <div className='cart-container'>
        <Container className="mt-5">
            <Row className="justify-content-center">
                {isLoading? <p>Loading</p>:
                <Col lg={8}>
                    <h2 className='mb-3'>Your Cart</h2>
                    {cart?.cartItems?.length === 0 ? (
                        <div>
                            <p>Your cart is empty.</p>
                            <Button variant="primary" onClick={() => navigate("/products")} style={{ marginBottom: '10px', backgroundColor: '#985F4B', color: 'white', borderColor: '#985F4B' }}>Add Item/s</Button>
                        </div>
                    ) : (
                                                    <div>
                                                    {cart && cart.cartItems && cart.cartItems.map(item => (
                                <Card key={item._id} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{item.productId ? item.productId.name : 'Product Name Not Available'}</Card.Title>
                                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                                        <Card.Text>Subtotal: {item.subtotal}</Card.Text>
                                        {/* Buttons to update quantity, remove item, and clear cart */}
                                        <Button
                                            variant="outline-primary"
                                            style={{ marginRight: '5px', backgroundColor: '#985F4B', borderColor: '#985F4B', color: 'white' }}
                                            onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>
                                            <AiOutlinePlus />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            style={{ marginRight: '5px', backgroundColor: '#985F4B', borderColor: '#985F4B', color: 'white' }}
                                            onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}>
                                            <AiOutlineMinus />
                                        </Button>

                                        <Button variant="outline-danger" style={{ backgroundColor: '#985F4B', borderColor: '#985F4B', color: 'white' }} onClick={() => handleRemoveItem(item.productId._id)}>
                                            <AiOutlineDelete />
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                            <p>Total Price: {totalPrice}</p>
                            {/* Buttons to checkout and clear cart */}
                            <Button style={{backgroundColor: '#985F4B', borderColor: '#985F4B', color: 'white' }} onClick={handleCheckout}>
                                Checkout
                            </Button>
                            <Button onClick={() => navigate("/products")} style={{ marginLeft: '10px', backgroundColor: '#985F4B', color: 'white', borderColor: '#985F4B' }}>Add More Item/s</Button>
                            <Button onClick={handleClearCart} style={{ marginLeft: '10px', backgroundColor: '#985F4B', color: 'white', borderColor: '#985F4B' }}>
                                Clear Cart
                            </Button>
                        </div>
                    )}
                </Col>
            }
            </Row>
        </Container>
        </div>
    );
}

export default Cart;
