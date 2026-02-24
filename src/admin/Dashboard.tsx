import { TrendingUp, Users, Package, MessageSquare, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-400' },
    { label: 'Products', value: '48', change: '+3', icon: Package, color: 'text-brand-green' },
    { label: 'Quote Requests', value: '89', change: '+23%', icon: MessageSquare, color: 'text-yellow-400' },
    { label: 'Active Projects', value: '15', change: '+5', icon: Activity, color: 'text-purple-400' },
  ];

  const recentActivity = [
    { action: 'New quote request', user: 'John Doe', time: '5 min ago' },
    { action: 'Product updated', user: 'Admin', time: '1 hour ago' },
    { action: 'New user registered', user: 'Jane Smith', time: '2 hours ago' },
    { action: 'Blog post published', user: 'Admin', time: '3 hours ago' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display text-brand-white mb-2">Dashboard</h1>
        <p className="text-brand-white/60">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 hover:border-brand-green/50 transition">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-brand-green text-sm font-semibold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-brand-white mb-1">{stat.value}</div>
              <div className="text-brand-white/60 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6">
        <h2 className="text-xl font-bold text-brand-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-brand-greyMid last:border-0">
              <div>
                <div className="text-brand-white font-medium">{activity.action}</div>
                <div className="text-brand-white/60 text-sm">{activity.user}</div>
              </div>
              <div className="text-brand-white/40 text-sm">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
