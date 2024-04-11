import { Button, Modal, Form } from "react-bootstrap";
import { useState } from 'react';
import Swal from "sweetalert2";

export default function EditProduct({ product, fetchData }) {
    // State variables to manage form inputs and modal visibility
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    // Function to open the edit modal and fetch product data
    const openEdit = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProductId(data.product._id);
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
            });
        setShowEdit(true);
    };

    // Function to close the edit modal and reset form inputs
    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice('');
    };

    // Function to submit edited product data
    const editProduct = (e, productId) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Display success or error message
                if (data.message === "Product updated successfully") {
                    Swal.fire({
                        title: 'Success!',
                        icon: "success",
                        text: 'Product successfully updated'
                    });
                    closeEdit();
                } else {
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: 'Error in updating a product.'
                    });
                    closeEdit();
                }
            });
    };

    return (
        <>
            {/* Button to open edit modal */}
            <Button variant="success" size="sm" onClick={() => openEdit(product)}>Edit</Button>
            {/* Edit product modal */}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Form inputs for editing product */}
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          value={name}
                                          onChange={e => setName(e.target.value)}
                                          required/>
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"
                                          value={description}
                                          onChange={e => setDescription(e.target.value)}
                                          required/>
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number"
                                          value={price}
                                          onChange={e => setPrice(e.target.value)}
                                          required/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* Button to close modal */}
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        {/* Button to submit edited product */}
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
