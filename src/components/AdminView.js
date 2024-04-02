import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ productsData, fetchData }) {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td><EditProduct product={product._id} className="btn btn-success" /></td>
                    <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>
                </tr>
            );
        });
        setProducts(productsArr);
    }, [productsData, fetchData]);

    return (
        <div className="admin-table-container">
            <h1 className="admin-dashboard">Admin Dashboard</h1>
            <div className="table-responsive">
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
                        {products}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
