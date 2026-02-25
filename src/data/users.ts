export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
}

export const users: User[] = [
  { id: '1', name: 'Admin User', username: 'admin', email: 'admin@lixi.de', password: 'ChangeThisToAStrongPassword123!', role: 'admin' },
  { id: '2', name: 'Editor User', username: 'editor', email: 'editor@lixi.de', password: 'editor123', role: 'editor' },
  { id: '3', name: 'Viewer User', username: 'viewer', email: 'viewer@lixi.de', password: 'viewer123', role: 'viewer' },
];
