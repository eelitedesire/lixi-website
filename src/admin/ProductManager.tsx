import { useState, useEffect } from 'react';
import { products, Product } from '../data/products';
import ProductEditor from './ProductEditor';
import { Plus } from 'lucide-react';
import { adminApi } from '../services/api';

const ProductManager = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    adminApi.list('products').then(data => setItems(data.length ? data : products)).catch(() => setItems(products));
  }, []);

  const handleSave = async (product: Product) => {
    if (editing) {
      await adminApi.update('products', product);
      setItems(items.map(p => (p.slug === editing.slug ? product : p)));
    } else {
      await adminApi.create('products', { ...product, id: product.slug });
      setItems([product, ...items]);
    }
    setEditing(null);
    setAdding(false);
  };

  const handleDelete = async (slug: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await adminApi.delete('products', slug);
      setItems(items.filter(p => p.slug !== slug));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Product Management</h2>
          <p className="text-brand-white/60">{items.length} products total</p>
        </div>
        <button
          className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2"
          onClick={() => { setAdding(true); setEditing(null); }}
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>
      {(adding || editing) ? (
        <ProductEditor
          product={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setAdding(false); setEditing(null); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(product => (
            <div key={product.slug} className="bg-brand-grey border border-brand-greyMid rounded-xl overflow-hidden hover:border-brand-green/50 transition">
              {product.image && (
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-white mb-2">{product.name}</h3>
                <p className="text-sm text-brand-white/60 mb-4">{product.tagline}</p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 font-semibold transition"
                    onClick={() => setEditing(product)}
                  >Edit</button>
                  <button
                    className="flex-1 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 font-semibold transition"
                    onClick={() => handleDelete(product.slug)}
                  >Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManager;
