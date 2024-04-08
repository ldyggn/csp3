import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

const imageMap = {
    'Browow': 'https://blkcosmetics.com.ph/cdn/shop/files/BrowSculptingPencilDuo_NaturalBrown_f1eb7405-701c-4a1e-8126-70eaac9d7038_720x.png?v=1691670903',
    'Matte Blush': 'https://blkcosmetics.com.ph/cdn/shop/files/PowderPalette_BlushChampagneCaramel_720x.png?v=1691672016',
    'Moisturizing Lipbalm': 'https://blkcosmetics.com.ph/cdn/shop/files/MLBB1_720x.png?v=1698320717',
    'Puff Lipstick': 'https://blkcosmetics.com.ph/cdn/shop/files/airy-matte-tint-websiPNGite-thumbnail-Artboard-1_720x.png?v=1703825659',
    'Matte Lipstick': 'https://blkcosmetics.com.ph/cdn/shop/files/PillowMatte_Flirt_720x.png?v=1701331855',
    'Blush Rush': 'https://blkcosmetics.com.ph/cdn/shop/files/Mood_0_island_rose_720x.jpg?v=1710663765',
    'Volumizing Mascara': 'https://blkcosmetics.com.ph/cdn/shop/files/VolumeLashExtension_720x.jpg?v=1688361307',
    'Eyeshadow Pallette': 'https://blkcosmetics.com.ph/cdn/shop/files/EyePalette_Nude_720x.png?v=1691671219'
};

export default function ProductView() {
    const { user } = useContext(UserContext);
    const { productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1); 
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
            });

    }, [productId]);

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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add product to cart. Please try again later.',
                    confirmButtonText: 'OK'
                });
                console.error("Error adding product to cart:", err);
            });
    };
    
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
