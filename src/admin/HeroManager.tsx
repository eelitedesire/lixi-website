import { useState, useEffect } from 'react';
import { Save, Trash2, Upload } from 'lucide-react';
import { adminApi } from '@/services/api';

interface HeroData {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  productName: string;
  productSubtitle: string;
  productCapacity: string;
  productVoltage: string;
  productAmperage: string;
  productCells: string;
  productImage: string;
  productImages?: string[];
}

const HeroManager = () => {
  const [hero, setHero] = useState<HeroData>({
    badge: 'Enterprise Energy Solutions',
    title: 'LIXI Solar &',
    titleHighlight: 'Electricity Storage',
    description: 'Discover the power and reliability of cutting-edge LIXI battery technology. Advanced lithium batteries designed for modern life, offering unmatched safety, longevity, and efficiency.',
    primaryButtonText: 'Get Started',
    primaryButtonUrl: 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt',
    secondaryButtonText: 'Explore Products',
    secondaryButtonUrl: '/products',
    stat1Value: '8000+',
    stat1Label: 'Charge Cycles',
    stat2Value: '112.5',
    stat2Label: 'kWh Max',
    stat3Value: '3',
    stat3Label: 'Continents',
    productName: 'LIXI Stack 48V',
    productSubtitle: 'Residential System',
    productCapacity: '14 kWh',
    productVoltage: '48V',
    productAmperage: '280Ah',
    productCells: 'CATL',
    productImage: '/images/battery-rack.jpg',
    productImages: [],
  });

  useEffect(() => {
    adminApi.list('hero').then(data => {
      if (data.length > 0) setHero(data[0]);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const heroData: HeroData = {
      badge: formData.get('badge') as string,
      title: formData.get('title') as string,
      titleHighlight: formData.get('titleHighlight') as string,
      description: formData.get('description') as string,
      primaryButtonText: formData.get('primaryButtonText') as string,
      primaryButtonUrl: formData.get('primaryButtonUrl') as string,
      secondaryButtonText: formData.get('secondaryButtonText') as string,
      secondaryButtonUrl: formData.get('secondaryButtonUrl') as string,
      stat1Value: formData.get('stat1Value') as string,
      stat1Label: formData.get('stat1Label') as string,
      stat2Value: formData.get('stat2Value') as string,
      stat2Label: formData.get('stat2Label') as string,
      stat3Value: formData.get('stat3Value') as string,
      stat3Label: formData.get('stat3Label') as string,
      productName: formData.get('productName') as string,
      productSubtitle: formData.get('productSubtitle') as string,
      productCapacity: formData.get('productCapacity') as string,
      productVoltage: formData.get('productVoltage') as string,
      productAmperage: formData.get('productAmperage') as string,
      productCells: formData.get('productCells') as string,
      productImage: formData.get('productImage') as string,
      productImages: hero.productImages,
    };

    const existing = await adminApi.list('hero');
    if (existing.length > 0) {
      await adminApi.update('hero', { ...heroData, id: 'hero' });
    } else {
      await adminApi.create('hero', { ...heroData, id: 'hero' });
    }
    alert('Hero updated successfully!');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const filename = `hero-${Date.now()}-${file.name}`;
      
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, filename }),
      });
      
      const { url } = await response.json();
      setHero(prev => ({ ...prev, productImage: url }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-white">Hero Section</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Badge & Title */}
        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Header Content</h2>
          
          <div>
            <label className="block text-brand-white mb-2">Badge Text</label>
            <input
              name="badge"
              defaultValue={hero.badge}
              className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-brand-white mb-2">Title (Line 1)</label>
            <input
              name="title"
              defaultValue={hero.title}
              className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-brand-white mb-2">Title Highlight (Line 2)</label>
            <input
              name="titleHighlight"
              defaultValue={hero.titleHighlight}
              className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-brand-white mb-2">Description</label>
            <textarea
              name="description"
              defaultValue={hero.description}
              rows={3}
              className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Call-to-Action Buttons</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Primary Button Text</label>
              <input
                name="primaryButtonText"
                defaultValue={hero.primaryButtonText}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Primary Button URL</label>
              <input
                name="primaryButtonUrl"
                defaultValue={hero.primaryButtonUrl}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Secondary Button Text</label>
              <input
                name="secondaryButtonText"
                defaultValue={hero.secondaryButtonText}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Secondary Button URL</label>
              <input
                name="secondaryButtonUrl"
                defaultValue={hero.secondaryButtonUrl}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Statistics</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Stat 1 Value</label>
              <input
                name="stat1Value"
                defaultValue={hero.stat1Value}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
              <label className="block text-brand-white mb-2 mt-2">Stat 1 Label</label>
              <input
                name="stat1Label"
                defaultValue={hero.stat1Label}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-brand-white mb-2">Stat 2 Value</label>
              <input
                name="stat2Value"
                defaultValue={hero.stat2Value}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
              <label className="block text-brand-white mb-2 mt-2">Stat 2 Label</label>
              <input
                name="stat2Label"
                defaultValue={hero.stat2Label}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-brand-white mb-2">Stat 3 Value</label>
              <input
                name="stat3Value"
                defaultValue={hero.stat3Value}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
              <label className="block text-brand-white mb-2 mt-2">Stat 3 Label</label>
              <input
                name="stat3Label"
                defaultValue={hero.stat3Label}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-brand-white mb-4">Featured Product Card</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Product Name</label>
              <input
                name="productName"
                defaultValue={hero.productName}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Product Subtitle</label>
              <input
                name="productSubtitle"
                defaultValue={hero.productSubtitle}
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Capacity</label>
              <input
                name="productCapacity"
                defaultValue={hero.productCapacity}
                placeholder="14 kWh"
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Voltage</label>
              <input
                name="productVoltage"
                defaultValue={hero.productVoltage}
                placeholder="48V"
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white mb-2">Amperage</label>
              <input
                name="productAmperage"
                defaultValue={hero.productAmperage}
                placeholder="280Ah"
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-brand-white mb-2">Cells</label>
              <input
                name="productCells"
                defaultValue={hero.productCells}
                placeholder="CATL"
                className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-brand-white mb-2">Product Image URL</label>
            <input
              name="productImage"
              value={hero.productImage}
              onChange={(e) => setHero(prev => ({ ...prev, productImage: e.target.value }))}
              className="w-full bg-brand-black text-brand-white px-4 py-2 rounded-lg mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-brand-white/70 text-sm"
            />
          </div>
        </div>

        {/* Product Images Carousel */}
        <div className="bg-brand-grey rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-white">Product Images Carousel</h2>
            <label className="bg-brand-green text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-lime cursor-pointer flex items-center gap-2">
              <Upload size={16} /> Add Image
              <input type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = async (event) => {
                  const base64 = event.target?.result as string;
                  const filename = `hero-carousel-${Date.now()}-${file.name}`;
                  const response = await fetch('http://localhost:3000/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64, filename }),
                  });
                  const { url } = await response.json();
                  setHero(prev => ({ ...prev, productImages: [...(prev.productImages || []), url] }));
                };
                reader.readAsDataURL(file);
              }} className="hidden" />
            </label>
          </div>
          <p className="text-brand-white/60 text-sm mb-4">These images will rotate on the hero section</p>
          <div className="grid grid-cols-3 gap-4">
            {(hero.productImages || []).map((img, i) => (
              <div key={i} className="relative bg-brand-black rounded-lg overflow-hidden">
                <img src={img} alt={`Product ${i + 1}`} className="w-full h-32 object-cover" />
                <button onClick={() => setHero(prev => ({ ...prev, productImages: prev.productImages?.filter((_, idx) => idx !== i) }))} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-green text-brand-black px-6 py-3 rounded-lg font-bold hover:bg-brand-lime flex items-center justify-center gap-2"
        >
          <Save size={20} /> Save Hero Content
        </button>
      </form>
    </div>
  );
};

export default HeroManager;
