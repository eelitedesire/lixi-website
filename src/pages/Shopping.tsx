import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Truck, Shield } from 'lucide-react';
import { IMAGES } from '@/data/images';

const CALENDLY_URL = 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt';

const Shopping = () => {
  return (
    <>
      <Helmet>
        <title>Shop | LIXI Energy Systems</title>
        <meta name="description" content="Order your pre-configured LIXI battery pack. Delivery to any EU country with full support." />
      </Helmet>

      <div className="pt-20 bg-[#060a07] min-h-screen">
        {/* Hero */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h1 className="text-6xl font-bold text-white mb-6">
                Order Your LIXI
                <span className="block text-brand-green mt-2">Battery System</span>
              </h1>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Pre-configured and ready-to-use battery packs. Delivery to any EU country with full installation support.
              </p>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Package, title: 'Ready to Use', desc: 'Pre-configured systems' },
                { icon: Truck, title: 'EU Delivery', desc: 'Fast shipping' },
                { icon: Shield, title: 'PayPal Protected', desc: 'Secure payment' },
                { icon: ShoppingCart, title: 'Full Support', desc: 'Installation help' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0d1410] border border-white/5 rounded-xl p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 mb-4">
                    <item.icon className="text-brand-green" size={24} />
                  </div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Product */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#0d1410] to-[#060a07] border border-brand-green/20 rounded-3xl p-12 text-center overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-10">
                <img src={IMAGES.battery_rack} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a07] via-[#060a07]/80 to-transparent" />
              
              <div className="relative z-10">
                <div className="inline-block bg-brand-green/20 text-brand-green px-4 py-2 rounded-full text-sm font-bold mb-6">
                  MOST POPULAR
                </div>
              <h2 className="text-5xl font-bold text-white mb-4">LIXI LFP LiFePO4 Battery</h2>
              <div className="text-6xl font-bold text-brand-green mb-6">15 kWh</div>
              <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
                Stack up to 14 battery cases together. Includes JK BMS with Pylontech protocol support, Bluetooth and CAN-bus monitoring.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
                {[
                  { label: 'Voltage', value: '51.2V' },
                  { label: 'Current', value: '200A' },
                  { label: 'Weight', value: '125kg' },
                  { label: 'Warranty', value: '1 Year' },
                ].map((spec, i) => (
                  <div key={i} className="bg-black/30 rounded-xl p-4">
                    <div className="text-brand-green font-bold mono text-xl">{spec.value}</div>
                    <div className="text-white/50 text-sm">{spec.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-10 py-5 justify-center">
                  Schedule Consultation
                </a>
                <a href="mailto:eu-office@carbonoz.com" className="btn-ghost text-lg px-10 py-5 justify-center">
                  Request Quote
                </a>
              </div>

              <div className="bg-[#0d1410] border border-brand-green/20 rounded-xl p-6 mb-4">
                <h3 className="text-white font-bold mb-4 text-center">Pay with PayPal</h3>
                <p className="text-white/60 text-sm text-center mb-6">
                  Secure payment for LIXI battery systems and installation services
                </p>
                
                <form action="https://www.paypal.com/webapps/hermes" method="post" target="_blank" className="space-y-4">
                  <input type="hidden" name="token" value="8D592130TE479515M" />
                  <input type="hidden" name="useraction" value="commit" />
                  <input type="hidden" name="flowType" value="WPS" />
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Select Product or Service</label>
                    <select 
                      name="item_name" 
                      required
                      className="w-full bg-[#060a07] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-green focus:outline-none"
                    >
                      <option value="">Choose an option...</option>
                      <optgroup label="Battery Systems">
                        <option value="LIXI Stack 48V - 14kWh">LIXI Stack 48V - 14kWh</option>
                        <option value="LIXI Pro Rack 192V - 20.48kWh">LIXI Pro Rack 192V - 20.48kWh</option>
                        <option value="LIXI Mega 400V - 112.5kWh">LIXI Mega 400V - 112.5kWh</option>
                      </optgroup>
                      <optgroup label="Services">
                        <option value="Solar Installation Service">Solar Installation Service</option>
                        <option value="System Consultation">System Consultation</option>
                        <option value="Maintenance Service">Maintenance Service</option>
                      </optgroup>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.633h8.78c2.857 0 4.812 1.284 5.588 3.382.776 2.098.076 4.634-1.905 6.616-1.981 1.981-4.517 2.681-6.615 1.905-2.098-.776-3.382-2.731-3.382-5.588V7.076h2.286v2.286c0 2.095 1.143 3.81 2.857 4.286 1.714.476 3.81-.19 5.238-1.619 1.429-1.428 2.095-3.524 1.619-5.238-.476-1.714-2.19-2.857-4.286-2.857H6.19L3.47 19.337h3.048l.558-2.286z"/>
                    </svg>
                    Continue to PayPal
                  </button>
                </form>
              </div>

              <p className="text-white/40 text-sm">
                For US / KY / MU orders contact our support below
              </p>
              </div>
            </motion.div>

            {/* Additional Info */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="bg-[#0d1410] border border-white/5 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {[
                    'Stainless steel battery case',
                    'JK BMS 48V 16S with Pylontech protocol',
                    'CANBUS/RS485 communication',
                    'Bluetooth monitoring',
                    'Installation manual',
                    'Inverter compatibility guide',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="bg-[#0d1410] border border-white/5 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Support & Installation</h3>
                <p className="text-white/60 mb-6">
                  We provide comprehensive support for choosing the right inverter and wiring your system. Our easy-to-understand tutorials guide you through panel and inverter installation.
                </p>
                <a href="/contact" className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-white transition-colors">
                  Contact Support →
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Shopping;
