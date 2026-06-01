import { create } from 'zustand';

export interface MaterialSpec {
  t: string;
  s: string;
  d: string;
  img: string;
  density: string;
  hardness: string;
  ld: string;
}

interface AppState {
  lang: 'es' | 'en';
  setLang: (lang: 'es' | 'en') => void;
  selectedMaterial: MaterialSpec | null;
  setSelectedMaterial: (material: MaterialSpec | null) => void;
  selectedModel: string;
  setSelectedModel: (url: string) => void;
  isFichaOpen: boolean;
  setIsFichaOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  lang: 'es',
  setLang: (lang) => set({ lang }),
  selectedMaterial: null,
  setSelectedMaterial: (selectedMaterial) => set({ selectedMaterial }),
  selectedModel: '/models/001-BASE + VASO-PORTALAPICES X2.stl', // Default 3D product STL
  setSelectedModel: (selectedModel) => set({ selectedModel }),
  isFichaOpen: false,
  setIsFichaOpen: (isFichaOpen) => set({ isFichaOpen }),
  activeSection: 'home',
  setActiveSection: (activeSection) => set({ activeSection }),
}));

export default useAppStore;
