import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Upload } from 'lucide-react';
import { adminApi } from '@/services/api';

const FooterManager = () => {
  const [footer, setFooter] = useState<any>({
    logoUrl: '/images/logo.png',
    siteName: 'LIXI',
    tagline: 'Premium lithium battery storage and solar solutions.',
    socialMedia: [],
    productLinks: [],
    solutionLinks: [],
    companyLinks: [],
    locations: [],
    carbonozText: 'Powered by CARBONOZ',
    copyrightText: 'HelioAegis GmbH i.G. All rights reserved.',
  });

  useEffect(() => {
    adminApi.list('footer').then(data => {
      if (data.length > 0) setFooter(data[0]);
    });
  }, []);

  const handleSave = async () => {
    const existing = await adminApi.list('footer');
    if (existing.length > 0) {
      await adminApi.update('footer', { ...footer, id: 'footer' });
    } else {
      await adminApi.create('footer', { ...footer, id: 'footer' });
    }
    alert('Footer updated!');
  };

  const addItem = (section: string) => {
    const newItem = section === 'socialMedia' ? { icon: 'Linkedin', url: '' } :
                    section === 'locations' ? { flag: '🇱🇮', region: 'EU', name: '', address: '' } :
                    { label: '', url: '' };
    setFooter({ ...footer, [section]: [...(footer[section] || []), newItem] });
  };

  const deleteItem = (section: string, index: number) => {
    setFooter({ ...footer, [section]: footer[section].filter((_: any, i: number) => i !== index) });
  };

  const updateItem = (section: string, index: number, field: string, value: string) => {
    const updated = [...footer[section]];
    updated[index] = { ...updated[index], [field]: value };
    setFooter({ ...footer, [section]: updated });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-white">Footer Manager</h1>
        <button onClick={handleSave} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-bold hover:bg-brand-lime flex items-center gap-2">
          <Save size={20} /> Save All Changes
        </button>
      </div>

      <div className="max-w-6xl space-y-6">
        {/* Branding */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-brand-white mb-4">Branding</h2>
          <div className="mb-4">
            <label className="block text-brand-white mb-2">Logo</label>
            <div className="flex items-center gap-4">
              {footer.logoUrl && <img src={footer.logoUrl} alt="Logo" className="h-12 object-contain bg-white/10 px-2 py-1 rounded" />}
              <input type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = async () => {
                    const url = await adminApi.upload(reader.result as string, `logo-${Date.now()}.${file.name.split('.').pop()}`);
                    setFooter({ ...footer, logoUrl: url });
                  };
                  reader.readAsDataURL(file);
                }
              }} className="hidden" id="logo-upload" />
              <label htmlFor="logo-upload" className="bg-brand-green text-brand-black px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-brand-lime">
                <Upload size={16} /> Upload Logo
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Logo URL (or upload above)" value={footer.logoUrl} onChange={(e) => setFooter({ ...footer, logoUrl: e.target.value })} className="bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            <input placeholder="Site Name" value={footer.siteName} onChange={(e) => setFooter({ ...footer, siteName: e.target.value })} className="bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
          <textarea placeholder="Tagline" value={footer.tagline} onChange={(e) => setFooter({ ...footer, tagline: e.target.value })} rows={2} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg mt-4" />
        </div>

        {/* Social Media */}
        <div className="bg-brand-grey rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-white">Social Media</h2>
            <button onClick={() => addItem('socialMedia')} className="bg-brand-green text-brand-black px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={16} /> Add
            </button>
          </div>
          {footer.socialMedia.map((item: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <select value={item.icon} onChange={(e) => updateItem('socialMedia', i, 'icon', e.target.value)} className="bg-brand-black text-brand-white px-4 py-2 rounded-lg">
                <option>Linkedin</option>
                <option>Twitter</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Youtube</option>
              </select>
              <input placeholder="URL" value={item.url} onChange={(e) => updateItem('socialMedia', i, 'url', e.target.value)} className="flex-1 bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              <button onClick={() => deleteItem('socialMedia', i)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        {/* Product Links */}
        <div className="bg-brand-grey rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-white">Product Links</h2>
            <button onClick={() => addItem('productLinks')} className="bg-brand-green text-brand-black px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={16} /> Add
            </button>
          </div>
          {footer.productLinks.map((item: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <input placeholder="Label" value={item.label} onChange={(e) => updateItem('productLinks', i, 'label', e.target.value)} className="flex-1 bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              <input placeholder="URL" value={item.url} onChange={(e) => updateItem('productLinks', i, 'url', e.target.value)} className="flex-1 bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              <button onClick={() => deleteItem('productLinks', i)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        {/* Solution Links */}
        <div className="bg-brand-grey rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-white">Solution Links</h2>
            <button onClick={() => addItem('solutionLinks')} className="bg-brand-green text-brand-black px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={16} /> Add
            </button>
          </div>
          {footer.solutionLinks.map((item: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <input placeholder="Label" value={item.label} onChange={(e) => updateItem('solutionLinks', i, 'label', e.target.value)} className="flex-1 bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              <input placeholder="URL" value={item.url} onChange={(e) => updateItem('solutionLinks', i, 'url', e.target.value)} className="flex-1 bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              <button onClick={() => deleteItem('solutionLinks', i)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        {/* Company Links */}
        <div className="bg-brand-grey rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-white">Company Links</h2>
            <button onClick={() => addItem('companyLinks')} className="bg-brand-green text-brand-black px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={16} /> Add
            </button>
          </div>
          {footer.companyLinks.map((item: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <input placeholder="Label" value={item.label} onChange={(e) => updateItem('companyLinks', i, 'label', e.target.value)} className="flex-1 bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              <input placeholder="URL" value={item.url} onChange={(e) => updateItem('companyLinks', i, 'url', e.target.value)} className="flex-1 bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              <button onClick={() => deleteItem('companyLinks', i)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        {/* Locations */}
        <div className="bg-brand-grey rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-white">Locations</h2>
            <button onClick={() => addItem('locations')} className="bg-brand-green text-brand-black px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={16} /> Add
            </button>
          </div>
          {(footer.locations || []).map((item: any, i: number) => (
            <div key={i} className="bg-brand-black rounded-lg p-4 mb-4">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <input placeholder="Flag 🇱🇮" value={item.flag || ''} onChange={(e) => updateItem('locations', i, 'flag', e.target.value)} className="bg-brand-grey text-brand-white px-4 py-2 rounded-lg" />
                <input placeholder="Region" value={item.region || ''} onChange={(e) => updateItem('locations', i, 'region', e.target.value)} className="bg-brand-grey text-brand-white px-4 py-2 rounded-lg" />
                <input placeholder="Company Name" value={item.name || ''} onChange={(e) => updateItem('locations', i, 'name', e.target.value)} className="bg-brand-grey text-brand-white px-4 py-2 rounded-lg" />
              </div>
              <textarea placeholder="Address (multiline)" value={item.address || ''} onChange={(e) => updateItem('locations', i, 'address', e.target.value)} rows={3} className="w-full bg-brand-grey text-brand-white px-4 py-2 rounded-lg mb-2" />
              <button onClick={() => deleteItem('locations', i)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg w-full"><Trash2 size={16} className="inline mr-2" /> Delete Location</button>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-brand-white mb-4">Footer Text</h2>
          <input placeholder="CARBONOZ Text" value={footer.carbonozText} onChange={(e) => setFooter({ ...footer, carbonozText: e.target.value })} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg mb-4" />
          <input placeholder="Copyright Text" value={footer.copyrightText} onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default FooterManager;
