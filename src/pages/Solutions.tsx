// Solutions.tsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { solutions } from '@/data/solutions';
import { api } from '@/services/api';
import { IMAGES } from '@/data/images';
import { ArrowRight } from 'lucide-react';

const Solutions = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const { lang = 'en' } = useParams<{ lang: string }>();
  const [solutionList, setSolutionList] = useState(solutions);

  useEffect(() => {
    api.getSolutions(currentLang).then(data => {
      if (data.length) setSolutionList(data);
    }).catch(() => setSolutionList(solutions));
  }, [currentLang]);

  return (
    <>
      <Helmet><title>Solutions | LIXI Energy Systems</title></Helmet>
      <div className="pt-20 bg-[#060a07] min-h-screen">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h1 className="text-6xl font-bold text-white mb-4">
                Solutions for Every Scale
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                From residential homes to industrial facilities, LIXI has the perfect energy storage solution
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutionList.map((sol, i) => (
                <motion.div
                  key={sol.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/${lang}/solutions/${sol.slug}`} className="group block">
                    <div className="rounded-2xl overflow-hidden border border-white/5 hover:border-brand-green/30 transition-all duration-500 h-full">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={sol.image || IMAGES.family_home_solar} 
                          alt={sol.title} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-xs font-bold">
                              {sol.voltage}
                            </div>
                            <div className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold">
                              {sol.capacity}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#0d1410] p-8">
                        <h2 className="text-white text-3xl font-bold mb-3 group-hover:text-brand-green transition-colors">{sol.title}</h2>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">{sol.description}</p>
                        <div className="inline-flex items-center gap-2 text-brand-green text-sm font-semibold">
                          Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Solutions;
