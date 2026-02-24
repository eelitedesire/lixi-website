import { useState, useEffect } from 'react';
import { ShoppingCart, Info, Edit2, Save } from 'lucide-react';
import { adminApi } from '../services/api';

const ShoppingManager = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState({
    id: 'shopping-page',
    title: 'Order Your LIXI',
    subtitle: 'Battery System',
    description: 'Pre-configured and ready-to-use battery packs. Delivery to any EU country with full installation support.',
    productName: 'LIXI LFP LiFePO4 Battery',
    capacity: '15 kWh',
    productDescription: 'Stack up to 14 battery cases together. Includes JK BMS with Pylontech protocol support, Bluetooth and CAN-bus monitoring.',
    backgroundImage: '',
    specs: [
      { label: 'Voltage', value: '51.2V' },
      { label: 'Current', value: '200A' },
      { label: 'Weight', value: '125kg' },
      { label: 'Warranty', value: '1 Year' }
    ],
    features: [
      'Ready to Use - Pre-configured systems',
      'EU Delivery - Fast shipping',
      'Full Support - Installation help'
    ],
    included: [
      'Stainless steel battery case',
      'JK BMS 48V 16S with Pylontech protocol',
      'CANBUS/RS485 communication',
      'Bluetooth monitoring',
      'Installation manual',
      'Inverter compatibility guide'
    ]
  });

  useEffect(() => {
    adminApi.list('orders').then(setOrders);
    adminApi.list('quotes').then(setQuotes);
    adminApi.list('shoppingpage').then(data => {
      if (data.length > 0) setContent(data[0]);
    });
  }, []);

  const handleSave = async () => {
    if (!content.id) {
      await adminApi.create('shoppingpage', content);
    } else {
      await adminApi.update('shoppingpage', content);
    }
    setEditing(false);
    alert('Shopping page updated!');
  };

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
          setContent({...content, backgroundImage: data.url});
        } catch (error) {
          console.error('Upload failed:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Shopping Page Manager</h2>
          <p className="text-brand-white/60">Edit shopping page content and view statistics</p>
        </div>
        {editing ? (
          <button onClick={handleSave} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim flex items-center gap-2">
            <Save size={20} /> Save Changes
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="bg-brand-green/10 text-brand-green px-6 py-3 rounded-lg font-semibold hover:bg-brand-green/20 flex items-center gap-2">
            <Edit2 size={20} /> Edit Page
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-white">{orders.length}</div>
              <div className="text-brand-white/60 text-sm">Total Orders</div>
            </div>
          </div>
        </div>

        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Info className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-white">{quotes.length}</div>
              <div className="text-brand-white/60 text-sm">Quote Requests</div>
            </div>
          </div>
        </div>

        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-green">${totalRevenue.toLocaleString()}</div>
              <div className="text-brand-white/60 text-sm">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content Editor */}
      <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-brand-white mb-6">Page Content</h3>
        
        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-brand-white mb-2 text-sm font-semibold">Title</label>
                <input value={content.title} onChange={e => setContent({...content, title: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" />
              </div>
              <div>
                <label className="block text-brand-white mb-2 text-sm font-semibold">Subtitle</label>
                <input value={content.subtitle} onChange={e => setContent({...content, subtitle: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" />
              </div>
            </div>
            
            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Description</label>
              <textarea value={content.description} onChange={e => setContent({...content, description: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={2} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-brand-white mb-2 text-sm font-semibold">Product Name</label>
                <input value={content.productName} onChange={e => setContent({...content, productName: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" />
              </div>
              <div>
                <label className="block text-brand-white mb-2 text-sm font-semibold">Capacity</label>
                <input value={content.capacity} onChange={e => setContent({...content, capacity: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" />
              </div>
            </div>

            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Product Description</label>
              <textarea value={content.productDescription} onChange={e => setContent({...content, productDescription: e.target.value})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={2} />
            </div>

            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Background Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="bg-brand-black text-brand-white border border-brand-greyMid rounded p-2 w-full" />
              {content.backgroundImage && <img src={content.backgroundImage} alt="Preview" className="mt-2 rounded max-h-40" />}
            </div>

            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">Features (one per line)</label>
              <textarea value={content.features.join('\n')} onChange={e => setContent({...content, features: e.target.value.split('\n')})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={3} />
            </div>

            <div>
              <label className="block text-brand-white mb-2 text-sm font-semibold">What's Included (one per line)</label>
              <textarea value={content.included.join('\n')} onChange={e => setContent({...content, included: e.target.value.split('\n')})} className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-2 text-brand-white" rows={6} />
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-brand-white/70">
            <div>
              <strong className="text-brand-white">Title:</strong> {content.title} {content.subtitle}
            </div>
            <div>
              <strong className="text-brand-white">Description:</strong> {content.description}
            </div>
            <div>
              <strong className="text-brand-white">Product:</strong> {content.productName} - {content.capacity}
            </div>
            <div>
              <strong className="text-brand-white">Features:</strong>
              <ul className="list-disc ml-6 mt-2">
                {content.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingManager;
