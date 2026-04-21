"use client";

import { create } from "zustand";

type SearchState = {
  overlayOpen: boolean;
  query: string;
  recent: string[];
  selectedCollection: string | null;
  setOverlayOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
  addRecent: (term: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  overlayOpen: false,
  query: "",
  recent: [],
  selectedCollection: null,
  setOverlayOpen: (overlayOpen) => set({ overlayOpen }),
  setQuery: (query) => set({ query }),
  addRecent: (term) =>
    set((state) => ({
      recent: [term, ...state.recent.filter((item) => item !== term)].slice(0, 5),
    })),
}));
