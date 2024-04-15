import React, { useEffect, useState, useContext, useCallback } from 'react';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';
import ProductCard from '../components/ProductCard';
import ProductSearch from '../components/ProductSearch';
import { AiOutlineShoppingCart } from 'react-icons/ai'; 
import { Link } from 'react-router-dom'; 

// Component to display products catalog
export default function ProductsCatalog() {
    // Accessing user data from context
    const { user } = useContext(UserContext);
    // State for storing all products and filtered products
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // State for error handling
    const [error, setError] = useState(null);

    // Function to fetch products data from the server
    const fetchData = useCallback(() => {
        setError(null);
        // Determine the fetch URL based on user role
        const fetchUrl = user.isAdmin
        ? `${process.env.REACT_APP_API_URL}/products/all`
        : `${process.env.REACT_APP_API_URL}/products/`;

        // Fetch data from the server
        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Update the products state with fetched data
            if (typeof data.message !== "string") {
                setProducts(data.products);
                setFilteredProducts(data.products);
            } else {
                setProducts([]);
                setFilteredProducts([]);
            }
        })
        .catch(error => {
            // Set error state if fetching fails
            setError(error);
        })
    }, [user.isAdmin]);

    // Fetch data on component mount or when user role changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    // Function to handle search filtering
    const handleSearch = (searchTerm) => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className='productscatalog-container' style={{ marginBottom: '90px' }}>
            {/* Search bar and cart icon */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    {/* Display search bar if user is not admin */}
                    {!user.isAdmin && (
                        <ProductSearch searchResults={filteredProducts} onSearch={handleSearch} />
                    )}
                </div>
                <div>
                    {/* Display cart icon if user is not admin */}
                    {!user.isAdmin && (
                        <Link to="/cart" style={{ fontSize: '24px', color: 'black' }}>
                            <AiOutlineShoppingCart />
                        </Link>
                    )}
                </div>
            </div>
            {/* Display error message if there is an error */}
            {error && <div>Error: {error.message}</div>}
            {/* Display products */}
            <div className="products-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {/* Render AdminView if user is admin, else render product cards */}
                {user.isAdmin ? (
                    <AdminView productsData={filteredProducts} fetchData={fetchData} />
                ) : (
                    filteredProducts.map(product => (
                        <ProductCard key={product._id} productProp={product} />
                    ))
                )}
            </div>
        </div>
    );     
}
