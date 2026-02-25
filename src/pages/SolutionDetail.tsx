import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Zap, Shield, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { products } from '@/data/products';
import { solutions } from '@/data/solutions';
import { api } from '@/services/api';

const solutionData = {
  residential: {
    title: 'Residential Solar + Storage',
    hero: 'Energy independence for your home',
    description: 'Complete solar and battery solutions for homeowners. Reduce bills, gain backup power, and achieve energy freedom.',
    image: 'https://media.licdn.com/dms/image/v2/D4D22AQHESakHPow7TA/feedshare-shrink_2048_1536/B4DZlQaeZuG8Aw-/0/1757990749549?e=1773273600&v=beta&t=G1V6oPlENzr9cByYQypIMYmbS-MHERlQocwKdqBjhOY',
    benefits: [
      'Eliminate or drastically reduce electricity bills',
      'Backup power during grid outages',
      'Increase home value by 4-6%',
      'Smart home integration',
      'EV charging optimization',
      'CARBONOZ smart buying for lowest rates',
    ],
    systems: ['LIXI Stack 48V'],
    capacity: '14-56 kWh',
    typical: '3-4 bedroom home',
    payback: '6-8 years',
  },
  commercial: {
    title: 'Commercial & C&I Solutions',
    hero: 'Reduce operating costs and carbon footprint',
    description: 'Scalable energy storage for businesses, offices, retail, and light industrial facilities.',
    image: 'https://coldwellenergy.com/wp-content/uploads/2023/02/industrial-plant-solar-system.jpg',
    benefits: [
      'Peak demand charge reduction',
      'Power quality improvement',
      'Business continuity during outages',
      'Corporate sustainability goals',
      'Tax incentives and accelerated depreciation',
      'Automated energy cost optimization',
    ],
    systems: ['LIXI Pro Rack 192V', 'LIXI Stack 48V'],
    capacity: '20-400 kWh',
    typical: 'Office, retail, hotel, warehouse',
    payback: '4-6 years',
  },
  industrial: {
    title: 'Industrial & Microgrid',
    hero: 'Mission-critical power for large facilities',
    description: 'High-capacity systems for manufacturing, data centers, microgrids, and utility-scale applications.',
    image: 'https://media.licdn.com/dms/image/v2/D4D22AQGmUw0A22GZmg/feedshare-shrink_2048_1536/B4DZlQaeZkJcAw-/0/1757990748387?e=1773273600&v=beta&t=9FAw96GvO2_D7zNi_IMfUphr6fApAlQXwyEykOoxHPs',
    benefits: [
      'Grid independence and resilience',
      'Demand response participation',
      'Renewable energy integration',
      'Power quality and reliability',
      'Scalable to multi-MW capacity',
      'Remote monitoring and control',
    ],
    systems: ['LIXI Mega 400V'],
    capacity: '112.5 kWh - 10+ MWh',
    typical: 'Factory, data center, microgrid, resort',
    payback: '3-5 years',
  },
};

const SolutionDetail = () => {
  const { type, lang = 'en' } = useParams<{ type: string; lang: string }>();
  const [solutionList, setSolutionList] = useState(solutions);
  
  useEffect(() => {
    api.getSolutions().then(data => {
      if (data.length) setSolutionList(data);
    }).catch(() => setSolutionList(solutions));
  }, []);

  const dbSolution = solutionList.find(s => s.slug === type);
  const solution = solutionData[type as keyof typeof solutionData];

  if (!solution && !dbSolution) {
    return <div className="pt-20 min-h-screen bg-brand-black text-white flex items-center justify-center">Solution not found</div>;
  }

  const displaySolution = solution || {
    title: dbSolution!.title,
    hero: dbSolution!.description,
    description: dbSolution!.description,
    image: dbSolution!.image || '',
    benefits: [],
    systems: [],
    capacity: dbSolution!.capacity,
    typical: dbSolution!.category,
    payback: 'Contact for details',
  };

  const recommendedProducts = solution ? products.filter(p => solution.systems.includes(p.name)) : [];

  return (
    <>
      <Helmet>
        <title>{displaySolution.title} | LIXI Energy Systems</title>
        <meta name="description" content={displaySolution.description} />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to={`/${lang}/solutions`} className="inline-flex items-center text-brand-green hover:text-brand-lime mb-8">
              <ArrowLeft size={20} className="mr-2" /> Back to Solutions
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="font-display text-h2 text-brand-white mb-6">{displaySolution.title}</h1>
                <p className="text-2xl text-brand-green mb-6">{displaySolution.hero}</p>
                <p className="text-xl text-brand-white/70 mb-8">{displaySolution.description}</p>
                <Link to={`/${lang}/quote`}>
                  <Button size="lg">Get Custom Quote</Button>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="relative h-96 rounded-2xl overflow-hidden bg-brand-greyMid">
                  <img src={displaySolution.image} alt={displaySolution.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        {displaySolution.benefits.length > 0 && (
          <section className="py-16 bg-brand-grey">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-h3 text-brand-white mb-12 text-center">Key Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displaySolution.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card glass className="flex items-start space-x-3">
                      <Check className="text-brand-green flex-shrink-0 mt-1" size={20} />
                      <span className="text-brand-white">{benefit}</span>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* System Specs */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card glass className="text-center">
                <Zap className="text-brand-green mx-auto mb-4" size={48} />
                <h3 className="font-display text-2xl text-brand-white mb-2">Capacity Range</h3>
                <p className="text-brand-white/70">{displaySolution.capacity}</p>
              </Card>
              <Card glass className="text-center">
                <Shield className="text-brand-green mx-auto mb-4" size={48} />
                <h3 className="font-display text-2xl text-brand-white mb-2">Typical Application</h3>
                <p className="text-brand-white/70">{displaySolution.typical}</p>
              </Card>
              <Card glass className="text-center">
                <TrendingUp className="text-brand-green mx-auto mb-4" size={48} />
                <h3 className="font-display text-2xl text-brand-white mb-2">Payback Period</h3>
                <p className="text-brand-white/70">{displaySolution.payback}</p>
              </Card>
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <>
                <h2 className="font-display text-h3 text-brand-white mb-8 text-center">Recommended Systems</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedProducts.map(product => (
                    <Link key={product.id} to={`/${lang}/products/${product.slug}`}>
                      <Card glass hover className="h-full">
                        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-brand-greyMid">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <Badge variant="green" className="mb-4">{product.voltage}</Badge>
                        <h3 className="font-display text-2xl text-brand-white mb-2">{product.name}</h3>
                        <p className="text-brand-white/70 mb-4">{product.tagline}</p>
                        <div className="text-3xl font-display text-brand-green">
                          {product.capacity_kwh} <span className="text-lg text-brand-white/70">kWh</span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default SolutionDetail;
