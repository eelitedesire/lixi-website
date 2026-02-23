
import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import BlogManager from './BlogManager';
import ProductManager from './ProductManager';
import QuoteManager from './QuoteManager';
import ServiceManager from './ServiceManager';
import ProjectManager from './ProjectManager';
import UserManager from './UserManager';
import ShoppingManager from './ShoppingManager';
import SolutionManager from './SolutionManager';
import AboutManager from './AboutManager';

const AdminApp = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('admin-auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/blog" element={<BlogManager />} />
      <Route path="/products" element={<ProductManager />} />
      <Route path="/quotes" element={<QuoteManager />} />
      <Route path="/services" element={<ServiceManager />} />
      <Route path="/projects" element={<ProjectManager />} />
      <Route path="/users" element={<UserManager />} />
      <Route path="/shopping" element={<ShoppingManager />} />
      <Route path="/solutions" element={<SolutionManager />} />
      <Route path="/about" element={<AboutManager />} />
    </Routes>
  );
};

export default AdminApp;
