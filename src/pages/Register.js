import { Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useNavigate, Navigate, Link } from 'react-router-dom';

export default function Register() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function registerUser(e) {
        e.preventDefault();

        if (!firstName || !lastName || !email || !mobileNo || !password || !confirmPassword) {
            Swal.fire('Error', 'Please fill in all fields', 'error');
            return;
        }
    
        if (password !== confirmPassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }
    
        fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/users/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.message === "Registered Successfully"){
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword('');
                setConfirmPassword('');
                Swal.fire({
                    title: 'Registration successful',
                    icon: 'success',
                    text: "Welcome to Makeup Fever!"
                 }).then(() => {
                    navigate('/login');
                });
            } else if (data.error === "Email invalid") {
                Swal.fire('Error', 'Email invalid', 'error');
            } else if (data.error === "Mobile number invalid") {
                Swal.fire('Error', 'Mobile number invalid', 'error');
            } else if (data.error === "Password must be atleast 8 characters") {
                Swal.fire('Error', 'Password must be at least 8 characters', 'error');
            } else {
                Swal.fire('Error', 'Something went wrong.', 'error');
            }
        })
    }

    return (
        (user.id !== null) ?
            <Navigate to="/products"/>
        :
        <div className="register-container">
        <Form className="register-form" onSubmit={(e) => registerUser(e)}>
            <h1 className="register-text">Register</h1>
                <Form.Group>
                    <Form.Label className="register-text">First Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter First Name" 
                        required
                        value={firstName}
                        onChange={e => {setFirstName(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="register-text">Last Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Last Name" 
                        required
                        value={lastName}
                        onChange={e => {setLastName(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="register-text">Email:</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email" 
                        required
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="register-text">Mobile No:</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter 11 Digit No." 
                        required
                        value={mobileNo}
                        onChange={e => {setMobileNo(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="register-text">Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password" 
                        required
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="register-text">Confirm Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm Password" 
                        required
                        value={confirmPassword}
                        onChange={e => {setConfirmPassword(e.target.value)}}
                    />
                </Form.Group>
                <Button 
                className="register-button" 
                style={{  
                    backgroundColor: 'var(--primary-color)',
                    borderColor: 'var(--primary-color)',
                    color: 'white'
                }} 
                type="submit">Submit
                </Button>

            <p className="mt-3">Already have an account? <Link to="/login" className='login-link'>Login here.</Link></p>
        </Form>
        </div>
    )
}
