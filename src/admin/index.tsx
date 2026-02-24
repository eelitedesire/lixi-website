
import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import BlogManager from './BlogManager';
import ProductManager from './ProductManager';
import QuoteManager from './QuoteManager';
import ServiceManager from './ServiceManager';
import ProjectManager from './ProjectManager';
import PartnerManager from './PartnerManager';
import HeroManager from './HeroManager';
import WhatWeDoManager from './WhatWeDoManager';
import CellTechnologyManager from './CellTechnologyManager';
import SiteSettingsManager from './SiteSettingsManager';
import FooterManager from './FooterManager';
import UserManager from './UserManager';
import ShoppingManager from './ShoppingManager';
import OrdersManager from './OrdersManager';
import ComparisonManager from './ComparisonManager';
import TechnologyManager from './TechnologyManager';
import TechnologyContentManager from './TechnologyContentManager';
import SolutionManager from './SolutionManager';
import AboutManager from './AboutManager';
import ServiceCentersManager from './ServiceCentersManager';

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
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/blog" element={<BlogManager />} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/quotes" element={<QuoteManager />} />
        <Route path="/services" element={<ServiceManager />} />
        <Route path="/projects" element={<ProjectManager />} />
        <Route path="/partners" element={<PartnerManager />} />
        <Route path="/hero" element={<HeroManager />} />
        <Route path="/whatwedo" element={<WhatWeDoManager />} />
        <Route path="/celltech" element={<CellTechnologyManager />} />
        <Route path="/sitesettings" element={<SiteSettingsManager />} />
        <Route path="/footer" element={<FooterManager />} />
        <Route path="/users" element={<UserManager />} />
        <Route path="/shopping" element={<ShoppingManager />} />
        <Route path="/orders" element={<OrdersManager />} />
        <Route path="/comparison" element={<ComparisonManager />} />
        <Route path="/technology" element={<TechnologyManager />} />
        <Route path="/techcontent" element={<TechnologyContentManager />} />
        <Route path="/solutions" element={<SolutionManager />} />
        <Route path="/about" element={<AboutManager />} />
        <Route path="/servicecenters" element={<ServiceCentersManager />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminApp;
