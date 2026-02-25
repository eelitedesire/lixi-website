import { useState, useEffect } from 'react';
import { defaultServiceData, defaultPageSettings, ServiceRegion, ServicePackage, ServicePageSettings } from '../data/serviceData';
import { adminApi } from '../services/api';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const ServicesAdmin = () => {
  const [regions, setRegions] = useState<ServiceRegion[]>([]);
  const [pageSettings, setPageSettings] = useState<ServicePageSettings>(defaultPageSettings);
  const [editingRegion, setEditingRegion] = useState<ServiceRegion | null>(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [addingRegion, setAddingRegion] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await adminApi.list('services');
      const serviceData = data.find((item: any) => item.id === 'service-data') || data[0];
      setRegions(serviceData?.regions?.length ? serviceData.regions : defaultServiceData);
      setPageSettings(serviceData?.settings || defaultPageSettings);
    } catch {
      setRegions(defaultServiceData);
      setPageSettings(defaultPageSettings);
    }
  };

  const saveData = async (newRegions: ServiceRegion[], newSettings: ServicePageSettings) => {
    await adminApi.update('services', { id: 'service-data', regions: newRegions, settings: newSettings });
    await loadData();
  };

  const saveRegion = async (region: ServiceRegion) => {
    const existingIndex = regions.findIndex(r => r.id === region.id);
    const newRegions = existingIndex >= 0
      ? regions.map(r => r.id === region.id ? region : r)
      : [...regions, region];
    await saveData(newRegions, pageSettings);
    setEditingRegion(null);
    setAddingRegion(false);
  };

  const deleteRegion = async (id: string) => {
    if (confirm('Delete this region?')) {
      await saveData(regions.filter(r => r.id !== id), pageSettings);
    }
  };

  const saveSettings = async (settings: ServicePageSettings) => {
    await saveData(regions, settings);
    setEditingSettings(false);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onloadend = async () => {
        const res = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result, filename: `service-${Date.now()}-${file.name}` })
        });
        const data = await res.json();
        resolve(data.url);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Service Management</h2>
          <p className="text-brand-white/60">{regions.length} regions configured</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setEditingSettings(true)} className="bg-blue-500/20 text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500/30 transition flex items-center gap-2">
            <Edit size={18} /> Edit Page Settings
          </button>
          <button onClick={() => { setAddingRegion(true); setEditingRegion({ id: Date.now().toString(), name: '', flag: '', title: '', subtitle: '', description: [''], packages: [], contactEmail: '', address: '' }); }} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2">
            <Plus size={18} /> Add Region
          </button>
        </div>
      </div>

      {editingSettings && (
        <SettingsEditor settings={pageSettings} onSave={saveSettings} onCancel={() => setEditingSettings(false)} />
      )}

      <div className="space-y-6">
        {regions.map(region => (
          <div key={region.id} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
            {editingRegion?.id === region.id ? (
              <RegionEditor region={editingRegion} onSave={saveRegion} onCancel={() => { setEditingRegion(null); setAddingRegion(false); }} onUpload={uploadImage} />
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{region.flag}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-white">{region.name}</h3>
                      <p className="text-brand-white/60">{region.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingRegion(region)} className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 font-semibold transition">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => deleteRegion(region.id)} className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 font-semibold transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-brand-white/60 text-sm mb-2">{region.description[0]?.substring(0, 150)}...</p>
                  </div>
                  <div>
                    <p className="text-brand-white/80 text-sm"><strong>Contact:</strong> {region.contactEmail}</p>
                    <p className="text-brand-white/80 text-sm"><strong>Address:</strong> {region.address}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">{region.packages.length} Packages</span>
                </div>
              </>
            )}
          </div>
        ))}
        
        {addingRegion && editingRegion && (
          <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
            <RegionEditor region={editingRegion} onSave={saveRegion} onCancel={() => { setEditingRegion(null); setAddingRegion(false); }} onUpload={uploadImage} />
          </div>
        )}
      </div>
    </div>
  );
};

const RegionEditor = ({ region, onSave, onCancel, onUpload }: any) => {
  const [form, setForm] = useState({
    ...region,
    description: Array.isArray(region.description) ? region.description : [region.description || ''],
    packages: Array.isArray(region.packages) ? region.packages : []
  });

  const updateField = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const updateDescription = (index: number, value: string) => {
    const newDesc = [...form.description];
    newDesc[index] = value;
    setForm({ ...form, description: newDesc });
  };

  const addPackage = () => {
    setForm({
      ...form,
      packages: [...form.packages, { id: Date.now().toString(), name: '', description: '', price: 0, features: [''] }]
    });
  };

  const updatePackage = (index: number, field: string, value: any) => {
    const newPkgs = [...form.packages];
    newPkgs[index] = { ...newPkgs[index], [field]: value };
    setForm({ ...form, packages: newPkgs });
  };

  const removePackage = (index: number) => {
    setForm({ ...form, packages: form.packages.filter((_: any, i: number) => i !== index) });
  };

  const updatePackageFeature = (pkgIndex: number, featIndex: number, value: string) => {
    const newPkgs = [...form.packages];
    newPkgs[pkgIndex].features[featIndex] = value;
    setForm({ ...form, packages: newPkgs });
  };

  const addPackageFeature = (pkgIndex: number) => {
    const newPkgs = [...form.packages];
    newPkgs[pkgIndex].features.push('');
    setForm({ ...form, packages: newPkgs });
  };

  const removePackageFeature = (pkgIndex: number, featIndex: number) => {
    const newPkgs = [...form.packages];
    newPkgs[pkgIndex].features = newPkgs[pkgIndex].features.filter((_: any, i: number) => i !== featIndex);
    setForm({ ...form, packages: newPkgs });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, pkgIndex?: number) => {
    if (e.target.files?.[0]) {
      const url = await onUpload(e.target.files[0]);
      if (pkgIndex !== undefined) {
        updatePackage(pkgIndex, field, url);
      } else {
        updateField(field, url);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input className="input-field" placeholder="Name" value={form.name} onChange={e => updateField('name', e.target.value)} />
        <input className="input-field" placeholder="Flag Emoji" value={form.flag} onChange={e => updateField('flag', e.target.value)} />
        <input className="input-field col-span-2" placeholder="Title" value={form.title} onChange={e => updateField('title', e.target.value)} />
        <input className="input-field col-span-2" placeholder="Subtitle" value={form.subtitle} onChange={e => updateField('subtitle', e.target.value)} />
      </div>

      <div>
        <label className="block text-brand-white font-semibold mb-2">Hero Image</label>
        <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'image')} className="input-field" />
        {form.image && <img src={form.image} alt="Hero" className="mt-2 h-32 rounded" />}
      </div>

      <div>
        <label className="block text-brand-white font-semibold mb-2">Description Paragraphs</label>
        {(Array.isArray(form.description) ? form.description : [form.description]).map((desc: string, i: number) => (
          <textarea key={i} className="input-field mb-2" rows={3} value={desc} onChange={e => updateDescription(i, e.target.value)} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input className="input-field" placeholder="Contact Email" value={form.contactEmail} onChange={e => updateField('contactEmail', e.target.value)} />
        <input className="input-field" placeholder="Contact Phone (optional)" value={form.contactPhone || ''} onChange={e => updateField('contactPhone', e.target.value)} />
        <input className="input-field col-span-2" placeholder="Address" value={form.address} onChange={e => updateField('address', e.target.value)} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-brand-white font-semibold">Packages</label>
          <button onClick={addPackage} className="bg-brand-green/20 text-brand-green px-4 py-2 rounded-lg text-sm hover:bg-brand-green/30 flex items-center gap-2">
            <Plus size={16} /> Add Package
          </button>
        </div>
        {form.packages.map((pkg: ServicePackage, i: number) => (
          <div key={i} className="bg-brand-black/50 border border-brand-greyMid rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-3">
              <h4 className="text-brand-white font-bold">Package {i + 1}</h4>
              <button onClick={() => removePackage(i)} className="text-red-400 hover:text-red-300">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input className="input-field" placeholder="Name" value={pkg.name} onChange={e => updatePackage(i, 'name', e.target.value)} />
              <input className="input-field" type="number" placeholder="Price" value={pkg.price} onChange={e => updatePackage(i, 'price', parseFloat(e.target.value))} />
              <input className="input-field" placeholder="Badge (optional)" value={pkg.badge || ''} onChange={e => updatePackage(i, 'badge', e.target.value)} />
            </div>
            <textarea className="input-field mb-3" rows={2} placeholder="Description" value={pkg.description} onChange={e => updatePackage(i, 'description', e.target.value)} />
            <div className="mb-3">
              <label className="block text-brand-white text-sm mb-1">Package Image</label>
              <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'image', i)} className="input-field" />
              {pkg.image && <img src={pkg.image} alt="Package" className="mt-2 h-20 rounded" />}
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-brand-white text-sm">Features</label>
                <button onClick={() => addPackageFeature(i)} className="text-brand-green text-xs hover:text-brand-greenDim">+ Add</button>
              </div>
              {pkg.features.map((feat: string, fi: number) => (
                <div key={fi} className="flex gap-2 mb-2">
                  <input className="input-field flex-1 text-sm" value={feat} onChange={e => updatePackageFeature(i, fi, e.target.value)} />
                  <button onClick={() => removePackageFeature(i, fi)} className="text-red-400 hover:text-red-300">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button onClick={() => onSave(form)} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save Changes
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">
          Cancel
        </button>
      </div>
    </div>
  );
};

const SettingsEditor = ({ settings, onSave, onCancel }: any) => {
  const [form, setForm] = useState(settings);

  const updateHero = (field: string, value: string) => {
    setForm({ ...form, hero: { ...form.hero, [field]: value } });
  };

  const updateWhyChoose = (field: string, value: any) => {
    setForm({ ...form, whyChoose: { ...form.whyChoose, [field]: value } });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...form.whyChoose.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    updateWhyChoose('features', newFeatures);
  };

  const addFeature = () => {
    updateWhyChoose('features', [...form.whyChoose.features, { icon: 'Sun', title: '', description: '' }]);
  };

  const removeFeature = (index: number) => {
    updateWhyChoose('features', form.whyChoose.features.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="bg-brand-black/50 border border-brand-green/30 rounded-xl p-6 mb-6">
      <h3 className="text-2xl font-bold text-brand-white mb-6">Page Settings</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-brand-white font-semibold mb-3">Hero Section</h4>
          <div className="grid grid-cols-2 gap-3">
            <input className="input-field" placeholder="Badge Text" value={form.hero.badge} onChange={e => updateHero('badge', e.target.value)} />
            <input className="input-field" placeholder="Title" value={form.hero.title} onChange={e => updateHero('title', e.target.value)} />
            <input className="input-field" placeholder="Subtitle" value={form.hero.subtitle} onChange={e => updateHero('subtitle', e.target.value)} />
            <input className="input-field" placeholder="CTA Text" value={form.hero.ctaText} onChange={e => updateHero('ctaText', e.target.value)} />
            <input className="input-field col-span-2" placeholder="CTA URL" value={form.hero.ctaUrl} onChange={e => updateHero('ctaUrl', e.target.value)} />
            <textarea className="input-field col-span-2" rows={3} placeholder="Description" value={form.hero.description} onChange={e => updateHero('description', e.target.value)} />
          </div>
        </div>

        <div>
          <h4 className="text-brand-white font-semibold mb-3">Why Choose Section</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input className="input-field" placeholder="Title" value={form.whyChoose.title} onChange={e => updateWhyChoose('title', e.target.value)} />
            <input className="input-field" placeholder="Subtitle" value={form.whyChoose.subtitle} onChange={e => updateWhyChoose('subtitle', e.target.value)} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-brand-white text-sm">Features</label>
              <button onClick={addFeature} className="text-brand-green text-sm hover:text-brand-greenDim">+ Add Feature</button>
            </div>
            {form.whyChoose.features.map((feat: any, i: number) => (
              <div key={i} className="bg-brand-grey/30 p-3 rounded-lg">
                <div className="flex gap-2 mb-2">
                  <input className="input-field flex-1" placeholder="Icon (Sun/Battery/Zap)" value={feat.icon} onChange={e => updateFeature(i, 'icon', e.target.value)} />
                  <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300">
                    <X size={18} />
                  </button>
                </div>
                <input className="input-field mb-2" placeholder="Title" value={feat.title} onChange={e => updateFeature(i, 'title', e.target.value)} />
                <input className="input-field" placeholder="Description" value={feat.description} onChange={e => updateFeature(i, 'description', e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={() => onSave(form)} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save Settings
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ServicesAdmin;
