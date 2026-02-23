import React, { useState } from 'react';
import { Product } from '../data/products';

interface ProductEditorProps {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onCancel }) => {
  const [name, setName] = useState(product?.name || '');
  const [slug, setSlug] = useState(product?.slug || '');
  const [image, setImage] = useState<string | undefined>(product?.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...product,
      slug,
      name,
      image,
    } as Product);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 border border-brand-green/30">
      <h2 className="text-2xl font-bold mb-6">{product ? 'Edit' : 'Add'} Product</h2>
      <div className="grid grid-cols-1 gap-4">
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} required />
        {/* Category field removed as Product does not have this property */}
        {/* Category and Description fields removed as Product does not have these properties */}
        <div>
          <label className="block mb-2 font-semibold text-brand-white">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="bg-brand-black text-brand-white border border-brand-green/30 rounded p-2" />
          {image && <img src={image} alt="Preview" className="mt-2 rounded max-h-40" />}
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-900 font-semibold">Save</button>
        <button type="button" className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 font-semibold" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ProductEditor;
