import React, { useState } from 'react';
import { Quote } from '../data/quotes';

interface QuoteEditorProps {
  quote?: Quote;
  onSave: (quote: Quote) => void;
  onCancel: () => void;
}

const QuoteEditor: React.FC<QuoteEditorProps> = ({ quote, onSave, onCancel }) => {
  const [name, setName] = useState(quote?.name || '');
  const [email, setEmail] = useState(quote?.email || '');
  const [message, setMessage] = useState(quote?.message || '');
  const [status, setStatus] = useState(quote?.status || 'pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...quote,
      name,
      email,
      message,
      status,
    } as Quote);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 border border-brand-green/30">
      <h2 className="text-2xl font-bold mb-6">{quote ? 'Edit' : 'Add'} Quote</h2>
      <div className="grid grid-cols-1 gap-4">
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <textarea className="border border-brand-green/30 rounded p-2 min-h-[80px] bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
        <select className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white focus:ring-2 focus:ring-brand-green" value={status} onChange={e => setStatus(e.target.value as typeof status)}>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-900 font-semibold">Save</button>
        <button type="button" className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 font-semibold" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default QuoteEditor;
