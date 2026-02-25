import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';

const Quote = () => {
  const { t } = useTranslation(['forms', 'common']);
  const location = useLocation();
  const lang = location.pathname.split('/')[1] || 'en';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '', country: '', monthlyBill: 200, hasSolar: '', voltage: '', capacity: '', trading: '',
    firstName: '', lastName: '', email: '', phone: '', company: '', message: ''
  });

  const handleSubmit = async () => {
    try {
      await fetch('http://localhost:3000/api/admin/quotes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: Date.now().toString() })
      });
      toast.success(t('forms:quote.success'));
      setStep(5);
    } catch (error) {
      toast.error(t('forms:quote.error'));
    }
  };

  const totalSteps = 2;

  return (
    <>
      <Helmet><title>Get a Quote | LIXI Energy Systems</title></Helmet>
      <div className="pt-20 bg-brand-black min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-24">
          <h1 className="font-display text-h2 text-brand-white mb-8 text-center">{t('forms:quote.title')}</h1>
          
          {/* Progress Bar */}
          {step <= totalSteps && (
            <div className="mb-12">
              <div className="flex justify-between mb-2">
                {[1, 2].map(s => (
                  <div key={s} className={`w-1/2 h-2 rounded-full mx-1 ${s <= step ? 'bg-brand-green' : 'bg-brand-greyMid'}`} />
                ))}
              </div>
              <p className="text-center text-brand-white/70">{t('forms:quote.step1')} {step} {t('common:common.of')} {totalSteps}</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Card glass>
                  <h2 className="font-display text-2xl text-brand-white mb-6">{t('forms:quote.step1')}</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-brand-white mb-2">I am a:</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['Homeowner', 'Business', 'Developer'].map(type => (
                          <button
                            key={type}
                            onClick={() => setFormData({...formData, userType: type})}
                            className={`p-4 rounded-lg border-2 transition-all ${formData.userType === type ? 'border-brand-green bg-brand-green/10' : 'border-brand-greyMid'}`}
                          >
                            <span className="text-brand-white">{type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <Input label="Country / Region" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                    <div>
                      <label className="block text-brand-white mb-2">Monthly Electricity Bill: ${formData.monthlyBill}</label>
                      <input type="range" min="50" max="500" value={formData.monthlyBill} onChange={e => setFormData({...formData, monthlyBill: parseInt(e.target.value)})} className="w-full" />
                    </div>
                    <div>
                      <label className="block text-brand-white mb-2">Do you have existing solar?</label>
                      <div className="flex gap-4">
                        {['Yes', 'No'].map(opt => (
                          <button key={opt} onClick={() => setFormData({...formData, hasSolar: opt})} className={`flex-1 p-4 rounded-lg border-2 ${formData.hasSolar === opt ? 'border-brand-green bg-brand-green/10' : 'border-brand-greyMid'}`}>
                            <span className="text-brand-white">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-brand-white mb-2">Voltage:</label>
                      <div className="grid grid-cols-4 gap-4">
                        {['48V', '192V', '400V', 'Not Sure'].map(v => (
                          <button key={v} onClick={() => setFormData({...formData, voltage: v})} className={`p-4 rounded-lg border-2 ${formData.voltage === v ? 'border-brand-green bg-brand-green/10' : 'border-brand-greyMid'}`}>
                            <span className="text-brand-white">{v}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-brand-white mb-2">Capacity needed:</label>
                      <div className="grid grid-cols-2 gap-4">
                        {['< 20kWh', '20–50kWh', '50–100kWh', '100kWh+', 'Not Sure'].map(c => (
                          <button key={c} onClick={() => setFormData({...formData, capacity: c})} className={`p-4 rounded-lg border-2 ${formData.capacity === c ? 'border-brand-green bg-brand-green/10' : 'border-brand-greyMid'}`}>
                            <span className="text-brand-white">{c}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-brand-white mb-2">Interested in CARBONOZ trading?</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['Yes', 'Maybe', 'No'].map(t => (
                          <button key={t} onClick={() => setFormData({...formData, trading: t})} className={`p-4 rounded-lg border-2 ${formData.trading === t ? 'border-brand-green bg-brand-green/10' : 'border-brand-greyMid'}`}>
                            <span className="text-brand-white">{t}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Card glass>
                  <h2 className="font-display text-2xl text-brand-white mb-6">Contact Details</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required />
                      <Input label="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required />
                    </div>
                    <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                    <Input label="Phone (optional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <Input label="Company (optional)" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                    <div>
                      <label className="block text-brand-white mb-2">Message</label>
                      <textarea className="w-full px-4 py-3 bg-brand-grey border border-brand-greyMid rounded-lg text-brand-white" rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                    </div>
                    <Button onClick={handleSubmit} className="w-full mt-6">{t('common:buttons.submit')}</Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Card glass className="text-center">
                  <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={48} className="text-brand-black" />
                  </div>
                  <h2 className="font-display text-3xl text-brand-white mb-4">{t('forms:quote.success')}</h2>
                  <p className="text-brand-white/70 mb-8">{t('forms:quote.successMessage')}</p>
                  <Button onClick={() => window.location.href = `/${lang}`}>{t('common:buttons.backToHome')}</Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step > 0 && step <= totalSteps && (
            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 1}>
                <ChevronLeft className="mr-2" /> {t('common:buttons.previous')}
              </Button>
              {step < totalSteps && (
                <Button onClick={() => setStep(step + 1)}>
                  {t('common:buttons.next')} <ChevronRight className="ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quote;
