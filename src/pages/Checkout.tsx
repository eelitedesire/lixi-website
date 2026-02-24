import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotal, setShippingAddress, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShippingAddress(formData);
    
    const orderData = {
      items,
      shippingAddress: formData,
      total: getTotal(),
      createdAt: Date.now()
    };

    try {
      const res = await fetch('http://localhost:3000/api/admin/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      if (res.ok) {
        setSubmitted(true);
        clearCart();
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-brand-black flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-brand-green" size={40} />
          </div>
          <h2 className="text-4xl font-display text-brand-white mb-4">Order Placed!</h2>
          <p className="text-brand-white/70">We'll contact you shortly to confirm your order.</p>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-display text-brand-white mb-4">Your cart is empty</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | LIXI Energy Systems</title>
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-display text-5xl text-brand-white mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-display text-brand-white mb-6">Cart Items</h2>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 border-b border-brand-greyMid pb-4">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-brand-white font-semibold">{item.name}</h3>
                        <p className="text-brand-white/60 text-sm">{item.type}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-16 bg-brand-black border border-brand-greyMid rounded px-2 py-1 text-brand-white"
                          />
                          <span className="text-brand-green font-mono">${item.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
                <h2 className="text-2xl font-display text-brand-white mb-6">Shipping Address</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="bg-brand-black border border-brand-greyMid rounded px-4 py-3 text-brand-white"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-brand-black border border-brand-greyMid rounded px-4 py-3 text-brand-white"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-3 text-brand-white"
                  />
                  <input
                    type="text"
                    placeholder="Street Address *"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({...formData, street: e.target.value})}
                    className="w-full bg-brand-black border border-brand-greyMid rounded px-4 py-3 text-brand-white"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City *"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="bg-brand-black border border-brand-greyMid rounded px-4 py-3 text-brand-white"
                    />
                    <input
                      type="text"
                      placeholder="State/Province *"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="bg-brand-black border border-brand-greyMid rounded px-4 py-3 text-brand-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Postal Code *"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                      className="bg-brand-black border border-brand-greyMid rounded px-4 py-3 text-brand-white"
                    />
                    <input
                      type="text"
                      placeholder="Country *"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="bg-brand-black border border-brand-greyMid rounded px-4 py-3 text-brand-white"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Place Order
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 sticky top-24">
                <h2 className="text-2xl font-display text-brand-white mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-brand-white/70">
                    <span>Subtotal</span>
                    <span>${getTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-white/70">
                    <span>Shipping</span>
                    <span>Calculated at delivery</span>
                  </div>
                  <div className="border-t border-brand-greyMid pt-3 flex justify-between text-brand-white font-display text-2xl">
                    <span>Total</span>
                    <span className="text-brand-green">${getTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
