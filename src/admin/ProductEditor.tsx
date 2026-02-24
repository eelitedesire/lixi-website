import React, { useState } from 'react';
import { Product } from '../data/products';

interface ProductEditorProps {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    tagline: product?.tagline || '',
    category: product?.category || 'Battery',
    description: product?.description || '',
    price: product?.price || '',
    voltage: product?.voltage || '',
    capacity_kwh: product?.capacity_kwh || 0,
    cells: product?.cells || '',
    nominal_voltage: product?.nominal_voltage || '',
    max_current: product?.max_current || '',
    bms: product?.bms || '',
    communication: product?.communication || '',
    weight_kg: product?.weight_kg || 0,
    dimensions_mm: product?.dimensions_mm || '',
    cycle_life: product?.cycle_life || '',
    warranty: product?.warranty || '',
    image: product?.image || ''
  });

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

  return (
    <form onSubmit={handleSubmit} className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 border border-brand-green/30">
      <h2 className="text-2xl font-bold mb-6 text-brand-white">{product ? 'Edit' : 'Add'} Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Tagline" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Price (e.g. $5,999)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Voltage (e.g. 48V)" value={formData.voltage} onChange={e => setFormData({...formData, voltage: e.target.value})} />
        <input type="number" className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Capacity (kWh)" value={formData.capacity_kwh} onChange={e => setFormData({...formData, capacity_kwh: parseFloat(e.target.value)})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Cells" value={formData.cells} onChange={e => setFormData({...formData, cells: e.target.value})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Nominal Voltage" value={formData.nominal_voltage} onChange={e => setFormData({...formData, nominal_voltage: e.target.value})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Max Current" value={formData.max_current} onChange={e => setFormData({...formData, max_current: e.target.value})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="BMS" value={formData.bms} onChange={e => setFormData({...formData, bms: e.target.value})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Communication" value={formData.communication} onChange={e => setFormData({...formData, communication: e.target.value})} />
        <input type="number" className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Weight (kg)" value={formData.weight_kg} onChange={e => setFormData({...formData, weight_kg: parseFloat(e.target.value)})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Dimensions (mm)" value={formData.dimensions_mm} onChange={e => setFormData({...formData, dimensions_mm: e.target.value})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Cycle Life" value={formData.cycle_life} onChange={e => setFormData({...formData, cycle_life: e.target.value})} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white" placeholder="Warranty" value={formData.warranty} onChange={e => setFormData({...formData, warranty: e.target.value})} />
        <textarea className="border border-brand-green/30 rounded p-2 min-h-[100px] bg-brand-black text-brand-white md:col-span-2" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-brand-white">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="bg-brand-black text-brand-white border border-brand-green/30 rounded p-2 w-full" />
          {formData.image && <img src={formData.image} alt="Preview" className="mt-2 rounded max-h-40" />}
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
