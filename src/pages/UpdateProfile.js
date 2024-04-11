import React, { useState } from 'react';
import Swal from 'sweetalert2';

// Component for updating user profile
const UpdateProfile = () => {
  // State variables for user profile fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  // Function to handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      // Fetching token from local storage
      const token = localStorage.getItem('token');
      // Sending profile update request to the server
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, mobileNo }),
      });

      if (response.ok) {
        // Display success message on successful profile update
        Swal.fire({
          title: 'Success',
          text: 'Profile updated successfully',
          icon: 'success',
          onClose: () => window.location.reload(),
        });
      } else {
        // Handling error response from the server
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Failed to update profile',
          icon: 'error',
        });
      }
    } catch (error) {
      // Displaying error message if an error occurs during profile update
      Swal.fire({
        title: 'Error',
        text: 'Failed to update profile',
        icon: 'error',
      });
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white', color: '#934647' }}>
        <h2 style={{ marginBottom: '20px' }}>Update Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          {/* Input field for first name */}
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
          {/* Input field for last name */}
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
          {/* Input field for mobile number */}
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
          {/* Button for submitting profile update */}
          <button type="submit" style={{ width: '100%', backgroundColor: '#f79191', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;