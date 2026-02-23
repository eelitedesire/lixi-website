import { useState } from 'react';
import { products, Product } from '../data/products';
import ProductEditor from './ProductEditor';

const ProductManager = () => {
  const [items, setItems] = useState<Product[]>(products);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);

  const handleSave = (product: Product) => {
    if (editing) {
      setItems(items.map(p => (p.slug === editing.slug ? product : p)));
      setEditing(null);
      setAdding(false);
    } else {
      setItems([{ ...product }, ...items]);
      setAdding(false);
      setEditing(null);
    }
  };

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setItems(items.filter(p => p.slug !== slug));
    }
  };

  return (
    <div className="min-h-screen w-full bg-brand-black/95 backdrop-blur-md py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow">Product Management</h2>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => { setAdding(true); setEditing(null); }}
          >
            + Add New Product
          </button>
        </div>
        {(adding || editing) ? (
          <ProductEditor
            product={editing || undefined}
            onSave={(product) => {
              handleSave(product);
              setAdding(false);
              setEditing(null);
            }}
            onCancel={() => { setAdding(false); setEditing(null); }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map(product => (
              <div key={product.slug} className="bg-brand-black/90 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col gap-2 border border-brand-green/30 relative">
                {product.image && (
                  <img src={product.image} alt={product.name} className="rounded-xl mb-3 max-h-40 object-cover w-full border border-brand-green/20" />
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-brand-green">{product.name}</span>
                  <span className="text-xs text-brand-green/80">{product.tagline}</span>
                  <span className="text-sm text-brand-white/80 mb-2">{product.tagline}</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-brand-green text-brand-black px-4 py-1 rounded hover:bg-brand-green/80 font-semibold shadow"
                    onClick={() => setEditing(product)}
                  >Edit</button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 font-semibold shadow"
                    onClick={() => handleDelete(product.slug)}
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;
