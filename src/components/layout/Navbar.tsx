import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useCartStore } from '@/store/cartStore';
import { useCategories } from '@/hooks/useCategories';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = location.pathname.split('/')[1] || i18n.language.split('-')[0] || 'en';
  const { t } = useTranslation('common');
  const settings = useSiteSettings();
  const cartItems = useCartStore(state => state.items);
  const categories = useCategories();

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
      label: t('nav.products'),
      href: `/${lang}/products`,
      dropdown: [
        { label: t('nav.allProducts'), href: `/${lang}/products` },
        ...categories.map(cat => ({
          label: cat.name,
          href: `/${lang}/products?category=${cat.slug}`
        }))
      ],
    },
    {
      label: t('nav.solutions'),
      href: `/${lang}/solutions`,
      dropdown: [
        { label: t('nav.overview'), href: `/${lang}/solutions` },
        { label: t('nav.residential'), href: `/${lang}/solutions/residential` },
        { label: t('nav.commercial'), href: `/${lang}/solutions/commercial` },
        { label: t('nav.industrial'), href: `/${lang}/solutions/industrial` },
      ],
    },
    { label: t('nav.shopping'), href: `/${lang}/shopping` },
    { label: t('nav.technology'), href: `/${lang}/technology` },
    { label: t('nav.projects'), href: `/${lang}/projects` },
    { label: t('nav.partners'), href: `/${lang}/partners` },
    { label: t('nav.blog'), href: `/${lang}/blog` },
    { label: t('nav.service'), href: `/${lang}/service` },
    { label: t('nav.about'), href: `/${lang}/about` },
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
          <Link to={`/${lang}`} className="flex items-center space-x-3">
            <img src={settings.logoUrl} alt={settings.siteName} className="w-10 h-10 object-contain" />
            <span className="font-display text-2xl bg-gradient-to-r from-solar-orange via-solar-yellow to-solar-yellow bg-clip-text text-transparent">{settings.siteName}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="text-brand-white hover:text-brand-green transition-colors flex items-center space-x-1 text-sm whitespace-nowrap"
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
                        className="absolute top-full left-0 mt-2 w-48 glass rounded-lg overflow-hidden shadow-xl"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="block px-4 py-3 text-sm text-brand-white hover:bg-brand-green hover:text-brand-black transition-colors"
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
          <div className="hidden xl:flex items-center gap-3">
            <LanguageSwitcher />
            <Link to={`/${lang}/checkout`} className="relative">
              <ShoppingCart className="text-brand-white hover:text-brand-green transition-colors" size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-green text-brand-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to={`/${lang}${settings.ctaButtonUrl}`}>
              <Button size="sm" className="whitespace-nowrap text-sm px-4">{t('nav.getQuote')}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <Link to={`/${lang}/checkout`} className="relative">
              <ShoppingCart className="text-brand-white hover:text-brand-green transition-colors" size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-green text-brand-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              className="text-brand-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-brand-black/98 backdrop-blur-md border-t border-brand-greyMid"
          >
            <div className="px-4 py-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className="block text-brand-white hover:text-brand-green transition-colors py-2 font-medium"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 space-y-2 mt-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block text-brand-white/70 hover:text-brand-green transition-colors py-1.5 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to={`/${lang}${settings.ctaButtonUrl}`} className="block pt-4">
                <Button className="w-full">{t('nav.getQuote')}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
