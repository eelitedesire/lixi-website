import { useState, useEffect } from 'react';
import { users, User } from '../data/users';

const UserManager = () => {
  const [items, setItems] = useState<User[]>([]);

  useEffect(() => {
    setItems(users);
  }, []);

  // UI for add/edit/delete users can be added here
  return (
    <div className="min-h-screen w-full bg-brand-black/95 backdrop-blur-md py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow mb-8">User Management</h2>
        <ul>
          {items.map(user => (
            <li key={user.id} className="mb-4 p-4 bg-brand-black/90 backdrop-blur-md rounded shadow border border-brand-green/30">
              <span className="font-bold text-brand-green">{user.name}</span> ({user.role})<br />
              <span className="text-xs text-brand-green/80">{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManager;
