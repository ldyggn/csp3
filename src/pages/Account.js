import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import UpdateProfile from '../components/UpdateProfile';
import ResetPassword from '../components/ResetPassword';

export default function Account() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (typeof data.user._id !== "undefined") {
                    setDetails(data.user);
                } else if (data.error === "User not found") {
                    Swal.fire({
                        title: "User not found",
                        icon: "error",
                        text: "Something went wrong, kindly contact us for assistance."
                    });
                } else {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error",
                        text: "Something went wrong, kindly contact us for assistance."
                    });
                }
            });
    }, []);

    return (
        (user.id === null) ?
            <Navigate to="/products" /> :
            <>
                <Row>
                    <Col>
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
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <div className="reset-password-form border rounded p-4">
                            <ResetPassword textColor="#f79191"/>
                        </div>
                    </Col>
                    <Col>
                        <div className="update-profile-form border rounded p-4">
                            <UpdateProfile textColor="#f79191"/>
                        </div>
                    </Col>
                </Row>
            </>
    );
}
