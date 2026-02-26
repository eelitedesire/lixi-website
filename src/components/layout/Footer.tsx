import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/services/api';

const Footer = () => {
  const { t } = useTranslation('common');
  const location = useLocation();
  const lang = location.pathname.split('/')[1] || 'en';
  const currentYear = new Date().getFullYear();
  const [footer, setFooter] = useState<any>({
    logoUrl: '/images/logo.png',
    siteName: 'LIXI',
    tagline: 'Premium lithium battery storage and solar solutions.',
    socialMedia: [],
    productLinks: [],
    solutionLinks: [],
    companyLinks: [],
    locations: [],
    carbonozText: 'Powered by CARBONOZ',
    copyrightText: 'HelioAegis GmbH i.G. All rights reserved.',
  });

  useEffect(() => {
    api.getFooter(lang).then(data => {
      if (data.length > 0) setFooter(data[0]);
    }).catch(() => {});
  }, [lang]);

  const iconMap: any = {
    Linkedin, Twitter, Facebook, Instagram, Youtube
  };

  return (
    <footer className="bg-gradient-to-b from-brand-grey to-brand-black border-t border-brand-green/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,200,83,0.05),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to={`/${lang}`} className="flex items-center space-x-3 mb-6">
              <img src={footer.logoUrl} alt={footer.siteName} className="w-12 h-12 object-contain" />
              <span className="font-display text-3xl bg-gradient-to-r from-solar-orange via-solar-yellow to-solar-yellow bg-clip-text text-transparent">{footer.siteName}</span>
            </Link>
            <p className="text-brand-white/60 mb-8 leading-relaxed">
              {footer.tagline}
            </p>
            
            {/* Social Media */}
            {footer.socialMedia.length > 0 && (
              <div className="flex space-x-3">
                {footer.socialMedia.map((social: any, i: number) => {
                  const Icon = iconMap[social.icon] || Linkedin;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-brand-greyMid flex items-center justify-center text-brand-white/70 hover:bg-brand-green hover:text-brand-black transition-all hover:scale-110"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Products */}
          {footer.productLinks.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg text-brand-white mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-brand-green mr-3" />
                {t('footer.products')}
              </h3>
              <ul className="space-y-3">
                {footer.productLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <Link to={link.url} className="text-brand-white/60 hover:text-brand-green transition-colors text-sm flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Solutions */}
          {footer.solutionLinks.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg text-brand-white mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-brand-green mr-3" />
                {t('footer.solutions')}
              </h3>
              <ul className="space-y-3">
                {footer.solutionLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <Link to={link.url} className="text-brand-white/60 hover:text-brand-green transition-colors text-sm flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company */}
          {footer.companyLinks.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg text-brand-white mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-brand-green mr-3" />
                {t('footer.company')}
              </h3>
              <ul className="space-y-3">
                {footer.companyLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <Link to={link.url} className="text-brand-white/60 hover:text-brand-green transition-colors text-sm flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Locations */}
          {footer.locations.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg text-brand-white mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-brand-green mr-3" />
                Locations
              </h3>
              <div className="space-y-4">
                {footer.locations.map((loc: any, i: number) => (
                  <div key={i} className="group">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl">{loc.flag}</span>
                      <span className="text-brand-green font-bold text-xs">{loc.region}</span>
                    </div>
                    <p className="text-brand-white/50 text-xs leading-relaxed whitespace-pre-line">
                      {loc.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CARBONOZ Badge */}
        {footer.carbonozText && (
          <div className="py-8 border-t border-brand-greyMid">
            <div className="inline-flex items-center space-x-3 bg-brand-greyMid/50 px-6 py-3 rounded-full">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              <span className="text-brand-white/70 text-sm">{footer.carbonozText}</span>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="py-8 border-t border-brand-greyMid">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brand-white/40 text-sm">
              © {currentYear} {footer.copyrightText}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to={`/${lang}/legal/privacy`} className="text-brand-white/40 hover:text-brand-green transition-colors text-sm">
                {t('footer.privacy')}
              </Link>
              <Link to={`/${lang}/legal/terms`} className="text-brand-white/40 hover:text-brand-green transition-colors text-sm">
                {t('footer.terms')}
              </Link>
              <Link to={`/${lang}/faq`} className="text-brand-white/40 hover:text-brand-green transition-colors text-sm">
                {t('footer.faq')}
              </Link>
              <Link to={`/${lang}/contact`} className="text-brand-white/40 hover:text-brand-green transition-colors text-sm">
                {t('footer.contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
