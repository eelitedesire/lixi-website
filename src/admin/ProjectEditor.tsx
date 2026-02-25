import React, { useState } from 'react';
import { Project } from '../data/projects';

interface ProjectEditorProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onSave, onCancel }) => {
  const [title, setTitle] = useState(project?.title || '');
  const [location, setLocation] = useState(project?.location || '');
  const [country, setCountry] = useState(project?.country || '');
  const [flag, setFlag] = useState(project?.flag || '');
  const [category, setCategory] = useState<Project['category']>(project?.category || 'Residential');
  const [system, setSystem] = useState(project?.system || '');
  const [capacity, setCapacity] = useState(project?.capacity || '');
  const [image, setImage] = useState<string | undefined>(project?.image);
  const [images, setImages] = useState<string[]>(project?.images || []);
  const [year, setYear] = useState(project?.year?.toString() || '');
  const [description, setDescription] = useState(project?.description || '');
  const [imageInputs, setImageInputs] = useState([0]);

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
      id: project?.id || Date.now().toString(),
      title,
      location,
      country,
      flag,
      category,
      system,
      capacity,
      image,
      images,
      year: parseInt(year, 10),
      description,
    } as Project);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 border border-brand-green/30">
      <h2 className="text-2xl font-bold mb-6">{project ? 'Edit' : 'Add'} Project</h2>
      <div className="grid grid-cols-1 gap-4">
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Flag Emoji" value={flag} onChange={e => setFlag(e.target.value)} required />
        <select className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white focus:ring-2 focus:ring-brand-green" value={category} onChange={e => setCategory(e.target.value as Project['category'])}>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
        </select>
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="System" value={system} onChange={e => setSystem(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Capacity" value={capacity} onChange={e => setCapacity(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} required />
        <textarea className="border border-brand-green/30 rounded p-2 min-h-[80px] bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <div>
          <label className="block mb-2 font-semibold text-brand-white">Main Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="bg-brand-black text-brand-white border border-brand-green/30 rounded p-2" />
          {image && <img src={image} alt="Preview" className="mt-2 rounded max-h-40" />}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block font-semibold text-brand-white">Additional Images</label>
            <button type="button" onClick={() => setImageInputs([...imageInputs, imageInputs.length])} className="bg-brand-green/20 text-brand-green px-3 py-1 rounded text-sm hover:bg-brand-green/30">+ Add More</button>
          </div>
          <div className="space-y-2">
            {imageInputs.map((key, idx) => (
              <div key={key} className="flex gap-2">
                <input type="file" accept="image/*" multiple onChange={async (e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const uploadedUrls: string[] = [];
                    for (let i = 0; i < e.target.files.length; i++) {
                      const file = e.target.files[i];
                      const reader = new FileReader();
                      await new Promise<void>((resolve) => {
                        reader.onloadend = async () => {
                          const base64 = reader.result as string;
                          try {
                            const res = await fetch('http://localhost:3000/api/upload', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ image: base64, filename: `project-${Date.now()}-${file.name}` })
                            });
                            const data = await res.json();
                            uploadedUrls.push(data.url);
                          } catch (error) {
                            console.error('Upload failed:', error);
                          }
                          resolve();
                        };
                        reader.readAsDataURL(file);
                      });
                    }
                    setImages([...images, ...uploadedUrls]);
                  }
                }} className="bg-brand-black text-brand-white border border-brand-green/30 rounded p-2 flex-1" />
                {imageInputs.length > 1 && (
                  <button type="button" onClick={() => setImageInputs(imageInputs.filter((_, i) => i !== idx))} className="bg-red-500/20 text-red-400 px-3 rounded hover:bg-red-500/30">×</button>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt={`Image ${i + 1}`} className="rounded h-20 w-full object-cover" />
                <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-900 font-semibold">Save</button>
        <button type="button" className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 font-semibold" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ProjectEditor;
