import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Mapping of product names to their respective image URLs
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

// Component for displaying product cards
const ProductCard = ({ productProp }) => {
    // Destructuring product properties
    const { _id = '', name = '', description = '', price = '' } = productProp || {};
    // Retrieve image path based on product name from the image map
    const imagePath = imageMap[name] || ''; 

    return (
        // Card component for displaying product details
        <Card className="product-card">
            {/* Container for product image */}
            <div className="product-card-image-container">
                {/* Product image */}
                <Card.Img variant="top" src={imagePath} alt={name} className="product-card-image" />
            </div>
            <Card.Body>
                {/* Product name */}
                <Card.Title as="h2" className="product-card-title">{name}</Card.Title>
                {/* Product description */}
                <Card.Text className="product-card-description">{description}</Card.Text>
                {/* Product price */}
                <Card.Text className="product-card-price">₱{price}</Card.Text>
                {/* Link to product details */}
                <Link 
                    className="btn btn-primary product-card-button" 
                    to={`/products/${_id}`}
                    style={{ backgroundColor: '#f79191', borderColor: '#f79191' }}
                >
                   View
                </Link>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;