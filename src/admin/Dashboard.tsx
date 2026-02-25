import { Users, Package, MessageSquare, ShoppingBag, FileText, FolderKanban } from 'lucide-react';
import { useState, useEffect } from 'react';
import { adminApi } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    quotes: 0,
    orders: 0,
    blog: 0,
    projects: 0
  });
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [users, products, quotes, orders, blog, projects] = await Promise.all([
        adminApi.list('users'),
        adminApi.list('products'),
        adminApi.list('quotes'),
        adminApi.list('orders'),
        adminApi.list('blog'),
        adminApi.list('projects')
      ]);

      setStats({
        users: users.length,
        products: products.length,
        quotes: quotes.length,
        orders: orders.length,
        blog: blog.length,
        projects: projects.length
      });

      setRecentQuotes(quotes.slice(0, 5));
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const statCards = [
    { label: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-400' },
    { label: 'Products', value: stats.products, icon: Package, color: 'text-brand-green' },
    { label: 'Quote Requests', value: stats.quotes, icon: MessageSquare, color: 'text-yellow-400' },
    { label: 'Orders', value: stats.orders, icon: ShoppingBag, color: 'text-purple-400' },
    { label: 'Blog Posts', value: stats.blog, icon: FileText, color: 'text-orange-400' },
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'text-pink-400' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display text-brand-white mb-2">Dashboard</h1>
        <p className="text-brand-white/60">Overview of your LIXI admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-brand-white mb-1">{stat.value}</div>
              <div className="text-brand-white/60 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <h2 className="text-xl font-bold text-brand-white mb-4">Recent Quote Requests</h2>
          <div className="space-y-4">
            {recentQuotes.length > 0 ? (
              recentQuotes.map((quote) => (
                <div key={quote.id} className="py-3 border-b border-brand-greyMid last:border-0">
                  <div className="text-brand-white font-medium">{quote.firstName} {quote.lastName}</div>
                  <div className="text-brand-white/60 text-sm">{quote.email}</div>
                  <div className="text-brand-white/40 text-xs mt-1">{quote.userType} · {quote.country}</div>
                </div>
              ))
            ) : (
              <div className="text-brand-white/40 text-sm">No quotes yet</div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
          <h2 className="text-xl font-bold text-brand-white mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="py-3 border-b border-brand-greyMid last:border-0">
                  <div className="text-brand-white font-medium">{order.shippingAddress?.fullName}</div>
                  <div className="text-brand-white/60 text-sm">{order.shippingAddress?.email}</div>
                  <div className="text-brand-green text-sm font-mono mt-1">${order.total?.toLocaleString()}</div>
                </div>
              ))
            ) : (
              <div className="text-brand-white/40 text-sm">No orders yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
