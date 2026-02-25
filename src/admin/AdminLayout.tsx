import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Package, MessageSquare, Wrench, FolderKanban, Users, ShoppingCart, ShoppingBag, FileEdit, Lightbulb, Info, Users2, Briefcase, Cpu, Settings, Layout, LogOut, Menu, X, Video, Layers } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  currentUser?: any;
}

const AdminLayout = ({ children, currentUser }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: FileText, label: 'Blog Posts', path: '/admin/blog' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Layers, label: 'Categories', path: '/admin/categories' },

    { icon: MessageSquare, label: 'Quotes', path: '/admin/quotes' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: Wrench, label: 'Services', path: '/admin/services' },
    { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
    { icon: Users2, label: 'Partners', path: '/admin/partners' },
    { icon: Lightbulb, label: 'Solutions', path: '/admin/solutions' },
    { icon: FileEdit, label: 'Technology', path: '/admin/techcontent' },
    { icon: Info, label: 'About', path: '/admin/about' },
    { icon: Lightbulb, label: 'Hero', path: '/admin/hero' },
    { icon: Briefcase, label: 'What We Do', path: '/admin/whatwedo' },
    { icon: Cpu, label: 'Cell Tech', path: '/admin/celltech' },
    { icon: Video, label: 'Video Showcase', path: '/admin/video' },
    { icon: Settings, label: 'Site Settings', path: '/admin/sitesettings' },
    { icon: Layout, label: 'Footer', path: '/admin/footer' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ShoppingCart, label: 'Shopping', path: '/admin/shopping' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    localStorage.removeItem('admin-user');
    window.location.href = '/admin';
  };

  return (
    <div className="flex h-screen bg-brand-black overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-brand-grey border-r border-brand-greyMid transition-all duration-300 flex flex-col`}>
        {/* Logo & Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-brand-greyMid">
          {sidebarOpen && (
            <div>
              <span className="text-brand-green font-display text-2xl">LIXI</span>
              {currentUser && (
                <div className="text-xs text-brand-white/60 mt-1">{currentUser.name}</div>
              )}
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-brand-greyMid rounded-lg transition">
            {sidebarOpen ? <X className="w-5 h-5 text-brand-white" /> : <Menu className="w-5 h-5 text-brand-white" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition ${
                  isActive 
                    ? 'bg-brand-green/10 border-r-2 border-brand-green text-brand-green' 
                    : 'text-brand-white/70 hover:bg-brand-greyMid hover:text-brand-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-4 border-t border-brand-greyMid text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="font-medium">Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
