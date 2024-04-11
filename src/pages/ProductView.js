import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
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
    'blk cosmetics life-proof airy serum foundation': 'https://blkcosmetics.com.ph/cdn/shop/files/AirySerumFoundation_Butterscotch_720x.png?v=1691671532'
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
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
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
        fetch(`${process.env.REACT_APP_API_URL}/carts/add-to-cart`, {
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
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col lg={6} className="d-flex justify-content-center">
                        <Card className="product-card text-center" style={{ width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white', color: '#934647' }}>
                            <div className="product-card-image-container">
                                <Card.Img variant="top" src={imagePath} alt={name} className="product-card-image" />
                            </div>
                            <Card.Body>
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
                                     style={{ backgroundColor: '#f79191', borderColor: '#f79191' }}>Add to Cart</Button>
                                    :
                                    <Link className="btn btn-danger btn-block my-3" to="/login">Log in to shop</Link>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}