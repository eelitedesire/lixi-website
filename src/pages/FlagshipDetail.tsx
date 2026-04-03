import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Zap, Monitor, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import ImageCarousel from '@/components/ui/ImageCarousel';

const FlagshipDetail = () => {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const [flagship, setFlagship] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlagship();
  }, [lang]);

  const loadFlagship = async () => {
    try {
      const data = await api.getFlagship(lang);
      if (data.length > 0) {
        setFlagship(data[0]);
      }
    } catch (error) {
      console.error('Error loading flagship:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!flagship) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-white">Flagship product not found</div>
      </div>
    );
  }

  const allImages = [flagship.mainImage, ...(flagship.carouselImages || [])].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{flagship.productName} | LIXI Energy Systems</title>
        <meta name="description" content={flagship.description} />
      </Helmet>

      <div className="min-h-screen bg-brand-black">
        {/* Header */}
        <section className="py-16 bg-brand-grey border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <Link 
              to={`/${lang}`} 
              className="inline-flex items-center gap-2 text-brand-green hover:text-white transition-colors mb-12"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 rounded-full px-4 py-2">
                <span className="text-brand-green text-sm font-bold">{flagship.badge}</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              {flagship.productName}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl">
              {flagship.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              {/* Image Gallery */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <ImageCarousel 
                  images={allImages}
                  className="w-full h-[600px] rounded-2xl"
                />
                <div className="absolute top-4 right-4 bg-brand-green text-brand-black font-bold px-4 py-2 rounded-full text-sm">
                  {flagship.capacity}
                </div>
              </motion.div>

              {/* Key Specifications */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">Key Specifications</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-brand-grey border border-white/10 rounded-xl p-6">
                    <div className="text-brand-green font-bold text-2xl mono mb-2">{flagship.capacity}</div>
                    <div className="text-white/70 text-sm">Energy Capacity</div>
                  </div>
                  <div className="bg-brand-grey border border-white/10 rounded-xl p-6">
                    <div className="text-brand-green font-bold text-2xl mono mb-2">{flagship.voltage}</div>
                    <div className="text-white/70 text-sm">System Voltage</div>
                  </div>
                  <div className="bg-brand-grey border border-white/10 rounded-xl p-6">
                    <div className="text-brand-green font-bold text-2xl mono mb-2">{flagship.power}</div>
                    <div className="text-white/70 text-sm">PCS Power</div>
                  </div>
                  <div className="bg-brand-grey border border-white/10 rounded-xl p-6">
                    <div className="text-brand-green font-bold text-2xl mono mb-2">{flagship.protection}</div>
                    <div className="text-white/70 text-sm">Protection Rating</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">Key Features</h3>
                <div className="space-y-4 mb-8">
                  {flagship.features?.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check size={20} className="text-brand-green flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://login.carbonoz.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                  >
                    <Monitor size={20} />
                    Access Monitoring Platform
                  </a>
                  <Link to={`/${lang}/contact`} className="btn-ghost">
                    Request Quote
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Main Features Section */}
            {flagship.features && flagship.features.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Product Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {flagship.features.map((feature: string, i: number) => (
                    <div key={i} className="bg-brand-grey border border-white/10 rounded-xl p-6 hover:border-brand-green/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 border border-brand-green/20 flex-shrink-0 mt-1">
                          <Check className="text-brand-green" size={20} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg mb-1">{feature}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Highlight Features */}
            {flagship.highlightFeatures && flagship.highlightFeatures.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Highlight Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flagship.highlightFeatures.map((feature: string, i: number) => (
                    <div key={i} className="bg-brand-grey border border-white/10 rounded-xl p-6 text-center hover:border-brand-green/30 transition-colors">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
                        <Zap className="text-brand-green" size={24} />
                      </div>
                      <h3 className="text-white font-bold mb-2">{feature}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center bg-brand-grey border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Scale Your Energy Infrastructure?</h2>
              <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                Get in touch with our energy experts to discuss your large-scale battery storage requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={`/${lang}/contact`} className="btn-primary text-lg px-8 py-4">
                  Request Consultation
                </Link>
                <a 
                  href="https://login.carbonoz.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-ghost text-lg px-8 py-4"
                >
                  <ExternalLink size={20} />
                  Platform Demo
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FlagshipDetail;