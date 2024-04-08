import React, { useEffect, useState, useContext, useCallback } from 'react';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';
import ProductCard from '../components/ProductCard';
import ProductSearch from '../components/ProductSearch';
import { AiOutlineShoppingCart } from 'react-icons/ai'; 
import { Link } from 'react-router-dom'; 

export default function ProductsCatalog() {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => {
        setError(null);
        const fetchUrl = user.isAdmin
            ? "http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/products/all"
            : "http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/products/";

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
            if (typeof data.message !== "string") {
                setProducts(data.products);
                setFilteredProducts(data.products);
            } else {
                setProducts([]);
                setFilteredProducts([]);
            }
        })
        .catch(error => {
            setError(error);
        })
    }, [user.isAdmin]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const handleSearch = (searchTerm) => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div style={{ marginBottom: '90px' }}> {/* Add bottom margin */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    {!user.isAdmin && (
                        <ProductSearch searchResults={filteredProducts} onSearch={handleSearch} />
                    )}
                </div>
                <div>
                    {!user.isAdmin && (
                        <Link to="/cart" style={{ fontSize: '24px', color: 'black' }}>
                            <AiOutlineShoppingCart />
                        </Link>
                    )}
                </div>
            </div>
            {error && <div>Error: {error.message}</div>}
            <div className="products-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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