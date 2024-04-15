import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import OrderHistory from './OrderHistory';

export default function Account() {
    // Accessing user context
    const { user } = useContext(UserContext);
    // State variable to store user details
    const [details, setDetails] = useState({});

    // Effect hook to fetch user details when component mounts
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                // Check if user details are fetched successfully
                if (typeof data.user._id !== "undefined") {
                    setDetails(data.user);
                } else if (data.error === "User not found") {
                    // Display error message if user not found
                    Swal.fire({
                        title: "User not found",
                        icon: "error",
                        text: "Something went wrong, kindly contact us for assistance."
                    });
                } else {
                    // Display error message for other errors
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error",
                        text: "Something went wrong, kindly contact us for assistance."
                    });
                }
            });
    }, []);

    return (
        <div className="account-container"> 
            {/* Redirect to products page if user is not logged in */}
            {(user.id === null) ?
                <Navigate to="/products" /> :
                <>
                    {/* Display account information */}
                    <Row>
                        <Col lg={4}>
                            <h1 className="my-5">My Account</h1>
                            <div className="account-info">
                                <h2>{`${details.firstName} ${details.lastName}`}</h2>
                                <hr />
                                <div className="contact-info">
                                    <h4>Contacts</h4>
                                    <p>Email: {details.email}</p>
                                    <p>Mobile No: {details.mobileNo}</p>
                                </div>
                            </div>
                            <div className="mt-5">
                                {/* Link to reset password */}
                                <Link to="/resetPassword" style={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}>Reset Password</Link>
                            </div>
                            <div className="mt-3">
                                {/* Link to update profile */}
                                <Link to="/updateProfile" style={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}>Update Profile</Link>
                            </div>
                        </Col>
                        {/* Display order history */}
                        <Col lg={8}>
                            <OrderHistory />
                        </Col>
                    </Row>
                </>
            }
        </div>
    );
}
