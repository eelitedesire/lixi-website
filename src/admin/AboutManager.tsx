import { useState, useEffect } from 'react';
import { aboutSections, AboutContent } from '../data/about';
import { Info } from 'lucide-react';

const AboutManager = () => {
  const [items, setItems] = useState<AboutContent[]>([]);
  useEffect(() => {
    setItems(aboutSections);
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-display text-brand-white mb-1">About Management</h2>
        <p className="text-brand-white/60">{items.length} sections total</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(section => (
          <div key={section.id} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center">
                <Info className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="text-lg font-bold text-brand-white">{section.section}</h3>
            </div>
            <p className="text-sm text-brand-white/80 line-clamp-3">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutManager;
