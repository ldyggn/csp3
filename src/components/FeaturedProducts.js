import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import browowImage from '../images/browow.jpeg';
import matteBlushImage from '../images/matteblush.jpeg';
import moisturizingLipBalmImage from '../images/moisturizinglipbalm.JPG';
import puffLipstickImage from '../images/pufflipstick.JPG';
import matteLipstickImage from '../images/mattelipstick.JPG';
import creamyAllOverPaintImage from '../images/creamyalloverpaint.JPG';
import volumizingMascaraImage from '../images/volumizingmascara.JPG';

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
            <h2 className="text-center">Featured Products</h2>
            <Carousel className="justify-content-center">
                {featuredProducts.map((product, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={getImageForProduct(product)}
                            alt={product.name}
                        />
                        <Carousel.Caption>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <Link className="btn btn-primary" to={`/products/${product._id}`}>Details</Link>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

function getImageForProduct(product) {
    switch (product.imageName) {
        case 'Browow':
            return browowImage;
        case 'Matte Blush':
            return matteBlushImage;
        case 'Moisturizing Lipbalm':
            return moisturizingLipBalmImage;
        case 'Puff Lipstick':
            return puffLipstickImage;
        case 'Matte Lipstick':
            return matteLipstickImage;
        case 'Creamy All Over Paint':
            return creamyAllOverPaintImage;
        case 'Volumizing Mascara':
            return volumizingMascaraImage;
        default:
            return null;
    }
}
