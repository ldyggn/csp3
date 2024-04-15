import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 

// Component for resetting password
const ResetPassword = () => {
  // State variables for password and confirmation
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  // Function to handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Fetching token from local storage
      const token = localStorage.getItem('token');
      // Sending password update request to the server
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (response.ok) { 
        Swal.fire({
          title: 'Success',
          text: 'Password reset successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate('/account');
        }, 1000);
        
        // Clearing password fields
        setPassword('');
        setConfirmPassword('');
      } else {
        // Handling error response from the server
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      // Displaying error message if an error occurs during password reset
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white', color: '#934647' }}>
        <h2 style={{ marginBottom: '20px' }}>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          {/* Input field for new password */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ fontWeight: 'bold' }}>New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          {/* Input field for confirming password */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="confirmPassword" style={{ fontWeight: 'bold' }}>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          {/* Display error message if exists */}
          {message && <div style={{ marginBottom: '20px', color: '#ff0000' }}>{message}</div>}
          {/* Button for submitting password reset */}
          <button type="submit" style={{ width: '100%', backgroundColor: '#f79191', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
