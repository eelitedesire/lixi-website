import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type Language } from './i18n';
const AdminApp = lazy(() => import('./admin/index'));
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingCTA from './components/layout/FloatingCTA';
import CustomCursor from './components/layout/CustomCursor';
import ProgressBar from './components/layout/ProgressBar';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Solutions = lazy(() => import('./pages/Solutions'));
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'));
const Partners = lazy(() => import('./pages/Partners'));
const WhatWeDoDetail = lazy(() => import('./pages/WhatWeDoDetail'));
const Shopping = lazy(() => import('./pages/Shopping'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Technology = lazy(() => import('./pages/Technology'));
const Service = lazy(() => import('./pages/Service'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathLang = location.pathname.split('/')[1];
    // Don't treat 'admin' as a language
    if (pathLang === 'admin') return;
    
    if (pathLang && SUPPORTED_LANGUAGES.includes(pathLang as Language)) {
      if (i18n.language !== pathLang) {
        i18n.changeLanguage(pathLang);
        localStorage.setItem('i18nextLng', pathLang);
      }
    }
  }, [location.pathname, i18n]);

  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <CustomCursor />
      <ProgressBar />
      {!isAdminRoute && <Navbar />}
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            {/* Admin routes (no language prefix) - MUST BE FIRST */}
            <Route path="/admin/*" element={<AdminApp />} />
            
            {/* Redirect root to /en */}
            <Route path="/" element={<Navigate to="/en" replace />} />
            
            {/* Language-prefixed routes */}
            <Route path="/:lang/*" element={
              <LanguageWrapper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/solutions/:type" element={<SolutionDetail />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/whatwedo/:slug" element={<WhatWeDoDetail />} />
                  <Route path="/shopping" element={<Shopping />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/technology" element={<Technology />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/quote" element={<Quote />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/legal/privacy" element={<Privacy />} />
                  <Route path="/legal/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </LanguageWrapper>
            } />
          </Routes>
        </Suspense>
      </AnimatePresence>
      {!isAdminRoute && <FloatingCTA />}
      {!isAdminRoute && <Footer />}
      <Toaster position="bottom-right" theme="dark" />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
