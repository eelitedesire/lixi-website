export interface Solution {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export const solutions: Solution[] = [
  { id: '1', title: 'Off-Grid Solar', description: 'Complete off-grid solar energy solution.', image: '' },
  { id: '2', title: 'Grid-Tied Storage', description: 'Hybrid grid-tied battery storage.', image: '' },
];
