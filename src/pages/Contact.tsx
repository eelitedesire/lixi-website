import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { serviceCenters } from '@/data/serviceCenters';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

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
              {serviceCenters.map(center => (
                <Card key={center.region} glass>
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{center.flag}</span>
                    <div>
                      <h3 className="font-bold text-brand-white mb-1">{center.region}</h3>
                      <p className="text-brand-white/70 text-sm mb-2">{center.name}</p>
                      <p className="text-brand-white/50 text-sm mb-2">{center.address}</p>
                      {center.phone && <p className="text-brand-green text-sm">{center.phone}</p>}
                      <a href={`mailto:${center.email}`} className="text-brand-green text-sm hover:text-brand-lime">{center.email}</a>
                    </div>
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
