import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Check, Calendar, ArrowLeft } from 'lucide-react';

const WhatWeDoDetail = () => {
  const { slug } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    api.getWhatWeDo().then(data => {
      const found = data.find((i: any) => i.id === slug);
      if (found) setItem(found);
    });
  }, [slug]);

  if (!item) {
    return (
      <div className="pt-20 min-h-screen bg-brand-black flex items-center justify-center">
        <p className="text-brand-white">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{item.title} | LIXI Energy Systems</title>
        <meta name="description" content={item.description} />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/80 to-brand-black" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center gap-2 text-brand-green hover:text-brand-lime mb-8">
              <ArrowLeft size={20} /> Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="font-display text-6xl text-brand-white mb-6">
                {item.title}
              </h1>
              <p className="text-2xl text-brand-white/70 mb-8">
                {item.description}
              </p>
              <a
                href={item.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-green text-brand-black font-bold px-8 py-4 rounded-lg hover:bg-brand-lime transition-all"
              >
                <Calendar size={20} /> Book Consultation
              </a>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-brand-grey">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-brand-white mb-6">Overview</h2>
                <p className="text-brand-white/70 text-lg leading-relaxed whitespace-pre-line">
                  {item.fullDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-brand-white mb-6">Key Benefits</h2>
                <ul className="space-y-4">
                  {item.benefits?.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center mt-1">
                        <Check size={16} className="text-brand-green" />
                      </div>
                      <span className="text-brand-white/70">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-brand-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-brand-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-brand-white/60 mb-8">
                Schedule a consultation with our experts to discuss your energy needs.
              </p>
              <a
                href={item.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-green text-brand-black font-bold px-10 py-5 rounded-lg hover:bg-brand-lime transition-all text-lg"
              >
                <Calendar size={22} /> Book Your Consultation
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhatWeDoDetail;
