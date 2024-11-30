import { create } from "zustand";
import { uploadImage } from "@/lib/supabase/image";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface TicketState {
  isUploading: boolean;
  uploadError: string | null;
  hasTicket: boolean;
  setUploading: (loading: boolean) => void;
  setUploadError: (error: string | null) => void;
  checkTicket: () => Promise<void>;
  uploadTicket: (imageUrl: string, username: string) => Promise<void>;
}

export const useTicketStore = create<TicketState>((set) => ({
  isUploading: false,
  uploadError: null,
  hasTicket: false,
  setUploading: (loading) => set({ isUploading: loading }),
  setUploadError: (error) => set({ uploadError: error }),

  checkTicket: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("tickets")
        .select()
        .eq("id", user.id)
        .single();

      set({ hasTicket: !!data });
    } catch (error) {
      console.error("Error checking ticket:", error);
      set({ hasTicket: false });
    }
  },

  uploadTicket: async (imageUrl, username) => {
    set({ isUploading: true, uploadError: null });
    try {
      await uploadImage(imageUrl, username);
      set({ hasTicket: true });
    } catch (error) {
      set({ uploadError: (error as Error).message });
      throw error;
    } finally {
      set({ isUploading: false });
    }
  },
}));
