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
    productsTitle: 'Energy Storage Systems',
    productsSubtitle: 'View All Products',
    productsBadge: 'Recommended for Large Projects',
    productsName: 'LIXI Mega',
    productsDesc: 'Industrial-grade 400V battery system with integrated PCS inverter for microgrids and large installations.',
    productsCapacity: '112.5 kWh',
    productsVoltage: '400V',
    productsPower: '50kW',
    productsButtonText: 'View Large Battery Details',
    productsButtonUrl: '/products/mega-400v',
    productsImage: 'https://images.unsplash.com/photo-1545259742-b4e3efa1ee29?w=1200&q=85',
    technologyTitle: 'Advanced Energy Technology Platform',
    technologySubtitle: 'Our comprehensive technology platform positions us as a leading provider of intelligent energy solutions.',
    tech1Title: 'Real-time Monitoring',
    tech1Desc: 'Advanced monitoring systems provide live data on battery performance, energy flows, and system health.',
    tech2Title: 'AI Charging Optimization',
    tech2Desc: 'Machine learning algorithms optimize charging patterns based on usage patterns and energy prices.',
    tech3Title: 'Carbon Intensity Tracking',
    tech3Desc: 'Track and optimize energy usage based on grid carbon intensity for maximum environmental impact.',
    tech4Title: 'Data Dashboards',
    tech4Desc: 'Comprehensive dashboards provide insights into energy usage, cost savings, and system performance.',
    tech5Title: 'Remote Management',
    tech5Desc: 'Secure remote access allows for system monitoring, diagnostics, and maintenance from anywhere.',
    tech6Title: 'Grid Integration',
    tech6Desc: 'Seamless integration with smart grids and energy trading platforms for maximum efficiency.',
    dashboardTitle: 'Access Your Energy Dashboard',
    dashboardSubtitle: 'Monitor your LIXI energy systems in real-time with our advanced monitoring platform. Track performance, optimize efficiency, and manage your energy infrastructure from anywhere.',
    dashboardButtonText: 'Access Platform Dashboard',
    dashboardButtonUrl: 'https://login.carbonoz.com',
    dashboardSecondaryText: 'Request Demo Access',
    dashboardSecondaryUrl: '/contact',
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
      productsTitle: formData.get('productsTitle') as string,
      productsSubtitle: formData.get('productsSubtitle') as string,
      productsBadge: formData.get('productsBadge') as string,
      productsName: formData.get('productsName') as string,
      productsDesc: formData.get('productsDesc') as string,
      productsCapacity: formData.get('productsCapacity') as string,
      productsVoltage: formData.get('productsVoltage') as string,
      productsPower: formData.get('productsPower') as string,
      productsButtonText: formData.get('productsButtonText') as string,
      productsButtonUrl: formData.get('productsButtonUrl') as string,
      productsImage: settings.productsImage,
      technologyTitle: formData.get('technologyTitle') as string,
      technologySubtitle: formData.get('technologySubtitle') as string,
      tech1Title: formData.get('tech1Title') as string,
      tech1Desc: formData.get('tech1Desc') as string,
      tech2Title: formData.get('tech2Title') as string,
      tech2Desc: formData.get('tech2Desc') as string,
      tech3Title: formData.get('tech3Title') as string,
      tech3Desc: formData.get('tech3Desc') as string,
      tech4Title: formData.get('tech4Title') as string,
      tech4Desc: formData.get('tech4Desc') as string,
      tech5Title: formData.get('tech5Title') as string,
      tech5Desc: formData.get('tech5Desc') as string,
      tech6Title: formData.get('tech6Title') as string,
      tech6Desc: formData.get('tech6Desc') as string,
      dashboardTitle: formData.get('dashboardTitle') as string,
      dashboardSubtitle: formData.get('dashboardSubtitle') as string,
      dashboardButtonText: formData.get('dashboardButtonText') as string,
      dashboardButtonUrl: formData.get('dashboardButtonUrl') as string,
      dashboardSecondaryText: formData.get('dashboardSecondaryText') as string,
      dashboardSecondaryUrl: formData.get('dashboardSecondaryUrl') as string,
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
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3003'}/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, filename }),
      });
      
      const { url } = await response.json();
      setSettings(prev => ({ ...prev, logoUrl: url }));
    };
    reader.readAsDataURL(file);
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const filename = `products-${Date.now()}-${file.name}`;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3003'}/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, filename }),
      });
      
      const { url } = await response.json();
      setSettings(prev => ({ ...prev, productsImage: url }));
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

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Energy Storage Systems Section</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Section Title</label>
              <input name="productsTitle" defaultValue={settings.productsTitle} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Link Text</label>
              <input name="productsSubtitle" defaultValue={settings.productsSubtitle} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
          </div>
          <div className="border-t border-brand-greyMid pt-4 mt-4">
            <h3 className="text-brand-white font-semibold mb-3">Featured Product Card</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-brand-white/70 mb-2 text-sm">Product Image</label>
                <input 
                  type="text" 
                  value={settings.productsImage} 
                  onChange={(e) => setSettings(prev => ({ ...prev, productsImage: e.target.value }))} 
                  className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg mb-2" 
                  placeholder="Image URL"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleProductImageUpload} 
                  className="text-brand-white/70 text-sm" 
                />
                {settings.productsImage && (
                  <img src={settings.productsImage} alt="Product preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                )}
              </div>
              <div>
                <label className="block text-brand-white/70 mb-2 text-sm">Badge Text</label>
                <input name="productsBadge" defaultValue={settings.productsBadge} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">Product Name</label>
                  <input name="productsName" defaultValue={settings.productsName} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">Description</label>
                  <input name="productsDesc" defaultValue={settings.productsDesc} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">Capacity</label>
                  <input name="productsCapacity" defaultValue={settings.productsCapacity} placeholder="112.5 kWh" className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">Voltage</label>
                  <input name="productsVoltage" defaultValue={settings.productsVoltage} placeholder="400V" className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">PCS Power</label>
                  <input name="productsPower" defaultValue={settings.productsPower} placeholder="50kW" className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">Button Text</label>
                  <input name="productsButtonText" defaultValue={settings.productsButtonText} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
                <div>
                  <label className="block text-brand-white/70 mb-2 text-sm">Button URL</label>
                  <input name="productsButtonUrl" defaultValue={settings.productsButtonUrl} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Advanced Energy Technology Platform Section</h2>
          <div>
            <label className="block text-brand-white mb-2">Section Title</label>
            <input name="technologyTitle" defaultValue={settings.technologyTitle} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-brand-white mb-2">Section Subtitle</label>
            <textarea name="technologySubtitle" defaultValue={settings.technologySubtitle} rows={2} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
          <div className="border-t border-brand-greyMid pt-4 mt-4">
            <h3 className="text-brand-white font-semibold mb-3">Technology Features</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <div key={num} className="border border-brand-greyMid rounded p-4">
                  <h4 className="text-brand-white/70 text-sm mb-3">Feature {num}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-brand-white/70 mb-2 text-sm">Title</label>
                      <input name={`tech${num}Title`} defaultValue={settings[`tech${num}Title` as keyof typeof settings]} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-brand-white/70 mb-2 text-sm">Description</label>
                      <input name={`tech${num}Desc`} defaultValue={settings[`tech${num}Desc` as keyof typeof settings]} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Access Your Energy Dashboard Section</h2>
          <div>
            <label className="block text-brand-white mb-2">Section Title</label>
            <input name="dashboardTitle" defaultValue={settings.dashboardTitle} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-brand-white mb-2">Section Subtitle</label>
            <textarea name="dashboardSubtitle" defaultValue={settings.dashboardSubtitle} rows={3} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Primary Button Text</label>
              <input name="dashboardButtonText" defaultValue={settings.dashboardButtonText} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Primary Button URL</label>
              <input name="dashboardButtonUrl" defaultValue={settings.dashboardButtonUrl} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Secondary Button Text</label>
              <input name="dashboardSecondaryText" defaultValue={settings.dashboardSecondaryText} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Secondary Button URL</label>
              <input name="dashboardSecondaryUrl" defaultValue={settings.dashboardSecondaryUrl} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
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
