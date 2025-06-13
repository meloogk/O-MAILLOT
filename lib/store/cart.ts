import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => { XOF: number; EUR: number; USD: number };
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size) => {
        const items = get().items;
        const existingItem = items.find(
          item => item.productId === product.id && item.size === size
        );

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${size}-${Date.now()}`,
            productId: product.id,
            product,
            quantity: 1,
            size,
            price: product.price
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => ({
            XOF: total.XOF + item.price.XOF * item.quantity,
            EUR: total.EUR + item.price.EUR * item.quantity,
            USD: total.USD + item.price.USD * item.quantity
          }),
          { XOF: 0, EUR: 0, USD: 0 }
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);