import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, Upload, Eye, Edit3 } from 'lucide-react';
import { api } from '@/services/api';

interface FlagshipProduct {
  id?: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonUrl: string;
  productName: string;
  productTagline: string;
  capacity: string;
  voltage: string;
  power: string;
  protection: string;
  mainImage: string;
  carouselImages: string[];
  specifications: {
    cells: string;
    configuration: string;
    nominalVoltage: string;
    voltageRange: string;
    nominalCapacity: string;
    maxCurrent: string;
    cycleLife: string;
    cooling: string;
    communication: string;
    hmi: string;
    dimensions: string;
    weight: string;
    operatingTemp: string;
    storageTemp: string;
    humidity: string;
    altitude: string;
    warranty: string;
    certification: string;
  };
  highlightFeatures: string[];
  compatibleInverters: string[];
  integratedPcs: {
    ratedPower: string;
    maxPower: string;
    maxDuration: string;
    grid: string;
  };
}

const FlagshipManager: React.FC = () => {
  const [flagship, setFlagship] = useState<FlagshipProduct>({
    badge: 'Flagship Product',
    title: 'Our Flagship Energy Storage System',
    subtitle: 'LIXI Mega 400V - Industrial Energy Storage System',
    description: 'The LIXI Mega represents the pinnacle of large-scale energy storage technology, designed for commercial projects and energy infrastructure.',
    features: [
      'Scalable rack architecture',
      'Designed for solar and hybrid energy systems',
      'High capacity for commercial projects',
      'Remote monitoring platform',
      'AI-powered charging optimization',
      'Carbon intensity monitoring'
    ],
    buttonText: 'View Large Battery Details',
    buttonUrl: '/flagship',
    productName: 'LIXI Mega 400V',
    productTagline: 'Industrial Energy Storage System',
    capacity: '112.5 kWh',
    voltage: '400V',
    power: '50kW',
    protection: 'IP55',
    mainImage: 'https://img.freepik.com/premium-photo/amount-energy-storage-systems-battery-container-units-with-solar-turbine-farm_493806-16318.jpg',
    carouselImages: [],
    specifications: {
      cells: 'LiFePO4 3.2V / 314Ah (CATL-class)',
      configuration: '7 packs × 1P16S',
      nominalVoltage: '358.4V',
      voltageRange: '280V – 408.8V',
      nominalCapacity: '314Ah',
      maxCurrent: '157A',
      cycleLife: '8000+ (90% DoD, 70% EoL)',
      cooling: 'Intelligent air-cooling',
      communication: 'WiFi, 4G, LAN, CAN, RS485',
      hmi: 'LED status + 7" maintenance display + WLAN/app',
      dimensions: '1510 × 1010 × 1830 mm',
      weight: '1500 kg',
      operatingTemp: '-25°C to +55°C',
      storageTemp: '-30°C to +60°C',
      humidity: '5–95%',
      altitude: '4000m',
      warranty: '1 Year',
      certification: 'CE, IP55'
    },
    highlightFeatures: [
      'Integrated 50kW PCS inverter',
      'IP55 weatherproof cabinet',
      'CARBONOZ trading ready',
      '8000+ cycle life',
      'WiFi + 4G + LAN monitoring'
    ],
    compatibleInverters: ['DEYE', 'Growatt', 'Victron', 'GoodWe', 'SMA', 'Solis'],
    integratedPcs: {
      ratedPower: '50kW',
      maxPower: '80kW',
      maxDuration: '2 seconds',
      grid: '220/380V, 3/N/PE'
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newHighlightFeature, setNewHighlightFeature] = useState('');
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingCarousel, setUploadingCarousel] = useState(false);

  useEffect(() => {
    loadFlagship();
  }, []);

  const loadFlagship = async () => {
    try {
      const data = await api.getFlagship('en');
      if (data.length > 0) {
        setFlagship(data[0]);
      }
    } catch (error) {
      console.error('Error loading flagship:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.saveFlagship(flagship);
      setMessage('Flagship product updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving flagship product');
      setTimeout(() => setMessage(''), 3000);
    }
    setLoading(false);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFlagship(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFlagship(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addCarouselImage = () => {
    if (newImage.trim()) {
      setFlagship(prev => ({
        ...prev,
        carouselImages: [...prev.carouselImages, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeCarouselImage = (index: number) => {
    setFlagship(prev => ({
      ...prev,
      carouselImages: prev.carouselImages.filter((_, i) => i !== index)
    }));
  };

  const addHighlightFeature = () => {
    if (newHighlightFeature.trim()) {
      setFlagship(prev => ({
        ...prev,
        highlightFeatures: [...prev.highlightFeatures, newHighlightFeature.trim()]
      }));
      setNewHighlightFeature('');
    }
  };

  const removeHighlightFeature = (index: number) => {
    setFlagship(prev => ({
      ...prev,
      highlightFeatures: prev.highlightFeatures.filter((_, i) => i !== index)
    }));
  };



  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const filename = `flagship-main-${Date.now()}.${file.name.split('.').pop()}`;
        const url = await api.upload(base64, filename);
        setFlagship(prev => ({ ...prev, mainImage: url }));
        setUploadingMain(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadingMain(false);
    }
  };

  const handleCarouselImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCarousel(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const filename = `flagship-carousel-${Date.now()}.${file.name.split('.').pop()}`;
        const url = await api.upload(base64, filename);
        setFlagship(prev => ({
          ...prev,
          carouselImages: [...prev.carouselImages, url]
        }));
        setUploadingCarousel(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadingCarousel(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Flagship Product Manager</h1>
          <p className="text-white/60">Manage the flagship product section content and images</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Edit3 size={20} />
            Basic Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Badge</label>
              <input
                type="text"
                value={flagship.badge}
                onChange={(e) => setFlagship(prev => ({ ...prev, badge: e.target.value }))}
                className="input-field"
                placeholder="Flagship Product"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Title</label>
              <input
                type="text"
                value={flagship.title}
                onChange={(e) => setFlagship(prev => ({ ...prev, title: e.target.value }))}
                className="input-field"
                placeholder="Our Flagship Energy Storage System"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Subtitle</label>
              <input
                type="text"
                value={flagship.subtitle}
                onChange={(e) => setFlagship(prev => ({ ...prev, subtitle: e.target.value }))}
                className="input-field"
                placeholder="LIXI Mega 400V - Industrial Energy Storage System"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Description</label>
              <textarea
                value={flagship.description}
                onChange={(e) => setFlagship(prev => ({ ...prev, description: e.target.value }))}
                className="input-field h-24"
                placeholder="Product description..."
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Button Text</label>
              <input
                type="text"
                value={flagship.buttonText}
                onChange={(e) => setFlagship(prev => ({ ...prev, buttonText: e.target.value }))}
                className="input-field"
                placeholder="View Large Battery Details"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Button URL</label>
              <input
                type="text"
                value={flagship.buttonUrl}
                onChange={(e) => setFlagship(prev => ({ ...prev, buttonUrl: e.target.value }))}
                className="input-field"
                placeholder="/products/mega-400v"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-brand-grey rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Product Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Product Name</label>
              <input
                type="text"
                value={flagship.productName}
                onChange={(e) => setFlagship(prev => ({ ...prev, productName: e.target.value }))}
                className="input-field"
                placeholder="LIXI Mega 400V"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Product Tagline</label>
              <input
                type="text"
                value={flagship.productTagline}
                onChange={(e) => setFlagship(prev => ({ ...prev, productTagline: e.target.value }))}
                className="input-field"
                placeholder="Industrial Energy Storage System"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Capacity</label>
                <input
                  type="text"
                  value={flagship.capacity}
                  onChange={(e) => setFlagship(prev => ({ ...prev, capacity: e.target.value }))}
                  className="input-field"
                  placeholder="112.5 kWh"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Voltage</label>
                <input
                  type="text"
                  value={flagship.voltage}
                  onChange={(e) => setFlagship(prev => ({ ...prev, voltage: e.target.value }))}
                  className="input-field"
                  placeholder="400V"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Power</label>
                <input
                  type="text"
                  value={flagship.power}
                  onChange={(e) => setFlagship(prev => ({ ...prev, power: e.target.value }))}
                  className="input-field"
                  placeholder="50kW"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Protection</label>
                <input
                  type="text"
                  value={flagship.protection}
                  onChange={(e) => setFlagship(prev => ({ ...prev, protection: e.target.value }))}
                  className="input-field"
                  placeholder="IP55"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-brand-grey rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Upload size={20} />
          Images
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Image */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Main Image</label>
            <input
              type="url"
              value={flagship.mainImage}
              onChange={(e) => setFlagship(prev => ({ ...prev, mainImage: e.target.value }))}
              className="input-field mb-2"
              placeholder="https://example.com/image.jpg"
            />
            <div className="flex gap-2 mb-4">
              <label className="btn-primary cursor-pointer flex-1 justify-center">
                <Upload size={16} />
                {uploadingMain ? 'Uploading...' : 'Upload from Computer'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  className="hidden"
                  disabled={uploadingMain}
                />
              </label>
            </div>
            {flagship.mainImage && (
              <div className="relative">
                <img
                  src={flagship.mainImage}
                  alt="Main product"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Carousel Images */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Carousel Images</label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="input-field flex-1"
                placeholder="https://example.com/carousel-image.jpg"
              />
              <button
                onClick={addCarouselImage}
                className="btn-primary px-4"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="mb-4">
              <label className="btn-ghost cursor-pointer w-full justify-center">
                <Upload size={16} />
                {uploadingCarousel ? 'Uploading...' : 'Upload from Computer'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCarouselImageUpload}
                  className="hidden"
                  disabled={uploadingCarousel}
                />
              </label>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {flagship.carouselImages.map((image, index) => (
                <div key={index} className="flex items-center gap-2 bg-brand-black/50 p-2 rounded">
                  <img src={image} alt={`Carousel ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                  <span className="text-white/70 text-sm flex-1 truncate">{image}</span>
                  <button
                    onClick={() => removeCarouselImage(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-brand-grey rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold text-white mb-6">Features</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Features */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Main Features</label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
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
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {flagship.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-brand-black/50 p-2 rounded">
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

          {/* Highlight Features */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Highlight Features</label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newHighlightFeature}
                onChange={(e) => setNewHighlightFeature(e.target.value)}
                className="input-field flex-1"
                placeholder="Add highlight feature..."
              />
              <button
                onClick={addHighlightFeature}
                className="btn-primary px-4"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {flagship.highlightFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-brand-black/50 p-2 rounded">
                  <span className="text-white flex-1">{feature}</span>
                  <button
                    onClick={() => removeHighlightFeature(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-brand-grey rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Eye size={20} />
          Preview
        </h2>
        
        <div className="bg-brand-black rounded-lg p-6">
          <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 rounded-full px-4 py-2 mb-4">
            <span className="text-brand-green text-sm font-bold">{flagship.badge}</span>
          </div>
          
          <h3 className="text-white text-2xl font-bold mb-2">{flagship.title}</h3>
          <p className="text-white/60 mb-4">{flagship.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-brand-green font-bold text-lg">{flagship.capacity}</div>
              <div className="text-white/50 text-xs">Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-brand-green font-bold text-lg">{flagship.voltage}</div>
              <div className="text-white/50 text-xs">Voltage</div>
            </div>
            <div className="text-center">
              <div className="text-brand-green font-bold text-lg">{flagship.power}</div>
              <div className="text-white/50 text-xs">PCS Power</div>
            </div>
          </div>
          
          <div className="text-brand-green text-sm">
            {flagship.features.length} features • {flagship.carouselImages.length} carousel images
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlagshipManager;