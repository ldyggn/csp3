import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

const ProductCard = ({ productProp }) => {
    const { _id = '', name = '', description = '', price = '' } = productProp || {};
    const imagePath = imageMap[name] || ''; // Provide default image path if not found

    return (
        <Card className="product-card">
            <div className="product-card-image-container">
                <Card.Img variant="top" src={imagePath} alt={name} className="product-card-image" />
            </div>
            <Card.Body>
                <Card.Title as="h2" className="product-card-title">{name}</Card.Title>
                <Card.Text className="product-card-description">{description}</Card.Text>
                <Card.Text className="product-card-price">₱{price}</Card.Text>
                <Link className="btn btn-primary product-card-button" to={`/products/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;