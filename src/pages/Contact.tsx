import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { adminApi } from '@/services/api';
import { toast } from 'sonner';

interface ServiceCenter {
  id: string;
  name: string;
  region: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [centers, setCenters] = useState<ServiceCenter[]>([]);

  useEffect(() => {
    adminApi.list('service-centers').then(setCenters);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <>
      <Helmet><title>Contact Us | LIXI Energy Systems</title></Helmet>
      <div className="pt-20 bg-brand-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-h2 text-brand-white mb-12 text-center">
            Get In Touch
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card glass>
              <h2 className="font-display text-2xl text-brand-white mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                <Input label="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <Input label="Subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required />
                <div>
                  <label className="block text-sm font-medium text-brand-white mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-3 bg-brand-grey border border-brand-greyMid rounded-lg text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-green"
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <h2 className="font-display text-2xl text-brand-white mb-6">Service Centers</h2>
              {centers.map(center => (
                <Card key={center.id} glass>
                  <div>
                    <h3 className="font-bold text-brand-green text-lg mb-1">{center.name}</h3>
                    <p className="text-brand-lime text-sm mb-2">{center.region}</p>
                    <p className="text-brand-white/70 text-sm mb-1">{center.address}</p>
                    <p className="text-brand-white/70 text-sm mb-2">{center.city}, {center.country}</p>
                    {center.phone && <p className="text-brand-white text-sm mb-1">📞 {center.phone}</p>}
                    <a href={`mailto:${center.email}`} className="text-brand-green text-sm hover:text-brand-lime block mb-1">✉️ {center.email}</a>
                    {center.hours && <p className="text-brand-white/50 text-sm">🕒 {center.hours}</p>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
