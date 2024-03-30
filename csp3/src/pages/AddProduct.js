import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import UserContext from '../UserContext'

export default function AddProduct() {
	// use navigate
	const navigate = useNavigate();

	// Global scope/context of the user
	const {user} = useContext(UserContext);

	// input states
	const [name,setName] = useState("");
	const [description, setDescription] = useState("");
	const [price,setPrice] = useState(0);

	function createProduct(e){
		// prevent submit event's default behavior
		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/products/',{
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

			if(data.error === "Product already exists"){

				Swal.fire({
					icon: "error",
					title: "Product already exists.",
					text: data.message
				})
			} else if (data.error === "Failed to save the product") {
				Swal.fire({
					icon:"error",
					title:"Unsuccesful Product Creation",
					text: data.message
				})
			} else {
				Swal.fire({
					icon:"success",
					title:"Product Added"
				})

				navigate("/products");
			}
		})
		setName("")
		setDescription("")
		setPrice(0);		
	}

	return (

		(user.isAdmin === true)
		?
		<>
			<h1 className="my-5 text-center"> Add Product</h1>
			<Form onSubmit={e => createProduct(e)}>
				<Form.Group>
					<Form.Label>Name:</Form.Label>
					<Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Description:</Form.Label>
					<Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Price:</Form.Label>
					<Form.Control type="text" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
				</Form.Group>
				<Button variant="primary" type="submit" className="my-5">Submit</Button>
			</Form>
		</>
		:
		<Navigate to="/products"/>
	)
}