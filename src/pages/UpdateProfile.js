import React, { useState } from 'react';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update-profile`, {
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
    <div className="container" style={{ color: '#934647', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
      <h2 style={{ marginBottom: '20px' }}>Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="firstName" style={{ fontWeight: 'bold' }}>First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="lastName" style={{ fontWeight: 'bold' }}>Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="mobileNo" style={{ fontWeight: 'bold' }}>Mobile Number:</label>
          <input
            type="text"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#f79191', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
