import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  initAuth: () => () => void;
  justLoggedIn: boolean;
  clearJustLoggedIn: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      justLoggedIn: false,
      clearJustLoggedIn: () => set({ justLoggedIn: false }),

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setLoading: (isLoading) => set({ isLoading }),

      clearError: () => set({ error: null }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const {
            uid,
            email: userEmail,
            displayName,
            photoURL,
          } = credential.user;
          set({
            user: { uid, email: userEmail, displayName, photoURL },
            isAuthenticated: true,
            isLoading: false,
            error: null,
            justLoggedIn: true,
          });
        } catch (err: unknown) {
          const message = getFirebaseError(err);
          set({
            isLoading: false,
            error: message,
            isAuthenticated: false,
            user: null,
          });
          throw new Error(message, { cause: err });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await signOut(auth);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch {
          set({ isLoading: false });
        }
      },

      initAuth: () => {
        set({ isLoading: true });
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const { uid, email, displayName, photoURL } = firebaseUser;
            set({
              user: { uid, email, displayName, photoURL },
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        });
        return unsubscribe;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

function getFirebaseError(err: unknown): string {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = (err as { code: string }).code;
    const map: Record<string, string> = {
      "auth/invalid-credential": "Invalid email or password.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/network-request-failed": "Network error. Check your connection.",
    };
    return map[code] ?? "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}
