import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { api } from '@/services/api';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ArrowLeft, Download, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(products.find(p => p.slug === slug));
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.getProducts().then(data => {
      const found = data.find((p: any) => p.slug === slug);
      if (found) setProduct(found);
    }).catch(() => {
      setProduct(products.find(p => p.slug === slug));
    });
  }, [slug]);

  if (!product) {
    return <div className="pt-20 min-h-screen bg-brand-black text-white flex items-center justify-center">Product not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | LIXI Energy Systems</title>
        <meta name="description" content={`${product.name} - ${product.tagline || ''}`} />
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
              {product.category && <Badge variant="green" className="mb-4">{product.category}</Badge>}
              <h1 className="font-display text-6xl text-brand-white mb-4">{product.name}</h1>
              {product.tagline && <p className="text-2xl text-brand-white/70 mb-8">{product.tagline}</p>}
              
              {product.price && (
                <div className="mb-8">
                  <div className="text-4xl font-display text-brand-green">{product.price}</div>
                </div>
              )}

              {product.description && (
                <p className="text-brand-white/80 mb-8">{product.description}</p>
              )}

              <div className="flex gap-4 flex-wrap">
                <Button 
                  size="lg" 
                  onClick={() => {
                    addItem({
                      id: product.id,
                      type: 'product',
                      name: product.name,
                      price: parseFloat(product.price?.replace(/[^0-9.]/g, '') || '0'),
                      image: product.image,
                      details: product
                    });
                    setAdded(true);
                    setTimeout(() => setAdded(false), 2000);
                  }}
                  className="flex-1 lg:flex-initial"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  {added ? 'Added!' : 'Add to Cart'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/shopping')}
                  className="flex-1 lg:flex-initial"
                >
                  View Cart
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card glass>
                <h3 className="font-display text-2xl text-brand-white mb-6">Product Details</h3>
                <div className="space-y-4">
                  {Object.entries(product).filter(([key, value]) => 
                    !['id', 'slug', 'name', 'tagline', 'image', 'category', 'description', 'price', 'createdAt', 'updatedAt'].includes(key) && value
                  ).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-brand-greyMid pb-2">
                      <span className="text-brand-white/70 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-brand-white font-mono text-sm">{String(value)}</span>
                    </div>
                  ))}
                  {Object.keys(product).filter(key => !['id', 'slug', 'name', 'tagline', 'image', 'category', 'description', 'price', 'createdAt', 'updatedAt'].includes(key) && product[key as keyof typeof product]).length === 0 && (
                    <p className="text-brand-white/60 text-center py-4">No additional specifications available</p>
                  )}
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
