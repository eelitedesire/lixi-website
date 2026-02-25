import React, { useState } from 'react';
import { users as defaultUsers } from '../data/users';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from './credentials';

const AdminLogin = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check against credentials file first
    if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminUser = { id: '1', name: 'Admin', username: ADMIN_USERNAME, email: 'admin@lixi.de', role: 'admin' };
      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem('admin-user', JSON.stringify(adminUser));
      onLogin(adminUser);
      return;
    }

    // Fallback to database users
    try {
      const users = defaultUsers;
      const user = users.find((u: any) => 
        (u.email === email || u.username === email) && u.password === password
      );
      
      if (user) {
        localStorage.setItem('admin-auth', 'true');
        localStorage.setItem('admin-user', JSON.stringify(user));
        onLogin(user);
      } else {
        setError('Invalid username/email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black/95 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="bg-brand-grey border border-brand-greyMid p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-display text-brand-white mb-6 text-center">Admin Login</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full bg-brand-black border border-brand-greyMid rounded-lg px-4 py-3 text-brand-white"
            placeholder="Username or Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            type="password"
            className="w-full bg-brand-black border border-brand-greyMid rounded-lg px-4 py-3 text-brand-white"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-brand-green text-brand-black py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
