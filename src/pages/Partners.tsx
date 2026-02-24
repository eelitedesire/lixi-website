import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { partners as staticPartners } from '@/data/partners';
import { api } from '@/services/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { ExternalLink } from 'lucide-react';

const Partners = () => {
  const [filter, setFilter] = useState<string>('All');
  const [partners, setPartners] = useState(staticPartners);
  const categories = ['All', 'Trading', 'Technology', 'Distribution'];
  const filtered = filter === 'All' ? partners : partners.filter(p => p.category === filter);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const data = await api.getPartners();
        if (data.length > 0) setPartners(data);
      } catch {
        setPartners(staticPartners);
      }
    };
    loadPartners();
  }, []);

  return (
    <>
      <Helmet>
        <title>Partners | LIXI Energy Systems</title>
        <meta name="description" content="Our trusted partners in trading, technology, and distribution across global markets." />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        {/* Hero */}
        <section className="py-24 grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-h2 text-brand-white mb-6">
              Our Partners
            </motion.h1>
            <p className="text-xl text-brand-white/70 max-w-3xl mx-auto mb-12">
              Collaborating with industry leaders to deliver world-class energy solutions.
            </p>

            {/* Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${
                    filter === cat 
                      ? 'bg-brand-green text-brand-black' 
                      : 'bg-brand-grey text-brand-white hover:bg-brand-greyMid'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card glass hover className="h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant={partner.category === 'Trading' ? 'green' : 'default'}>
                        {partner.category}
                      </Badge>
                      <span className="text-2xl">{partner.flag}</span>
                    </div>

                    <div className="relative w-full h-32 mb-6 rounded-lg bg-white/5 flex items-center justify-center p-6">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="font-display text-2xl text-brand-white mb-3">
                      {partner.name}
                    </h3>

                    <p className="text-brand-white/70 text-sm mb-4">
                      {partner.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-brand-white/50">{partner.country}</span>
                      {partner.website && (
                        <a 
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-green hover:text-brand-lime flex items-center gap-1"
                        >
                          Visit <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CARBONOZ Highlight */}
        <section className="py-16 bg-brand-grey">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass p-12 rounded-2xl text-center">
              <div className="inline-block mb-6">
                <Badge variant="green" className="text-lg px-6 py-2">Featured Partner</Badge>
              </div>
              <h2 className="font-display text-h3 text-brand-white mb-6">
                CARBONOZ Trading Platform
              </h2>
              <p className="text-xl text-brand-white/70 max-w-3xl mx-auto mb-8">
                Our exclusive trading partner enabling automated electricity arbitrage across EU markets. 
                Turn your LIXI battery into a revenue-generating asset with 15-30% annual returns.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/trading" className="inline-block bg-brand-green text-brand-black font-bold px-8 py-4 rounded-lg hover:scale-105 transition-transform">
                  Learn More
                </a>
                <a href="https://carbonoz.com" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-brand-green text-brand-green font-bold px-8 py-4 rounded-lg hover:bg-brand-green hover:text-brand-black transition-all">
                  Visit CARBONOZ
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Partners;
