import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import UpdateProfile from '../components/UpdateProfile';
import ResetPassword from '../components/ResetPassword';
import Order from './Order';

export default function Account() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
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

    const handleUpdateProfileClick = () => {
        setShowUpdateProfile(prevState => !prevState); // Toggle the state
        setShowResetPassword(false); // Hide Reset Password form if it's currently shown
    };

    const handleResetPasswordClick = () => {
        setShowResetPassword(prevState => !prevState); // Toggle the state
        setShowUpdateProfile(false); // Hide Update Profile form if it's currently shown
    };

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
                    <Col>
                        <Order />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <p onClick={handleResetPasswordClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Reset Password</p>
                        {showResetPassword && (
                            <div className="reset-password-form border rounded p-4">
                                <ResetPassword textColor="#f79191" />
                            </div>
                        )}
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p onClick={handleUpdateProfileClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Update Profile</p>
                        {showUpdateProfile && (
                            <div className="update-profile-form border rounded p-4">
                                <UpdateProfile textColor="#f79191" />
                            </div>
                        )}
                    </Col>
                </Row>
            </>
    );
}
