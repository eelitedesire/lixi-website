import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { TrendingUp, DollarSign, Zap } from 'lucide-react';

const Trading = () => {
  const [priceData, setPriceData] = useState<Array<{ time: string; price: number }>>([]);

  useEffect(() => {
    const generateData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i}:00`,
          price: 0.10 + Math.random() * 0.20 + Math.sin(i / 3) * 0.05,
        });
      }
      return data;
    };

    setPriceData(generateData());
    const interval = setInterval(() => {
      setPriceData(generateData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>CARBONOZ Electricity Trading | LIXI Energy Systems</title>
        <meta name="description" content="Turn your battery into a revenue-generating asset with automated electricity trading." />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        {/* Hero */}
        <section className="py-24 grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-h2 text-brand-white mb-6"
            >
              Buy Electricity Smart. <span className="text-brand-green">Save Money</span>
            </motion.h1>
            <p className="text-xl text-brand-white/70 max-w-3xl mx-auto mb-12">
              CARBONOZ automated platform buys electricity when prices are lowest, charging your battery for maximum savings.
            </p>
            <Button size="lg">Register for Smart Buying</Button>
          </div>
        </section>

        {/* Live Price Chart */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card glass>
              <h2 className="font-display text-h3 text-brand-white mb-8">Live Electricity Prices</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2e342f" />
                  <XAxis dataKey="time" stroke="#f0f4ee" />
                  <YAxis stroke="#f0f4ee" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1f1b', border: '1px solid #00c853' }}
                    labelStyle={{ color: '#f0f4ee' }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#00c853" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-brand-grey">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-h3 text-brand-white mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: DollarSign, title: 'Monitor Prices', desc: 'CARBONOZ tracks real-time electricity prices across EU markets 24/7' },
                { icon: TrendingUp, title: 'Buy Low', desc: 'Automatically buys electricity when prices drop (overnight, high renewable periods)' },
                { icon: Zap, title: 'Save Money', desc: 'Reduce energy costs by 30-40% through smart automated purchasing' },
              ].map((step, i) => (
                <Card key={i} glass className="text-center">
                  <step.icon className="text-brand-green mx-auto mb-4" size={48} />
                  <h3 className="font-display text-2xl text-brand-white mb-4">{step.title}</h3>
                  <p className="text-brand-white/70">{step.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Trading;
