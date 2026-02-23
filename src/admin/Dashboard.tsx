

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-brand-black/95 backdrop-blur-md p-0 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mt-12 mb-8">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-10 text-center drop-shadow">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-8">
                              <a href="/admin/users" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
                                <span className="text-2xl mb-2">👥</span>
                                <span className="font-semibold text-blue-800">Manage Users</span>
                              </a>
                              <a href="/admin/shopping" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
                                <span className="text-2xl mb-2">🛒</span>
                                <span className="font-semibold text-blue-800">Manage Shopping</span>
                              </a>
                              <a href="/admin/solutions" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
                                <span className="text-2xl mb-2">💡</span>
                                <span className="font-semibold text-blue-800">Manage Solutions</span>
                              </a>
                              <a href="/admin/about" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
                                <span className="text-2xl mb-2">ℹ️</span>
                                <span className="font-semibold text-blue-800">Manage About</span>
                              </a>
                    <a href="/admin/projects" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
                      <span className="text-2xl mb-2">🏗️</span>
                      <span className="font-semibold text-blue-800">Manage Projects</span>
                    </a>
          <a href="/admin/blog" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
            <span className="text-2xl mb-2">📝</span>
            <span className="font-semibold text-blue-800">Manage Blog Posts</span>
          </a>
          <a href="/admin/products" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
            <span className="text-2xl mb-2">📦</span>
            <span className="font-semibold text-blue-800">Manage Products</span>
          </a>
          <a href="/admin/users" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
            <span className="text-2xl mb-2">👤</span>
            <span className="font-semibold text-blue-800">Manage Users</span>
          </a>
          <a href="/admin/quotes" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
            <span className="text-2xl mb-2">💬</span>
            <span className="font-semibold text-blue-800">Manage Quotes</span>
          </a>
          <a href="/admin/services" className="bg-brand-black/90 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col items-center transition hover:scale-105 hover:bg-brand-green/10 border border-brand-green/30">
            <span className="text-2xl mb-2">🛠️</span>
            <span className="font-semibold text-blue-800">Manage Services</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
