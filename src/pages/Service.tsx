import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Sun, Battery, TrendingDown, MapPin, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const CALENDLY_URL = 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt';

const Service = () => {
  return (
    <>
      <Helmet>
        <title>Solar Services | LIXI Energy Systems</title>
        <meta name="description" content="Solar energy solutions across Europe, Caribbean, and Africa. Turn-key installations with LIXI battery storage." />
      </Helmet>

      <div className="pt-20 bg-[#060a07] min-h-screen">
        {/* Hero */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-bold text-white mb-6">
              Solar Energy
              <span className="block text-brand-green mt-2">Across Three Continents</span>
            </motion.h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Turn-key solar solutions with LIXI battery storage for Europe, Caribbean, and Africa
            </p>
          </div>
        </section>

        {/* Europe Section */}
        <section className="py-16 bg-[#0a0f0b]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-5xl">🇪🇺</span>
                <h2 className="text-4xl font-bold text-white">Solar Energy for Europe</h2>
              </div>
              
              <div className="bg-[#0d1410] border border-white/5 rounded-2xl p-8 mb-8">
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Solar plants lose efficiency and revenue potential over time. We repower existing PV systems by offering turn-key solutions including finance, upgrading inverters, optimizing system design and modernizing monitoring. We improve plant performance to current state-of-the-art technology.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  By integrating battery energy storage (BESS), we transform traditional solar assets into flexible energy systems. This allows owners to unlock new revenue streams through energy trading, peak shaving, higher self-consumption, and backup capability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Sun, title: 'System Repowering', desc: 'Upgrade existing PV systems to state-of-the-art technology' },
                  { icon: Battery, title: 'BESS Integration', desc: 'Add battery storage for flexibility and new revenue streams' },
                  { icon: TrendingDown, title: 'Energy Trading', desc: 'Unlock profits through peak shaving and trading' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0d1410] border border-white/5 rounded-xl p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 mb-4">
                      <item.icon className="text-brand-green" size={24} />
                    </div>
                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-[#0d1410] border border-brand-green/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-brand-green flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-white font-bold mb-2">EU Service Center - Förner Technik</h3>
                    <p className="text-white/60 text-sm mb-2">Hardtstr. 31, 53506 Kesseling, Germany</p>
                    <a href="mailto:eu-office@carbonoz.com" className="text-brand-green text-sm hover:text-white transition-colors">
                      eu-office@carbonoz.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Caribbean Section */}
        <section className="py-16 bg-[#060a07]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-5xl">🇰🇾</span>
                <h2 className="text-4xl font-bold text-white">Solar Energy for the Caribbean</h2>
              </div>
              
              <div className="bg-[#0d1410] border border-white/5 rounded-2xl p-8 mb-8">
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  CAYTECH Cayman Islands is a CARBONOZ group member and your trustworthy Solar System partner in the Cayman Islands. We install your on-and off-grid Solar Hybrid System including an affordable, reliable and efficient battery storage to make your electricity bill fun again.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  Work with us on a more eco-friendly way of living in the Cayman Islands. Solar power brings you reduced energy costs, energy independence, and environmental benefits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0d1410] border border-white/5 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Solar Kit Basic - SUN LIZZARD</h3>
                  <p className="text-white/60 mb-4">Ideal for small to medium energy households with 3 split AC units, refrigerator, washer, and water pump.</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Hybrid MPP Infinisolar On-Grid Inverter',
                      '450W Mono Panels',
                      'Total PV Power: 6,000 Watts',
                      'Works without lithium batteries',
                      'Solar Assistant monitoring',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-sm">
                    Request Quote
                  </a>
                </div>

                <div className="bg-gradient-to-br from-[#0d1410] to-[#060a07] border border-brand-green/20 rounded-xl p-8">
                  <div className="inline-block bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-xs font-bold mb-4">
                    ADVANCED
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Solar Kit Advanced - SUN IGUANA</h3>
                  <p className="text-white/60 mb-4">For larger households with 5-ton split AC, refrigerator, washer, water pump, and EV charging.</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Hybrid Growatt or Generac Inverter',
                      '450W Mono Panels',
                      'Total PV: 8,000W - 50,000W',
                      'Stackable LIXI Lithium Battery',
                      'Off-grid capable',
                      'EV charging ready',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-sm">
                    Request Quote
                  </a>
                </div>
              </div>

              <div className="bg-[#0d1410] border border-brand-green/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-brand-green flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-white font-bold mb-2">Caribbean Service Center - CAYTECH Ltd.</h3>
                    <p className="text-white/60 text-sm mb-2">P.O. BOX 8, 145 Fish Bowl Loop, Cayman Brac, KY2-2201, Cayman Islands</p>
                    <div className="flex flex-col gap-1">
                      <a href="mailto:support@caytech.biz" className="text-brand-green text-sm hover:text-white transition-colors">
                        support@caytech.biz
                      </a>
                      <a href="https://caytech.biz" target="_blank" rel="noopener noreferrer" className="text-brand-green text-sm hover:text-white transition-colors">
                        caytech.biz
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Africa Section */}
        <section className="py-16 bg-[#0a0f0b]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-5xl">🇲🇺</span>
                <h2 className="text-4xl font-bold text-white">Solar Energy for Africa</h2>
              </div>
              
              <div className="bg-[#0d1410] border border-white/5 rounded-2xl p-8 mb-8">
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Solaire Mauritius is a CARBONOZ group member committed to spearheading the renewable energy revolution in Africa. As a solar installer we offer affordable hybrid systems including powerful lithium storage systems from market leader CATL.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  Many of our customers manage a self-sufficiency rate of 90% including EV charging facility. Be part of the future of decentralized energy now!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#0d1410] border border-white/5 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Solar Kit Basic - Solaire 1</h3>
                  <p className="text-white/60 mb-4">Ideal for small households with 2 air-conditioning devices, refrigerator, washer and water pump.</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Hybrid MPP or Growatt Inverter',
                      '450W Mono Panels',
                      'Total PV Power: 5,000 Watts',
                      'Works with/without CATL batteries',
                      'Solar Assistant monitoring',
                      'Charge electric scooter',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-sm">
                    Request Quote
                  </a>
                </div>

                <div className="bg-gradient-to-br from-[#0d1410] to-[#060a07] border border-brand-green/20 rounded-xl p-8">
                  <div className="inline-block bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-xs font-bold mb-4">
                    ADVANCED
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Solar Kit Advanced - Solaire 2</h3>
                  <p className="text-white/60 mb-4">For larger households with 3+ AC units, dishwasher, washer, refrigerator, water pump and pool.</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'High Performance Deye Inverter',
                      '450W Mono Panels',
                      'Total PV: 5,000W - 50,000W',
                      'CATL Lithium Battery 14kWh',
                      'LIXI Solar Storage',
                      'EV charging ready',
                      'Off-grid capable',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary-sm">
                    Request Quote
                  </a>
                </div>
              </div>

              <div className="bg-[#0d1410] border border-brand-green/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-brand-green flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-white font-bold mb-2">Africa Service Center - buyAfraction Ltd.</h3>
                    <p className="text-white/60 text-sm mb-2">Château La Mare Ronde, Avenue Du Château, Chemin Vingt Pieds, 30513 Grand Baie, Mauritius</p>
                    <div className="flex flex-col gap-1">
                      <a href="mailto:mu-office@carbonoz.com" className="text-brand-green text-sm hover:text-white transition-colors">
                        mu-office@carbonoz.com
                      </a>
                      <a href="https://en.solaire.mu" target="_blank" rel="noopener noreferrer" className="text-brand-green text-sm hover:text-white transition-colors">
                        en.solaire.mu
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#060a07]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Go Solar?
              </h2>
              <p className="text-xl text-white/60 mb-8">
                Schedule a consultation with our regional experts to design the perfect solar system for your needs.
              </p>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-10 py-5 justify-center inline-flex">
                Schedule Consultation
              </a>
            </motion.div>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="py-16 bg-[#0a0f0b]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Our Projects</h2>
              <p className="text-white/60">Sample installations across Europe, Caribbean, and Africa</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=85', region: 'Germany', title: 'Commercial Rooftop', capacity: '50kW' },
                { image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=85', region: 'Cayman Islands', title: 'Residential Off-Grid', capacity: '8kW' },
                { image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=85', region: 'Mauritius', title: 'Solar Farm', capacity: '100kW' },
                { image: 'https://media.licdn.com/dms/image/v2/D4D22AQGSztzoUztKcg/feedshare-shrink_1280/B4DZcIzCgVIEAk-/0/1748199295305?e=1773273600&v=beta&t=Qomd8z30oZw51mx_-LsT29TrysAGniQC2PydZsbrNjk', region: 'Germany', title: 'Battery Storage', capacity: '112.5kWh' },
                { image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=85', region: 'Cayman Islands', title: 'Warehouse Solar', capacity: '25kW' },
                { image: 'https://media.licdn.com/dms/image/v2/D4D22AQHpyTbfYsc2wA/feedshare-shrink_1280/B4DZcIzCf7GkAk-/0/1748199294007?e=1773273600&v=beta&t=FvvuoqyI0mHuCIgEkF-nxS4wLRcRiac0vz3ouzOUPyc', region: 'Mauritius', title: 'Villa Installation', capacity: '12kW' },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-xl overflow-hidden border border-white/5 hover:border-brand-green/30 transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-xs font-bold">
                        {project.region}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                      <p className="text-brand-green text-sm mono">{project.capacity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/projects" className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-white transition-colors">
                View All Projects →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Service;
