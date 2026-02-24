import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { adminApi } from '@/services/api';

interface ServiceCenter {
  id: string;
  name: string;
  region: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
}

export default function ServiceCentersManager() {
  const [centers, setCenters] = useState<ServiceCenter[]>([]);
  const [editing, setEditing] = useState<ServiceCenter | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    const data = await adminApi.list('service-centers');
    setCenters(data);
  };

  const handleEdit = (center: ServiceCenter) => {
    setEditing({ ...center });
    setIsNew(false);
  };

  const handleNew = () => {
    setEditing({
      id: Date.now().toString(),
      name: '',
      region: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      email: '',
      hours: ''
    });
    setIsNew(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    
    if (isNew) {
      await adminApi.create('service-centers', editing);
    } else {
      await adminApi.update('service-centers', editing);
    }
    
    setEditing(null);
    setIsNew(false);
    loadCenters();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this service center?')) {
      await adminApi.delete('service-centers', id);
      loadCenters();
    }
  };

  if (editing) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{isNew ? 'New' : 'Edit'} Service Center</h2>
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-brand-green text-brand-black rounded hover:bg-brand-lime">
              <Save size={16} /> Save
            </button>
            <button onClick={() => setEditing(null)} className="flex items-center gap-2 px-4 py-2 bg-brand-grey text-brand-white rounded hover:bg-brand-greyMid">
              <X size={16} /> Cancel
            </button>
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full px-3 py-2 bg-brand-grey border border-brand-greyMid rounded text-brand-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <input
              type="text"
              value={editing.region}
              onChange={(e) => setEditing({ ...editing, region: e.target.value })}
              placeholder="e.g., Europe, Africa, Caribbean"
              className="w-full px-3 py-2 bg-brand-grey border border-brand-greyMid rounded text-brand-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={editing.address}
              onChange={(e) => setEditing({ ...editing, address: e.target.value })}
              className="w-full px-3 py-2 bg-brand-grey border border-brand-greyMid rounded text-brand-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={editing.city}
                onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                className="w-full px-3 py-2 bg-brand-grey border border-brand-greyMid rounded text-brand-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={editing.country}
                onChange={(e) => setEditing({ ...editing, country: e.target.value })}
                className="w-full px-3 py-2 bg-brand-grey border border-brand-greyMid rounded text-brand-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                value={editing.phone}
                onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                className="w-full px-3 py-2 bg-brand-grey border border-brand-greyMid rounded text-brand-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={editing.email}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                className="w-full px-3 py-2 bg-brand-grey border border-brand-greyMid rounded text-brand-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hours</label>
            <input
              type="text"
              value={editing.hours}
              onChange={(e) => setEditing({ ...editing, hours: e.target.value })}
              placeholder="e.g., Mon-Fri 9:00-18:00"
              className="w-full px-3 py-2 bg-brand-grey border border-brand-greyMid rounded text-brand-white"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Service Centers</h2>
        <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2 bg-brand-green text-brand-black rounded hover:bg-brand-lime">
          <Plus size={16} /> Add Service Center
        </button>
      </div>

      <div className="grid gap-4">
        {centers.map((center) => (
          <div key={center.id} className="bg-brand-grey border border-brand-greyMid rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-brand-green">{center.name}</h3>
                <p className="text-sm text-brand-lime mb-2">{center.region}</p>
                <p className="text-sm">{center.address}</p>
                <p className="text-sm">{center.city}, {center.country}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">📞 {center.phone}</p>
                  <p className="text-sm">✉️ {center.email}</p>
                  <p className="text-sm">🕒 {center.hours}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(center)} className="p-2 bg-brand-greyMid rounded hover:bg-brand-green hover:text-brand-black">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(center.id)} className="p-2 bg-brand-greyMid rounded hover:bg-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
