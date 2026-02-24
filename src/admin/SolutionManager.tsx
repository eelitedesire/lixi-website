import { useState, useEffect } from 'react';
import { solutions, Solution } from '../data/solutions';
import SolutionEditor from './SolutionEditor';
import { Plus, Lightbulb } from 'lucide-react';
import { adminApi } from '../services/api';

const SolutionManager = () => {
  const [items, setItems] = useState<Solution[]>([]);
  const [editing, setEditing] = useState<Solution | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    adminApi.list('solutions').then(data => {
      setItems(data.length ? data : solutions);
    }).catch(() => setItems(solutions));
  }, []);

  const handleSave = async (solution: Solution) => {
    if (editing) {
      await adminApi.update('solutions', solution);
      setItems(items.map(s => (s.id === editing.id ? solution : s)));
    } else {
      await adminApi.create('solutions', solution);
      setItems([solution, ...items]);
    }
    setEditing(null);
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this solution?')) {
      await adminApi.delete('solutions', id);
      setItems(items.filter(s => s.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Solution Management</h2>
          <p className="text-brand-white/60">{items.length} solutions total</p>
        </div>
        <button
          className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2"
          onClick={() => { setAdding(true); setEditing(null); }}
        >
          <Plus className="w-5 h-5" />
          Add New Solution
        </button>
      </div>

      {(adding || editing) ? (
        <SolutionEditor
          solution={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setAdding(false); setEditing(null); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(sol => (
            <div key={sol.id} className="bg-brand-grey border border-brand-greyMid rounded-xl overflow-hidden hover:border-brand-green/50 transition">
              {sol.image && (
                <img src={sol.image} alt={sol.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold">{sol.category}</span>
                  <span className="bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold">{sol.voltage}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-white mb-2">{sol.title}</h3>
                <p className="text-sm text-brand-white/60 mb-2">{sol.capacity}</p>
                <p className="text-sm text-brand-white/80 mb-4 line-clamp-2">{sol.description}</p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 font-semibold transition"
                    onClick={() => setEditing(sol)}
                  >Edit</button>
                  <button
                    className="flex-1 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 font-semibold transition"
                    onClick={() => handleDelete(sol.id)}
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

export default SolutionManager;
