import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct() {
    // Hooks to access user context and navigation
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    // State variables to store product details
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    // Function to create a new product
    function createProduct(e) {
        e.preventDefault();
        // Retrieving token from local storage
        let token = localStorage.getItem('token');
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // Handling different responses from the server
                if (data.error === "Product already exists") {
                    // Display error message if product already exists
                    Swal.fire({
                        icon: "error",
                        title: "Product already exists.",
                        text: data.message
                    })
                } else if (data.error === "Failed to save the product") {
                    // Display error message if product creation fails
                    Swal.fire({
                        icon: "error",
                        title: "Unsuccessful Product Creation",
                        text: data.message
                    })
                } else {
                    // Display success message and navigate to products page on successful product creation
                    Swal.fire({
                        icon: "success",
                        title: "Product Added"
                    })
                    navigate("/products");
                }
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                // Resetting form fields after submission
                setName("");
                setDescription("");
                setPrice(0);
            });
    }

    return (
        (user.isAdmin === true) ?
            <>
                {/* Form to add a new product */}
                <div className="addproduct-container" style={{ padding: '20px', borderRadius: '5px' }}>
                    <h1 className="my-5 text-center">Add Product</h1>
                    <Form onSubmit={e => createProduct(e)}>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: 'bold' }}>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => { setName(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label style={{ fontWeight: 'bold' }}>Description:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => { setDescription(e.target.value) }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontWeight: 'bold' }}>Price:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Price" required value={price} onChange={e => { setPrice(e.target.value) }} />
                        </Form.Group>
                        {/* Button to submit the form */}
                        <Button variant="primary" type="submit" className="my-3" style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>Submit</Button>
                    </Form>
                </div>
            </>
            :
            // Redirect to products page if user is not an admin
            <Navigate to="/products" />
    )
}
