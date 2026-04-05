const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const getImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `${API_URL}${url}`;
  if (url.startsWith('/images/uploads/')) {
    const filename = url.replace('/images/uploads/', '');
    return `${API_URL}/uploads/${filename}`;
  }
  return url;
};
