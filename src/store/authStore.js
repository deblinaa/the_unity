import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  role: null,
  isLoading: true,
  setSession: (session) => set({ session, user: session?.user || null }),
  setRole: (role) => set({ role }),
  setIsLoading: (isLoading) => set({ isLoading }),
  initializeAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ session, user: session?.user || null });

      if (session?.user) {
        const role = session.user.user_metadata?.role || null;
        set({ role });
      }

      set({ isLoading: false });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user || null });
        if (session?.user) {
          const role = session.user.user_metadata?.role || null;
          set({ role });
        } else {
          set({ role: null });
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, role: null });
  }
}));
