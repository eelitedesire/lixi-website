import React, { useState } from 'react';
import { ServiceCenter } from '../data/serviceCenters';

interface ServiceEditorProps {
  service?: ServiceCenter;
  onSave: (service: ServiceCenter) => void;
  onCancel: () => void;
}

const ServiceEditor: React.FC<ServiceEditorProps> = ({ service, onSave, onCancel }) => {
  const [region, setRegion] = useState(service?.region || '');
  const [flag, setFlag] = useState(service?.flag || '');
  const [name, setName] = useState(service?.name || '');
  const [address, setAddress] = useState(service?.address || '');
  const [phone, setPhone] = useState(service?.phone || '');
  const [email, setEmail] = useState(service?.email || '');
  const [url, setUrl] = useState(service?.url || '');
  const [brn, setBrn] = useState(service?.brn || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      region,
      flag,
      name,
      address,
      phone,
      email,
      url,
      brn,
    } as ServiceCenter);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 border border-brand-green/30">
      <h2 className="text-2xl font-bold mb-6">{service ? 'Edit' : 'Add'} Service Center</h2>
      <div className="grid grid-cols-1 gap-4">
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Region" value={region} onChange={e => setRegion(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Flag Emoji" value={flag} onChange={e => setFlag(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Website URL" value={url} onChange={e => setUrl(e.target.value)} />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="BRN" value={brn} onChange={e => setBrn(e.target.value)} />
      </div>
      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-900 font-semibold">Save</button>
        <button type="button" className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 font-semibold" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ServiceEditor;
