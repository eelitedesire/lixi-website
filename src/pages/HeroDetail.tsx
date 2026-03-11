import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Zap, Monitor, ExternalLink, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import ImageCarousel from '@/components/ui/ImageCarousel';

const HeroDetail = () => {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHero();
  }, [lang]);

  const loadHero = async () => {
    try {
      const data = await api.getHero(lang);
      if (data.length > 0) {
        setHero(data[0]);
      }
    } catch (error) {
      console.error('Error loading hero:', error);
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

  if (!hero) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-white">Product not found</div>
      </div>
    );
  }

  const allImages = [hero.productImage, ...(hero.productImages || [])].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{hero.productName} | LIXI Energy Systems</title>
        <meta name="description" content={hero.description} />
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
                <span className="text-brand-green text-sm font-bold">{hero.badge}</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              {hero.productName}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl">
              {hero.description}
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
                  {hero.productCapacity}
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
                    <div className="text-brand-green font-bold text-2xl mono mb-2">{hero.productCapacity}</div>
                    <div className="text-white/70 text-sm">Energy Capacity</div>
                  </div>
                  <div className="bg-brand-grey border border-white/10 rounded-xl p-6">
                    <div className="text-brand-green font-bold text-2xl mono mb-2">{hero.productVoltage}</div>
                    <div className="text-white/70 text-sm">System Voltage</div>
                  </div>
                  <div className="bg-brand-grey border border-white/10 rounded-xl p-6">
                    <div className="text-brand-green font-bold text-2xl mono mb-2">{hero.productAmperage}</div>
                    <div className="text-white/70 text-sm">Capacity</div>
                  </div>
                  <div className="bg-brand-grey border border-white/10 rounded-xl p-6">
                    <div className="text-brand-green font-bold text-2xl mono mb-2">{hero.productCells}</div>
                    <div className="text-white/70 text-sm">Cell Type</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">Product Subtitle</h3>
                <p className="text-white/70 mb-8">{hero.productSubtitle}</p>

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

            {/* Statistics Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-brand-grey border border-white/10 rounded-2xl p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Performance Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-brand-green font-bold text-4xl mono mb-2">{hero.stat1Value}</div>
                  <div className="text-white/70">{hero.stat1Label}</div>
                </div>
                <div className="text-center">
                  <div className="text-brand-green font-bold text-4xl mono mb-2">{hero.stat2Value}</div>
                  <div className="text-white/70">{hero.stat2Label}</div>
                </div>
                <div className="text-center">
                  <div className="text-brand-green font-bold text-4xl mono mb-2">{hero.stat3Value}</div>
                  <div className="text-white/70">{hero.stat3Label}</div>
                </div>
              </div>
            </motion.div>

            {/* Product Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Product Overview</h2>
              
              <div className="bg-gradient-to-r from-brand-green/10 to-transparent border border-brand-green/30 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      <span className="text-brand-green">{hero.title}</span> {hero.titleHighlight}
                    </h3>
                    <p className="text-white/70 leading-relaxed">{hero.description}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <div className="flex items-center gap-3">
                      <Check size={20} className="text-brand-green flex-shrink-0" />
                      <span className="text-white">Premium {hero.productCells} cells</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check size={20} className="text-brand-green flex-shrink-0" />
                      <span className="text-white">{hero.productCapacity} energy capacity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check size={20} className="text-brand-green flex-shrink-0" />
                      <span className="text-white">{hero.stat1Value} {hero.stat1Label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check size={20} className="text-brand-green flex-shrink-0" />
                      <span className="text-white">Advanced monitoring and control</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center bg-brand-grey border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                Contact our energy experts to learn more about the {hero.productName} and how it can power your energy needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {hero.primaryButtonUrl && (
                  <a 
                    href={hero.primaryButtonUrl}
                    target={hero.primaryButtonUrl.startsWith('http') ? '_blank' : undefined}
                    rel={hero.primaryButtonUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    <Calendar size={20} />
                    {hero.primaryButtonText || 'Get Started'}
                  </a>
                )}
                <Link to={`/${lang}/contact`} className="btn-ghost text-lg px-8 py-4">
                  Contact Us
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

export default HeroDetail;