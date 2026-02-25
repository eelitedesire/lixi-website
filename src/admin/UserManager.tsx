import { useState, useEffect } from 'react';
import { users as defaultUsers, User } from '../data/users';
import { adminApi } from '../services/api';
import { Users as UsersIcon, Plus, Edit, Trash2, Save, X } from 'lucide-react';

const UserManager = () => {
  const [items, setItems] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await adminApi.list('users');
      if (data.length > 0) setItems(data);
      else setItems(defaultUsers);
    } catch {
      setItems(defaultUsers);
    }
  };

  const handleAdd = () => {
    setEditing({ id: Date.now().toString(), name: '', email: '', password: '', role: 'viewer' });
    setIsNew(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (isNew) {
        await adminApi.create('users', editing);
      } else {
        await adminApi.update('users', editing);
      }
      await loadData();
      setEditing(null);
      setIsNew(false);
    } catch (error) {
      alert('Failed to save user');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    try {
      await adminApi.delete('users', id);
      await loadData();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  if (editing) {
    return (
      <div className="p-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-display text-brand-white mb-6">{isNew ? 'Add User' : 'Edit User'}</h2>
          <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-brand-white font-semibold mb-2">Name</label>
              <input
                className="input-field"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-brand-white font-semibold mb-2">Email</label>
              <input
                type="email"
                className="input-field"
                value={editing.email}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-brand-white font-semibold mb-2">Password</label>
              <input
                type="password"
                className="input-field"
                value={editing.password}
                onChange={(e) => setEditing({ ...editing, password: e.target.value })}
                placeholder={isNew ? 'Enter password' : 'Leave blank to keep current'}
              />
            </div>
            <div>
              <label className="block text-brand-white font-semibold mb-2">Role</label>
              <select
                className="input-field"
                value={editing.role}
                onChange={(e) => setEditing({ ...editing, role: e.target.value as User['role'] })}
              >
                <option value="admin">Admin - Full access</option>
                <option value="editor">Editor - Can edit content</option>
                <option value="viewer">Viewer - Read only</option>
              </select>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={handleSave} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2">
                <Save size={18} /> Save
              </button>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="bg-brand-greyMid text-brand-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-grey transition flex items-center gap-2">
                <X size={18} /> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">User Management</h2>
          <p className="text-brand-white/60">{items.length} users total</p>
        </div>
        <button onClick={handleAdd} className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2">
          <Plus size={18} /> Add User
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(user => (
          <div key={user.id} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-white">{user.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-red-500/10 text-red-400' :
                    user.role === 'editor' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-brand-green/10 text-brand-green'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(user); setIsNew(false); }} className="text-brand-green hover:text-brand-white transition">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-300 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-sm text-brand-white/60">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
