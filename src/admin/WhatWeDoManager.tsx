import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { adminApi } from '@/services/api';

interface WhatWeDo {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  fullDescription: string;
  benefits: string[];
  bookingUrl: string;
}

const WhatWeDoManager = () => {
  const [items, setItems] = useState<WhatWeDo[]>([]);
  const [editing, setEditing] = useState<WhatWeDo | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await adminApi.list('whatwedo');
    setItems(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const benefits = (formData.get('benefits') as string).split('\n').filter(b => b.trim());
    
    const item = {
      id: editing?.id || formData.get('title')?.toString().toLowerCase().replace(/\s+/g, '-') || '',
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      icon: formData.get('icon') as string,
      fullDescription: formData.get('fullDescription') as string,
      benefits,
      bookingUrl: formData.get('bookingUrl') as string,
    };

    await (editing ? adminApi.update('whatwedo', item) : adminApi.create('whatwedo', item));
    loadItems();
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this item?')) {
      await adminApi.delete('whatwedo', id);
      loadItems();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const filename = `whatwedo-${Date.now()}-${file.name}`;
      
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, filename }),
      });
      
      const { url } = await response.json();
      const imageInput = document.querySelector<HTMLInputElement>('input[name="image"]');
      if (imageInput) imageInput.value = url;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-white">What We Do</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="bg-brand-green text-brand-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-lime"
        >
          <Plus size={20} /> Add Item
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-brand-grey rounded-xl p-8 max-w-2xl w-full my-8">
            <h2 className="text-2xl font-bold text-brand-white mb-6">
              {editing ? 'Edit Item' : 'Add Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brand-white mb-2">Title</label>
                <input
                  name="title"
                  defaultValue={editing?.title}
                  required
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Short Description</label>
                <textarea
                  name="description"
                  defaultValue={editing?.description}
                  required
                  rows={2}
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Full Description</label>
                <textarea
                  name="fullDescription"
                  defaultValue={editing?.fullDescription}
                  required
                  rows={4}
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Benefits (one per line)</label>
                <textarea
                  name="benefits"
                  defaultValue={editing?.benefits?.join('\n')}
                  rows={4}
                  placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Image URL</label>
                <input
                  name="image"
                  defaultValue={editing?.image}
                  required
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-brand-white/70 text-sm"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Icon Name (Battery, Sun, TrendingDown)</label>
                <input
                  name="icon"
                  defaultValue={editing?.icon}
                  required
                  placeholder="Battery"
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Booking URL</label>
                <input
                  name="bookingUrl"
                  type="url"
                  defaultValue={editing?.bookingUrl}
                  required
                  placeholder="https://calendly.com/..."
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-brand-green text-brand-black py-2 rounded-lg font-bold hover:bg-brand-lime"
                >
                  {editing ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null); }}
                  className="flex-1 bg-brand-black text-brand-white py-2 rounded-lg hover:bg-brand-greyMid"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-brand-grey rounded-xl overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-white mb-2">{item.title}</h3>
              <p className="text-brand-white/70 text-sm mb-4">{item.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditing(item); setShowForm(true); }}
                  className="flex-1 bg-brand-black text-brand-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-greyMid"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-500/30"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDoManager;
