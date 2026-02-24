import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const settings = useSiteSettings();

  return (
    <footer className="bg-brand-grey border-t border-brand-greyMid relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img src={settings.logoUrl} alt={settings.siteName} className="w-12 h-12 object-contain" />
              <span className="font-display text-3xl text-brand-white">{settings.siteName}</span>
            </Link>
            <p className="text-brand-white/70 mb-6 max-w-sm">
              {settings.tagline}
            </p>
            <div className="flex space-x-4">
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-greyMid flex items-center justify-center text-brand-white/70 hover:bg-brand-green hover:text-brand-black transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-lg text-brand-white mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products/stack-48v" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  LIXI Stack 48V
                </Link>
              </li>
              <li>
                <Link to="/products/pro-rack-192v" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  LIXI Pro Rack 192V
                </Link>
              </li>
              <li>
                <Link to="/products/mega-400v" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  LIXI Mega 400V
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Compare All
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Company */}
          <div>
            <h3 className="font-display text-lg text-brand-white mb-6">Solutions</h3>
            <ul className="space-y-3 mb-8">
              <li>
                <Link to="/solutions/residential" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Residential
                </Link>
              </li>
              <li>
                <Link to="/solutions/commercial" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Commercial
                </Link>
              </li>
              <li>
                <Link to="/solutions/industrial" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Industrial
                </Link>
              </li>
            </ul>
            <h3 className="font-display text-lg text-brand-white mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/technology" className="text-brand-white/70 hover:text-brand-green transition-colors text-sm flex items-center group">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Centers */}
          <div>
            <h3 className="font-display text-lg text-brand-white mb-6">Locations</h3>
            <ul className="space-y-4">
              <li>
                <div className="glass p-3 rounded-lg hover:border-brand-green transition-all">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">{settings.location1Flag}</span>
                    <span className="text-brand-green font-bold text-sm">{settings.location1Region}</span>
                  </div>
                  <p className="text-brand-white/70 text-xs leading-relaxed whitespace-pre-line">
                    {settings.location1Name}<br />
                    {settings.location1Address}
                  </p>
                </div>
              </li>
              <li>
                <div className="glass p-3 rounded-lg hover:border-brand-green transition-all">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">{settings.location2Flag}</span>
                    <span className="text-brand-green font-bold text-sm">{settings.location2Region}</span>
                  </div>
                  <p className="text-brand-white/70 text-xs leading-relaxed whitespace-pre-line">
                    {settings.location2Name}<br />
                    {settings.location2Address}
                  </p>
                </div>
              </li>
              <li>
                <div className="glass p-3 rounded-lg hover:border-brand-green transition-all">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">{settings.location3Flag}</span>
                    <span className="text-brand-green font-bold text-sm">{settings.location3Region}</span>
                  </div>
                  <p className="text-brand-white/70 text-xs leading-relaxed whitespace-pre-line">
                    {settings.location3Name}<br />
                    {settings.location3Address}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CARBONOZ Badge */}
        <div className="mb-12">
          <div className="glass p-6 rounded-xl inline-block">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              <span className="text-brand-white/70 text-sm">{settings.carbonozText}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-greyMid">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brand-white/50 text-sm">
              © {currentYear} {settings.copyrightText}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/legal/privacy" className="text-brand-white/50 hover:text-brand-green transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/legal/terms" className="text-brand-white/50 hover:text-brand-green transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-brand-white/50 hover:text-brand-green transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/contact" className="text-brand-white/50 hover:text-brand-green transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
