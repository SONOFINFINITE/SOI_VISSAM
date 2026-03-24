import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  activeCategory: string | null;
  activeCollection: string | null;
  activeAvailability: 'all' | 'in-stock' | 'on-order';
  priceRange: { min: string; max: string };
  sortBy: 'default' | 'sale' | 'price-asc' | 'price-desc' | 'newest';
  currentPage: number;
}

interface FilterActions {
  setActiveCategory: (category: string | null) => void;
  setActiveCollection: (collection: string | null) => void;
  setActiveAvailability: (availability: 'all' | 'in-stock' | 'on-order') => void;
  setPriceRange: (range: { min: string; max: string } | ((prev: { min: string; max: string }) => { min: string; max: string })) => void;
  setSortBy: (sort: 'default' | 'sale' | 'price-asc' | 'price-desc' | 'newest') => void;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  resetFilters: () => void;
}

type FilterStore = FilterState & FilterActions;

const initialState: FilterState = {
  activeCategory: null,
  activeCollection: null,
  activeAvailability: 'all',
  priceRange: { min: '', max: '' },
  sortBy: 'default',
  currentPage: 1,
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveCategory: (activeCategory) => set({ activeCategory, currentPage: 1 }),
      setActiveCollection: (activeCollection) => set({ activeCollection, currentPage: 1 }),
      setActiveAvailability: (activeAvailability) => set({ activeAvailability, currentPage: 1 }),
      setPriceRange: (range) => set((state) => {
        const newRange = typeof range === 'function' ? range(state.priceRange) : range;
        return { priceRange: newRange, currentPage: 1 };
      }),
      setSortBy: (sortBy) => set({ sortBy, currentPage: 1 }),
      setCurrentPage: (page) => set((state) => ({
        currentPage: typeof page === 'function' ? page(state.currentPage) : page
      })),
      resetFilters: () => set(initialState),
    }),
    { 
      name: 'vissam-filters',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
