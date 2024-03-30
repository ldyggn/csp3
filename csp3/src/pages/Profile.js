// Profile.js
import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import UpdateProfile from '../components/UpdateProfile';
import ResetPassword from '../components/ResetPassword';

export default function Profile() {
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
                    <Col className="p-5 bg-primary text-white">
                        <h1 className="my-5">Profile</h1>
                        <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                        <hr />
                        <h4>Contacts</h4>
                        <ul>
                            <li>Email: {details.email}</li>
                            <li>Mobile No: {details.mobileNo}</li>
                        </ul>
                    </Col>
                </Row>
                <Row  className="mt-5">
                    <Col>
                        <ResetPassword />
                    </Col>
                </Row>
				<Row className="mt-5">
                    <Col>
                        <UpdateProfile/>
                    </Col>
                </Row>
            </>
    );
}
