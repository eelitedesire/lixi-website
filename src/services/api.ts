const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const adminApi = {
  list: async (resource: string) => {
    const res = await fetch(`${API_URL}/api/admin/${resource}/list`);
    return res.json();
  },
  
  create: async (resource: string, data: any) => {
    const res = await fetch(`${API_URL}/api/admin/${resource}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  
  update: async (resource: string, data: any) => {
    const res = await fetch(`${API_URL}/api/admin/${resource}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  
  delete: async (resource: string, id: string) => {
    const res = await fetch(`${API_URL}/api/admin/${resource}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return res.json();
  }
};

// Public API for frontend pages
export const api = {
  getBlogPosts: () => adminApi.list('blog'),
  getProducts: () => adminApi.list('products'),
  getProjects: () => adminApi.list('projects'),
  getServices: () => adminApi.list('services'),
  getSolutions: () => adminApi.list('solutions'),
  getPartners: () => adminApi.list('partners'),
  getHero: () => adminApi.list('hero'),
  getWhatWeDo: () => adminApi.list('whatwedo'),
  getCellTech: () => adminApi.list('celltech'),
  getSiteSettings: () => adminApi.list('sitesettings'),
  getFooter: () => adminApi.list('footer'),
  getAbout: () => adminApi.list('about'),
  getUsers: () => adminApi.list('users'),
  getShopping: () => adminApi.list('shopping'),
};
