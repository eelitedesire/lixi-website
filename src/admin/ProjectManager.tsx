import { useState, useEffect } from 'react';
import { projects, Project } from '../data/projects';
import ProjectEditor from './ProjectEditor';

const ProjectManager = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setItems(projects);
  }, []);

  const handleSave = (project: Project) => {
    if (editing) {
      setItems(items.map(p => (p.id === editing.id ? project : p)));
      setEditing(null);
      setAdding(false);
    } else {
      setItems([{ ...project, id: Date.now().toString() }, ...items]);
      setAdding(false);
      setEditing(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setItems(items.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen w-full bg-brand-black/95 backdrop-blur-md py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow">Project Management</h2>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => { setAdding(true); setEditing(null); }}
          >
            + Add New Project
          </button>
        </div>
        {(adding || editing) ? (
          <ProjectEditor
            project={editing || undefined}
            onSave={handleSave}
            onCancel={() => { setAdding(false); setEditing(null); }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map(project => (
              <div key={project.id} className="bg-brand-black/90 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col gap-2 border border-brand-green/30 relative">
                {project.image && (
                  <img src={project.image} alt={project.title} className="rounded-xl mb-3 max-h-40 object-cover w-full border border-brand-green/20" />
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-brand-green">{project.flag} {project.title}</span>
                  <span className="text-xs text-brand-green/80">{project.location}, {project.country} • {project.category}</span>
                  <span className="text-sm text-brand-white/80 mb-2">{project.description}</span>
                  <span className="inline-block bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-semibold w-fit">{project.system} • {project.capacity} • {project.year}</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-brand-green text-brand-black px-4 py-1 rounded hover:bg-brand-green/80 font-semibold shadow"
                    onClick={() => setEditing(project)}
                  >Edit</button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 font-semibold shadow"
                    onClick={() => handleDelete(project.id)}
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

export default ProjectManager;
