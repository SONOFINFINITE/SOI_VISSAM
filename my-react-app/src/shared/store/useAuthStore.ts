import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StateStorage } from 'zustand/middleware';
import { TEST_USER_INITIAL_ORDERS, TEST_USER_PROFILE } from '../data/testUser';
import type { Order, UserProfile } from '../data/testUser';

interface AuthState {
  isAuthenticated: boolean;
  user: ({ login: string } & UserProfile) | null;
  remember: boolean;
  orders: Order[];
  isAuthModalOpen: boolean;
}

interface AuthActions {
  login: (login: string, remember: boolean) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  setAuthModalOpen: (isOpen: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const storage: StateStorage = {
  getItem: (name) => {
    return localStorage.getItem(name) || sessionStorage.getItem(name) || null;
  },
  setItem: (name, value) => {
    try {
      const parsed = JSON.parse(value);
      if (parsed.state.remember) {
        localStorage.setItem(name, value);
        sessionStorage.removeItem(name);
      } else {
        sessionStorage.setItem(name, value);
        localStorage.removeItem(name);
      }
    } catch {
      // Fallback
      sessionStorage.setItem(name, value);
    }
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      remember: false,
      orders: [],
      isAuthModalOpen: false,

      login: (login: string, remember: boolean) => set((state) => ({
        isAuthenticated: true,
        user: { login, ...TEST_USER_PROFILE },
        remember,
        // If there are already orders in the store, keep them, otherwise use the initial ones
        orders: state.orders.length > 0 ? state.orders : TEST_USER_INITIAL_ORDERS
      })),
      logout: () => set({ isAuthenticated: false, user: null, remember: false }), // keep orders in simulated 'database'
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen })
    }),
    {
      name: 'vissam-auth-storage',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        remember: state.remember,
        orders: state.orders
      }), // Do not persist UI state
      version: 2, // Bump version to force clear old mock data from local storage
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // If old version, ignore saved state to clear old mock orders
          return {
            isAuthenticated: false,
            user: null,
            remember: false,
            orders: [],
          };
        }
        return persistedState as AuthState;
      },
    }
  )
);
