import { useState, useEffect } from 'react';
import { defaultCategories, ProductCategory, ProductField } from '../data/productCategories';
import { adminApi } from '../services/api';
import { Plus, Trash2, Save, Edit } from 'lucide-react';

const CategoryManager = () => {
  const [categories, setCategories] = useState<ProductCategory[]>(defaultCategories);
  const [editing, setEditing] = useState<ProductCategory | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await adminApi.list('product-categories');
      const catData = data.find((item: any) => item.id === 'categories-data');
      if (catData?.categories) setCategories(catData.categories);
    } catch {
      setCategories(defaultCategories);
    }
  };

  const saveData = async (newCategories: ProductCategory[]) => {
    await adminApi.update('product-categories', { id: 'categories-data', categories: newCategories });
    await loadData();
  };

  const addCategory = () => {
    const newCat: ProductCategory = {
      id: Date.now().toString(),
      name: 'New Category',
      slug: 'new-category',
      fields: []
    };
    setEditing(newCat);
  };

  const saveCategory = async (category: ProductCategory) => {
    const exists = categories.find(c => c.id === category.id);
    const newCategories = exists
      ? categories.map(c => c.id === category.id ? category : c)
      : [...categories, category];
    await saveData(newCategories);
    setEditing(null);
  };

  const deleteCategory = async (id: string) => {
    if (confirm('Delete this category?')) {
      await saveData(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Product Categories</h2>
          <p className="text-brand-white/60">Manage categories and their fields</p>
        </div>
        <button onClick={addCategory} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2">
          <Plus size={18} /> Add Category
        </button>
      </div>

      {editing ? (
        <CategoryEditor category={editing} onSave={saveCategory} onCancel={() => setEditing(null)} />
      ) : (
        <div className="grid gap-6">
          {categories.map(cat => (
            <div key={cat.id} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-brand-white">{cat.name}</h3>
                  <p className="text-brand-white/60 text-sm">Slug: {cat.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(cat)} className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 transition">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => deleteCategory(cat.id)} className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {cat.fields.map(f => (
                  <span key={f.name} className="bg-brand-black/30 text-brand-white/80 px-3 py-1 rounded text-sm">
                    {f.label} ({f.type})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryEditor = ({ category, onSave, onCancel }: any) => {
  const [form, setForm] = useState(category);

  const addField = () => {
    setForm({
      ...form,
      fields: [...form.fields, { name: '', label: '', type: 'text', required: false }]
    });
  };

  const updateField = (index: number, field: string, value: any) => {
    const newFields = [...form.fields];
    newFields[index] = { ...newFields[index], [field]: value };
    setForm({ ...form, fields: newFields });
  };

  const removeField = (index: number) => {
    setForm({ ...form, fields: form.fields.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
      <h3 className="text-2xl font-bold text-brand-white mb-6">Edit Category</h3>
      
      <div className="space-y-4 mb-6">
        <input className="input-field" placeholder="Category Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="input-field" placeholder="Slug (e.g., battery-storage)" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-brand-white font-semibold">Fields</h4>
          <button onClick={addField} className="bg-brand-green/20 text-brand-green px-4 py-2 rounded-lg text-sm hover:bg-brand-green/30 flex items-center gap-2">
            <Plus size={16} /> Add Field
          </button>
        </div>

        <div className="space-y-3">
          {form.fields.map((field: ProductField, i: number) => (
            <div key={i} className="bg-brand-black/30 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <input className="input-field" placeholder="Field Name (e.g., voltage)" value={field.name} onChange={e => updateField(i, 'name', e.target.value)} />
                <input className="input-field" placeholder="Label (e.g., Voltage)" value={field.label} onChange={e => updateField(i, 'label', e.target.value)} />
                <select className="input-field" value={field.type} onChange={e => updateField(i, 'type', e.target.value)}>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                </select>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-brand-white text-sm">
                    <input type="checkbox" checked={field.required} onChange={e => updateField(i, 'required', e.target.checked)} />
                    Required
                  </label>
                  <button onClick={() => removeField(i)} className="text-red-400 hover:text-red-300 ml-auto">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {field.type === 'select' && (
                <input className="input-field" placeholder="Options (comma-separated)" value={field.options?.join(', ') || ''} onChange={e => updateField(i, 'options', e.target.value.split(',').map((s: string) => s.trim()))} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => onSave(form)} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold flex items-center gap-2">
          <Save size={18} /> Save Category
        </button>
        <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;
