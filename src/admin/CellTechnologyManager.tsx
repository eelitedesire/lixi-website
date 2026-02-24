import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { adminApi } from '@/services/api';

interface CellTech {
  badge: string;
  title: string;
  description: string;
  image: string;
  cardLabel: string;
  cardTitle: string;
  cardSubtitle: string;
  feature1Icon: string;
  feature1Title: string;
  feature1Body: string;
  feature2Icon: string;
  feature2Title: string;
  feature2Body: string;
  feature3Icon: string;
  feature3Title: string;
  feature3Body: string;
  feature4Icon: string;
  feature4Title: string;
  feature4Body: string;
}

const CellTechnologyManager = () => {
  const [cellTech, setCellTech] = useState<CellTech>({
    badge: 'Cell Technology',
    title: 'Premium CATL Cells',
    description: 'Every LIXI battery uses certified CATL lithium iron phosphate (LiFePO4) cells — the same manufacturer trusted by Tesla, BMW, and Volkswagen.',
    image: '/images/catl-factory.jpg',
    cardLabel: 'CELL SUPPLIER',
    cardTitle: 'CATL',
    cardSubtitle: "World's #1 Battery Manufacturer",
    feature1Icon: '🔒',
    feature1Title: 'Thermal Safe',
    feature1Body: 'LFP chemistry eliminates thermal runaway risk',
    feature2Icon: '♻️',
    feature2Title: '8,000+ Cycles',
    feature2Body: 'More than 20 years of daily cycling',
    feature3Icon: '⚡',
    feature3Title: 'Stable Voltage',
    feature3Body: 'Flat discharge curve from 100% to 20%',
    feature4Icon: '🌱',
    feature4Title: 'Eco-Friendly',
    feature4Body: 'Non-toxic, fully recyclable materials',
  });

  useEffect(() => {
    adminApi.list('celltech').then(data => {
      if (data.length > 0) setCellTech(data[0]);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: CellTech = {
      badge: formData.get('badge') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      cardLabel: formData.get('cardLabel') as string,
      cardTitle: formData.get('cardTitle') as string,
      cardSubtitle: formData.get('cardSubtitle') as string,
      feature1Icon: formData.get('feature1Icon') as string,
      feature1Title: formData.get('feature1Title') as string,
      feature1Body: formData.get('feature1Body') as string,
      feature2Icon: formData.get('feature2Icon') as string,
      feature2Title: formData.get('feature2Title') as string,
      feature2Body: formData.get('feature2Body') as string,
      feature3Icon: formData.get('feature3Icon') as string,
      feature3Title: formData.get('feature3Title') as string,
      feature3Body: formData.get('feature3Body') as string,
      feature4Icon: formData.get('feature4Icon') as string,
      feature4Title: formData.get('feature4Title') as string,
      feature4Body: formData.get('feature4Body') as string,
    };

    const existing = await adminApi.list('celltech');
    if (existing.length > 0) {
      await adminApi.update('celltech', { ...data, id: 'celltech' });
    } else {
      await adminApi.create('celltech', { ...data, id: 'celltech' });
    }
    alert('Cell Technology updated successfully!');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const filename = `celltech-${Date.now()}-${file.name}`;
      
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, filename }),
      });
      
      const { url } = await response.json();
      setCellTech(prev => ({ ...prev, image: url }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-white mb-8">Cell Technology Section</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Header Content</h2>
          
          <div>
            <label className="block text-brand-white mb-2">Badge</label>
            <input name="badge" defaultValue={cellTech.badge} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>

          <div>
            <label className="block text-brand-white mb-2">Title</label>
            <input name="title" defaultValue={cellTech.title} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>

          <div>
            <label className="block text-brand-white mb-2">Description</label>
            <textarea name="description" defaultValue={cellTech.description} rows={3} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
          </div>
        </div>

        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Image & Card Overlay</h2>
          
          <div>
            <label className="block text-brand-white mb-2">Image URL</label>
            <input name="image" value={cellTech.image} onChange={(e) => setCellTech(prev => ({ ...prev, image: e.target.value }))} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg mb-2" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-brand-white/70 text-sm" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Card Label</label>
              <input name="cardLabel" defaultValue={cellTech.cardLabel} placeholder="CELL SUPPLIER" className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Card Title</label>
              <input name="cardTitle" defaultValue={cellTech.cardTitle} placeholder="CATL" className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Card Subtitle</label>
              <input name="cardSubtitle" defaultValue={cellTech.cardSubtitle} placeholder="World's #1" className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
            </div>
          </div>
        </div>

        {[1, 2, 3, 4].map(num => (
          <div key={num} className="bg-brand-grey rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-brand-white mb-4">Feature {num}</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-brand-white mb-2">Icon (Emoji)</label>
                <input name={`feature${num}Icon`} defaultValue={cellTech[`feature${num}Icon` as keyof CellTech]} placeholder="🔒" className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-brand-white mb-2">Title</label>
                <input name={`feature${num}Title`} defaultValue={cellTech[`feature${num}Title` as keyof CellTech]} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-brand-white mb-2">Body</label>
                <input name={`feature${num}Body`} defaultValue={cellTech[`feature${num}Body` as keyof CellTech]} className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg" />
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="w-full bg-brand-green text-brand-black px-6 py-3 rounded-lg font-bold hover:bg-brand-lime flex items-center justify-center gap-2">
          <Save size={20} /> Save Cell Technology Content
        </button>
      </form>
    </div>
  );
};

export default CellTechnologyManager;
