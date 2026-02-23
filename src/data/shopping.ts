export interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export const shoppingItems: ShoppingItem[] = [
  { id: '1', name: 'LIXI Stack 48V', price: 4999, image: '', description: 'Residential battery system.' },
  { id: '2', name: 'LIXI Pro Rack', price: 12999, image: '', description: 'Commercial battery rack.' },
];
