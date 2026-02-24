import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminApi } from '../services/api';

interface ComparisonSpec {
  id: string;
  label: string;
  key: string;
  unit: string;
  highlight: boolean;
}

const ComparisonManager = () => {
  const [specs, setSpecs] = useState<ComparisonSpec[]>([
    { id: '1', label: 'Capacity', key: 'capacity_kwh', unit: ' kWh', highlight: true },
    { id: '2', label: 'Voltage', key: 'voltage', unit: '', highlight: false },
    { id: '3', label: 'Cells', key: 'cells', unit: '', highlight: false },
    { id: '4', label: 'BMS', key: 'bms', unit: '', highlight: false },
    { id: '5', label: 'Communication', key: 'communication', unit: '', highlight: false },
    { id: '6', label: 'Cycle Life', key: 'cycle_life', unit: '', highlight: true },
    { id: '7', label: 'Weight', key: 'weight_kg', unit: ' kg', highlight: false },
    { id: '8', label: 'Dimensions', key: 'dimensions_mm', unit: ' mm', highlight: false },
    { id: '9', label: 'Warranty', key: 'warranty', unit: '', highlight: false },
  ]);
  const [editing, setEditing] = useState<ComparisonSpec | null>(null);

  useEffect(() => {
    adminApi.list('comparison').then(data => {
      if (data.length) setSpecs(data);
    });
  }, []);

  const handleSave = async () => {
    await adminApi.create('comparison', specs);
    alert('Comparison specs saved!');
  };

  const handleAdd = () => {
    const newSpec: ComparisonSpec = {
      id: Date.now().toString(),
      label: 'New Spec',
      key: 'new_key',
      unit: '',
      highlight: false
    };
    setSpecs([...specs, newSpec]);
    setEditing(newSpec);
  };

  const handleDelete = (id: string) => {
    setSpecs(specs.filter(s => s.id !== id));
  };

  const handleUpdate = (id: string, field: keyof ComparisonSpec, value: any) => {
    setSpecs(specs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Comparison Table Manager</h2>
          <p className="text-brand-white/60">Manage product comparison specifications</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleAdd} className="bg-brand-green/10 text-brand-green px-6 py-3 rounded-lg font-semibold hover:bg-brand-green/20 flex items-center gap-2">
            <Plus size={20} /> Add Spec
          </button>
          <button onClick={handleSave} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-brand-grey border border-brand-greyMid rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-black/50">
            <tr>
              <th className="text-left p-4 text-brand-white font-semibold">Label</th>
              <th className="text-left p-4 text-brand-white font-semibold">Key (field name)</th>
              <th className="text-left p-4 text-brand-white font-semibold">Unit</th>
              <th className="text-center p-4 text-brand-white font-semibold">Highlight</th>
              <th className="text-center p-4 text-brand-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.id} className="border-t border-brand-greyMid hover:bg-brand-black/30">
                <td className="p-4">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => handleUpdate(spec.id, 'label', e.target.value)}
                    className="bg-brand-black border border-brand-greyMid rounded px-3 py-2 text-brand-white w-full"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleUpdate(spec.id, 'key', e.target.value)}
                    className="bg-brand-black border border-brand-greyMid rounded px-3 py-2 text-brand-white w-full font-mono text-sm"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    value={spec.unit}
                    onChange={(e) => handleUpdate(spec.id, 'unit', e.target.value)}
                    className="bg-brand-black border border-brand-greyMid rounded px-3 py-2 text-brand-white w-full"
                    placeholder="e.g. kWh, kg"
                  />
                </td>
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={spec.highlight}
                    onChange={(e) => handleUpdate(spec.id, 'highlight', e.target.checked)}
                    className="w-5 h-5"
                  />
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(spec.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-brand-grey border border-brand-green/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-brand-white mb-3">Instructions</h3>
        <ul className="text-brand-white/70 space-y-2 text-sm">
          <li>• <strong>Label:</strong> Display name shown in the comparison table</li>
          <li>• <strong>Key:</strong> Product field name (must match product data structure)</li>
          <li>• <strong>Unit:</strong> Unit suffix (e.g., " kWh", " kg", " mm")</li>
          <li>• <strong>Highlight:</strong> Show with green highlight in table</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparisonManager;
