export interface Quote {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'reviewed' | 'closed';
}

export const quotes: Quote[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I would like a quote for a 10kWh system.',
    status: 'pending',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'Can you provide pricing for commercial solutions?',
    status: 'reviewed',
  },
];
