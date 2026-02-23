import { useState, useEffect } from 'react';
import { solutions, Solution } from '../data/solutions';

const SolutionManager = () => {
  const [items, setItems] = useState<Solution[]>([]);
  useEffect(() => {
    setItems(solutions);
  }, []);

  return (
    <div className="min-h-screen w-full bg-brand-black/95 backdrop-blur-md py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow mb-8">Solution Management</h2>
        <ul>
          {items.map(sol => (
            <li key={sol.id} className="mb-4 p-4 bg-brand-black/90 backdrop-blur-md rounded shadow border border-brand-green/30">
              <span className="font-bold text-brand-green">{sol.title}</span><br />
              <span className="text-xs text-brand-green/80">{sol.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SolutionManager;
