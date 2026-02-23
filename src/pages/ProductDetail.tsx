import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ArrowLeft, Download } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <div className="pt-20 min-h-screen bg-brand-black text-white flex items-center justify-center">Product not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | LIXI Energy Systems</title>
        <meta name="description" content={`${product.name} - ${product.tagline}. ${product.capacity_kwh}kWh ${product.voltage} battery system.`} />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/products" className="inline-flex items-center text-brand-green hover:text-brand-lime mb-8">
            <ArrowLeft size={20} className="mr-2" /> Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden bg-brand-greyMid">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <Badge variant="green" className="mb-4">{product.voltage}</Badge>
              <h1 className="font-display text-6xl text-brand-white mb-4">{product.name}</h1>
              <p className="text-2xl text-brand-white/70 mb-8">{product.tagline}</p>
              
              <div className="mb-8">
                <div className="text-7xl font-display text-brand-green">
                  {product.capacity_kwh}
                  <span className="text-3xl text-brand-white/70 ml-2">kWh</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {product.highlight_features.map((feature, i) => (
                  <div key={i} className="flex items-center text-brand-white">
                    <div className="w-2 h-2 bg-brand-green rounded-full mr-3" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link to="/quote">
                <Button size="lg" className="w-full lg:w-auto">Request Quote</Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card glass>
                <h3 className="font-display text-2xl text-brand-white mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  {Object.entries(product).filter(([key]) => 
                    !['id', 'slug', 'name', 'tagline', 'highlight_features', 'compatible_inverters', 'integrated_pcs'].includes(key)
                  ).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-brand-greyMid pb-2">
                      <span className="text-brand-white/70 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-brand-white font-mono text-sm">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card glass className="mt-6">
                <h3 className="font-display text-xl text-brand-white mb-4">Compatible Inverters</h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatible_inverters.map(inv => (
                    <Badge key={inv} variant="default">{inv}</Badge>
                  ))}
                </div>
              </Card>

              <Button variant="outline" className="w-full mt-6">
                <Download size={20} className="mr-2" /> Download Datasheet
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
