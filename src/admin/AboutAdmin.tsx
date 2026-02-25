import { useState, useEffect } from 'react';
import { defaultAboutData, AboutData, TeamMember, Milestone, Value } from '../data/aboutData';
import { adminApi } from '../services/api';
import { Save, Plus, Trash2, Edit, X } from 'lucide-react';

const AboutAdmin = () => {
  const [data, setData] = useState<AboutData>(defaultAboutData);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await adminApi.list('about');
      const aboutData = result.find((item: any) => item.id === 'about-data') || result[0];
      if (aboutData?.data) setData(aboutData.data);
    } catch {
      setData(defaultAboutData);
    }
  };

  const saveData = async (newData: AboutData) => {
    await adminApi.update('about', { id: 'about-data', data: newData });
    await loadData();
    setEditing(null);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onloadend = async () => {
        const res = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result, filename: `about-${Date.now()}-${file.name}` })
        });
        const result = await res.json();
        resolve(result.url);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">About Page Management</h2>
          <p className="text-brand-white/60">Manage all content on the About page</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <Section title="Hero Section" onEdit={() => setEditing('hero')}>
          {editing === 'hero' ? (
            <HeroEditor data={data} onSave={saveData} onCancel={() => setEditing(null)} onUpload={uploadImage} />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-brand-white/80"><strong>Title:</strong> {data.hero.title}</p>
                <p className="text-brand-white/80"><strong>Subtitle:</strong> {data.hero.subtitle}</p>
              </div>
              <p className="text-brand-white/60 text-sm">{data.hero.description}</p>
            </div>
          )}
        </Section>

        {/* Mission & Vision */}
        <Section title="Mission & Vision" onEdit={() => setEditing('mission')}>
          {editing === 'mission' ? (
            <MissionVisionEditor data={data} onSave={saveData} onCancel={() => setEditing(null)} />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-brand-white/80 font-semibold mb-2">{data.mission.title}</p>
                <p className="text-brand-white/60 text-sm">{data.mission.description}</p>
              </div>
              <div>
                <p className="text-brand-white/80 font-semibold mb-2">{data.vision.title}</p>
                <p className="text-brand-white/60 text-sm">{data.vision.description}</p>
              </div>
            </div>
          )}
        </Section>

        {/* Values */}
        <Section title="Values" onEdit={() => setEditing('values')}>
          {editing === 'values' ? (
            <ValuesEditor data={data} onSave={saveData} onCancel={() => setEditing(null)} />
          ) : (
            <div className="grid md:grid-cols-4 gap-4">
              {data.values.map(v => (
                <div key={v.id} className="bg-brand-black/30 p-3 rounded">
                  <p className="text-brand-white font-semibold">{v.title}</p>
                  <p className="text-brand-white/60 text-xs">{v.description}</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Story */}
        <Section title="Our Story" onEdit={() => setEditing('story')}>
          {editing === 'story' ? (
            <StoryEditor data={data} onSave={saveData} onCancel={() => setEditing(null)} />
          ) : (
            <div>
              <p className="text-brand-white/80 font-semibold mb-2">{data.story.title}</p>
              {data.story.paragraphs.map((p, i) => (
                <p key={i} className="text-brand-white/60 text-sm mb-2">{p.substring(0, 100)}...</p>
              ))}
            </div>
          )}
        </Section>

        {/* Timeline */}
        <Section title="Timeline" onEdit={() => setEditing('timeline')}>
          {editing === 'timeline' ? (
            <TimelineEditor data={data} onSave={saveData} onCancel={() => setEditing(null)} />
          ) : (
            <div className="space-y-2">
              {data.timeline.map(m => (
                <div key={m.id} className="flex gap-4 bg-brand-black/30 p-3 rounded">
                  <span className="text-brand-green font-bold">{m.year}</span>
                  <div>
                    <p className="text-brand-white font-semibold">{m.title}</p>
                    <p className="text-brand-white/60 text-xs">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Team */}
        <Section title="Team Members" onEdit={() => setEditing('team')}>
          {editing === 'team' ? (
            <TeamEditor data={data} onSave={saveData} onCancel={() => setEditing(null)} onUpload={uploadImage} />
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {data.team.map(m => (
                <div key={m.id} className="bg-brand-black/30 p-3 rounded">
                  <p className="text-brand-white font-semibold">{m.name}</p>
                  <p className="text-brand-green text-xs">{m.role}</p>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Stats */}
        <Section title="Statistics" onEdit={() => setEditing('stats')}>
          {editing === 'stats' ? (
            <StatsEditor data={data} onSave={saveData} onCancel={() => setEditing(null)} />
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {data.stats.map((s, i) => (
                <div key={i} className="text-center bg-brand-black/30 p-3 rounded">
                  <p className="text-brand-green font-bold text-2xl">{s.value}</p>
                  <p className="text-brand-white/60 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children, onEdit }: any) => (
  <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-brand-white">{title}</h3>
      <button onClick={onEdit} className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 transition flex items-center gap-2">
        <Edit size={16} /> Edit
      </button>
    </div>
    {children}
  </div>
);

const HeroEditor = ({ data, onSave, onCancel, onUpload }: any) => {
  const [form, setForm] = useState(data.hero);
  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input className="input-field" placeholder="Subtitle" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
      <textarea className="input-field" rows={3} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <div>
        <label className="block text-brand-white text-sm mb-1">Hero Image</label>
        <input type="file" accept="image/*" onChange={async e => { if (e.target.files?.[0]) setForm({ ...form, image: await onUpload(e.target.files[0]) }); }} className="input-field" />
        {form.image && <img src={form.image} alt="Hero" className="mt-2 h-32 rounded" />}
      </div>
      <div className="flex gap-4">
        <button onClick={() => onSave({ ...data, hero: form })} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">Cancel</button>
      </div>
    </div>
  );
};

const MissionVisionEditor = ({ data, onSave, onCancel }: any) => {
  const [form, setForm] = useState({ mission: data.mission, vision: data.vision });
  return (
    <div className="space-y-4">
      <div>
        <input className="input-field mb-2" placeholder="Mission Title" value={form.mission.title} onChange={e => setForm({ ...form, mission: { ...form.mission, title: e.target.value } })} />
        <textarea className="input-field" rows={3} placeholder="Mission Description" value={form.mission.description} onChange={e => setForm({ ...form, mission: { ...form.mission, description: e.target.value } })} />
      </div>
      <div>
        <input className="input-field mb-2" placeholder="Vision Title" value={form.vision.title} onChange={e => setForm({ ...form, vision: { ...form.vision, title: e.target.value } })} />
        <textarea className="input-field" rows={3} placeholder="Vision Description" value={form.vision.description} onChange={e => setForm({ ...form, vision: { ...form.vision, description: e.target.value } })} />
      </div>
      <div className="flex gap-4">
        <button onClick={() => onSave({ ...data, ...form })} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">Cancel</button>
      </div>
    </div>
  );
};

const ValuesEditor = ({ data, onSave, onCancel }: any) => {
  const [values, setValues] = useState(data.values);
  const add = () => setValues([...values, { id: Date.now().toString(), icon: 'Zap', title: '', description: '' }]);
  const update = (i: number, field: string, value: string) => {
    const newValues = [...values];
    newValues[i] = { ...newValues[i], [field]: value };
    setValues(newValues);
  };
  const remove = (i: number) => setValues(values.filter((_: any, idx: number) => idx !== i));
  
  return (
    <div className="space-y-4">
      <button onClick={add} className="bg-brand-green/20 text-brand-green px-4 py-2 rounded-lg text-sm hover:bg-brand-green/30 flex items-center gap-2">
        <Plus size={16} /> Add Value
      </button>
      {values.map((v: Value, i: number) => (
        <div key={v.id} className="bg-brand-black/30 p-4 rounded-lg">
          <div className="flex gap-2 mb-2">
            <input className="input-field flex-1" placeholder="Icon (Zap/Shield/Users/Leaf)" value={v.icon} onChange={e => update(i, 'icon', e.target.value)} />
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
          </div>
          <input className="input-field mb-2" placeholder="Title" value={v.title} onChange={e => update(i, 'title', e.target.value)} />
          <input className="input-field" placeholder="Description" value={v.description} onChange={e => update(i, 'description', e.target.value)} />
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={() => onSave({ ...data, values })} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">Cancel</button>
      </div>
    </div>
  );
};

const StoryEditor = ({ data, onSave, onCancel }: any) => {
  const [form, setForm] = useState(data.story);
  const updatePara = (i: number, value: string) => {
    const newParas = [...form.paragraphs];
    newParas[i] = value;
    setForm({ ...form, paragraphs: newParas });
  };
  const addPara = () => setForm({ ...form, paragraphs: [...form.paragraphs, ''] });
  const removePara = (i: number) => setForm({ ...form, paragraphs: form.paragraphs.filter((_: any, idx: number) => idx !== i) });
  
  return (
    <div className="space-y-4">
      <input className="input-field" placeholder="Story Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <button onClick={addPara} className="bg-brand-green/20 text-brand-green px-4 py-2 rounded-lg text-sm hover:bg-brand-green/30 flex items-center gap-2">
        <Plus size={16} /> Add Paragraph
      </button>
      {form.paragraphs.map((p: string, i: number) => (
        <div key={i} className="flex gap-2">
          <textarea className="input-field flex-1" rows={3} value={p} onChange={e => updatePara(i, e.target.value)} />
          <button onClick={() => removePara(i)} className="text-red-400 hover:text-red-300"><X size={18} /></button>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={() => onSave({ ...data, story: form })} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">Cancel</button>
      </div>
    </div>
  );
};

const TimelineEditor = ({ data, onSave, onCancel }: any) => {
  const [timeline, setTimeline] = useState(data.timeline);
  const add = () => setTimeline([...timeline, { id: Date.now().toString(), year: '', title: '', description: '' }]);
  const update = (i: number, field: string, value: string) => {
    const newTimeline = [...timeline];
    newTimeline[i] = { ...newTimeline[i], [field]: value };
    setTimeline(newTimeline);
  };
  const remove = (i: number) => setTimeline(timeline.filter((_: any, idx: number) => idx !== i));
  
  return (
    <div className="space-y-4">
      <button onClick={add} className="bg-brand-green/20 text-brand-green px-4 py-2 rounded-lg text-sm hover:bg-brand-green/30 flex items-center gap-2">
        <Plus size={16} /> Add Milestone
      </button>
      {timeline.map((m: Milestone, i: number) => (
        <div key={m.id} className="bg-brand-black/30 p-4 rounded-lg">
          <div className="flex gap-2 mb-2">
            <input className="input-field w-24" placeholder="Year" value={m.year} onChange={e => update(i, 'year', e.target.value)} />
            <input className="input-field flex-1" placeholder="Title" value={m.title} onChange={e => update(i, 'title', e.target.value)} />
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
          </div>
          <input className="input-field" placeholder="Description" value={m.description} onChange={e => update(i, 'description', e.target.value)} />
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={() => onSave({ ...data, timeline })} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">Cancel</button>
      </div>
    </div>
  );
};

const TeamEditor = ({ data, onSave, onCancel, onUpload }: any) => {
  const [team, setTeam] = useState(data.team);
  const add = () => setTeam([...team, { id: Date.now().toString(), name: '', role: '', bio: '', image: '' }]);
  const update = (i: number, field: string, value: string) => {
    const newTeam = [...team];
    newTeam[i] = { ...newTeam[i], [field]: value };
    setTeam(newTeam);
  };
  const remove = (i: number) => setTeam(team.filter((_: any, idx: number) => idx !== i));
  
  return (
    <div className="space-y-4">
      <button onClick={add} className="bg-brand-green/20 text-brand-green px-4 py-2 rounded-lg text-sm hover:bg-brand-green/30 flex items-center gap-2">
        <Plus size={16} /> Add Team Member
      </button>
      {team.map((m: TeamMember, i: number) => (
        <div key={m.id} className="bg-brand-black/30 p-4 rounded-lg">
          <div className="flex gap-2 mb-2">
            <input className="input-field flex-1" placeholder="Name" value={m.name} onChange={e => update(i, 'name', e.target.value)} />
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
          </div>
          <input className="input-field mb-2" placeholder="Role" value={m.role} onChange={e => update(i, 'role', e.target.value)} />
          <textarea className="input-field mb-2" rows={2} placeholder="Bio" value={m.bio} onChange={e => update(i, 'bio', e.target.value)} />
          <input type="file" accept="image/*" onChange={async e => { if (e.target.files?.[0]) update(i, 'image', await onUpload(e.target.files[0])); }} className="input-field" />
          {m.image && <img src={m.image} alt={m.name} className="mt-2 h-20 rounded" />}
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={() => onSave({ ...data, team })} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">Cancel</button>
      </div>
    </div>
  );
};

const StatsEditor = ({ data, onSave, onCancel }: any) => {
  const [stats, setStats] = useState(data.stats);
  const update = (i: number, field: string, value: string) => {
    const newStats = [...stats];
    newStats[i] = { ...newStats[i], [field]: value };
    setStats(newStats);
  };
  
  return (
    <div className="space-y-4">
      {stats.map((s: any, i: number) => (
        <div key={i} className="flex gap-2">
          <input className="input-field w-32" placeholder="Value" value={s.value} onChange={e => update(i, 'value', e.target.value)} />
          <input className="input-field flex-1" placeholder="Label" value={s.label} onChange={e => update(i, 'label', e.target.value)} />
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={() => onSave({ ...data, stats })} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">Cancel</button>
      </div>
    </div>
  );
};

export default AboutAdmin;
