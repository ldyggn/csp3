import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Login() {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {

	        e.preventDefault();
			fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/users/login',{

			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({

				email: email,
				password: password

			})
		})
		.then(res => res.json())
		.then(data => {

			if(typeof data.access !== "undefined"){

				localStorage.setItem('token', data.access);

				retrieveUserDetails(data.access);

				Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome to Makeup Fever!"
				});
			
			} else if (data.error === "No Email Found") {

				Swal.fire({
					title: "Authentication failed",
					icon: "error",
					text: "Check your login details and try again"
				});
			} else {

				Swal.fire({
					title: "Authentication failed",
					icon: "error",
					text: "Check your login details and try again"
				});
			}
		})
	
		setEmail('');
		setPassword('');


	    }

	const retrieveUserDetails = (token) => {
		fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/users/details', {
			headers: {
				Authorization: `Bearer ${ token }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setUser({
				id: data.user._id,
				isAdmin: data.user.isAdmin
			})
		})
	}

    useEffect(() => {

        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);


    return (	
	    	
    		(user.id !== null) ?
    			<Navigate to="/products"/>
    		:
			<div className='login-container'>
	        <Form className="login-form" onSubmit={(e) => authenticate(e)}>
		    	<h1>Login</h1>
		        <Form.Group controlId="userEmail">
		            <Form.Label>Email address</Form.Label>
		            <Form.Control 
		                type="email" 
		                placeholder="Enter email"
		                value={email}
		    			onChange={(e) => setEmail(e.target.value)}
		                required
		            />
		        </Form.Group>

		        <Form.Group controlId="password">
		            <Form.Label className='mt-3'>Password</Form.Label>
		            <Form.Control 
		                type="password" 
		                placeholder="Password"
		                value={password}
		    			onChange={(e) => setPassword(e.target.value)}
		                required
		            />
	            </Form.Group>

				<Button className="login-button" type="submit" 
				
				style={{  backgroundColor: 'var(--primary-color)',
    			borderColor: 'var(--primary-color)',
   				color: 'white'
  				}}
  				
				disabled={!isActive}>Submit</Button>

			<p className="mt-3">Don't have an account? <Link to="/register" className='signup-link'>Register here.</Link></p>
	        </Form>   
			</div>    
    )
}