import { useState, useEffect } from 'react';
import { projects, Project } from '../data/projects';
import ProjectEditor from './ProjectEditor';
import { Plus } from 'lucide-react';
import { adminApi } from '../services/api';

const ProjectManager = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    adminApi.list('projects').then(data => {
      setItems(data.length ? data : projects);
    }).catch(() => setItems(projects));
  }, []);

  const handleSave = async (project: Project) => {
    if (editing) {
      await adminApi.update('projects', project);
      setItems(items.map(p => (p.id === editing.id ? project : p)));
    } else {
      const newProject = { ...project, id: Date.now().toString() };
      await adminApi.create('projects', newProject);
      setItems([newProject, ...items]);
    }
    setEditing(null);
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await adminApi.delete('projects', id);
      setItems(items.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Project Management</h2>
          <p className="text-brand-white/60">{items.length} projects total</p>
        </div>
        <button
          className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2"
          onClick={() => { setAdding(true); setEditing(null); }}
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </div>
      {(adding || editing) ? (
        <ProjectEditor
          project={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setAdding(false); setEditing(null); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(project => (
            <div key={project.id} className="bg-brand-grey border border-brand-greyMid rounded-xl overflow-hidden hover:border-brand-green/50 transition">
              {project.image && (
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <span className="inline-block bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold mb-3">{project.category}</span>
                <h3 className="text-lg font-bold text-brand-white mb-2">{project.flag} {project.title}</h3>
                <p className="text-sm text-brand-white/60 mb-2">{project.location}, {project.country}</p>
                <p className="text-sm text-brand-white/80 mb-3 line-clamp-2">{project.description}</p>
                <p className="text-xs text-brand-green mb-4">{project.system} • {project.capacity} • {project.year}</p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 font-semibold transition"
                    onClick={() => setEditing(project)}
                  >Edit</button>
                  <button
                    className="flex-1 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 font-semibold transition"
                    onClick={() => handleDelete(project.id)}
                  >Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
