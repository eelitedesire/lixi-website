
import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import BlogManager from './BlogManager';
import ProductManager from './ProductManager';
import QuoteManager from './QuoteManager';
import ServicesAdmin from './ServicesAdmin';
import ProjectManager from './ProjectManager';
import CategoryManager from './CategoryManager';
import PartnerManager from './PartnerManager';
import HeroManager from './HeroManager';
import WhatWeDoManager from './WhatWeDoManager';
import CellTechnologyManager from './CellTechnologyManager';
import SiteSettingsManager from './SiteSettingsManager';
import FooterManager from './FooterManager';
import UserManager from './UserManager';
import ShoppingManager from './ShoppingManager';
import OrdersManager from './OrdersManager';

import TechnologyContentManager from './TechnologyContentManager';
import SolutionManager from './SolutionManager';
import AboutAdmin from './AboutAdmin';
import VideoManager from './VideoManager';

const AdminApp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (localStorage.getItem('admin-auth') === 'true') {
      const user = JSON.parse(localStorage.getItem('admin-user') || '{}');
      setCurrentUser(user);
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return <AdminLogin onLogin={(user) => { setCurrentUser(user); setAuthenticated(true); }} />;
  }

  const canAccess = (requiredRole: 'admin' | 'editor' | 'viewer') => {
    const roleHierarchy: Record<string, number> = { admin: 3, editor: 2, viewer: 1 };
    return roleHierarchy[currentUser?.role || 'viewer'] >= roleHierarchy[requiredRole];
  };

  return (
    <AdminLayout currentUser={currentUser}>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/blog" element={canAccess('editor') ? <BlogManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/products" element={canAccess('editor') ? <ProductManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/quotes" element={<QuoteManager />} />
        <Route path="/services" element={canAccess('editor') ? <ServicesAdmin /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/projects" element={canAccess('editor') ? <ProjectManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/categories" element={canAccess('admin') ? <CategoryManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/partners" element={canAccess('editor') ? <PartnerManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/hero" element={canAccess('editor') ? <HeroManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/whatwedo" element={canAccess('editor') ? <WhatWeDoManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/celltech" element={canAccess('editor') ? <CellTechnologyManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/video" element={canAccess('editor') ? <VideoManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/sitesettings" element={canAccess('admin') ? <SiteSettingsManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/footer" element={canAccess('editor') ? <FooterManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/users" element={canAccess('admin') ? <UserManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/shopping" element={canAccess('editor') ? <ShoppingManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/orders" element={<OrdersManager />} />

        <Route path="/techcontent" element={canAccess('editor') ? <TechnologyContentManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/solutions" element={canAccess('editor') ? <SolutionManager /> : <div className="p-8 text-brand-white">Access Denied</div>} />
        <Route path="/about" element={canAccess('editor') ? <AboutAdmin /> : <div className="p-8 text-brand-white">Access Denied</div>} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminApp;
