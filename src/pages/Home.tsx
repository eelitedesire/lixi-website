import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Calendar, Zap, Shield, TrendingDown, Battery, Sun, Building2 } from 'lucide-react';
import { IMAGES } from '@/data/images';
import { products } from '@/data/products';
import { useCountUp } from '@/hooks/useCountUp';
import { useRef, useEffect } from 'react';
import { ParticleField } from '@/animations/ParticleField';
import { useCanvas } from '@/hooks/useCanvas';

const CALENDLY_URL = 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt';

const Home = () => {
  const navigate = useNavigate();
  const particleFieldRef = useRef<ParticleField | null>(null);

  const canvasRef = useCanvas((ctx, frameCount) => {
    if (frameCount % 2 !== 0) return; // Run at 30fps instead of 60fps
    const canvas = ctx.canvas;
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    if (!particleFieldRef.current) {
      particleFieldRef.current = new ParticleField(width, height);
    }
    particleFieldRef.current.resize(width, height);
    particleFieldRef.current.draw(ctx);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      particleFieldRef.current?.setMouse(x, y);
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [canvasRef]);

  const { count: cyclesCount, ref: cyclesRef } = useCountUp(8000);
  const { count: systemsCount, ref: systemsRef } = useCountUp(1200);

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
                <span className="text-brand-green text-sm font-semibold">Enterprise Energy Solutions</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
                LIXI Solar &
                <span className="block text-brand-green mt-2">Electricity Storage</span>
              </h1>

              <p className="text-xl text-white/60 mb-10 leading-relaxed">
                Discover the power and reliability of cutting-edge LIXI battery technology. Advanced lithium batteries designed for modern life, offering unmatched safety, longevity, and efficiency.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4 justify-center">
                  <Calendar size={20} />
                  Get Started
                </a>
                <Link to="/products" className="btn-ghost text-lg px-8 py-4 justify-center">
                  Explore Products
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: `${cyclesCount.toLocaleString()}+`, label: 'Charge Cycles', ref: cyclesRef },
                  { value: '112.5', label: 'kWh Max', ref: null },
                  { value: '3', label: 'Continents', ref: null },
                ].map((stat, i) => (
                  <div key={i} ref={stat.ref}>
                    <div className="text-3xl font-bold text-brand-green mono">{stat.value}</div>
                    <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img src={IMAGES.battery_rack} alt="LIXI Battery System" className="w-full h-[600px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-white font-bold text-lg">LIXI Stack 48V</div>
                        <div className="text-brand-green text-sm mono">Residential System</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-2xl">14 kWh</div>
                        <div className="text-white/50 text-xs">per unit</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-brand-green font-bold mono">48V</div>
                        <div className="text-white/50 text-xs">Voltage</div>
                      </div>
                      <div>
                        <div className="text-brand-green font-bold mono">280Ah</div>
                        <div className="text-white/50 text-xs">Capacity</div>
                      </div>
                      <div>
                        <div className="text-brand-green font-bold mono">CATL</div>
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
            {[
              {
                image: IMAGES.solar_panels_roof,
                icon: Battery,
                title: 'SOLAR STORAGE',
                description: 'LiFePO4 battery banks store excess solar energy during the day and power your home at night.',
                href: '/products',
              },
              {
                image: IMAGES.family_home_solar,
                icon: Sun,
                title: 'ENERGY FREEDOM',
                description: 'Combine solar panels with LIXI batteries to cover 80–100% of your electricity needs.',
                href: '/solutions',
              },
              {
                image: IMAGES.energy_trading,
                icon: TrendingDown,
                title: 'ELECTRICITY TRADING',
                description: 'CARBONOZ platform enables automated electricity trading. Buy power when prices are low, maximize your savings.',
                href: '/shopping',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
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
                    <card.icon className="text-brand-green mb-2" size={32} />
                  </div>
                </div>
                <div className="bg-[#0d1410] p-8">
                  <h3 className="text-white text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{card.description}</p>
                  <Link to={card.href} className="inline-flex items-center gap-2 text-brand-green text-sm font-semibold hover:gap-3 transition-all">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
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
                    {product.capacity}
                  </div>
                </div>
                <div className="bg-[#0d1410] p-8">
                  <div className="mono text-brand-green text-xs mb-2">{product.category?.toUpperCase() || 'BATTERY'} · {product.voltage}</div>
                  <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{product.description}</p>
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
                <img src={IMAGES.catl_factory} alt="CATL Factory" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-8 left-8 bg-black/80 backdrop-blur border border-white/20 rounded-xl p-5">
                <div className="mono text-white/50 text-xs mb-1">CELL SUPPLIER</div>
                <div className="text-white font-black text-2xl tracking-widest">CATL</div>
                <div className="mono text-brand-green text-xs mt-1">World's #1 Battery Manufacturer</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="mono-label text-brand-green">Cell Technology</span>
              <h2 className="text-white mt-2 mb-6 text-5xl font-bold">
                Premium CATL Cells
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-10">
                Every LIXI battery uses certified CATL lithium iron phosphate (LiFePO4) cells — the same manufacturer trusted by Tesla, BMW, and Volkswagen.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🔒', title: 'Thermal Safe', body: 'LFP chemistry eliminates thermal runaway risk' },
                  { icon: '♻️', title: '8,000+ Cycles', body: 'More than 20 years of daily cycling' },
                  { icon: '⚡', title: 'Stable Voltage', body: 'Flat discharge curve from 100% to 20%' },
                  { icon: '🌱', title: 'Eco-Friendly', body: 'Non-toxic, fully recyclable materials' },
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
            {[
              { name: 'CATL', desc: 'Battery Cells', logo: 'https://carbonoz.com/assets/images/image05.jpg?v=18f6cf5e' },
              { name: 'CARBONOZ', desc: 'Energy Trading', logo: 'https://carbonoz.com/assets/images/image04.jpg?v=18f6cf5e' },
              { name: 'DEYE', desc: 'Inverters', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Deye_logo.png' },
              { name: 'Victron Energy', desc: 'Power Systems', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Victron_Energy_Logo.svg' },
              { name: 'Förner Technik', desc: 'EU Distribution', logo: 'https://via.placeholder.com/200x80/00c853/ffffff?text=FORNER' },
              { name: 'buyAfraction', desc: 'Africa Distribution', logo: 'https://via.placeholder.com/200x80/00c853/ffffff?text=buyAfraction' },
              { name: 'CAYTECH', desc: 'Caribbean Distribution', logo: 'https://caytech.biz/assets/images/logo.png?v=06c01298' },
              { name: 'HelioAegis', desc: 'Headquarters', logo: 'https://via.placeholder.com/200x80/00c853/ffffff?text=HelioAegis' },
            ].map((partner, i) => (
              <motion.div
                key={i}
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
                <div className="text-white/40 text-xs">{partner.desc}</div>
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
