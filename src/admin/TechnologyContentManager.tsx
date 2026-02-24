import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { adminApi } from '../services/api';

const TechnologyContentManager = () => {
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
  }, []);

  const handleSave = async () => {
    await adminApi.update('techcontent', content);
    alert('Technology content updated!');
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
          <p className="text-brand-white/60">Edit static sections on technology page</p>
        </div>
        <button onClick={handleSave} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim flex items-center gap-2">
          <Save size={20} /> Save Changes
        </button>
      </div>

      <div className="space-y-8">
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

export default TechnologyContentManager;
