import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { adminApi } from '@/services/api';

interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'Trading' | 'Technology' | 'Distribution';
  description: string;
  website: string;
  country: string;
  flag: string;
}

const PartnerManager = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    const data = await adminApi.list('partners');
    setPartners(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const partner = {
      id: editing?.id || formData.get('name')?.toString().toLowerCase().replace(/\s+/g, '-') || '',
      name: formData.get('name') as string,
      logo: formData.get('logo') as string,
      category: formData.get('category') as Partner['category'],
      description: formData.get('description') as string,
      website: formData.get('website') as string,
      country: formData.get('country') as string,
      flag: formData.get('flag') as string,
    };

    await (editing ? adminApi.update('partners', partner) : adminApi.create('partners', partner));
    loadPartners();
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this partner?')) {
      await adminApi.delete('partners', id);
      loadPartners();
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditing(partner);
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const filename = `partner-${Date.now()}-${file.name}`;
      
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, filename }),
      });
      
      const { url } = await response.json();
      const logoInput = document.querySelector<HTMLInputElement>('input[name="logo"]');
      if (logoInput) logoInput.value = url;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-white">Partners</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="bg-brand-green text-brand-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-lime"
        >
          <Plus size={20} /> Add Partner
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-brand-grey rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-brand-white mb-6">
              {editing ? 'Edit Partner' : 'Add Partner'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brand-white mb-2">Name</label>
                <input
                  name="name"
                  defaultValue={editing?.name}
                  required
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Logo URL</label>
                <input
                  name="logo"
                  defaultValue={editing?.logo}
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
                <label className="block text-brand-white mb-2">Category</label>
                <select
                  name="category"
                  defaultValue={editing?.category}
                  required
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                >
                  <option value="Trading">Trading</option>
                  <option value="Technology">Technology</option>
                  <option value="Distribution">Distribution</option>
                </select>
              </div>

              <div>
                <label className="block text-brand-white mb-2">Description</label>
                <textarea
                  name="description"
                  defaultValue={editing?.description}
                  required
                  rows={3}
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Website</label>
                <input
                  name="website"
                  type="url"
                  defaultValue={editing?.website}
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Country</label>
                <input
                  name="country"
                  defaultValue={editing?.country}
                  required
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-brand-white mb-2">Flag Emoji</label>
                <input
                  name="flag"
                  defaultValue={editing?.flag}
                  required
                  placeholder="🇩🇪"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-brand-grey rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-sm">
                {partner.category}
              </span>
              <span className="text-2xl">{partner.flag}</span>
            </div>

            <div className="relative w-full h-24 mb-4 rounded-lg bg-white/5 flex items-center justify-center p-4">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <h3 className="text-xl font-bold text-brand-white mb-2">{partner.name}</h3>
            <p className="text-brand-white/70 text-sm mb-3">{partner.description}</p>
            
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-brand-white/50">{partner.country}</span>
              {partner.website && (
                <a 
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green hover:text-brand-lime flex items-center gap-1"
                >
                  Visit <ExternalLink size={14} />
                </a>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(partner)}
                className="flex-1 bg-brand-black text-brand-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-greyMid"
              >
                <Edit2 size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(partner.id)}
                className="flex-1 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-500/30"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerManager;
