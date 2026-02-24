import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { adminApi } from '../services/api';

interface Technology {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  features: string[];
}

const TechnologyManager = () => {
  const [items, setItems] = useState<Technology[]>([]);
  const [editing, setEditing] = useState<Technology | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    adminApi.list('technology').then(setItems);
  }, []);

  const handleSave = async (tech: Technology) => {
    if (editing) {
      await adminApi.update('technology', tech);
      setItems(items.map(t => t.id === tech.id ? tech : t));
    } else {
      const newTech = { ...tech, id: Date.now().toString() };
      await adminApi.create('technology', newTech);
      setItems([...items, newTech]);
    }
    setEditing(null);
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this technology?')) {
      await adminApi.delete('technology', id);
      setItems(items.filter(t => t.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Technology Manager</h2>
          <p className="text-brand-white/60">{items.length} technologies</p>
        </div>
        <button onClick={() => { setAdding(true); setEditing(null); }} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim flex items-center gap-2">
          <Plus size={20} /> Add Technology
        </button>
      </div>

      {(adding || editing) ? (
        <TechnologyEditor
          technology={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setAdding(false); setEditing(null); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(tech => (
            <div key={tech.id} className="bg-brand-grey border border-brand-greyMid rounded-xl overflow-hidden hover:border-brand-green/50 transition">
              {tech.image && <img src={tech.image} alt={tech.title} className="w-full h-48 object-cover" />}
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-semibold">{tech.category || 'General'}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-white mb-2">{tech.title}</h3>
                <p className="text-sm text-brand-white/60 mb-4 line-clamp-2">{tech.description}</p>
                <div className="flex gap-3">
                  <button onClick={() => setEditing(tech)} className="flex-1 bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 font-semibold">
                    <Edit2 size={16} className="inline mr-2" />Edit
                  </button>
                  <button onClick={() => handleDelete(tech.id)} className="flex-1 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 font-semibold">
                    <Trash2 size={16} className="inline mr-2" />Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface TechnologyEditorProps {
  technology?: Technology;
  onSave: (tech: Technology) => void;
  onCancel: () => void;
}

const TechnologyEditor = ({ technology, onSave, onCancel }: TechnologyEditorProps) => {
  const [formData, setFormData] = useState({
    id: technology?.id || '',
    title: technology?.title || '',
    description: technology?.description || '',
    image: technology?.image || '',
    category: technology?.category || 'Battery',
    features: technology?.features || []
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    onSave(formData as Technology);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-brand-white mb-6">{technology ? 'Edit' : 'Add'} Technology</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-brand-white mb-2 text-sm font-semibold">Category</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" required>
            <option value="Battery">Battery</option>
            <option value="Solar Panel">Solar Panel</option>
            <option value="Inverter">Inverter</option>
            <option value="BMS">BMS</option>
            <option value="Energy Storage">Energy Storage</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-brand-white mb-2 text-sm font-semibold">Title</label>
          <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" required />
        </div>

        <div>
          <label className="block text-brand-white mb-2 text-sm font-semibold">Description</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={3} required />
        </div>

        <div>
          <label className="block text-brand-white mb-2 text-sm font-semibold">Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="bg-brand-black text-brand-white border border-brand-greyMid rounded p-2 w-full" />
          {formData.image && <img src={formData.image} alt="Preview" className="mt-2 rounded max-h-40" />}
        </div>

        <div>
          <label className="block text-brand-white mb-2 text-sm font-semibold">Features (one per line)</label>
          <textarea value={formData.features.join('\n')} onChange={e => setFormData({...formData, features: e.target.value.split('\n').filter(f => f.trim())})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={5} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-brand-green text-brand-black px-6 py-2 rounded-lg hover:bg-brand-greenDim font-semibold">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-semibold">Cancel</button>
      </div>
    </form>
  );
};

export default TechnologyManager;
