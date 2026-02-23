import { useState, useEffect } from 'react';
import { shoppingItems, ShoppingItem } from '../data/shopping';

const ShoppingManager = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    setItems(shoppingItems);
  }, []);

  return (
    <div className="min-h-screen w-full bg-brand-black/95 backdrop-blur-md py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow mb-8">Shopping Management</h2>
        <ul>
          {items.map(item => (
            <li key={item.id} className="mb-4 p-4 bg-brand-black/90 backdrop-blur-md rounded shadow border border-brand-green/30">
              <span className="font-bold text-brand-green">{item.name}</span> ({item.category})<br />
              <span className="text-xs text-brand-green/80">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingManager;