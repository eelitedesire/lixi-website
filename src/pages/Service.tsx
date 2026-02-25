import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { defaultServiceData, defaultPageSettings, ServiceRegion, ServicePageSettings } from '@/data/serviceData';
import { api } from '@/services/api';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Check, ArrowRight, Sparkles, MapPin, Mail, Phone, Zap, Battery, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const iconMap: Record<string, any> = { Sun, Battery, Zap };

const ServiceModern = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0];
  const [regions, setRegions] = useState<ServiceRegion[]>(defaultServiceData);
  const [pageSettings, setPageSettings] = useState<ServicePageSettings>(defaultPageSettings);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    api.getServices(currentLanguage).then(data => {
      const serviceData = Array.isArray(data) ? data.find((item: any) => item.id === 'service-data') || data[0] : data;
      if (serviceData?.regions?.length) setRegions(serviceData.regions);
      if (serviceData?.settings) setPageSettings(serviceData.settings);
    }).catch(() => {
      setRegions(defaultServiceData);
      setPageSettings(defaultPageSettings);
    });
  }, [currentLanguage]);

  const handleAddToCart = (pkg: any, regionName: string) => {
    addItem({
      id: `service-${pkg.id}`,
      type: 'service',
      name: `${pkg.name} - ${regionName}`,
      price: pkg.price,
      details: { region: regionName }
    });
  };

  return (
    <>
      <Helmet>
        <title>Solar Services | LIXI Energy Systems</title>
        <meta name="description" content="Premium solar energy solutions across Europe, Caribbean, and Africa. Turn-key installations with LIXI battery storage." />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        {/* Hero */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-transparent to-brand-lime/10" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-6 py-2 mb-8">
                <Sparkles className="text-brand-green" size={18} />
                <span className="text-brand-green font-semibold text-sm">{pageSettings.hero.badge}</span>
              </div>
              
              <h1 className="font-display text-6xl lg:text-7xl text-brand-white mb-6">
                {pageSettings.hero.title}
                <span className="block text-brand-green mt-2">{pageSettings.hero.subtitle}</span>
              </h1>
              
              <p className="text-xl text-brand-white/70 mb-10 leading-relaxed">
                {pageSettings.hero.description}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a href={pageSettings.hero.ctaUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-green text-brand-black px-8 py-4 rounded-xl font-bold hover:bg-brand-greenDim transition-all shadow-lg shadow-brand-green/20 inline-flex items-center gap-2">
                  {pageSettings.hero.ctaText}
                  <ArrowRight size={20} />
                </a>
                <Link to={`/${currentLanguage}/projects`} className="bg-brand-grey border border-brand-greyMid text-brand-white px-8 py-4 rounded-xl font-bold hover:border-brand-green/50 transition-all inline-flex items-center gap-2">
                  View Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Regions */}
        {regions.map((region, idx) => (
          <section key={region.id} className={`py-20 ${idx % 2 === 0 ? 'bg-brand-black' : 'bg-brand-grey/20'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">{region.flag}</span>
                  <div>
                    <h2 className="font-display text-5xl text-brand-white">{region.title}</h2>
                    <p className="text-brand-green text-lg font-semibold mt-1">{region.subtitle}</p>
                  </div>
                </div>
                <div className="h-1 w-32 bg-brand-green rounded-full mb-10" />

                {/* Hero Image */}
                {region.image && (
                  <div className="relative h-96 rounded-2xl overflow-hidden mb-10 group">
                    <img src={region.image} alt={region.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent" />
                  </div>
                )}

                {/* Description */}
                <div className="grid lg:grid-cols-2 gap-6 mb-12">
                  {(Array.isArray(region.description) ? region.description : [region.description]).map((para, i) => (
                    <div key={i} className="bg-brand-grey/50 backdrop-blur-sm border border-brand-greyMid rounded-xl p-6">
                      <p className="text-brand-white/80 leading-relaxed">{para}</p>
                    </div>
                  ))}
                </div>

                {/* Packages */}
                {region.packages && region.packages.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {region.packages.map((pkg, i) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className={`relative rounded-2xl overflow-hidden ${
                          pkg.badge 
                            ? 'bg-gradient-to-br from-brand-grey via-brand-grey to-brand-green/10 border-2 border-brand-green/40' 
                            : 'bg-brand-grey/50 border border-brand-greyMid'
                        } hover:shadow-2xl hover:shadow-brand-green/10 transition-all group`}
                      >
                        {pkg.badge && (
                          <div className="absolute top-6 right-6 z-10">
                            <div className="bg-brand-green text-brand-black px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                              {pkg.badge}
                            </div>
                          </div>
                        )}

                        {pkg.image && (
                          <div className="relative h-48 overflow-hidden">
                            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent" />
                          </div>
                        )}

                        <div className="p-8">
                          <h3 className="font-display text-3xl text-brand-white mb-3">{pkg.name}</h3>
                          <p className="text-brand-white/70 mb-6 leading-relaxed">{pkg.description}</p>

                          <ul className="space-y-3 mb-8">
                            {(pkg.features || []).map((feat, fi) => (
                              <li key={fi} className="flex items-start gap-3 text-brand-white/80">
                                <Check className="text-brand-green flex-shrink-0 mt-0.5" size={20} />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex items-center justify-between pt-6 border-t border-brand-greyMid">
                            <div>
                              <div className="text-brand-white/60 text-sm mb-1">Starting from</div>
                              <div className="font-display text-3xl text-brand-green">${(pkg.price || 0).toLocaleString()}</div>
                            </div>
                            <button 
                              onClick={() => handleAddToCart(pkg, region.name)}
                              className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-bold hover:bg-brand-greenDim transition-all flex items-center gap-2 shadow-lg shadow-brand-green/20"
                            >
                              <ShoppingCart size={18} />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-brand-grey to-brand-grey/50 border border-brand-green/20 rounded-2xl p-8 hover:border-brand-green/40 transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-green/10 border border-brand-green/20 flex-shrink-0">
                      <MapPin className="text-brand-green" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-brand-white font-bold text-2xl mb-3">{region.name} Service Center</h3>
                      <p className="text-brand-white/60 mb-4">{region.address}</p>
                      <div className="flex flex-wrap gap-6">
                        <a href={`mailto:${region.contactEmail}`} className="flex items-center gap-2 text-brand-green hover:text-brand-greenDim transition-colors font-semibold">
                          <Mail size={18} />
                          {region.contactEmail}
                        </a>
                        {region.contactPhone && (
                          <a href={`tel:${region.contactPhone}`} className="flex items-center gap-2 text-brand-green hover:text-brand-greenDim transition-colors font-semibold">
                            <Phone size={18} />
                            {region.contactPhone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* Features Grid */}
        <section className="py-20 bg-brand-grey/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-display text-5xl text-brand-white mb-4">{pageSettings.whyChoose.title}</h2>
              <p className="text-brand-white/60 text-lg">{pageSettings.whyChoose.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pageSettings.whyChoose.features.map((item, i) => {
                const Icon = iconMap[item.icon] || Sun;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-brand-grey/50 border border-brand-greyMid rounded-xl p-8 hover:border-brand-green/50 transition-all text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-green/10 border border-brand-green/20 mb-4">
                      <Icon className="text-brand-green" size={32} />
                    </div>
                    <h3 className="text-brand-white font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-brand-white/60">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-brand-green/5 via-brand-black to-brand-lime/5 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-5xl text-brand-white mb-6">Ready to Go Solar?</h2>
              <p className="text-xl text-brand-white/70 mb-10 leading-relaxed">
                Schedule a consultation with our regional experts to design the perfect solar system for your needs.
              </p>
              <a href={pageSettings.hero.ctaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-brand-green text-brand-black px-10 py-5 rounded-xl text-lg font-bold hover:bg-brand-greenDim transition-all shadow-2xl shadow-brand-green/30">
                {pageSettings.hero.ctaText}
                <ArrowRight size={22} />
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceModern;
