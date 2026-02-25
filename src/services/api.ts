const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const adminApi = {
  upload: async (base64Image: string, filename: string) => {
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image, filename })
    });
    const data = await res.json();
    return data.url;
  },
  
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

// Public API for frontend pages with language support
export const api = {
  getBlogPosts: (lang = 'en') => fetch(`${API_URL}/api/blog?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('blog')),
  getProducts: (lang = 'en') => fetch(`${API_URL}/api/products?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('products')),
  getProjects: (lang = 'en') => fetch(`${API_URL}/api/projects?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('projects')),
  getServices: (lang = 'en') => fetch(`${API_URL}/api/services?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('services')),
  getSolutions: (lang = 'en') => fetch(`${API_URL}/api/solutions?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('solutions')),
  getPartners: (lang = 'en') => fetch(`${API_URL}/api/partners?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('partners')),
  getHero: (lang = 'en') => fetch(`${API_URL}/api/hero?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('hero')),
  getWhatWeDo: (lang = 'en') => fetch(`${API_URL}/api/whatwedo?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('whatwedo')),
  getCellTech: (lang = 'en') => fetch(`${API_URL}/api/celltech?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('celltech')),
  getSiteSettings: (lang = 'en') => fetch(`${API_URL}/api/sitesettings?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('sitesettings')),
  getFooter: (lang = 'en') => fetch(`${API_URL}/api/footer?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('footer')),
  getAbout: (lang = 'en') => fetch(`${API_URL}/api/about?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('about')),
  getUsers: () => adminApi.list('users'),
  getShopping: (lang = 'en') => fetch(`${API_URL}/api/shopping?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('shopping')),
  getVideo: (lang = 'en') => fetch(`${API_URL}/api/video?lang=${lang}`).then(r => r.json()).catch(() => adminApi.list('video')),
};
