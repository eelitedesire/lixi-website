import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultAboutData, AboutData } from '@/data/aboutData';
import { api } from '@/services/api';
import { Zap, Shield, Users, Leaf, Target, Eye, TrendingUp } from 'lucide-react';

const iconMap: Record<string, any> = { Zap, Shield, Users, Leaf, Target, Eye, TrendingUp };

const AboutModern = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const [data, setData] = useState<AboutData>(defaultAboutData);

  useEffect(() => {
    api.getAbout(currentLang).then(result => {
      const aboutData = Array.isArray(result) ? result.find((item: any) => item.id === 'about-data') || result[0] : result;
      if (aboutData?.data) setData(aboutData.data);
    }).catch(() => setData(defaultAboutData));
  }, [currentLang]);

  return (
    <>
      <Helmet>
        <title>About Us | LIXI Energy Systems</title>
        <meta name="description" content={data.hero.description} />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        {/* Hero */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-transparent to-brand-lime/10" />
          {data.hero.image && (
            <div className="absolute inset-0 opacity-20">
              <img src={data.hero.image} alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/50 to-brand-black" />
            </div>
          )}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
              <h1 className="font-display text-6xl lg:text-7xl text-brand-white mb-4">
                {data.hero.title}
                <span className="block text-brand-green mt-2">{data.hero.subtitle}</span>
              </h1>
              <p className="text-xl text-brand-white/70 leading-relaxed">{data.hero.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-brand-grey/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-display text-brand-green mb-2">{stat.value}</div>
                  <div className="text-brand-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-brand-grey/50 border border-brand-greyMid rounded-2xl p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-green/10 border border-brand-green/20 mb-6">
                  <Target className="text-brand-green" size={28} />
                </div>
                <h2 className="font-display text-4xl text-brand-white mb-4">{data.mission.title}</h2>
                <p className="text-brand-white/70 leading-relaxed">{data.mission.description}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-brand-grey/50 border border-brand-greyMid rounded-2xl p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-green/10 border border-brand-green/20 mb-6">
                  <Eye className="text-brand-green" size={28} />
                </div>
                <h2 className="font-display text-4xl text-brand-white mb-4">{data.vision.title}</h2>
                <p className="text-brand-white/70 leading-relaxed">{data.vision.description}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-brand-grey/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-display text-5xl text-brand-white mb-4">Our Values</h2>
              <p className="text-brand-white/60 text-lg">The principles that guide everything we do</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.values.map((value, i) => {
                const Icon = iconMap[value.icon] || Zap;
                return (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-brand-grey/50 border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition-all text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-green/10 border border-brand-green/20 mb-4">
                      <Icon className="text-brand-green" size={32} />
                    </div>
                    <h3 className="text-brand-white font-bold text-xl mb-2">{value.title}</h3>
                    <p className="text-brand-white/60 text-sm">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-5xl text-brand-white mb-8 text-center">{data.story.title}</h2>
              <div className="space-y-6">
                {data.story.paragraphs.map((para, i) => (
                  <p key={i} className="text-brand-white/70 text-lg leading-relaxed">{para}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        {data.timeline.length > 0 && (
          <section className="py-20 bg-brand-grey/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-display text-5xl text-brand-white mb-4">Our Journey</h2>
                <p className="text-brand-white/60 text-lg">Key milestones in our growth</p>
              </motion.div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-brand-green/20" />
                <div className="space-y-12">
                  {data.timeline.map((milestone, i) => (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <div className="bg-brand-grey/50 border border-brand-greyMid rounded-xl p-6">
                          <div className="text-brand-green font-bold text-sm mb-2">{milestone.year}</div>
                          <h3 className="text-brand-white font-bold text-xl mb-2">{milestone.title}</h3>
                          <p className="text-brand-white/60">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-brand-green border-4 border-brand-black relative z-10" />
                      <div className="flex-1" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Team */}
        {data.team.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="font-display text-5xl text-brand-white mb-4">Our Team</h2>
                <p className="text-brand-white/60 text-lg">Meet the people behind LIXI</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {data.team.map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-brand-grey/50 border border-brand-greyMid rounded-xl overflow-hidden hover:border-brand-green/50 transition-all"
                  >
                    {member.image && (
                      <div className="h-64 overflow-hidden">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-brand-white font-bold text-xl mb-1">{member.name}</h3>
                      <p className="text-brand-green text-sm mb-3">{member.role}</p>
                      <p className="text-brand-white/60 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default AboutModern;
