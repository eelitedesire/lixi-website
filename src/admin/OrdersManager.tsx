import { useState, useEffect } from 'react';
import { Package, User, MapPin, DollarSign } from 'lucide-react';
import { adminApi } from '../services/api';

interface Order {
  id: string;
  items: any[];
  shippingAddress: any;
  total: number;
  createdAt: number;
}

const OrdersManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    adminApi.list('orders').then(setOrders);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this order?')) {
      await adminApi.delete('orders', id);
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-display text-brand-white mb-1">Orders Management</h2>
        <p className="text-brand-white/60">{orders.length} orders total</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-brand-white">Order #{order.id}</h3>
                  <p className="text-sm text-brand-white/60">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display text-brand-green">${order.total.toLocaleString()}</div>
                  <p className="text-sm text-brand-white/60">{order.items.length} items</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-brand-white/70 mb-4">
                <User size={16} />
                <span>{order.shippingAddress?.fullName}</span>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setSelectedOrder(order)} className="flex-1 bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 font-semibold">
                  View Details
                </button>
                <button onClick={() => handleDelete(order.id)} className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 font-semibold">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <div className="bg-brand-grey border border-brand-green/30 rounded-xl p-6 h-fit sticky top-4">
            <h3 className="text-xl font-bold text-brand-white mb-4">Order Details</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-brand-green mb-2">
                  <Package size={18} />
                  <span className="font-semibold">Items</span>
                </div>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="text-sm text-brand-white/70 ml-6">
                    {item.name} x{item.quantity} - ${item.price}
                  </div>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2 text-brand-green mb-2">
                  <MapPin size={18} />
                  <span className="font-semibold">Shipping Address</span>
                </div>
                <div className="text-sm text-brand-white/70 ml-6">
                  <p>{selectedOrder.shippingAddress.fullName}</p>
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                  <p className="mt-2">{selectedOrder.shippingAddress.email}</p>
                  <p>{selectedOrder.shippingAddress.phone}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-brand-green mb-2">
                  <DollarSign size={18} />
                  <span className="font-semibold">Total</span>
                </div>
                <div className="text-2xl font-display text-brand-white ml-6">
                  ${selectedOrder.total.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManager;
