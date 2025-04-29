// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      // Simulate login by storing a dummy token in localStorage
      localStorage.setItem('authToken', 'dummy-auth-token');
      localStorage.setItem('username', username); // Store username
      navigate('/'); // Redirect to home page after login
    } else {
      setError('Username cannot be empty');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '10px 20px' }}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
