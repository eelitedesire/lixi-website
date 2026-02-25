import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { adminApi } from '@/services/api';

const SiteSettingsManager = () => {
  const [serviceCenters, setServiceCenters] = useState<any[]>([]);
  const [settings, setSettings] = useState({
    logoUrl: '/images/logo.png',
    siteName: 'LIXI',
    ctaButtonText: 'Get Started',
    ctaButtonUrl: '/quote',
    feature1Title: 'Premium Cells',
    feature1Desc: 'CATL LiFePO4 cells with 8,000+ cycle life guarantee',
    feature2Title: 'German Engineering',
    feature2Desc: 'Designed and quality-controlled in Germany',
    feature3Title: 'Cut Energy Costs',
    feature3Desc: 'Reduce electricity bills by 60-90% with smart storage',
    feature4Title: 'Scalable Systems',
    feature4Desc: 'From 14kWh residential to multi-MWh industrial',
    partnerTitle: 'CARBONOZ Trading Platform',
    partnerDesc: 'Automated electricity trading across EU markets. Turn your LIXI battery into a revenue-generating asset.',
    partnerLink: '/trading',
    ctaTitle: 'Ready to Transform Your Energy Infrastructure?',
    ctaSubtitle: 'Join 1,200+ installations across Europe, Africa, and the Caribbean.',
    badge1: 'CATL Certified',
    badge2: 'IP55 Rated',
    badge3: 'CE Marked',
    badge4: 'CARBONOZ Partner',
  });

  useEffect(() => {
    adminApi.list('sitesettings').then(data => {
      if (data.length > 0) setSettings(data[0]);
    });
    adminApi.list('service-centers').then(setServiceCenters);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      logoUrl: formData.get('logoUrl') as string,
      siteName: formData.get('siteName') as string,
      ctaButtonText: formData.get('ctaButtonText') as string,
      ctaButtonUrl: formData.get('ctaButtonUrl') as string,
      feature1Title: formData.get('feature1Title') as string,
      feature1Desc: formData.get('feature1Desc') as string,
      feature2Title: formData.get('feature2Title') as string,
      feature2Desc: formData.get('feature2Desc') as string,
      feature3Title: formData.get('feature3Title') as string,
      feature3Desc: formData.get('feature3Desc') as string,
      feature4Title: formData.get('feature4Title') as string,
      feature4Desc: formData.get('feature4Desc') as string,
      partnerTitle: formData.get('partnerTitle') as string,
      partnerDesc: formData.get('partnerDesc') as string,
      partnerLink: formData.get('partnerLink') as string,
      ctaTitle: formData.get('ctaTitle') as string,
      ctaSubtitle: formData.get('ctaSubtitle') as string,
      badge1: formData.get('badge1') as string,
      badge2: formData.get('badge2') as string,
      badge3: formData.get('badge3') as string,
      badge4: formData.get('badge4') as string,
    };

    const existing = await adminApi.list('sitesettings');
    if (existing.length > 0) {
      await adminApi.update('sitesettings', { ...data, id: 'sitesettings' });
    } else {
      await adminApi.create('sitesettings', { ...data, id: 'sitesettings' });
    }
    alert('Site settings updated successfully!');
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const filename = `logo-${Date.now()}-${file.name}`;
      
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, filename }),
      });
      
      const { url } = await response.json();
      setSettings(prev => ({ ...prev, logoUrl: url }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-white mb-8">Site Settings</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Branding</h2>
          
          <div>
            <label className="block text-brand-white mb-2">Logo URL</label>
            <input name="logoUrl" value={settings.logoUrl} onChange={(e) => setSettings(prev => ({ ...prev, logoUrl: e.target.value }))} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg mb-2" />
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-brand-white/70 text-sm" />
          </div>

          <div>
            <label className="block text-brand-white mb-2">Site Name</label>
            <input name="siteName" defaultValue={settings.siteName} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
        </div>

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">CTA Button (Navbar)</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Button Text</label>
              <input name="ctaButtonText" defaultValue={settings.ctaButtonText} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Button URL</label>
              <input name="ctaButtonUrl" defaultValue={settings.ctaButtonUrl} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Home Page Features</h2>
          
          {[1, 2, 3, 4].map(num => (
            <div key={num} className="border border-brand-greyMid rounded p-4">
              <h3 className="text-brand-white font-semibold mb-3">Feature {num}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">Title</label>
                  <input name={`feature${num}Title`} defaultValue={settings[`feature${num}Title` as keyof typeof settings]} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">Description</label>
                  <input name={`feature${num}Desc`} defaultValue={settings[`feature${num}Desc` as keyof typeof settings]} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Featured Partner Section</h2>
          <div>
            <label className="block text-brand-white mb-2">Title</label>
            <input name="partnerTitle" defaultValue={settings.partnerTitle} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-brand-white mb-2">Description</label>
            <textarea name="partnerDesc" defaultValue={settings.partnerDesc} rows={2} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-brand-white mb-2">Link URL</label>
            <input name="partnerLink" defaultValue={settings.partnerLink} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
        </div>

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">CTA Section</h2>
          <div>
            <label className="block text-brand-white mb-2">Title</label>
            <input name="ctaTitle" defaultValue={settings.ctaTitle} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-brand-white mb-2">Subtitle</label>
            <input name="ctaSubtitle" defaultValue={settings.ctaSubtitle} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
        </div>

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Certification Badges</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(num => (
              <div key={num}>
                <label className="block text-brand-white mb-2">Badge {num}</label>
                <input name={`badge${num}`} defaultValue={settings[`badge${num}` as keyof typeof settings]} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-brand-green text-brand-black px-6 py-3 rounded-lg font-bold hover:bg-brand-lime flex items-center justify-center gap-2">
          <Save size={20} /> Save Site Settings
        </button>
      </form>

      <div className="max-w-4xl mt-12">
        <div className="bg-brand-grey rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-brand-white">Service Centers</h2>
            <button onClick={() => setServiceCenters([...serviceCenters, { id: Date.now().toString(), name: '', region: '', address: '', city: '', country: '', phone: '', email: '', hours: '' }])} className="bg-brand-green text-brand-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-lime">
              <Plus size={16} /> Add Service Center
            </button>
          </div>
          
          <div className="space-y-4">
            {serviceCenters.map((center, i) => (
              <div key={center.id} className="bg-brand-black rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input placeholder="Name" value={center.name || ''} onChange={(e) => {
                    const updated = [...serviceCenters];
                    updated[i].name = e.target.value;
                    setServiceCenters(updated);
                  }} className="bg-brand-grey text-brand-white px-3 py-2 rounded-lg text-sm" />
                  <input placeholder="Region (e.g., EU, Africa)" value={center.region || ''} onChange={(e) => {
                    const updated = [...serviceCenters];
                    updated[i].region = e.target.value;
                    setServiceCenters(updated);
                  }} className="bg-brand-grey text-brand-white px-3 py-2 rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input placeholder="Address" value={center.address || ''} onChange={(e) => {
                    const updated = [...serviceCenters];
                    updated[i].address = e.target.value;
                    setServiceCenters(updated);
                  }} className="bg-brand-grey text-brand-white px-3 py-2 rounded-lg text-sm" />
                  <input placeholder="City" value={center.city || ''} onChange={(e) => {
                    const updated = [...serviceCenters];
                    updated[i].city = e.target.value;
                    setServiceCenters(updated);
                  }} className="bg-brand-grey text-brand-white px-3 py-2 rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <input placeholder="Country" value={center.country || ''} onChange={(e) => {
                    const updated = [...serviceCenters];
                    updated[i].country = e.target.value;
                    setServiceCenters(updated);
                  }} className="bg-brand-grey text-brand-white px-3 py-2 rounded-lg text-sm" />
                  <input placeholder="Phone" value={center.phone || ''} onChange={(e) => {
                    const updated = [...serviceCenters];
                    updated[i].phone = e.target.value;
                    setServiceCenters(updated);
                  }} className="bg-brand-grey text-brand-white px-3 py-2 rounded-lg text-sm" />
                  <input placeholder="Email" type="email" value={center.email || ''} onChange={(e) => {
                    const updated = [...serviceCenters];
                    updated[i].email = e.target.value;
                    setServiceCenters(updated);
                  }} className="bg-brand-grey text-brand-white px-3 py-2 rounded-lg text-sm" />
                </div>
                <div className="flex gap-3">
                  <input placeholder="Hours (e.g., Mon-Fri 9AM-6PM)" value={center.hours || ''} onChange={(e) => {
                    const updated = [...serviceCenters];
                    updated[i].hours = e.target.value;
                    setServiceCenters(updated);
                  }} className="flex-1 bg-brand-grey text-brand-white px-3 py-2 rounded-lg text-sm" />
                  <button onClick={async () => {
                    await adminApi.delete('service-centers', center.id);
                    setServiceCenters(serviceCenters.filter(c => c.id !== center.id));
                  }} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={async () => {
            for (const center of serviceCenters) {
              await adminApi.update('service-centers', center);
            }
            alert('Service centers saved!');
          }} className="w-full mt-4 bg-brand-green text-brand-black px-6 py-3 rounded-lg font-bold hover:bg-brand-lime flex items-center justify-center gap-2">
            <Save size={20} /> Save Service Centers
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsManager;
