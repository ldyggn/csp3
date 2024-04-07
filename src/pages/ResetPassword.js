import React, { useState } from 'react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (response.ok) {
        setMessage('Password reset successfully');
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ color: '#934647', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
      <h2 style={{ marginBottom: '20px' }}>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
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
        {message && <div style={{ marginBottom: '20px', color: '#ff0000' }}>{message}</div>}
        <button type="submit" style={{ backgroundColor: '#f79191', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
