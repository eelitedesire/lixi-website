import { useState, useEffect } from 'react';
import { Mail, User } from 'lucide-react';
import { adminApi } from '../services/api';

const QuoteManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

  useEffect(() => {
    adminApi.list('quotes').then(setItems);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this quote request?')) {
      await adminApi.delete('quotes', id);
      setItems(items.filter(q => q.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-display text-brand-white mb-1">Quote Requests</h2>
        <p className="text-brand-white/60">{items.length} quote requests from customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map(quote => (
            <div key={quote.id} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-brand-white">{quote.firstName} {quote.lastName}</h3>
                  <p className="text-sm text-brand-white/60">{new Date(quote.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-brand-green font-semibold">{quote.userType}</div>
                  <p className="text-sm text-brand-white/60">{quote.country}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="text-brand-white/70"><strong>Voltage:</strong> {quote.voltage}</div>
                <div className="text-brand-white/70"><strong>Capacity:</strong> {quote.capacity}</div>
                <div className="text-brand-white/70"><strong>Monthly Bill:</strong> ${quote.monthlyBill}</div>
                <div className="text-brand-white/70"><strong>Trading:</strong> {quote.trading}</div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setSelectedQuote(quote)} className="flex-1 bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 font-semibold">
                  View Details
                </button>
                <button onClick={() => handleDelete(quote.id)} className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 font-semibold">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-12 text-brand-white/60">
              No quote requests yet
            </div>
          )}
        </div>

        {selectedQuote && (
          <div className="bg-brand-grey border border-brand-green/30 rounded-xl p-6 h-fit sticky top-4">
            <h3 className="text-xl font-bold text-brand-white mb-4">Quote Details</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-brand-green mb-2">
                  <User size={18} />
                  <span className="font-semibold">Customer Info</span>
                </div>
                <div className="text-sm text-brand-white/70 ml-6 space-y-1">
                  <p><strong>Name:</strong> {selectedQuote.firstName} {selectedQuote.lastName}</p>
                  <p><strong>Type:</strong> {selectedQuote.userType}</p>
                  <p><strong>Country:</strong> {selectedQuote.country}</p>
                  {selectedQuote.company && <p><strong>Company:</strong> {selectedQuote.company}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-brand-green mb-2">
                  <Mail size={18} />
                  <span className="font-semibold">Contact</span>
                </div>
                <div className="text-sm text-brand-white/70 ml-6 space-y-1">
                  <p>{selectedQuote.email}</p>
                  <p>{selectedQuote.phone}</p>
                </div>
              </div>

              <div>
                <div className="text-brand-green font-semibold mb-2">System Requirements</div>
                <div className="text-sm text-brand-white/70 ml-6 space-y-1">
                  <p><strong>Voltage:</strong> {selectedQuote.voltage}</p>
                  <p><strong>Capacity:</strong> {selectedQuote.capacity}</p>
                  <p><strong>Monthly Bill:</strong> ${selectedQuote.monthlyBill}</p>
                  <p><strong>Has Solar:</strong> {selectedQuote.hasSolar}</p>
                  <p><strong>Trading Interest:</strong> {selectedQuote.trading}</p>
                </div>
              </div>

              {selectedQuote.message && (
                <div>
                  <div className="text-brand-green font-semibold mb-2">Message</div>
                  <p className="text-sm text-brand-white/70 ml-6">{selectedQuote.message}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteManager;