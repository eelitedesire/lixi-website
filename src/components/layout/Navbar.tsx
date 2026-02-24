import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useCartStore } from '@/store/cartStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const settings = useSiteSettings();
  const cartItems = useCartStore(state => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks = [
    {
      label: 'Products',
      href: '/products',
      dropdown: [
        { label: 'All Products', href: '/products' },
        { label: 'LIXI Stack 48V', href: '/products/stack-48v' },
        { label: 'LIXI Pro Rack 192V', href: '/products/pro-rack-192v' },
        { label: 'LIXI Mega 400V', href: '/products/mega-400v' },
      ],
    },
    {
      label: 'Solutions',
      href: '/solutions',
      dropdown: [
        { label: 'Overview', href: '/solutions' },
        { label: 'Residential', href: '/solutions/residential' },
        { label: 'Commercial', href: '/solutions/commercial' },
        { label: 'Industrial', href: '/solutions/industrial' },
      ],
    },
    { label: 'Shopping', href: '/shopping' },
    { label: 'Technology', href: '/technology' },
    { label: 'Projects', href: '/projects' },
    { label: 'Partners', href: '/partners' },
    { label: 'Blog', href: '/blog' },
    { label: 'Service', href: '/service' },
    { label: 'About', href: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={settings.logoUrl} alt={settings.siteName} className="w-10 h-10 object-contain" />
            <span className="font-display text-2xl text-brand-white">{settings.siteName}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="text-brand-white hover:text-brand-green transition-colors flex items-center space-x-1"
                >
                  <span>{link.label}</span>
                  {link.dropdown && <ChevronDown size={16} />}
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 glass rounded-lg overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="block px-4 py-3 text-brand-white hover:bg-brand-green hover:text-brand-black transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/checkout" className="relative">
              <ShoppingCart className="text-brand-white hover:text-brand-green transition-colors" size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-green text-brand-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to={settings.ctaButtonUrl}>
              <Button size="sm">{settings.ctaButtonText}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-brand-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-black/98 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className="block text-brand-white hover:text-brand-green transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 space-y-2 mt-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block text-brand-white/70 hover:text-brand-green transition-colors py-1 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to={settings.ctaButtonUrl} className="block pt-4">
                <Button className="w-full">{settings.ctaButtonText}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
