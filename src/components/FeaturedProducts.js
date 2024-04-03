import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageMap = {
    'Browow': 'https://blkcosmetics.com.ph/cdn/shop/files/BrowSculptingPencilDuo_NaturalBrown_f1eb7405-701c-4a1e-8126-70eaac9d7038_720x.png?v=1691670903',
    'Matte Blush': 'https://blkcosmetics.com.ph/cdn/shop/files/PowderPalette_BlushChampagneCaramel_720x.png?v=1691672016',
    'Moisturizing Lipbalm': 'https://blkcosmetics.com.ph/cdn/shop/files/MLBB1_720x.png?v=1698320717',
    'Puff Lipstick': 'https://blkcosmetics.com.ph/cdn/shop/files/airy-matte-tint-websiPNGite-thumbnail-Artboard-1_720x.png?v=1703825659',
    'Matte Lipstick': 'https://blkcosmetics.com.ph/cdn/shop/files/PillowMatte_Flirt_720x.png?v=1701331855',
    'Creamy All Over Paint': 'https://blkcosmetics.com.ph/cdn/shop/files/Mood_0_island_rose_720x.jpg?v=1710663765',
    'Volumizing Mascara': 'https://blkcosmetics.com.ph/cdn/shop/files/VolumeLashExtension_720x.jpg?v=1688361307',
    'Eyeshadow Pallette': 'https://blkcosmetics.com.ph/cdn/shop/files/EyePalette_Nude_720x.png?v=1691671219'
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
