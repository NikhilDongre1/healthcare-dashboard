import { create } from "zustand";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type?: "info" | "success" | "warning" | "error";
}

interface UIState {
  sidebarCollapsed: boolean;
  notifications: AppNotification[];
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  addNotification: (n: Omit<AppNotification, "id" | "read">) => void;
  markAllRead: () => void;
  markOneRead: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  notifications: [],

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),

  addNotification: (n) =>
    set((s) => ({
      notifications: [
        {
          ...n,
          id: crypto.randomUUID(),
          read: false,
        },
        ...s.notifications,
      ],
    })),

  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),

  markOneRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
