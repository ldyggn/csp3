import { useState, useEffect, useContext } from 'react';
import {  Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

// Map of product names to their respective image URLs
const imageMap = {
    'blk cosmetics brow stick: pencil + mascara': 'https://blkcosmetics.com.ph/cdn/shop/files/BrowSculptingPencilDuo_NaturalBrown_f1eb7405-701c-4a1e-8126-70eaac9d7038_720x.png?v=1691670903',
    'blk cosmetics powder multi palette - Blush': 'https://blkcosmetics.com.ph/cdn/shop/files/PowderPalette_BlushChampagneCaramel_720x.png?v=1691672016',
    'blk cosmetics color adapting moisture lipbalm': 'https://blkcosmetics.com.ph/cdn/shop/files/MLBB1_720x.png?v=1698320717',
    'blk cosmetics daydream airy matte liptint': 'https://blkcosmetics.com.ph/cdn/shop/files/airy-matte-tint-websiPNGite-thumbnail-Artboard-1_720x.png?v=1703825659',
    'blk cosmetics pillow matte lipstick': 'https://blkcosmetics.com.ph/cdn/shop/files/PillowMatte_Flirt_720x.png?v=1701331855',
    'blk cosmetics creamy all over paint - blush': 'https://blkcosmetics.com.ph/cdn/shop/files/Mood_0_island_rose_720x.jpg?v=1710663765',
    'blk cosmetics volume + lash extension mascara': 'https://blkcosmetics.com.ph/cdn/shop/files/VolumeLashExtension_720x.jpg?v=1688361307',
    'blk cosmetics eyeshadow palette': 'https://blkcosmetics.com.ph/cdn/shop/files/EyePalette_Nude_720x.png?v=1691671219',
    'blk cosmetics lip and cheek water tint': 'https://blkcosmetics.com.ph/cdn/shop/files/WaterTint_Apple_720x.png?v=1702611521',
    'blk cosmetics waterproof liquid eyeliner': 'https://blkcosmetics.com.ph/cdn/shop/files/WaterproofLiquidLiner_Black_720x.png?v=1691672441',
    'blk cosmetics life-proof airy concealer': 'https://blkcosmetics.com.ph/cdn/shop/files/AiryConcealer_Buttermilk_720x.png?v=1703826712',
    'blk cosmetics life-proof airy serum foundation': 'https://blkcosmetics.com.ph/cdn/shop/files/AirySerumFoundation_Butterscotch_720x.png?v=1691671532',
    'GRWM Radiance Tint Multi Base': 'https://api.lookatme.com.ph/medias/zoom-front-70088023.jpg?context=bWFzdGVyfGltYWdlc3wyMzA0NXxpbWFnZS9qcGVnfGFEbGpMMmcxTXk4eE16UXpPREV4T1Rnek56Y3lOaTlNVDA5TFVFZ3ROekF3T0Rnd01qTXRabkp2Ym5RdWFuQm58MDE0NWU5MmMyM2YwMTBhZDA0NWNiYTM0MTZiOWQzNDVkZmY4MzNjZmQ4YmQyYTIwNjI4MTFhYWM5NTNlNDlmNQ',
    'GRWM Milk Tint Creamy Tint': 'https://api.lookatme.com.ph/medias/zoom-front-70087991.jpg?context=bWFzdGVyfGltYWdlc3wyNDQ4OXxpbWFnZS9qcGVnfGFEaGtMMmcwWWk4eE16UXpOemsyTVRJM016TTNOQzlNVDA5TFVFZ3ROekF3T0RjNU9URXRabkp2Ym5RdWFuQm58ZTgyZDg0N2ViMDQ3OGJjMTA5OTNmOWJkY2VmM2ZhOTQzYWI1OTgzZTc5MWYwZTdmNmM4ZDRhMDBjMWM2NjE1ZA',
    'GRWM Browlift Maxx': 'https://api.lookatme.com.ph/medias/zoom-front-70088553.jpg?context=bWFzdGVyfGltYWdlc3wyODMwNXxpbWFnZS9qcGVnfGFETmxMMmd3WVM4eE16UTBNekEwTXpRNU1UZzNNQzlNVDA5TFVFZ3ROekF3T0RnMU5UTXRabkp2Ym5RdWFuQm58ZmZkMmVjZGE3OTNmZjY0NGQ1ZTYzNmI3NmY5MWNhMjc2M2YxOTk4N2VmMDM1NGU5OWZhOTkyMmQyYmUwMWMyMQ',
    'GRWM Lip Contour Retractable Gel Lipliner': 'https://api.lookatme.com.ph/medias/zoom-front-70088525.jpg?context=bWFzdGVyfGltYWdlc3wxMjExNHxpbWFnZS9qcGVnfGFHVmxMMmhtT1M4eE16UTBNams0TVRRNU5EZ3hOQzlNVDA5TFVFZ3ROekF3T0RnMU1qVXRabkp2Ym5RdWFuQm58MmE0NTVkMGY2M2M2YjAxYTc2MTNkYTFiMGZhZGYwNTg1MWQzNzIxMTI4Y2NmZWQ1Yzc4NTdjNjg4ZTY5ZTlhYg',
    'GRWM Life Proof Fixing Spray': 'https://api.lookatme.com.ph/medias/zoom-front-70088714.jpg?context=bWFzdGVyfGltYWdlc3wxODc2NnxpbWFnZS9qcGVnfGFERmlMMmczTXk4eE16UTBNekUxT1RFNU5UWTNPQzlNVDA5TFVFZ3ROekF3T0RnM01UUXRabkp2Ym5RdWFuQm58NmZkMjFhYjA1YmNmMmQ4ODg2ZjkwMTMyNTA2NmJmM2U0ODBkYjZiZmM4MDYyZTZjYjBkYTgzMzUwNWRjN2Y2Mw',
    'GRWM Tinted Lip Glaze Glossy Lipstain': 'https://api.lookatme.com.ph/medias/zoom-front-70088524.jpg?context=bWFzdGVyfGltYWdlc3wxNzM2NHxpbWFnZS9qcGVnfGFHSTVMMmcxTnk4eE16VXdPVFl6TmprNE1EYzJOaTlNVDA5TFVFZ3ROekF3T0RnMU1qUXRabkp2Ym5RdWFuQm58MzRlNmVhMTJmNTlkY2Y2ZjhmY2E0ZTk0OTkwMDg5ZjZlNjllMmYzMGYzYjVmZjI1NTI1MjhmNDAyYjA3NDAxOA',
    'GRWM Pressed Blush': 'https://api.lookatme.com.ph/medias/zoom-front-70088895.jpg?context=bWFzdGVyfGltYWdlc3wzMjA0NHxpbWFnZS9qcGVnfGFEYzVMMmcxTWk4eE16UXpPRFF3T1Rjd016UTFOQzlNVDA5TFVFZ3ROekF3T0RnNE9UVXRabkp2Ym5RdWFuQm58MGJjODU3MGE3MDIyNzYxZWE0MDViZTllZjNhOTM2ZTc1MWVjZDQ2MzU2MGIxYzU2NjUyZjJmY2E0YjgzZDUzNw'
};

// Component to display product details
export default function ProductView() {
    // Accessing user data from context
    const { user } = useContext(UserContext);
    // Getting product ID from route parameters
    const { productId } = useParams();
    // Navigation hook
    const navigate = useNavigate();

    // State for storing product details
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1); 
    const [cart, setCart] = useState([]);

    // Fetch product details on component mount
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                // Update state with fetched product details
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
            });

    }, [productId]);

    // Function to add product to cart
    const addToCart = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/add-to-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId,
                quantity
            })
        })
            .then(res => res.json())
            .then(data => {
                // If product added to cart successfully, update cart state and show success message
                if (data.message === 'Product added to cart successfully') {
                    setCart(data.cart.cartItems);
                    navigate("/cart");
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Product added to cart successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    // If adding product to cart fails, show error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to add product to cart. Please try again later.',
                        confirmButtonText: 'OK'
                    });
                    console.error("Failed to add product to cart:", data.error);
                }
            })
            .catch(err => {
                // If an error occurs during the fetch, show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add product to cart. Please try again later.',
                    confirmButtonText: 'OK'
                });
                console.error("Error adding product to cart:", err);
            });
    };
    
    // Get image path for the product
    const imagePath = imageMap[name] || ''; 

    return (
        <div className='productview-container'>
            <Row className="justify-content-center">
                <Col lg={8} className="d-flex justify-content-center">
                    <Card className="product-card text-center" style={{ width: '100%', maxWidth: '900px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white', color: '#985F4B' }}>
                        <Card.Body className="d-flex">
                            <div className="product-card-image-container" style={{ marginRight: '20px' }}>
                                <Card.Img variant="top" src={imagePath} alt={name} className="product-card-image" />
                            </div>
                            <div>
                                <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{name}</Card.Title>
                                <Card.Text style={{ marginBottom: '1rem' }}>{description}</Card.Text>
                                <Card.Text style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₱ {price}</Card.Text>
                                <Form.Group>
                                    <Form.Label>Quantity:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        min="1" 
                                        value={quantity} 
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    />
                                </Form.Group>
                                {/* Render add to cart button if user is logged in, else render login link */}
                                {user.id !== null ?
                                    <Button variant="primary" onClick={addToCart} className="my-3 add-to-cart-button"
                                     style={{ backgroundColor: '#985F4B', borderColor: '#985F4B' }}>Add to Cart</Button>
                                    :
                                    <Link className="btn btn-danger btn-block my-3" to="/login">Log in to shop</Link>
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}