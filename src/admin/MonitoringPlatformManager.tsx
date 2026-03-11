import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, Eye } from 'lucide-react';
import { api } from '@/services/api';

interface MonitoringPlatform {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  dashboardSystemId: string;
}

const MonitoringPlatformManager: React.FC = () => {
  const [platform, setPlatform] = useState<MonitoringPlatform>({
    title: 'Smart Energy Monitoring Platform',
    subtitle: 'Intelligent Battery Management',
    description: 'Our batteries connect to an intelligent monitoring system that provides comprehensive energy management and optimization capabilities.',
    features: [
      'Real-time energy dashboards',
      'Battery performance analytics',
      'AI charging optimization',
      'Carbon intensity tracking',
      'Historical energy data',
      'Remote access through secure client portal'
    ],
    primaryButtonText: 'View Platform Capabilities',
    primaryButtonUrl: '/technology',
    secondaryButtonText: 'Access Dashboard',
    secondaryButtonUrl: 'https://login.carbonoz.com',
    dashboardTitle: 'CARBONOZ SolarAutopilot Platform',
    dashboardSubtitle: 'Intelligent Battery Management',
    dashboardSystemId: 'MEGA-400V • System ID: LX-2024-001'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    loadPlatform();
  }, []);

  const loadPlatform = async () => {
    try {
      const data = await api.getMonitoringPlatform('en');
      if (data.length > 0) {
        setPlatform(data[0]);
      }
    } catch (error) {
      console.error('Error loading monitoring platform:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.saveMonitoringPlatform(platform);
      setMessage('Monitoring platform updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving monitoring platform');
      setTimeout(() => setMessage(''), 3000);
    }
    setLoading(false);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setPlatform(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setPlatform(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Monitoring Platform Manager</h1>
          <p className="text-white/60">Manage the Smart Energy Monitoring Platform section content</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={20} />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-6 ${
            message.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
          }`}
        >
          {message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Basic Information */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Title</label>
              <input
                type="text"
                value={platform.title}
                onChange={(e) => setPlatform(prev => ({ ...prev, title: e.target.value }))}
                className="input-field"
                placeholder="Smart Energy Monitoring Platform"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Subtitle</label>
              <input
                type="text"
                value={platform.subtitle}
                onChange={(e) => setPlatform(prev => ({ ...prev, subtitle: e.target.value }))}
                className="input-field"
                placeholder="Intelligent Battery Management"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Description</label>
              <textarea
                value={platform.description}
                onChange={(e) => setPlatform(prev => ({ ...prev, description: e.target.value }))}
                className="input-field h-24"
                placeholder="Platform description..."
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Platform Features</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addFeature()}
              className="input-field flex-1"
              placeholder="Add new feature..."
            />
            <button
              onClick={addFeature}
              className="btn-primary px-4"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {platform.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-brand-black/50 p-3 rounded">
                <span className="text-white flex-1">{feature}</span>
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Call-to-Action Buttons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Primary Button</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Button Text</label>
                  <input
                    type="text"
                    value={platform.primaryButtonText}
                    onChange={(e) => setPlatform(prev => ({ ...prev, primaryButtonText: e.target.value }))}
                    className="input-field"
                    placeholder="View Platform Capabilities"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Button URL</label>
                  <input
                    type="text"
                    value={platform.primaryButtonUrl}
                    onChange={(e) => setPlatform(prev => ({ ...prev, primaryButtonUrl: e.target.value }))}
                    className="input-field"
                    placeholder="/technology"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Secondary Button</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Button Text</label>
                  <input
                    type="text"
                    value={platform.secondaryButtonText}
                    onChange={(e) => setPlatform(prev => ({ ...prev, secondaryButtonText: e.target.value }))}
                    className="input-field"
                    placeholder="Access Dashboard"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Button URL</label>
                  <input
                    type="text"
                    value={platform.secondaryButtonUrl}
                    onChange={(e) => setPlatform(prev => ({ ...prev, secondaryButtonUrl: e.target.value }))}
                    className="input-field"
                    placeholder="https://login.carbonoz.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Settings */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">CARBONOZ SolarAutopilot Platform Dashboard</h2>
          <p className="text-white/60 text-sm mb-6">Customize the dashboard preview that appears on the homepage</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Dashboard Title</label>
              <input
                type="text"
                value={platform.dashboardTitle}
                onChange={(e) => setPlatform(prev => ({ ...prev, dashboardTitle: e.target.value }))}
                className="input-field"
                placeholder="CARBONOZ SolarAutopilot Platform"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Dashboard Subtitle</label>
              <input
                type="text"
                value={platform.dashboardSubtitle}
                onChange={(e) => setPlatform(prev => ({ ...prev, dashboardSubtitle: e.target.value }))}
                className="input-field"
                placeholder="Intelligent Battery Management"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">System ID Display</label>
              <input
                type="text"
                value={platform.dashboardSystemId}
                onChange={(e) => setPlatform(prev => ({ ...prev, dashboardSystemId: e.target.value }))}
                className="input-field"
                placeholder="MEGA-400V • System ID: LX-2024-001"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Eye size={20} />
            Preview
          </h2>
          
          <div className="bg-brand-black rounded-lg p-6">
            <h3 className="text-white text-3xl font-bold mb-2">{platform.title}</h3>
            <p className="text-brand-green text-sm mono mb-4">{platform.subtitle}</p>
            <p className="text-white/60 mb-6">{platform.description}</p>
            
            <div className="space-y-2 mb-6">
              {platform.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-white text-sm">
                  <span className="text-brand-green">✓</span>
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-green text-brand-black px-4 py-2 rounded-lg text-sm font-bold">
                {platform.primaryButtonText}
              </div>
              <div className="border border-white/20 text-white px-4 py-2 rounded-lg text-sm">
                {platform.secondaryButtonText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPlatformManager;