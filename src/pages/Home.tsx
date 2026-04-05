import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Calendar, Zap, Shield, TrendingDown, Battery, Sun, Building2, BarChart3, Cpu, Globe, Factory, Layers, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { IMAGES } from '@/data/images';
import { adminApi, api } from '@/services/api';
import { useCountUp } from '@/hooks/useCountUp';
import { useRef, useEffect, useState } from 'react';
import { ParticleField } from '@/animations/ParticleField';
import { useCanvas } from '@/hooks/useCanvas';
import VideoShowcase from '@/components/sections/VideoShowcase';
import EnergyDashboard from '@/components/sections/EnergyDashboard';
import ImageCarousel from '@/components/ui/ImageCarousel';

const CALENDLY_URL = 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt';

const Home = () => {
  const { t } = useTranslation(['home', 'common']);
  const { lang = 'en' } = useParams<{ lang: string }>();
  const particleFieldRef = useRef<ParticleField | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [partners, setPartners] = useState<any[]>([]);
  const [whatWeDo, setWhatWeDo] = useState<any[]>([]);
  const [videoData, setVideoData] = useState<any>(null);
  const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);
  const [monitoringPlatform, setMonitoringPlatform] = useState<any>({
    title: 'Smart Energy Monitoring Platform',
    subtitle: 'Intelligent Battery Management',
    description: 'Our batteries connect to an intelligent monitoring system that provides comprehensive energy management and optimization capabilities.',
    features: [
      'Real-time energy dashboards',
      'Battery performance analytics',
      'AI charging optimization',
      'Carbon intensity tracking',
      'Historical energy data',
      'Remote access through secure client portal'
    ],
    primaryButtonText: 'View Platform Capabilities',
    primaryButtonUrl: '/technology',
    secondaryButtonText: 'Access Dashboard',
    secondaryButtonUrl: 'https://login.carbonoz.com',
    dashboardTitle: 'CARBONOZ SolarAutopilot Platform',
    dashboardSubtitle: 'Intelligent Battery Management',
    dashboardSystemId: 'MEGA-400V • System ID: LX-2024-001'
  });
  const [flagship, setFlagship] = useState<any>({
    badge: 'Flagship Product',
    title: 'Our Flagship Energy Storage System',
    subtitle: 'LIXI Mega 400V - Industrial Energy Storage System',
    description: 'The LIXI Mega represents the pinnacle of large-scale energy storage technology, designed for commercial projects and energy infrastructure.',
    features: [
      'Scalable rack architecture',
      'Designed for solar and hybrid energy systems',
      'High capacity for commercial projects',
      'Remote monitoring platform',
      'AI-powered charging optimization',
      'Carbon intensity monitoring'
    ],
    buttonText: 'View Large Battery Details',
    buttonUrl: '/flagship',
    productName: 'LIXI Mega 400V',
    productTagline: 'Industrial Energy Storage System',
    capacity: '112.5 kWh',
    voltage: '400V',
    power: '50kW',
    protection: 'IP55',
    mainImage: 'https://images.unsplash.com/photo-1545259742-b4e3efa1ee29?w=1200&q=85',
    carouselImages: []
  });
  const [hero, setHero] = useState({
    badge: 'Large-Scale Energy Storage',
    title: 'Large-Scale Battery Storage for',
    titleHighlight: 'Smart Energy Systems',
    description: 'Advanced rack battery systems combined with real-time monitoring, AI energy optimization, and carbon intensity analytics.',
    primaryButtonText: 'Explore Large Battery Systems',
    primaryButtonUrl: '/flagship',
    secondaryButtonText: 'Browse Battery Shop',
    secondaryButtonUrl: '/shopping',
    stat1Value: '112.5',
    stat1Label: 'kWh Capacity',
    stat2Value: '8000+',
    stat2Label: 'Charge Cycles',
    stat3Value: '50kW',
    stat3Label: 'Integrated PCS',
    productName: 'LIXI Mega 400V',
    productSubtitle: 'Flagship Energy Storage System',
    productCapacity: '112.5 kWh',
    productVoltage: '400V',
    productAmperage: '314Ah',
    productCells: 'CATL LiFePO4',
    productImage: IMAGES.battery_storage_1,
    productImages: [] as string[],
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
  const [siteSettings, setSiteSettings] = useState<any>({
    productsTitle: 'Energy Storage Systems',
    productsSubtitle: 'View All Products',
    productsBadge: 'Recommended for Large Projects',
    productsName: 'LIXI Mega',
    productsDesc: 'Industrial-grade 400V battery system with integrated PCS inverter for microgrids and large installations.',
    productsCapacity: '112.5 kWh',
    productsVoltage: '400V',
    productsPower: '50kW',
    productsButtonText: 'View Large Battery Details',
    productsButtonUrl: '/products/mega-400v',
    productsImage: 'https://images.unsplash.com/photo-1545259742-b4e3efa1ee29?w=1200&q=85',
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

  const { count: systemsCount, ref: systemsRef } = useCountUp(1200);

  useEffect(() => {
    api.getPartners(lang).then(data => {
      setPartners(data);
    }).catch(() => setPartners([]));
    
    api.getHero(lang).then(data => {
      if (data.length > 0) setHero(data[0]);
    }).catch(() => {});

    api.getWhatWeDo(lang).then(data => {
      if (data.length > 0) setWhatWeDo(data);
    }).catch(() => {});

    api.getCellTech(lang).then(data => {
      if (data.length > 0) setCellTech(data[0]);
    }).catch(() => {});

    api.getVideo(lang).then(data => {
      if (data.length > 0) setVideoData(data[0]);
    }).catch(() => {});

    api.getFlagship(lang).then(data => {
      if (data.length > 0) setFlagship(data[0]);
    }).catch(() => {});

    api.getMonitoringPlatform(lang).then(data => {
      if (data.length > 0) setMonitoringPlatform(data[0]);
    }).catch(() => {});

    adminApi.list('sitesettings').then(data => {
      if (data.length > 0) setSiteSettings(data[0]);
    }).catch(() => {});

    api.getProjects(lang).then(data => {
      setDynamicProjects(data);
    }).catch(() => setDynamicProjects([]));

    api.getProducts(lang).then(data => {
      setDynamicProducts(data);
    }).catch(() => setDynamicProducts([]));
  }, [lang]);

  useEffect(() => {
    const allImages = [hero.productImage, ...(hero.productImages || [])];
    if (allImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hero.productImage, hero.productImages]);

  const allImages = [hero.productImage, ...(hero.productImages || [])];

  return (
    <>
      <Helmet>
        <title>LIXI Battery | Large-Scale Battery Storage & Smart Energy Monitoring</title>
        <meta name="description" content="Advanced rack battery systems with intelligent monitoring software for energy project developers, solar installers, and commercial clients. Flagship 112.5kWh systems with AI optimization." />
        <link rel="preload" as="image" href={IMAGES.battery_storage_1} />
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
                <Factory size={16} className="text-brand-green" />
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
                <Link to={`/${lang}${hero.primaryButtonUrl}`} className="btn-primary text-lg px-8 py-4 justify-center">
                  <Battery size={20} />
                  {hero.primaryButtonText}
                </Link>
                <Link to={`/${lang}${hero.secondaryButtonUrl}`} className="btn-ghost text-lg px-8 py-4 justify-center">
                  {hero.secondaryButtonText}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
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
                <img 
                  src={allImages[currentImageIndex]} 
                  alt={hero.productName} 
                  className="w-full h-[600px] object-cover transition-opacity duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Link to={`/${lang}/hero-product`} className="text-white font-bold text-lg hover:text-brand-green transition-colors">{hero.productName}</Link>
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

      {/* FLAGSHIP PRODUCT */}
      <section className="py-24 bg-[#0a0f0b] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 rounded-full px-4 py-2 mb-6">
                <Layers size={16} className="text-brand-green" />
                <span className="text-brand-green text-sm font-bold">{flagship.badge}</span>
              </div>
              
              <h2 className="text-5xl font-bold text-white mb-6">
                {flagship.title}
              </h2>
              
              <p className="text-xl text-white/60 mb-8">
                {flagship.description}
              </p>

              <div className="space-y-4 mb-8">
                {flagship.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={20} className="text-brand-green flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to={`/${lang}${flagship.buttonUrl}`} className="btn-primary">
                {flagship.buttonText} <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <ImageCarousel 
                  images={[flagship.mainImage, ...(flagship.carouselImages || [])].filter(Boolean)}
                  className="w-full h-[600px]"
                />
                <div className="absolute top-8 right-8">
                  <div className="bg-brand-green text-brand-black font-bold px-4 py-2 rounded-full text-sm">
                    {flagship.capacity}
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <div className="text-white font-bold text-2xl mb-2">{flagship.productName}</div>
                    <div className="text-brand-green text-sm mono mb-4">{flagship.productTagline}</div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-brand-green font-bold mono">{flagship.voltage}</div>
                        <div className="text-white/50 text-xs">Voltage</div>
                      </div>
                      <div>
                        <div className="text-brand-green font-bold mono">{flagship.power}</div>
                        <div className="text-white/50 text-xs">PCS Power</div>
                      </div>
                      <div>
                        <div className="text-brand-green font-bold mono">{flagship.protection}</div>
                        <div className="text-white/50 text-xs">Protection</div>
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

      {/* ENERGY MONITORING PLATFORM */}
      <section className="py-24 bg-[#060a07]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <EnergyDashboard 
                title={monitoringPlatform.dashboardTitle}
                subtitle={monitoringPlatform.dashboardSubtitle}
                systemId={monitoringPlatform.dashboardSystemId}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-5xl font-bold text-white mb-4">
                {monitoringPlatform.title}
              </h2>
              {monitoringPlatform.subtitle && (
                <p className="text-brand-green text-lg mono mb-6">
                  {monitoringPlatform.subtitle}
                </p>
              )}
              
              <p className="text-xl text-white/60 mb-8">
                {monitoringPlatform.description}
              </p>

              <div className="space-y-4 mb-8">
                {monitoringPlatform.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={20} className="text-brand-green flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-white/50 mb-8">
                Customers can log in to view their system dashboards and access detailed performance metrics.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/${lang}${monitoringPlatform.primaryButtonUrl}`} className="btn-primary">
                  {monitoringPlatform.primaryButtonText} <ArrowRight size={16} />
                </Link>
                <a 
                  href={monitoringPlatform.secondaryButtonUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-ghost"
                >
                  <Monitor size={16} />
                  {monitoringPlatform.secondaryButtonText}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-24 bg-[#0a0f0b]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-bold text-white mb-6">
              Applications for Large Energy Storage
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Our large-scale battery systems serve diverse applications across commercial and industrial sectors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dynamicProjects.slice(0, 6).map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-white/8 hover:border-brand-green/30 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-brand-green text-brand-black font-bold px-3 py-1 rounded text-xs">
                      {project.category}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white/80 text-sm">{project.flag} {project.location}</div>
                  </div>
                </div>
                <div className="bg-[#0d1410] p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                  <div className="text-brand-green text-sm mono mb-3">{project.system} • {project.capacity}</div>
                  <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to={`/${lang}/projects`} className="btn-primary">
              View All Projects <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-24 bg-[#0a0f0b] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Battery, title: t('home:valueProps.premiumCells.title'), desc: t('home:valueProps.premiumCells.desc') },
              { icon: Shield, title: t('home:valueProps.germanEngineering.title'), desc: t('home:valueProps.germanEngineering.desc') },
              { icon: TrendingDown, title: t('home:valueProps.cutCosts.title'), desc: t('home:valueProps.cutCosts.desc') },
              { icon: Zap, title: t('home:valueProps.scalable.title'), desc: t('home:valueProps.scalable.desc') },
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
            <span className="mono-label text-brand-green">Energy Solutions</span>
            <h2 className="display-font text-white mt-2 text-5xl lg:text-7xl">
              Complete Energy<br />
              <em className="text-brand-green">Solutions</em>
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
                    <Link to={`/${lang}/whatwedo/${card.id}`} className="inline-flex items-center gap-2 text-brand-green text-sm font-semibold hover:gap-3 transition-all">
                      {t('common:buttons.learnMore')} <ArrowRight size={16} />
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
              <span className="mono-label text-brand-green">Product Overview</span>
              <h2 className="text-white mt-2 text-5xl font-bold">
                {siteSettings.productsTitle}
              </h2>
            </div>
            <Link to={`/${lang}/products`} className="text-brand-green text-sm hover:text-white transition-colors">
              {siteSettings.productsSubtitle} →
            </Link>
          </div>

          {/* Flagship Large Rack Battery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-brand-green/10 to-transparent border border-brand-green/30 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-brand-green text-brand-black font-bold px-4 py-2 rounded-full text-sm mb-4 w-fit">
                    <Factory size={16} />
                    {siteSettings.productsBadge}
                  </div>
                  <h3 className="text-white text-4xl font-bold mb-4">{siteSettings.productsName}</h3>
                  <p className="text-white/60 text-lg mb-6">{siteSettings.productsDesc}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-brand-green font-bold text-2xl mono">{siteSettings.productsCapacity}</div>
                      <div className="text-white/50 text-xs">Capacity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-brand-green font-bold text-2xl mono">{siteSettings.productsVoltage}</div>
                      <div className="text-white/50 text-xs">Voltage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-brand-green font-bold text-2xl mono">{siteSettings.productsPower}</div>
                      <div className="text-white/50 text-xs">PCS Power</div>
                    </div>
                  </div>

                  <Link to={`/${lang}${siteSettings.productsButtonUrl}`} className="btn-primary w-fit">
                    {siteSettings.productsButtonText} <ArrowRight size={16} />
                  </Link>
                </div>
                
                <div className="relative">
                  <img 
                    src={siteSettings.productsImage || IMAGES.battery_storage_1} 
                    alt={siteSettings.productsName} 
                    className="w-full h-[400px] object-cover rounded-2xl" 
                  />
                  <div className="absolute top-4 right-4 bg-brand-green text-brand-black font-bold px-3 py-1 rounded-full text-sm">
                    Flagship Product
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Battery Systems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dynamicProducts.filter(p => p.slug !== 'mega-400v').slice(0, 2).map((product, i) => (
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
                    {product.capacity_kwh} kWh
                  </div>
                </div>
                <div className="bg-[#0d1410] p-8">
                  <div className="mono text-brand-green text-xs mb-2">{product.tagline.toUpperCase()} · {product.voltage}</div>
                  <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{product.description}</p>
                  <Link to={`/${lang}/products/${product.slug}`} className="btn-primary-sm">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BATTERY SHOP */}
      <section className="py-24 bg-[#060a07] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="mono-label text-brand-green">Battery Shop</span>
            <h2 className="text-white mt-2 text-5xl font-bold">
              Battery Shop for Residential & Small Systems
            </h2>
            <p className="text-xl text-white/60 mt-4 max-w-3xl mx-auto">
              Browse our selection of smaller battery systems perfect for residential and small commercial applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {dynamicProducts.filter(p => p.slug !== 'mega-400v').slice(0, 3).map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0d1410] border border-white/8 rounded-2xl overflow-hidden hover:border-brand-green/30 transition-all duration-500"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={product.image || IMAGES.battery_rack} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-brand-green text-brand-black font-bold px-3 py-1 rounded text-xs">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mono text-brand-green text-xs mb-2">{product.tagline.toUpperCase()}</div>
                  <h3 className="text-white text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-white/50 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-brand-green font-bold">{product.capacity_kwh} kWh</div>
                    <Link to={`/${lang}/products/${product.slug}`} className="text-brand-green text-sm hover:text-white transition-colors">
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to={`/${lang}/shopping`} className="btn-primary">
              Browse Full Battery Shop <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TECHNOLOGY PLATFORM */}
      <section className="py-24 bg-[#0a0f0b]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="mono-label text-brand-green">Technology Platform</span>
            <h2 className="text-white mt-2 text-5xl font-bold">
              Advanced Energy Technology Platform
            </h2>
            <p className="text-xl text-white/60 mt-4 max-w-3xl mx-auto">
              Our comprehensive technology platform positions us as a leading provider of intelligent energy solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: 'Real-time Monitoring',
                description: 'Advanced monitoring systems provide live data on battery performance, energy flows, and system health.',
              },
              {
                icon: Cpu,
                title: 'AI Charging Optimization',
                description: 'Machine learning algorithms optimize charging patterns based on usage patterns and energy prices.',
              },
              {
                icon: Globe,
                title: 'Carbon Intensity Tracking',
                description: 'Track and optimize energy usage based on grid carbon intensity for maximum environmental impact.',
              },
              {
                icon: BarChart3,
                title: 'Data Dashboards',
                description: 'Comprehensive dashboards provide insights into energy usage, cost savings, and system performance.',
              },
              {
                icon: Shield,
                title: 'Remote Management',
                description: 'Secure remote access allows for system monitoring, diagnostics, and maintenance from anywhere.',
              },
              {
                icon: Zap,
                title: 'Grid Integration',
                description: 'Seamless integration with smart grids and energy trading platforms for maximum efficiency.',
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0d1410] border border-white/8 rounded-2xl p-8 hover:border-brand-green/30 transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/20 mb-6">
                  <tech.icon className="text-brand-green" size={28} />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">{tech.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{tech.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Platform Access CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-brand-green/10 via-brand-green/5 to-transparent border border-brand-green/30 rounded-3xl p-8">
              <h3 className="text-white text-2xl font-bold mb-4">Access Your Energy Dashboard</h3>
              <p className="text-white/60 mb-6 max-w-2xl mx-auto">
                Monitor your LIXI energy systems in real-time with our advanced monitoring platform. 
                Track performance, optimize efficiency, and manage your energy infrastructure from anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://login.carbonoz.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary text-lg px-8 py-4 justify-center"
                >
                  <Monitor size={20} />
                  Access Platform Dashboard
                </a>
                <Link to={`/${lang}/contact`} className="btn-ghost text-lg px-8 py-4 justify-center">
                  Request Demo Access
                </Link>
              </div>
            </div>
          </motion.div>
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
              <span className="mono-label text-brand-green">{t('home:cellTech.badge')}</span>
              <h2 className="text-white mt-2 mb-6 text-5xl font-bold">
                {t('home:cellTech.title')}
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-10">
                {t('home:cellTech.description')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: cellTech.feature1Icon, title: t('home:cellTech.thermalSafe.title'), body: t('home:cellTech.thermalSafe.body') },
                  { icon: cellTech.feature2Icon, title: t('home:cellTech.cycles.title'), body: t('home:cellTech.cycles.body') },
                  { icon: cellTech.feature3Icon, title: t('home:cellTech.stableVoltage.title'), body: t('home:cellTech.stableVoltage.body') },
                  { icon: cellTech.feature4Icon, title: t('home:cellTech.ecoFriendly.title'), body: t('home:cellTech.ecoFriendly.body') },
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
              Ready to Scale Your
              <span className="block text-brand-green mt-2">Energy Infrastructure?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto" ref={systemsRef}>
              Join {systemsCount}+ energy projects worldwide powered by LIXI large-scale battery storage systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-10 py-5 justify-center">
                <Calendar size={22} />
                Schedule Consultation
              </a>
              <Link to={`/${lang}/products/mega-400v`} className="btn-ghost text-lg px-10 py-5 justify-center">
                View Flagship System
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Shield, label: 'CATL Certified Cells' },
                { icon: Zap, label: 'IP55 Weatherproof' },
                { icon: Check, label: 'CE Marked' },
                { icon: Building2, label: 'CARBONOZ Integration' },
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

      {/* VIDEO SHOWCASE */}
      {videoData && (
        <VideoShowcase
          title={videoData.title}
          subtitle={videoData.subtitle}
          videoUrl={videoData.videoUrl}
          thumbnailUrl={videoData.thumbnailUrl}
          description={videoData.description}
        />
      )}

      {/* PARTNERS */}
      <section className="py-24 bg-[#0a0f0b] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="mono-label text-brand-green">Strategic Partners</span>
            <h2 className="text-white mt-2 text-5xl font-bold">
              Trusted by Industry Leaders
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
            <h3 className="text-white text-3xl font-bold mb-4">CARBONOZ Energy Trading</h3>
            <p className="text-white/60 max-w-2xl mx-auto mb-6">
              Integrated electricity trading platform for automated energy optimization and carbon intensity monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/${lang}/trading`} className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-white transition-colors">
                Learn More <ArrowRight size={16} />
              </Link>
              <a 
                href="https://login.carbonoz.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-brand-green transition-colors"
              >
                <Monitor size={16} />
                Platform Login
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
