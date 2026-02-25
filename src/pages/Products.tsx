import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { products } from '@/data/products';
import { api } from '@/services/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCategories } from '@/hooks/useCategories';
import { useTranslatedData } from '@/hooks/useTranslatedData';

const Products = () => {
  const { t } = useTranslation(['products', 'common']);
  const { lang = 'en' } = useParams<{ lang: string }>();
  const [productList, setProductList] = useState(products);
  const addItem = useCartStore(state => state.addItem);
  const [searchParams] = useSearchParams();
  const categories = useCategories();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    api.getProducts(lang).then(data => {
      if (data.length) setProductList(data);
    }).catch(() => setProductList(products));
  }, [lang]);

  const filteredProducts = useMemo(() => {
    if (!categoryFilter) return productList;
    const category = categories.find(c => c.slug === categoryFilter);
    if (!category) return productList;
    return productList.filter(p => p.category === category.name);
  }, [productList, categoryFilter, categories]);

  const translatedProducts = useTranslatedData(filteredProducts, ['name', 'tagline', 'description', 'category']) as typeof products;

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
              {t('products:title')}
            </motion.h1>
            <p className="text-xl text-brand-white/70 max-w-3xl mx-auto">
              {t('products:description')}
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {translatedProducts.map((product, index) => (
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
                    <Badge variant="green" className="mb-4 self-start">{product.category || product.voltage || 'Product'}</Badge>
                    <h2 className="font-display text-4xl text-brand-white mb-2">
                      {product.name}
                    </h2>
                    <p className="text-brand-white/70 mb-6">{product.tagline || product.description}</p>
                    
                    {product.capacity_kwh && (
                      <div className="mb-6">
                        <div className="text-6xl font-display text-brand-green">
                          {product.capacity_kwh}
                          <span className="text-2xl text-brand-white/70 ml-2">kWh</span>
                        </div>
                      </div>
                    )}

                    {product.price && (
                      <div className="mb-6">
                        <div className="text-3xl font-display text-brand-green">{product.price}</div>
                      </div>
                    )}

                    <div className="space-y-3 mb-8 flex-1">
                      {product.nominal_voltage && (
                        <div className="text-sm">
                          <span className="text-brand-white/50">Voltage:</span>
                          <span className="text-brand-white ml-2">{product.nominal_voltage}</span>
                        </div>
                      )}
                      {product.max_current && (
                        <div className="text-sm">
                          <span className="text-brand-white/50">Max Current:</span>
                          <span className="text-brand-white ml-2">{product.max_current}</span>
                        </div>
                      )}
                      {product.cycle_life && (
                        <div className="text-sm">
                          <span className="text-brand-white/50">Cycle Life:</span>
                          <span className="text-brand-white ml-2">{product.cycle_life}</span>
                        </div>
                      )}
                      {product.weight_kg && (
                        <div className="text-sm">
                          <span className="text-brand-white/50">Weight:</span>
                          <span className="text-brand-white ml-2">{product.weight_kg} kg</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Link to={`/${lang}/products/${product.slug}`} className="flex-1">
                        <Button className="w-full">{t('common:buttons.viewDetails')}</Button>
                      </Link>
                      <Button 
                        variant="outline"
                        onClick={() => addItem({
                          id: product.id,
                          type: 'product',
                          name: product.name,
                          price: parseFloat(product.price?.replace(/[^0-9.]/g, '') || '0'),
                          image: product.image,
                          details: product
                        })}
                      >
                        <ShoppingCart size={20} />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


      </div>
    </>
  );
};

export default Products;
