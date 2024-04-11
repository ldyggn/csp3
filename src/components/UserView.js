import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Component for displaying products in user view
export default function UserView({productsData}) {

    // State variable to store products
	const [products, setProducts] = useState([]);

    // Effect hook to update products when productsData changes
	useEffect(() => {
        // Check if productsData exists
		if (productsData) {
            // Map through productsData to create ProductCard components for active products
			const productsArr = productsData.map(product => {
				if(product.isActive === true) {
					return (
						<ProductCard productProp={product} key={product._id}/>
					);
				} else {
					return null;
				}
			});
            // Update state with the array of ProductCard components
			setProducts(productsArr);
		}
	}, [productsData]);

    // Render the ProductCard components
	return (
		<>
			{ products }
		</>
	);
}