import React, { useState } from 'react';
import Swal from 'sweetalert2';

const UpdateProfile = ({ textColor }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/users/update-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, mobileNo }),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Profile updated successfully',
          icon: 'success',
          onClose: () => window.location.reload(),
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Failed to update profile',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update profile',
        icon: 'error',
      });
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ color: textColor }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNo" className="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
