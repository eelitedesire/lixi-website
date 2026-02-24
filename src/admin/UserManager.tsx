import { useState, useEffect } from 'react';
import { users, User } from '../data/users';
import { Users as UsersIcon } from 'lucide-react';

const UserManager = () => {
  const [items, setItems] = useState<User[]>([]);

  useEffect(() => {
    setItems(users);
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-display text-brand-white mb-1">User Management</h2>
        <p className="text-brand-white/60">{items.length} users total</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(user => (
          <div key={user.id} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-white">{user.name}</h3>
                <span className="inline-block bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-semibold">{user.role}</span>
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
