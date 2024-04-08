import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

export default function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/`)
            .then(res => res.json())
            .then(data => {
                const numbers = [];
                const featured = [];

                const generateRandomNums = () => {
                    let randomNum = Math.floor(Math.random() * data.products.length);

                    if (numbers.indexOf(randomNum) === -1) {
                        numbers.push(randomNum);
                    } else {
                        generateRandomNums();
                    }
                };

                for (let i = 0; i < 5; i++) {
                    generateRandomNums();

                    featured.push(data.products[numbers[i]]);
                }
                setFeaturedProducts(featured);
            });
    }, []);

    return (
        <>
            <h2 className="text-center my-3">Our Best Sellers!</h2>
            <Carousel>
                {featuredProducts.map((product, index) => (
                    <Carousel.Item key={index}>
                        <Link to={`/products/${product._id}`}>
                            <img
                                className="d-block w-100"
                                src={imageMap[product.name]}
                                alt={product.name}
                                style={{ maxHeight: '300px', objectFit: 'contain' }} 
                            />
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}
