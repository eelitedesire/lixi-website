import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Calendar, Zap, Shield, TrendingDown, Battery, Sun, Building2 } from 'lucide-react';
import { IMAGES } from '@/data/images';
import { products } from '@/data/products';
import { partners as staticPartners } from '@/data/partners';
import { api } from '@/services/api';
import { useCountUp } from '@/hooks/useCountUp';
import { useRef, useEffect, useState } from 'react';
import { ParticleField } from '@/animations/ParticleField';
import { useCanvas } from '@/hooks/useCanvas';

const CALENDLY_URL = 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt';

const Home = () => {
  const particleFieldRef = useRef<ParticleField | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [partners, setPartners] = useState(staticPartners);
  const [whatWeDo, setWhatWeDo] = useState<any[]>([]);
  const [hero, setHero] = useState({
    badge: 'Enterprise Energy Solutions',
    title: 'LIXI Solar &',
    titleHighlight: 'Electricity Storage',
    description: 'Discover the power and reliability of cutting-edge LIXI battery technology. Advanced lithium batteries designed for modern life, offering unmatched safety, longevity, and efficiency.',
    primaryButtonText: 'Get Started',
    primaryButtonUrl: CALENDLY_URL,
    secondaryButtonText: 'Explore Products',
    secondaryButtonUrl: '/products',
    stat1Value: '8000+',
    stat1Label: 'Charge Cycles',
    stat2Value: '112.5',
    stat2Label: 'kWh Max',
    stat3Value: '3',
    stat3Label: 'Continents',
    productName: 'LIXI Stack 48V',
    productSubtitle: 'Residential System',
    productCapacity: '14 kWh',
    productVoltage: '48V',
    productAmperage: '280Ah',
    productCells: 'CATL',
    productImage: IMAGES.battery_rack,
  });
  const [cellTech, setCellTech] = useState({
    badge: 'Cell Technology',
    title: 'Premium CATL Cells',
    description: 'Every LIXI battery uses certified CATL lithium iron phosphate (LiFePO4) cells — the same manufacturer trusted by Tesla, BMW, and Volkswagen.',
    image: IMAGES.catl_factory,
    cardLabel: 'CELL SUPPLIER',
    cardTitle: 'CATL',
    cardSubtitle: "World's #1 Battery Manufacturer",
    feature1Icon: '🔒',
    feature1Title: 'Thermal Safe',
    feature1Body: 'LFP chemistry eliminates thermal runaway risk',
    feature2Icon: '♻️',
    feature2Title: '8,000+ Cycles',
    feature2Body: 'More than 20 years of daily cycling',
    feature3Icon: '⚡',
    feature3Title: 'Stable Voltage',
    feature3Body: 'Flat discharge curve from 100% to 20%',
    feature4Icon: '🌱',
    feature4Title: 'Eco-Friendly',
    feature4Body: 'Non-toxic, fully recyclable materials',
  });

  const canvasRef = useCanvas((ctx) => {
    // Run at ~30fps because useCanvas defaults to 30fps
    const canvas = ctx.canvas;
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    if (!particleFieldRef.current) {
      particleFieldRef.current = new ParticleField(width, height);
    }
    particleFieldRef.current.resize(width, height);
    particleFieldRef.current.draw(ctx);
  }, { enabled: isHeroVisible });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Throttle mousemove updates to animation frame to avoid flooding the particle system
    let rafScheduled = false;
    let lastX = 0;
    let lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(() => {
          particleFieldRef.current?.setMouse(lastX, lastY);
          rafScheduled = false;
        });
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [canvasRef]);

  // IntersectionObserver to enable canvas when hero is in view (preload slightly with rootMargin)
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeroVisible(true);
            obs.disconnect();
          }
        });
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [heroRef]);

  const { count: cyclesCount, ref: cyclesRef } = useCountUp(8000);
  const { count: systemsCount, ref: systemsRef } = useCountUp(1200);

  useEffect(() => {
    api.getPartners().then(data => {
      if (data.length > 0) setPartners(data);
    }).catch(() => {});
    
    api.getHero().then(data => {
      if (data.length > 0) setHero(data[0]);
    }).catch(() => {});

    api.getWhatWeDo().then(data => {
      if (data.length > 0) setWhatWeDo(data);
    }).catch(() => {});

    api.getCellTech().then(data => {
      if (data.length > 0) setCellTech(data[0]);
    }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>LIXI Energy Systems | Advanced Battery Storage Solutions</title>
        <meta name="description" content="Premium LiFePO4 battery systems engineered in Germany. From 14kWh residential to 112.5kWh industrial solutions." />
        <link rel="preload" as="image" href={IMAGES.battery_rack} />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060a07]">
        {/* Multiple Animated Background Images */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 1 }}
          >
            <img src={IMAGES.hero_solar_home} alt="" className="w-full h-full object-cover" loading="eager" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#060a07] via-[#060a07]/95 to-[#060a07]/85" />
          <canvas ref={canvasRef} className="absolute inset-0 opacity-10" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 rounded-full px-4 py-2 mb-8">
                <Zap size={16} className="text-brand-green" />
                <span className="text-brand-green text-sm font-semibold">{hero.badge}</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                {hero.title}
                <span className="block text-brand-green mt-2">{hero.titleHighlight}</span>
              </h1>

              <p className="text-xl text-white/60 mb-10 leading-relaxed">
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href={hero.primaryButtonUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4 justify-center">
                  <Calendar size={20} />
                  {hero.primaryButtonText}
                </a>
                <Link to={hero.secondaryButtonUrl} className="btn-ghost text-lg px-8 py-4 justify-center">
                  {hero.secondaryButtonText}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div ref={cyclesRef}>
                  <div className="text-3xl font-bold text-brand-green mono">{hero.stat1Value}</div>
                  <div className="text-sm text-white/50 mt-1">{hero.stat1Label}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-green mono">{hero.stat2Value}</div>
                  <div className="text-sm text-white/50 mt-1">{hero.stat2Label}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-green mono">{hero.stat3Value}</div>
                  <div className="text-sm text-white/50 mt-1">{hero.stat3Label}</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img src={hero.productImage} alt={hero.productName} className="w-full h-[600px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-white font-bold text-lg">{hero.productName}</div>
                        <div className="text-brand-green text-sm mono">{hero.productSubtitle}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-2xl">{hero.productCapacity}</div>
                        <div className="text-white/50 text-xs">per unit</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-brand-green font-bold mono">{hero.productVoltage}</div>
                        <div className="text-white/50 text-xs">Voltage</div>
                      </div>
                      <div>
                        <div className="text-brand-green font-bold mono">{hero.productAmperage}</div>
                        <div className="text-white/50 text-xs">Capacity</div>
                      </div>
                      <div>
                        <div className="text-brand-green font-bold mono">{hero.productCells}</div>
                        <div className="text-white/50 text-xs">Cells</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-brand-green/20 rounded-3xl blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-24 bg-[#0a0f0b] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Battery, title: 'Premium Cells', desc: 'CATL LiFePO4 cells with 8,000+ cycle life guarantee' },
              { icon: Shield, title: 'German Engineering', desc: 'Designed and quality-controlled in Germany' },
              { icon: TrendingDown, title: 'Cut Energy Costs', desc: 'Reduce electricity bills by 60-90% with smart storage' },
              { icon: Zap, title: 'Scalable Systems', desc: 'From 14kWh residential to multi-MWh industrial' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/20 mb-6">
                  <item.icon className="text-brand-green" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-24 bg-[#060a07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="mono-label text-brand-green">What We Do</span>
            <h2 className="display-font text-white mt-2 text-5xl lg:text-7xl">
              THREE CORE<br />
              <em className="text-brand-green">SOLUTIONS</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(whatWeDo.length > 0 ? whatWeDo : [
              {
                id: 'solar-storage',
                image: IMAGES.solar_panels_roof,
                icon: 'Battery',
                title: 'SOLAR STORAGE',
                description: 'LiFePO4 battery banks store excess solar energy during the day and power your home at night.',
              },
              {
                id: 'energy-freedom',
                image: IMAGES.family_home_solar,
                icon: 'Sun',
                title: 'ENERGY FREEDOM',
                description: 'Combine solar panels with LIXI batteries to cover 80–100% of your electricity needs.',
              },
              {
                id: 'electricity-trading',
                image: IMAGES.energy_trading,
                icon: 'TrendingDown',
                title: 'ELECTRICITY TRADING',
                description: 'CARBONOZ platform enables automated electricity trading. Buy power when prices are low, maximize your savings.',
              },
            ]).map((card, i) => {
              const IconComponent = card.icon === 'Battery' ? Battery : card.icon === 'Sun' ? Sun : TrendingDown;
              return (
                <motion.div
                  key={card.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl overflow-hidden border border-white/8 hover:border-brand-green/30 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={card.image} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <IconComponent className="text-brand-green mb-2" size={32} />
                    </div>
                  </div>
                  <div className="bg-[#0d1410] p-8">
                    <h3 className="text-white text-2xl font-bold mb-3">{card.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">{card.description}</p>
                    <Link to={`/whatwedo/${card.id}`} className="inline-flex items-center gap-2 text-brand-green text-sm font-semibold hover:gap-3 transition-all">
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 bg-[#0a0f0b]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="mono-label text-brand-green">Our Products</span>
              <h2 className="text-white mt-2 text-5xl font-bold">
                Battery Systems
              </h2>
            </div>
            <Link to="/products" className="text-brand-green text-sm hover:text-white transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-white/8 hover:border-brand-green/30 transition-all duration-500"
              >
                <div className="h-56 overflow-hidden relative bg-[#0d1410]">
                  <img src={product.image || IMAGES.battery_rack} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-brand-green text-brand-black font-bold px-3 py-1 rounded mono text-xs">
                    {product.capacity_kwh ? `${product.capacity_kwh} kWh` : ''}
                  </div>
                </div>
                <div className="bg-[#0d1410] p-8">
                  <div className="mono text-brand-green text-xs mb-2">{(product.tagline ? product.tagline.toUpperCase() : 'BATTERY')} · {product.voltage}</div>
                  <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{product.tagline}</p>
                  <Link to={`/products/${product.slug}`} className="btn-primary-sm">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATL */}
      <section className="py-24 bg-[#060a07]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-2xl overflow-hidden h-[500px]">
                <img src={cellTech.image} alt={cellTech.cardTitle} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-8 left-8 bg-black/80 backdrop-blur border border-white/20 rounded-xl p-5">
                <div className="mono text-white/50 text-xs mb-1">{cellTech.cardLabel}</div>
                <div className="text-white font-black text-2xl tracking-widest">{cellTech.cardTitle}</div>
                <div className="mono text-brand-green text-xs mt-1">{cellTech.cardSubtitle}</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="mono-label text-brand-green">{cellTech.badge}</span>
              <h2 className="text-white mt-2 mb-6 text-5xl font-bold">
                {cellTech.title}
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-10">
                {cellTech.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: cellTech.feature1Icon, title: cellTech.feature1Title, body: cellTech.feature1Body },
                  { icon: cellTech.feature2Icon, title: cellTech.feature2Title, body: cellTech.feature2Body },
                  { icon: cellTech.feature3Icon, title: cellTech.feature3Title, body: cellTech.feature3Body },
                  { icon: cellTech.feature4Icon, title: cellTech.feature4Title, body: cellTech.feature4Body },
                ].map((p, i) => (
                  <div key={i} className="bg-[#0d1a10] border border-white/6 rounded-xl p-5 hover:border-brand-green/20 transition-colors">
                    <div className="text-2xl mb-3">{p.icon}</div>
                    <div className="font-bold text-white text-sm mb-1">{p.title}</div>
                    <div className="text-white/45 text-xs leading-relaxed">{p.body}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#060a07] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,83,0.1),transparent_70%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your
              <span className="block text-brand-green mt-2">Energy Infrastructure?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto" ref={systemsRef}>
              Join {systemsCount.toLocaleString()}+ installations across Europe, Africa, and the Caribbean.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-10 py-5 justify-center">
                <Calendar size={22} />
                Get Started
              </a>
              <Link to="/products" className="btn-ghost text-lg px-10 py-5 justify-center">
                View All Products
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Shield, label: 'CATL Certified' },
                { icon: Zap, label: 'IP55 Rated' },
                { icon: Check, label: 'CE Marked' },
                { icon: Building2, label: 'CARBONOZ Partner' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 opacity-60">
                  <item.icon size={20} className="text-brand-green" />
                  <span className="text-white text-xs font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-24 bg-[#0a0f0b] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="mono-label text-brand-green">Trusted Partners</span>
            <h2 className="text-white mt-2 text-5xl font-bold">
              Global Network
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {partners.slice(0, 8).map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0d1410] border border-white/5 rounded-xl p-6 text-center hover:border-brand-green/30 transition-all"
              >
                <div className="h-16 flex items-center justify-center mb-4">
                  <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <div className="text-white font-bold text-sm mb-1">{partner.name}</div>
                <div className="text-white/40 text-xs">{partner.description}</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="bg-gradient-to-r from-brand-green/10 to-transparent border border-brand-green/20 rounded-2xl p-8 text-center"
          >
            <div className="inline-block bg-brand-green/20 text-brand-green px-4 py-2 rounded-full text-sm font-bold mb-4">
              Featured Partner
            </div>
            <h3 className="text-white text-3xl font-bold mb-4">CARBONOZ Trading Platform</h3>
            <p className="text-white/60 max-w-2xl mx-auto mb-6">
              Automated electricity trading across EU markets. Turn your LIXI battery into a revenue-generating asset.
            </p>
            <Link to="/shopping" className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-white transition-colors">
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
