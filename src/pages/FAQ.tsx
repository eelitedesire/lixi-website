import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/data/faqs';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];
  const filtered = filter === 'All' ? faqs : faqs.filter(f => f.category === filter);

  return (
    <>
      <Helmet>
        <title>FAQ | LIXI Energy Systems</title>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          })}
        </script>
      </Helmet>
      <div className="pt-20 bg-brand-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-24">
          <h1 className="font-display text-h2 text-brand-white mb-8 text-center">Frequently Asked Questions</h1>
          
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full transition-all ${filter === cat ? 'bg-brand-green text-brand-black' : 'bg-brand-grey text-brand-white hover:bg-brand-greyMid'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((faq, index) => (
              <div key={index} className="glass rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-brand-greyMid/20 transition-colors"
                >
                  <span className="font-bold text-brand-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`text-brand-green flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-brand-white/70">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
