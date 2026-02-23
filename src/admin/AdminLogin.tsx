
import React, { useState } from 'react';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from './credentials';

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin-auth', 'true');
      onLogin();
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black/95 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="text"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
