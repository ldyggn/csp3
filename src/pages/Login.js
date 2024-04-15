import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Functional component for user login
export default function Login() {

    // Access user context to check login status
    const { user, setUser } = useContext(UserContext);

    // State variables to store email, password, and form activation status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);

    // Function to authenticate user login
    function authenticate(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
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
            if (typeof data.access !== "undefined") {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to Makeup Fever!",
                    timer: 1000, 
                    timerProgressBar: true, 
                    showConfirmButton: false 
                });
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again"
                });
            }
        })
        .catch(err => {
            console.error('Error authenticating user:', err);
            Swal.fire({
                title: "Authentication failed",
                icon: "error",
                text: "Check your login details and try again"
            });
        });
        setEmail('');
        setPassword('');
    }

    // Function to retrieve user details after successful login
    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });
        })
        .catch(err => {
            console.error('Error retrieving user details:', err);
        });
    }

    // Check if email and password are provided to activate the form
    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    // Render the login form
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
                <Button 
                    className="login-button" 
                    type="submit" 
                    disabled={!isActive}
                    style={{ 
                        backgroundColor: 'var(--primary-color)',
                        borderColor: 'var(--primary-color)',
                        color: 'white'
                    }}
                >
                    Submit
                </Button>
                <p className="mt-3">Don't have an account? <Link to="/register" className='signup-link'>Register here.</Link></p>
            </Form>   
        </div>    
    );
}
