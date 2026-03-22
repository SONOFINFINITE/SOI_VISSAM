import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FavoritesState {
  items: Product[];
}

interface FavoritesActions {
  toggleFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

type FavoritesStore = FavoritesState & FavoritesActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleFavorite: (product) => {
        set((state) => {
          const already = state.items.some((i) => i.id === product.id);
          return {
            items: already
              ? state.items.filter((i) => i.id !== product.id)
              : [...state.items, product],
          };
        });
      },

      removeFavorite: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }));
      },

      isFavorite: (productId) => get().items.some((i) => i.id === productId),

      clearFavorites: () => set({ items: [] }),
    }),
    { name: 'vissam-favorites' }
  )
);
