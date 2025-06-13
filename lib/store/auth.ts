import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        if (
          (email === 'admin@gmail.com' && password === 'admin2025') ||
          (email === 'user@gmail.com' && password === 'user2025')
        ) {
          set({
            user: {
              id: email === 'admin@gmail.com' ? '1' : '2',
              email: email,
              name: email === 'admin@gmail.com' ? 'Admin' : 'User',
              role: email === 'admin@gmail.com' ? 'ADMIN' : 'USER'
            },
            isAuthenticated: true
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);