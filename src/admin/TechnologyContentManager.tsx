import { useState, useEffect } from 'react';
import { Save, Plus, Edit2, Trash2 } from 'lucide-react';
import { adminApi } from '../services/api';

interface Technology {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  features: string[];
}

const TechnologyContentManager = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [editing, setEditing] = useState<Technology | null>(null);
  const [adding, setAdding] = useState(false);
  const [content, setContent] = useState({
    id: 'tech-content',
    pageTitle: 'Battery Technology',
    pageDescription: 'Understanding the science and engineering behind LIXI energy storage systems.',
    lifepo4: {
      title: 'LiFePO4 Chemistry',
      description: 'Lithium Iron Phosphate (LiFePO4) is the safest and most stable lithium battery chemistry available. Unlike NMC batteries, LiFePO4 cells have a strong phosphate bond that prevents thermal runaway.',
      features: [
        { title: 'Superior Safety', desc: 'No thermal runaway risk. Stable chemistry even under extreme conditions.' },
        { title: 'Long Cycle Life', desc: '6000-8000+ cycles at 80-90% DoD. 3-4x longer than NMC batteries.' },
        { title: 'Wide Temperature Range', desc: 'Operates from -30°C to +60°C without degradation.' }
      ]
    },
    bms: {
      title: 'Advanced BMS',
      description: 'Our Battery Management Systems provide real-time monitoring, active balancing, and intelligent protection to maximize performance and lifespan.',
      features: [
        { title: 'Cell-Level Monitoring', desc: 'Individual cell voltage, temperature, and current tracking.' },
        { title: 'Active Balancing', desc: 'Ensures all cells charge and discharge evenly for optimal performance.' },
        { title: 'Multi-Layer Protection', desc: 'Overvoltage, undervoltage, overcurrent, and temperature protection.' },
        { title: 'Communication Protocols', desc: 'CANBUS, RS485, Bluetooth for seamless inverter integration.' }
      ]
    },
    catl: {
      title: 'CATL Partnership',
      description: 'LIXI exclusively uses CATL-certified cells, the same cells trusted by Tesla, BMW, and Volkswagen. This ensures consistent quality, performance, and longevity.',
      stats: [
        { value: '8000+', label: 'Cycle Life' },
        { value: '100%', label: 'Cell Screening' },
        { value: '<1%', label: 'Cell Variation' }
      ]
    }
  });

  useEffect(() => {
    adminApi.list('techcontent').then(data => {
      if (data.length > 0) setContent(data[0]);
    });
    adminApi.list('technology').then(setTechnologies);
  }, []);

  const handleSave = async () => {
    await adminApi.update('techcontent', content);
    alert('Technology content updated!');
  };

  const handleSaveTech = async (tech: Technology) => {
    if (editing) {
      await adminApi.update('technology', tech);
      setTechnologies(technologies.map(t => t.id === tech.id ? tech : t));
    } else {
      const newTech = { ...tech, id: Date.now().toString() };
      await adminApi.create('technology', newTech);
      setTechnologies([...technologies, newTech]);
    }
    setEditing(null);
    setAdding(false);
  };

  const handleDeleteTech = async (id: string) => {
    if (window.confirm('Delete this technology?')) {
      await adminApi.delete('technology', id);
      setTechnologies(technologies.filter(t => t.id !== id));
    }
  };

  const handleDeleteSection = (section: 'lifepo4' | 'bms' | 'catl') => {
    if (window.confirm(`Delete ${section.toUpperCase()} section? It will be hidden on the page.`)) {
      setContent({...content, [section]: null});
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Technology Page Content</h2>
          <p className="text-brand-white/60">Manage technology items and page content</p>
        </div>
        <button onClick={handleSave} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim flex items-center gap-2">
          <Save size={20} /> Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Technology Items Section */}
        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-brand-white">Technology Items</h3>
            <button onClick={() => { setAdding(true); setEditing(null); }} className="bg-brand-green text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-greenDim flex items-center gap-2">
              <Plus size={16} /> Add Technology
            </button>
          </div>
          
          {(adding || editing) ? (
            <TechnologyEditor
              technology={editing || undefined}
              onSave={handleSaveTech}
              onCancel={() => { setAdding(false); setEditing(null); }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {technologies.map(tech => (
                <div key={tech.id} className="bg-brand-black border border-brand-greyMid rounded-lg overflow-hidden">
                  {tech.image && <img src={tech.image} alt={tech.title} className="w-full h-32 object-cover" />}
                  <div className="p-4">
                    <span className="inline-block bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-semibold mb-2">{tech.category}</span>
                    <h4 className="text-sm font-bold text-brand-white mb-1">{tech.title}</h4>
                    <p className="text-xs text-brand-white/60 mb-3 line-clamp-2">{tech.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(tech)} className="flex-1 bg-brand-green/10 text-brand-green px-3 py-1 rounded text-xs hover:bg-brand-green/20">
                        <Edit2 size={12} className="inline mr-1" />Edit
                      </button>
                      <button onClick={() => handleDeleteTech(tech.id)} className="flex-1 bg-red-500/10 text-red-400 px-3 py-1 rounded text-xs hover:bg-red-500/20">
                        <Trash2 size={12} className="inline mr-1" />Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Page Header */}
        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <h3 className="text-xl font-bold text-brand-white mb-4">Page Header</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Page Title</label>
              <input value={content.pageTitle} onChange={e => setContent({...content, pageTitle: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" />
            </div>
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Page Description</label>
              <textarea value={content.pageDescription} onChange={e => setContent({...content, pageDescription: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={2} />
            </div>
          </div>
        </div>

        {/* LiFePO4 Section */}
        {content.lifepo4 && (
        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-brand-white">LiFePO4 Chemistry Section</h3>
            <button onClick={() => handleDeleteSection('lifepo4')} className="text-red-400 hover:text-red-300 text-sm">
              Delete Section
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Title</label>
              <input value={content.lifepo4.title} onChange={e => setContent({...content, lifepo4: {...content.lifepo4, title: e.target.value}})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" />
            </div>
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Description</label>
              <textarea value={content.lifepo4.description} onChange={e => setContent({...content, lifepo4: {...content.lifepo4, description: e.target.value}})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={3} />
            </div>
            {content.lifepo4.features.map((feature, i) => (
              <div key={i} className="border border-brand-greyMid rounded p-4">
                <label className="block text-brand-white mb-2 text-sm font-semibold">Feature {i + 1}</label>
                <input value={feature.title} onChange={e => {
                  const newFeatures = [...content.lifepo4.features];
                  newFeatures[i] = {...feature, title: e.target.value};
                  setContent({...content, lifepo4: {...content.lifepo4, features: newFeatures}});
                }} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white mb-2" placeholder="Title" />
                <textarea value={feature.desc} onChange={e => {
                  const newFeatures = [...content.lifepo4.features];
                  newFeatures[i] = {...feature, desc: e.target.value};
                  setContent({...content, lifepo4: {...content.lifepo4, features: newFeatures}});
                }} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={2} placeholder="Description" />
              </div>
            ))}
          </div>
        </div>
        )}

        {/* BMS Section */}
        {content.bms && (
        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-brand-white">BMS Section</h3>
            <button onClick={() => handleDeleteSection('bms')} className="text-red-400 hover:text-red-300 text-sm">
              Delete Section
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Title</label>
              <input value={content.bms.title} onChange={e => setContent({...content, bms: {...content.bms, title: e.target.value}})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" />
            </div>
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Description</label>
              <textarea value={content.bms.description} onChange={e => setContent({...content, bms: {...content.bms, description: e.target.value}})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={3} />
            </div>
            {content.bms.features.map((feature, i) => (
              <div key={i} className="border border-brand-greyMid rounded p-4">
                <label className="block text-brand-white mb-2 text-sm font-semibold">Feature {i + 1}</label>
                <input value={feature.title} onChange={e => {
                  const newFeatures = [...content.bms.features];
                  newFeatures[i] = {...feature, title: e.target.value};
                  setContent({...content, bms: {...content.bms, features: newFeatures}});
                }} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white mb-2" placeholder="Title" />
                <textarea value={feature.desc} onChange={e => {
                  const newFeatures = [...content.bms.features];
                  newFeatures[i] = {...feature, desc: e.target.value};
                  setContent({...content, bms: {...content.bms, features: newFeatures}});
                }} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={2} placeholder="Description" />
              </div>
            ))}
          </div>
        </div>
        )}

        {/* CATL Section */}
        {content.catl && (
        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-brand-white">CATL Partnership Section</h3>
            <button onClick={() => handleDeleteSection('catl')} className="text-red-400 hover:text-red-300 text-sm">
              Delete Section
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Title</label>
              <input value={content.catl.title} onChange={e => setContent({...content, catl: {...content.catl, title: e.target.value}})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" />
            </div>
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Description</label>
              <textarea value={content.catl.description} onChange={e => setContent({...content, catl: {...content.catl, description: e.target.value}})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={3} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {content.catl.stats.map((stat, i) => (
                <div key={i} className="border border-brand-greyMid rounded p-4">
                  <label className="block text-brand-white mb-2 text-sm font-semibold">Stat {i + 1}</label>
                  <input value={stat.value} onChange={e => {
                    const newStats = [...content.catl.stats];
                    newStats[i] = {...stat, value: e.target.value};
                    setContent({...content, catl: {...content.catl, stats: newStats}});
                  }} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white mb-2" placeholder="Value" />
                  <input value={stat.label} onChange={e => {
                    const newStats = [...content.catl.stats];
                    newStats[i] = {...stat, label: e.target.value};
                    setContent({...content, catl: {...content.catl, stats: newStats}});
                  }} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" placeholder="Label" />
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
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
    <form onSubmit={handleSubmit} className="bg-brand-black border border-brand-greyMid rounded-lg p-4">
      <h4 className="text-lg font-bold text-brand-white mb-4">{technology ? 'Edit' : 'Add'} Technology</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-brand-white mb-1 text-sm font-semibold">Category</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-brand-grey border border-brand-greyMid rounded px-3 py-2 text-brand-white text-sm" required>
            <option value="Battery">Battery</option>
            <option value="Solar Panel">Solar Panel</option>
            <option value="Inverter">Inverter</option>
            <option value="BMS">BMS</option>
            <option value="Energy Storage">Energy Storage</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-brand-white mb-1 text-sm font-semibold">Title</label>
          <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-brand-grey border border-brand-greyMid rounded px-3 py-2 text-brand-white text-sm" required />
        </div>

        <div>
          <label className="block text-brand-white mb-1 text-sm font-semibold">Description</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-brand-grey border border-brand-greyMid rounded px-3 py-2 text-brand-white text-sm" rows={2} required />
        </div>

        <div>
          <label className="block text-brand-white mb-1 text-sm font-semibold">Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="bg-brand-grey text-brand-white border border-brand-greyMid rounded p-2 w-full text-sm" />
          {formData.image && <img src={formData.image} alt="Preview" className="mt-2 rounded max-h-32" />}
        </div>

        <div>
          <label className="block text-brand-white mb-1 text-sm font-semibold">Features (one per line)</label>
          <textarea value={formData.features.join('\n')} onChange={e => setFormData({...formData, features: e.target.value.split('\n').filter(f => f.trim())})} className="w-full bg-brand-grey border border-brand-greyMid rounded px-3 py-2 text-brand-white text-sm" rows={3} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button type="submit" className="bg-brand-green text-brand-black px-4 py-2 rounded-lg hover:bg-brand-greenDim font-semibold text-sm">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-semibold text-sm">Cancel</button>
      </div>
    </form>
  );
};

export default TechnologyContentManager;
