import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart as CartIcon, Package, Truck } from 'lucide-react';
import { IMAGES } from '@/data/images';
import { useCartStore } from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { adminApi } from '@/services/api';
import { useTranslation } from 'react-i18next';

const CALENDLY_URL = 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt';

const Shopping = () => {
  const { items } = useCartStore();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0];
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    adminApi.list('shoppingpage').then(data => {
      if (data.length > 0) setContent(data[0]);
    });
  }, []);

  const bgImage = content?.backgroundImage || IMAGES.battery_rack;
  const title = content?.title || 'Order Your LIXI';
  const subtitle = content?.subtitle || 'Battery System';
  const description = content?.description || 'Pre-configured and ready-to-use battery packs. Delivery to any EU country with full installation support.';
  const productName = content?.productName || 'LIXI LFP LiFePO4 Battery';
  const capacity = content?.capacity || '15 kWh';
  const productDescription = content?.productDescription || 'Stack up to 14 battery cases together. Includes JK BMS with Pylontech protocol support, Bluetooth and CAN-bus monitoring.';
  const included = content?.included || [
    'Stainless steel battery case',
    'JK BMS 48V 16S with Pylontech protocol',
    'CANBUS/RS485 communication',
    'Bluetooth monitoring',
    'Installation manual',
    'Inverter compatibility guide',
  ];

  return (
    <>
      <Helmet>
        <title>Shop | LIXI Energy Systems</title>
        <meta name="description" content="Order your pre-configured LIXI battery pack. Delivery to any EU country with full support." />
      </Helmet>

      <div className="pt-20 bg-[#060a07] min-h-screen">
        {/* Hero */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h1 className="text-6xl font-bold text-white mb-6">
                {title}
                <span className="block text-brand-green mt-2">{subtitle}</span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                {description}
              </p>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: Package, title: 'Ready to Use', desc: 'Pre-configured systems' },
                { icon: Truck, title: 'EU Delivery', desc: 'Fast shipping' },
                { icon: CartIcon, title: 'Full Support', desc: 'Installation help' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0d1410] border border-white/5 rounded-xl p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 mb-4">
                    <item.icon className="text-brand-green" size={24} />
                  </div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Product */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#0d1410] to-[#060a07] border border-brand-green/20 rounded-3xl p-12 text-center overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-10">
                <img src={bgImage} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a07] via-[#060a07]/80 to-transparent" />
              
              <div className="relative z-10">
                <div className="inline-block bg-brand-green/20 text-brand-green px-4 py-2 rounded-full text-sm font-bold mb-6">
                  MOST POPULAR
                </div>
              <h2 className="text-5xl font-bold text-white mb-4">{productName}</h2>
              <div className="text-6xl font-bold text-brand-green mb-6">{capacity}</div>
              <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
                {productDescription}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
                {[
                  { label: 'Voltage', value: '51.2V' },
                  { label: 'Current', value: '200A' },
                  { label: 'Weight', value: '125kg' },
                  { label: 'Warranty', value: '1 Year' },
                ].map((spec, i) => (
                  <div key={i} className="bg-black/30 rounded-xl p-4">
                    <div className="text-brand-green font-bold mono text-xl">{spec.value}</div>
                    <div className="text-white/50 text-sm">{spec.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate(`/${currentLanguage}/checkout`)} 
                  className="btn-primary text-lg px-10 py-5 justify-center"
                >
                  View Cart ({items.length})
                </button>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost text-lg px-10 py-5 justify-center">
                  Schedule Consultation
                </a>
              </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="bg-[#0d1410] border border-white/5 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {included.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="bg-[#0d1410] border border-white/5 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Support & Installation</h3>
                <p className="text-white/60 mb-6">
                  We provide comprehensive support for choosing the right inverter and wiring your system. Our easy-to-understand tutorials guide you through panel and inverter installation.
                </p>
                <a href="/contact" className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-white transition-colors">
                  Contact Support →
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Shopping;
