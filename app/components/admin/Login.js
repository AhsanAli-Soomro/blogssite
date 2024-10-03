"use client"
import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const adminPassword = ''; // Set admin password here

  const handleLogin = () => {
    if (password === adminPassword) {
      onLogin(true);
      setMessage('Login successful');
    } else {
      setMessage('Incorrect password!');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      {message && <p className="text-red-600 mb-4">{message}</p>}
      <input
        type="password"
        className="border p-2 mb-4 w-full"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
