import { useEffect, useState, useContext, useCallback } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';
import ProductCard from '../components/ProductCard';

export default function Products() {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    const fetchData = useCallback(() => {
        const fetchUrl = user.isAdmin
            ? "http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/products/all"
            : "http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/products/";

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.message !== "string") {
                setProducts(data.products);
            } else {
                setProducts([]);
            }
        });
    }, [user.isAdmin]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {user.isAdmin ? (
                <AdminView productsData={products} fetchData={fetchData} />
            ) : (
                <UserView productsData={products} />
            )}

            <div className="product-catalog">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}
