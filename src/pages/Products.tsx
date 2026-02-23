import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Products | LIXI Energy Systems</title>
        <meta name="description" content="Explore our range of LiFePO4 battery systems: 48V, 192V, and 400V solutions for residential, commercial, and industrial applications." />
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
              Battery Storage Systems
            </motion.h1>
            <p className="text-xl text-brand-white/70 max-w-3xl mx-auto">
              Three voltage classes engineered for different scales. All featuring CATL-certified LiFePO4 cells.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card glass className="h-full flex flex-col">
                    <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden bg-brand-greyMid">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <Badge variant="green" className="mb-4 self-start">{product.voltage}</Badge>
                    <h2 className="font-display text-4xl text-brand-white mb-2">
                      {product.name}
                    </h2>
                    <p className="text-brand-white/70 mb-6">{product.tagline}</p>
                    
                    <div className="mb-6">
                      <div className="text-6xl font-display text-brand-green">
                        {product.capacity_kwh}
                        <span className="text-2xl text-brand-white/70 ml-2">kWh</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8 flex-1">
                      <div className="text-sm">
                        <span className="text-brand-white/50">Voltage:</span>
                        <span className="text-brand-white ml-2">{product.nominal_voltage}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-brand-white/50">Max Current:</span>
                        <span className="text-brand-white ml-2">{product.max_current}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-brand-white/50">Cycle Life:</span>
                        <span className="text-brand-white ml-2">{product.cycle_life}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-brand-white/50">Weight:</span>
                        <span className="text-brand-white ml-2">{product.weight_kg} kg</span>
                      </div>
                    </div>

                    <Link to={`/products/${product.slug}`} className="mt-auto">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-brand-grey">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-h3 text-brand-white mb-8 text-center">
              Compare All Systems
            </h2>
            
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden glass rounded-2xl">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-brand-greyMid">
                        <th className="text-left p-6 text-brand-white font-display text-xl">Specification</th>
                        {products.map(p => (
                          <th key={p.id} className="text-center p-6 bg-brand-black/20">
                            <div className="text-brand-green font-display text-2xl mb-2">{p.name}</div>
                            <Badge variant="green">{p.voltage}</Badge>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: 'Capacity', key: 'capacity_kwh', unit: ' kWh', highlight: true },
                        { label: 'Voltage', key: 'voltage', unit: '' },
                        { label: 'Cells', key: 'cells', unit: '' },
                        { label: 'BMS', key: 'bms', unit: '' },
                        { label: 'Communication', key: 'communication', unit: '' },
                        { label: 'Cycle Life', key: 'cycle_life', unit: '', highlight: true },
                        { label: 'Weight', key: 'weight_kg', unit: ' kg' },
                        { label: 'Dimensions', key: 'dimensions_mm', unit: ' mm' },
                        { label: 'Warranty', key: 'warranty', unit: '' },
                      ].map((spec, i) => (
                        <tr key={spec.key} className={`border-b border-brand-greyMid/50 ${spec.highlight ? 'bg-brand-green/5' : i % 2 === 0 ? 'bg-brand-black/10' : ''}`}>
                          <td className="p-6 text-brand-white font-bold">{spec.label}</td>
                          {products.map(p => (
                            <td key={p.id} className="p-6 text-center">
                              <span className={`${spec.highlight ? 'text-brand-green font-bold text-lg' : 'text-brand-white'}`}>
                                {p[spec.key as keyof typeof p]}{spec.unit}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td className="p-6"></td>
                        {products.map(p => (
                          <td key={p.id} className="p-6 text-center">
                            <Link to={`/products/${p.slug}`}>
                              <Button className="w-full">View Details</Button>
                            </Link>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
