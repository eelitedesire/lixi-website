import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { defaultCategories, ProductCategory } from '../data/productCategories';
import { adminApi } from '../services/api';

interface ProductEditorProps {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onCancel }) => {
  const [categories, setCategories] = useState<ProductCategory[]>(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    tagline: product?.tagline || '',
    category: product?.category || 'Battery Storage',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
    images: product?.images || [],
    specs: product?.specs || {},
    compatible_inverters: product?.compatible_inverters || [],
    highlight_features: product?.highlight_features || []
  });
  const [imageInputs, setImageInputs] = useState([0]);

  useEffect(() => {
    adminApi.list('product-categories').then(data => {
      const catData = data.find((item: any) => item.id === 'categories-data');
      if (catData?.categories) setCategories(catData.categories);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const cat = categories.find(c => c.name === formData.category);
    setSelectedCategory(cat || null);
  }, [formData.category, categories]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          const res = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64, filename: `${Date.now()}-${file.name}` })
          });
          const data = await res.json();
          setFormData({...formData, image: data.url});
        } catch (error) {
          console.error('Upload failed:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...product, ...formData, id: formData.slug } as Product);
  };

  const updateSpec = (fieldName: string, value: any) => {
    setFormData({ ...formData, specs: { ...formData.specs, [fieldName]: value } });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 border border-brand-green/30">
      <h2 className="text-2xl font-bold mb-6 text-brand-white">{product ? 'Edit' : 'Add'} Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input-field" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input className="input-field" placeholder="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
        
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-brand-white">Category</label>
          <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value, specs: {}})}>
            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
          </select>
        </div>
        
        <input className="input-field" placeholder="Tagline" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} />
        <input className="input-field" placeholder="Price (e.g. $5,999)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        <textarea className="input-field md:col-span-2" rows={3} placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        
        {/* Dynamic Fields Based on Category */}
        {selectedCategory?.fields.map(field => (
          <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
            <label className="block mb-1 text-brand-white text-sm">{field.label}{field.required && ' *'}</label>
            {field.type === 'select' ? (
              <select className="input-field" value={formData.specs[field.name] || ''} onChange={e => updateSpec(field.name, e.target.value)} required={field.required}>
                <option value="">Select...</option>
                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea className="input-field" rows={3} value={formData.specs[field.name] || ''} onChange={e => updateSpec(field.name, e.target.value)} required={field.required} />
            ) : field.type === 'number' ? (
              <input type="number" className="input-field" value={formData.specs[field.name] || ''} onChange={e => updateSpec(field.name, parseFloat(e.target.value))} required={field.required} />
            ) : (
              <input className="input-field" value={formData.specs[field.name] || ''} onChange={e => updateSpec(field.name, e.target.value)} required={field.required} />
            )}
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-brand-white">Main Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="bg-brand-black text-brand-white border border-brand-green/30 rounded p-2 w-full" />
          {formData.image && <img src={formData.image} alt="Preview" className="mt-2 rounded max-h-40" />}
        </div>
        
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="block font-semibold text-brand-white">Additional Images</label>
            <button type="button" onClick={() => setImageInputs([...imageInputs, imageInputs.length])} className="bg-brand-green/20 text-brand-green px-3 py-1 rounded text-sm hover:bg-brand-green/30">+ Add More</button>
          </div>
          <div className="space-y-2">
            {imageInputs.map((key, idx) => (
              <div key={key} className="flex gap-2">
                <input type="file" accept="image/*" multiple onChange={async (e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const uploadedUrls: string[] = [];
                    for (let i = 0; i < e.target.files.length; i++) {
                      const file = e.target.files[i];
                      const reader = new FileReader();
                      await new Promise<void>((resolve) => {
                        reader.onloadend = async () => {
                          const base64 = reader.result as string;
                          try {
                            const res = await fetch('http://localhost:3000/api/upload', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ image: base64, filename: `product-${Date.now()}-${file.name}` })
                            });
                            const data = await res.json();
                            uploadedUrls.push(data.url);
                          } catch (error) {
                            console.error('Upload failed:', error);
                          }
                          resolve();
                        };
                        reader.readAsDataURL(file);
                      });
                    }
                    setFormData({ ...formData, images: [...formData.images, ...uploadedUrls] });
                  }
                }} className="bg-brand-black text-brand-white border border-brand-green/30 rounded p-2 flex-1" />
                {imageInputs.length > 1 && (
                  <button type="button" onClick={() => setImageInputs(imageInputs.filter((_, i) => i !== idx))} className="bg-red-500/20 text-red-400 px-3 rounded hover:bg-red-500/30">×</button>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {formData.images.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt={`Image ${i + 1}`} className="rounded h-20 w-full object-cover" />
                <button type="button" onClick={() => setFormData({ ...formData, images: formData.images.filter((_, idx) => idx !== i) })} className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-brand-green text-brand-black px-6 py-2 rounded hover:bg-brand-greenDim font-semibold">Save</button>
        <button type="button" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-semibold" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ProductEditor;
