import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ productsData, fetchData }) {
    
    // State to manage products displayed in the table
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Map through productsData to create table rows for each product
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    {/* Display availability status */}
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    {/* Edit Product button */}
                    <td><EditProduct product={product._id} className="btn btn-success" /></td>
                    {/* Archive Product button */}
                    <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>
                </tr>
            );
        });
        // Update state with the newly mapped products
        setProducts(productsArr);
    }, [productsData, fetchData]);

    return (
        <div className="admin-table-container">
            <h1 className="admin-dashboard">Admin Dashboard</h1>
            <div className="table-responsive">
                {/* Table to display products */}
                <Table striped bordered hover className="admin-table">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render the products in the table body */}
                        {products}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}