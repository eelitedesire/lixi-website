import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const { lang = 'en' } = useParams<{ lang: string }>();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Link to={`/${lang}/quote`}>
          <motion.button
            animate={{ scale: isExpanded ? 1 : 0.9 }}
            className="bg-brand-green text-brand-black font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 animate-pulse-glow"
          >
            {isExpanded ? (
              <span className="px-6 py-4 flex items-center space-x-2">
                <MessageSquare size={20} />
                <span>Get Started</span>
              </span>
            ) : (
              <span className="p-4">
                <MessageSquare size={24} />
              </span>
            )}
          </motion.button>
        </Link>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-brand-grey text-brand-white rounded-full p-1 hover:bg-brand-greyMid transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingCTA;
