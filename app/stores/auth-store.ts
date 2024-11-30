import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface AuthState {
  user: User | null;
  loading: boolean;
  authLoading: boolean;
  authError: string;
  isSignUp: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setAuthLoading: (authLoading: boolean) => void;
  setAuthError: (error: string) => void;
  setIsSignUp: (isSignUp: boolean) => void;
  checkUser: () => Promise<void>;
  handleGithubAuth: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  authLoading: false,
  authError: "",
  isSignUp: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  setAuthError: (authError) => set({ authError }),
  setIsSignUp: (isSignUp) => set({ isSignUp }),

  checkUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ user, loading: false });
  },
  handleGithubAuth: async () => {
    set({ authLoading: true, authError: "" });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error(error);
      set({
        authError:
          error.message || "An error occurred during GitHub authentication",
        authLoading: false,
      });
    }
  },

  handleLogout: async () => {
    set({ authLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error: any) {
      console.error(error);
      set({
        authError: error.message || "An error occurred during logout",
      });
    } finally {
      set({ authLoading: false });
    }
  },
}));
