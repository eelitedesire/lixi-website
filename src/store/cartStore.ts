import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  price: number;
  quantity: number;
  image?: string;
  details?: any;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CartStore {
  items: CartItem[];
  shippingAddress: ShippingAddress | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setShippingAddress: (address: ShippingAddress) => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      shippingAddress: null,
      
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: quantity > 0
          ? state.items.map(i => i.id === id ? { ...i, quantity } : i)
          : state.items.filter(i => i.id !== id)
      })),
      
      clearCart: () => set({ items: [], shippingAddress: null }),
      
      setShippingAddress: (address) => set({ shippingAddress: address }),
      
      getTotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }),
    { name: 'lixi-cart' }
  )
);
