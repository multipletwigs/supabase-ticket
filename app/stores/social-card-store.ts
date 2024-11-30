import { create } from "zustand";
import { generateAnonName } from "@/lib/name-generator";
import { generateHarmonicGradient } from "@/lib/color-generator";

interface GradientColors {
  stop1: string;
  stop2: string;
  stop3: string;
}

export interface SocialCardState {
  name: string;
  number: number;
  gradient: GradientColors;
  imageUrl: string | null;
  isConverting: boolean;
  error: boolean;
  setName: (name: string) => void;
  setNumber: (number: number) => void;
  generateRandomGradient: () => void;
  setImageUrl: (url: string | null) => void;
  setIsConverting: (isConverting: boolean) => void;
  setError: (error: boolean) => void;
}

export const useSocialCardStore = create<SocialCardState>((set) => ({
  name: generateAnonName().toUpperCase(),
  number: 1,
  gradient: generateHarmonicGradient(),
  imageUrl: null,
  isConverting: true,
  error: false,
  setName: (name) => set({ name }),
  setNumber: (number) => set({ number }),
  generateRandomGradient: () => set({ gradient: generateHarmonicGradient() }),
  setImageUrl: (url) => set({ imageUrl: url }),
  setIsConverting: (isConverting) => set({ isConverting }),
  setError: (error) => set({ error }),
}));
