import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Battery, Cpu, Thermometer, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { adminApi } from '@/services/api';

const Technology = () => {
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    adminApi.list('technology').then(setTechnologies);
    adminApi.list('techcontent').then(data => {
      if (data.length > 0) setContent(data[0]);
    });
  }, []);

  const pageTitle = content?.pageTitle || 'Battery Technology';
  const pageDescription = content?.pageDescription || 'Understanding the science and engineering behind LIXI energy storage systems.';

  return (
    <>
      <Helmet>
        <title>Technology | LIXI Energy Systems</title>
        <meta name="description" content="Deep dive into LiFePO4 battery technology, BMS systems, and energy storage innovation." />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-h2 text-brand-white mb-6 text-center"
            >
              {pageTitle}
            </motion.h1>
            <p className="text-xl text-brand-white/70 text-center max-w-3xl mx-auto mb-16">
              {pageDescription}
            </p>

            {/* Dynamic Technologies */}
            {technologies.map((tech, index) => (
              <Card key={tech.id} glass className="mb-16">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <h2 className="font-display text-h3 text-brand-white mb-6">{tech.title}</h2>
                    <p className="text-brand-white/70 mb-6">{tech.description}</p>
                    {tech.features && tech.features.length > 0 && (
                      <div className="space-y-4">
                        {tech.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-start space-x-3">
                            <Zap className="text-brand-green flex-shrink-0 mt-1" size={20} />
                            <p className="text-brand-white/70 text-sm">{feature}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    {tech.image ? (
                      <img src={tech.image} alt={tech.title} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="bg-gradient-to-br from-brand-green/20 to-brand-black rounded-xl p-12 flex items-center justify-center">
                        <Battery className="text-brand-green" size={200} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* LiFePO4 Chemistry */}
            {content?.lifepo4 && (
            <Card glass className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-h3 text-brand-white mb-6">{content.lifepo4.title}</h2>
                  <p className="text-brand-white/70 mb-6">{content.lifepo4.description}</p>
                  <div className="space-y-4">
                    {content.lifepo4.features.map((feature: any, i: number) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Battery className="text-brand-green flex-shrink-0 mt-1" size={24} />
                        <div>
                          <h3 className="font-bold text-brand-white mb-1">{feature.title}</h3>
                          <p className="text-brand-white/70 text-sm">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-brand-green/20 to-brand-black rounded-xl p-12 flex items-center justify-center">
                  <Battery className="text-brand-green" size={200} strokeWidth={1} />
                </div>
              </div>
            </Card>
            )}

            {/* BMS Technology */}
            {content?.bms && (
            <Card glass className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-brand-green/20 to-brand-black rounded-xl p-12 flex items-center justify-center">
                  <Cpu className="text-brand-green" size={200} strokeWidth={1} />
                </div>
                <div>
                  <h2 className="font-display text-h3 text-brand-white mb-6">{content.bms.title}</h2>
                  <p className="text-brand-white/70 mb-6">{content.bms.description}</p>
                  <div className="space-y-4">
                    {content.bms.features.map((feature: any, i: number) => (
                      <div key={i}>
                        <h3 className="font-bold text-brand-white mb-1">{feature.title}</h3>
                        <p className="text-brand-white/70 text-sm">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            )}

            {/* CATL Partnership */}
            {content?.catl && (
            <Card glass>
              <h2 className="font-display text-h3 text-brand-white mb-6 text-center">{content.catl.title}</h2>
              <p className="text-brand-white/70 text-center max-w-3xl mx-auto mb-12">{content.catl.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.catl.stats.map((stat: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="text-5xl font-display text-brand-green mb-2">{stat.value}</div>
                    <div className="text-brand-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Technology;
