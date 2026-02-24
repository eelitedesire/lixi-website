import React, { useState } from 'react';
import { Solution } from '../data/solutions';

interface SolutionEditorProps {
  solution?: Solution;
  onSave: (solution: Solution) => void;
  onCancel: () => void;
}

const SolutionEditor: React.FC<SolutionEditorProps> = ({ solution, onSave, onCancel }) => {
  const [title, setTitle] = useState(solution?.title || '');
  const [slug, setSlug] = useState(solution?.slug || '');
  const [category, setCategory] = useState<Solution['category']>(solution?.category || 'Residential');
  const [description, setDescription] = useState(solution?.description || '');
  const [capacity, setCapacity] = useState(solution?.capacity || '');
  const [voltage, setVoltage] = useState(solution?.voltage || '');
  const [image, setImage] = useState<string | undefined>(solution?.image);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setImage(data.url);
        } catch (error) {
          console.error('Upload failed:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...solution,
      id: solution?.id || Date.now().toString(),
      title,
      slug,
      category,
      description,
      capacity,
      voltage,
      image,
    } as Solution);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 border border-brand-green/30">
      <h2 className="text-2xl font-bold mb-6 text-brand-white">{solution ? 'Edit' : 'Add'} Solution</h2>
      <div className="grid grid-cols-1 gap-4">
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Slug (URL-friendly)" value={slug} onChange={e => setSlug(e.target.value)} required />
        <select className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white focus:ring-2 focus:ring-brand-green" value={category} onChange={e => setCategory(e.target.value as Solution['category'])}>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
        </select>
        <textarea className="border border-brand-green/30 rounded p-2 min-h-[100px] bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Capacity (e.g., 14-196 kWh)" value={capacity} onChange={e => setCapacity(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Voltage (e.g., 48V)" value={voltage} onChange={e => setVoltage(e.target.value)} required />
        <div>
          <label className="block mb-2 font-semibold text-brand-white">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="bg-brand-black text-brand-white border border-brand-green/30 rounded p-2 w-full" />
          {image && <img src={image} alt="Preview" className="mt-2 rounded max-h-40" />}
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-brand-green text-brand-black px-6 py-2 rounded hover:bg-brand-greenDim font-semibold">Save</button>
        <button type="button" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-semibold" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default SolutionEditor;
