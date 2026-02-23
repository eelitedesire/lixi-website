import { useState, useEffect } from 'react';
import { serviceCenters, ServiceCenter } from '../data/serviceCenters';
import ServiceEditor from './ServiceEditor';

const ServiceManager = () => {
  const [items, setItems] = useState<ServiceCenter[]>([]);

  useEffect(() => {
    setItems(serviceCenters);
  }, []);
  const [editing, setEditing] = useState<ServiceCenter | null>(null);
  const [adding, setAdding] = useState(false);

  const handleSave = (service: ServiceCenter) => {
    if (editing) {
      setItems(items.map(s => (s.name === editing.name ? service : s)));
      setEditing(null);
      setAdding(false);
    } else {
      setItems([{ ...service }, ...items]);
      setAdding(false);
      setEditing(null);
    }
  };

  const handleDelete = (name: string) => {
    if (window.confirm('Are you sure you want to delete this service center?')) {
      setItems(items.filter(s => s.name !== name));
    }
  };

  return (
    <div className="min-h-screen w-full bg-brand-black/95 backdrop-blur-md py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow">Service Center Management</h2>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => { setAdding(true); setEditing(null); }}
          >
            + Add New Service Center
          </button>
        </div>
        {(adding || editing) ? (
          <ServiceEditor
            service={editing || undefined}
            onSave={handleSave}
            onCancel={() => { setAdding(false); setEditing(null); }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map(service => (
              <div key={service.name} className="bg-brand-black/90 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col gap-2 border border-brand-green/30 relative">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-brand-green">{service.flag} {service.name}</span>
                  <span className="text-xs text-brand-green/80">{service.region}</span>
                  <span className="text-sm text-brand-white/80 mb-2">{service.address}</span>
                  <span className="inline-block bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-semibold w-fit">{service.email}</span>
                  {service.phone && <span className="text-xs text-brand-white/60">{service.phone}</span>}
                  {service.url && <a href={service.url} className="text-xs text-brand-green underline" target="_blank" rel="noopener noreferrer">Website</a>}
                  {service.brn && <span className="text-xs text-brand-white/60">BRN: {service.brn}</span>}
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-brand-green text-brand-black px-4 py-1 rounded hover:bg-brand-green/80 font-semibold shadow"
                    onClick={() => setEditing(service)}
                  >Edit</button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 font-semibold shadow"
                    onClick={() => handleDelete(service.name)}
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceManager;
