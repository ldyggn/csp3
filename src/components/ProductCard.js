import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Mapping of product names to their respective image URLs
const imageMap = {
    'BLK cosmetics brow stick: pencil + mascara': 'https://blkcosmetics.com.ph/cdn/shop/files/BrowSculptingPencilDuo_NaturalBrown_f1eb7405-701c-4a1e-8126-70eaac9d7038_720x.png?v=1691670903',
    'BLK cosmetics powder multi palette - Blush': 'https://blkcosmetics.com.ph/cdn/shop/files/PowderPalette_BlushChampagneCaramel_720x.png?v=1691672016',
    'BLK cosmetics color adapting moisture lipbalm': 'https://blkcosmetics.com.ph/cdn/shop/files/MLBB1_720x.png?v=1698320717',
    'BLK cosmetics daydream airy matte liptint': 'https://blkcosmetics.com.ph/cdn/shop/files/airy-matte-tint-websiPNGite-thumbnail-Artboard-1_720x.png?v=1703825659',
    'BLK cosmetics pillow matte lipstick': 'https://blkcosmetics.com.ph/cdn/shop/files/PillowMatte_Flirt_720x.png?v=1701331855',
    'BLK cosmetics creamy all over paint - blush': 'https://blkcosmetics.com.ph/cdn/shop/files/Mood_0_island_rose_720x.jpg?v=1710663765',
    'BLK cosmetics volume + lash extension mascara': 'https://blkcosmetics.com.ph/cdn/shop/files/VolumeLashExtension_720x.jpg?v=1688361307',
    'BLK cosmetics eyeshadow palette': 'https://blkcosmetics.com.ph/cdn/shop/files/EyePalette_Nude_720x.png?v=1691671219',
    'BLK cosmetics lip and cheek water tint': 'https://blkcosmetics.com.ph/cdn/shop/files/WaterTint_Apple_720x.png?v=1702611521',
    'BLK cosmetics waterproof liquid eyeliner': 'https://blkcosmetics.com.ph/cdn/shop/files/WaterproofLiquidLiner_Black_720x.png?v=1691672441',
    'BLK cosmetics life-proof airy concealer': 'https://blkcosmetics.com.ph/cdn/shop/files/AiryConcealer_Buttermilk_720x.png?v=1703826712',
    'BLK cosmetics life-proof airy serum foundation': 'https://blkcosmetics.com.ph/cdn/shop/files/AirySerumFoundation_Butterscotch_720x.png?v=1691671532',
    'GRWM Radiance Tint Multi Base': 'https://api.lookatme.com.ph/medias/zoom-front-70088023.jpg?context=bWFzdGVyfGltYWdlc3wyMzA0NXxpbWFnZS9qcGVnfGFEbGpMMmcxTXk4eE16UXpPREV4T1Rnek56Y3lOaTlNVDA5TFVFZ3ROekF3T0Rnd01qTXRabkp2Ym5RdWFuQm58MDE0NWU5MmMyM2YwMTBhZDA0NWNiYTM0MTZiOWQzNDVkZmY4MzNjZmQ4YmQyYTIwNjI4MTFhYWM5NTNlNDlmNQ',
    'GRWM Milk Tint Creamy Tint': 'https://api.lookatme.com.ph/medias/zoom-front-70087991.jpg?context=bWFzdGVyfGltYWdlc3wyNDQ4OXxpbWFnZS9qcGVnfGFEaGtMMmcwWWk4eE16UXpOemsyTVRJM016TTNOQzlNVDA5TFVFZ3ROekF3T0RjNU9URXRabkp2Ym5RdWFuQm58ZTgyZDg0N2ViMDQ3OGJjMTA5OTNmOWJkY2VmM2ZhOTQzYWI1OTgzZTc5MWYwZTdmNmM4ZDRhMDBjMWM2NjE1ZA',
    'GRWM Browlift Maxx': 'https://api.lookatme.com.ph/medias/zoom-front-70088553.jpg?context=bWFzdGVyfGltYWdlc3wyODMwNXxpbWFnZS9qcGVnfGFETmxMMmd3WVM4eE16UTBNekEwTXpRNU1UZzNNQzlNVDA5TFVFZ3ROekF3T0RnMU5UTXRabkp2Ym5RdWFuQm58ZmZkMmVjZGE3OTNmZjY0NGQ1ZTYzNmI3NmY5MWNhMjc2M2YxOTk4N2VmMDM1NGU5OWZhOTkyMmQyYmUwMWMyMQ',
    'GRWM Lip Contour Retractable Gel Lipliner': 'https://api.lookatme.com.ph/medias/zoom-front-70088525.jpg?context=bWFzdGVyfGltYWdlc3wxMjExNHxpbWFnZS9qcGVnfGFHVmxMMmhtT1M4eE16UTBNams0TVRRNU5EZ3hOQzlNVDA5TFVFZ3ROekF3T0RnMU1qVXRabkp2Ym5RdWFuQm58MmE0NTVkMGY2M2M2YjAxYTc2MTNkYTFiMGZhZGYwNTg1MWQzNzIxMTI4Y2NmZWQ1Yzc4NTdjNjg4ZTY5ZTlhYg',
    'GRWM Life Proof Fixing Spray': 'https://api.lookatme.com.ph/medias/zoom-front-70088714.jpg?context=bWFzdGVyfGltYWdlc3wxODc2NnxpbWFnZS9qcGVnfGFERmlMMmczTXk4eE16UTBNekUxT1RFNU5UWTNPQzlNVDA5TFVFZ3ROekF3T0RnM01UUXRabkp2Ym5RdWFuQm58NmZkMjFhYjA1YmNmMmQ4ODg2ZjkwMTMyNTA2NmJmM2U0ODBkYjZiZmM4MDYyZTZjYjBkYTgzMzUwNWRjN2Y2Mw',
    'GRWM Tinted Lip Glaze Glossy Lipstain': 'https://api.lookatme.com.ph/medias/zoom-front-70088524.jpg?context=bWFzdGVyfGltYWdlc3wxNzM2NHxpbWFnZS9qcGVnfGFHSTVMMmcxTnk4eE16VXdPVFl6TmprNE1EYzJOaTlNVDA5TFVFZ3ROekF3T0RnMU1qUXRabkp2Ym5RdWFuQm58MzRlNmVhMTJmNTlkY2Y2ZjhmY2E0ZTk0OTkwMDg5ZjZlNjllMmYzMGYzYjVmZjI1NTI1MjhmNDAyYjA3NDAxOA',
    'GRWM Pressed Blush': 'https://api.lookatme.com.ph/medias/zoom-front-70088895.jpg?context=bWFzdGVyfGltYWdlc3wzMjA0NHxpbWFnZS9qcGVnfGFEYzVMMmcxTWk4eE16UXpPRFF3T1Rjd016UTFOQzlNVDA5TFVFZ3ROekF3T0RnNE9UVXRabkp2Ym5RdWFuQm58MGJjODU3MGE3MDIyNzYxZWE0MDViZTllZjNhOTM2ZTc1MWVjZDQ2MzU2MGIxYzU2NjUyZjJmY2E0YjgzZDUzNw'
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
                    style={{ backgroundColor: '#985F4B', borderColor: '#985F4B' }}
                >
                   View
                </Link>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;