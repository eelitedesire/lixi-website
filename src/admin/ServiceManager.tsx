import { useState, useEffect } from 'react';
import { servicePackages, ServicePackage } from '../data/servicePackages';
import { adminApi } from '../services/api';
import { Plus } from 'lucide-react';

const ServiceManager = () => {
  const [items, setItems] = useState<ServicePackage[]>([]);

  useEffect(() => {
    adminApi.list('services').then(data => {
      setItems(data.length ? data : servicePackages);
    }).catch(() => setItems(servicePackages));
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-display text-brand-white mb-1">Service Packages Management</h2>
        <p className="text-brand-white/60">{items.length} regional services</p>
        <p className="text-brand-white/40 text-sm mt-2">Manage service packages shown on /service page</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {items.map(service => (
          <div key={service.id} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{service.flag}</span>
              <div>
                <h3 className="text-2xl font-bold text-brand-white">{service.title}</h3>
                <p className="text-brand-green">{service.region}</p>
              </div>
            </div>
            <p className="text-brand-white/80 mb-4">{service.description}</p>
            
            <div className="bg-brand-black/50 rounded-lg p-4 mb-4">
              <h4 className="text-brand-white font-semibold mb-2">Service Center:</h4>
              <p className="text-brand-white/80 text-sm">{service.serviceCenter.name}</p>
              <p className="text-brand-white/60 text-sm">{service.serviceCenter.address}</p>
              <p className="text-brand-green text-sm">{service.serviceCenter.email}</p>
              {service.serviceCenter.website && (
                <a href={service.serviceCenter.website} className="text-brand-green text-sm" target="_blank" rel="noopener noreferrer">
                  {service.serviceCenter.website}
                </a>
              )}
            </div>

            {service.packages && service.packages.length > 0 && (
              <div>
                <h4 className="text-brand-white font-semibold mb-2">Packages: {service.packages.length}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.packages.map((pkg, idx) => (
                    <div key={idx} className="bg-brand-black/30 rounded p-3">
                      <p className="text-brand-green font-semibold">{pkg.name}</p>
                      <p className="text-brand-white/60 text-xs">{pkg.subtitle}</p>
                      <p className="text-brand-white/40 text-xs mt-1">{pkg.features.length} features</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 bg-brand-grey/50 border border-brand-greyMid rounded-xl p-6">
        <p className="text-brand-white/60 text-sm">
          💡 To edit service packages, modify the data in <code className="text-brand-green">src/data/servicePackages.ts</code> or contact your developer to add a full editor interface.
        </p>
      </div>
    </div>
  );
};

export default ServiceManager;
