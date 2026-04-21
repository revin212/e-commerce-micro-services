"use client";

import { create } from "zustand";

type User = { id: string; name: string; email: string; role?: string };

type AuthState = {
  user: User | null;
  hydrated: boolean;
  setUser: (user: User | null) => void;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  setUser: (user) => set({ user }),
  hydrate: async () => {
    if ((process.env.NEXT_PUBLIC_API_MODE ?? "mock") === "mock") {
      set({ hydrated: true });
      return;
    }
    try {
      const response = await fetch("/api/auth/session", { method: "GET", credentials: "include" });
      const payload = (await response.json()) as { user: User | null };
      set({ user: payload.user, hydrated: true });
    } catch {
      set({ user: null, hydrated: true });
    }
  },
  logout: async () => {
    if ((process.env.NEXT_PUBLIC_API_MODE ?? "mock") !== "mock") {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    }
    set({ user: null, hydrated: true });
  },
}));
