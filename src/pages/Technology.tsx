import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Battery, Cpu, Thermometer, Zap } from 'lucide-react';

const Technology = () => {
  return (
    <>
      <Helmet>
        <title>Technology | LIXI Energy Systems</title>
        <meta name="description" content="Deep dive into LiFePO4 battery technology, BMS systems, and energy storage innovation." />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-h2 text-brand-white mb-6 text-center"
            >
              Battery Technology
            </motion.h1>
            <p className="text-xl text-brand-white/70 text-center max-w-3xl mx-auto mb-16">
              Understanding the science and engineering behind LIXI energy storage systems.
            </p>

            {/* LiFePO4 Chemistry */}
            <Card glass className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-h3 text-brand-white mb-6">LiFePO4 Chemistry</h2>
                  <p className="text-brand-white/70 mb-6">
                    Lithium Iron Phosphate (LiFePO4) is the safest and most stable lithium battery chemistry available. 
                    Unlike NMC batteries, LiFePO4 cells have a strong phosphate bond that prevents thermal runaway.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Battery className="text-brand-green flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold text-brand-white mb-1">Superior Safety</h3>
                        <p className="text-brand-white/70 text-sm">No thermal runaway risk. Stable chemistry even under extreme conditions.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Zap className="text-brand-green flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold text-brand-white mb-1">Long Cycle Life</h3>
                        <p className="text-brand-white/70 text-sm">6000-8000+ cycles at 80-90% DoD. 3-4x longer than NMC batteries.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Thermometer className="text-brand-green flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-bold text-brand-white mb-1">Wide Temperature Range</h3>
                        <p className="text-brand-white/70 text-sm">Operates from -30°C to +60°C without degradation.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-brand-green/20 to-brand-black rounded-xl p-12 flex items-center justify-center">
                  <Battery className="text-brand-green" size={200} strokeWidth={1} />
                </div>
              </div>
            </Card>

            {/* BMS Technology */}
            <Card glass className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-brand-green/20 to-brand-black rounded-xl p-12 flex items-center justify-center">
                  <Cpu className="text-brand-green" size={200} strokeWidth={1} />
                </div>
                <div>
                  <h2 className="font-display text-h3 text-brand-white mb-6">Advanced BMS</h2>
                  <p className="text-brand-white/70 mb-6">
                    Our Battery Management Systems provide real-time monitoring, active balancing, and intelligent protection 
                    to maximize performance and lifespan.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-brand-white mb-1">Cell-Level Monitoring</h3>
                      <p className="text-brand-white/70 text-sm">Individual cell voltage, temperature, and current tracking.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-white mb-1">Active Balancing</h3>
                      <p className="text-brand-white/70 text-sm">Ensures all cells charge and discharge evenly for optimal performance.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-white mb-1">Multi-Layer Protection</h3>
                      <p className="text-brand-white/70 text-sm">Overvoltage, undervoltage, overcurrent, and temperature protection.</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-white mb-1">Communication Protocols</h3>
                      <p className="text-brand-white/70 text-sm">CANBUS, RS485, Bluetooth for seamless inverter integration.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* CATL Partnership */}
            <Card glass>
              <h2 className="font-display text-h3 text-brand-white mb-6 text-center">CATL Partnership</h2>
              <p className="text-brand-white/70 text-center max-w-3xl mx-auto mb-12">
                LIXI exclusively uses CATL-certified cells, the same cells trusted by Tesla, BMW, and Volkswagen. 
                This ensures consistent quality, performance, and longevity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-display text-brand-green mb-2">8000+</div>
                  <div className="text-brand-white/70">Cycle Life</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-display text-brand-green mb-2">100%</div>
                  <div className="text-brand-white/70">Cell Screening</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-display text-brand-green mb-2">&lt;1%</div>
                  <div className="text-brand-white/70">Cell Variation</div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default Technology;
