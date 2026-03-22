import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeItem: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  isInCart: (productId: string, selectedColor?: string) => boolean;
  totalCount: () => number;
  totalPrice: () => number;
  totalOldPrice: () => number;
}

type CartStore = CartState & CartActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, selectedColor) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === product.id && i.selectedColor === selectedColor
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id && i.selectedColor === selectedColor
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity, selectedColor }] };
        });
      },

      removeItem: (productId, selectedColor) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === productId && i.selectedColor === selectedColor)
          ),
        }));
      },

      updateQuantity: (productId, quantity, selectedColor) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedColor);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === productId && i.selectedColor === selectedColor
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      isInCart: (productId, selectedColor) =>
        get().items.some((i) => i.id === productId && i.selectedColor === selectedColor),

      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0),
      
      totalOldPrice: () =>
        get().items.reduce((sum, i) => sum + (i.oldPrice || i.price || 0) * i.quantity, 0),
    }),
    { name: 'vissam-cart' }
  )
);
