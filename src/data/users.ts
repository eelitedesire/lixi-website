export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export const users: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@lixi.de', role: 'admin' },
  { id: '2', name: 'Editor User', email: 'editor@lixi.de', role: 'editor' },
  { id: '3', name: 'Viewer User', email: 'viewer@lixi.de', role: 'viewer' },
];
