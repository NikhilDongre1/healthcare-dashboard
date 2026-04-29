const colorTokens = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#DBEAFE",
  accent: "#0EA5E9",
  bg: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  sidebar: "#1E3A5F",
  sidebarText: "#CBD5E1",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colorTokens.primary,
          dark: colorTokens.primaryDark,
          light: colorTokens.primaryLight,
        },
        accent: colorTokens.accent,
        bg: colorTokens.bg,
        surface: colorTokens.surface,
        border: colorTokens.border,
        "text-primary": colorTokens.textPrimary,
        "text-secondary": colorTokens.textSecondary,
        "text-muted": colorTokens.textMuted,
        success: colorTokens.success,
        warning: colorTokens.warning,
        error: colorTokens.error,
        sidebar: colorTokens.sidebar,
        "sidebar-text": colorTokens.sidebarText,
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
        modal: "0 20px 60px -10px rgb(0 0 0 / 0.2)",
        sidebar: "2px 0 8px 0 rgb(0 0 0 / 0.08)",
      },
    },
  },
  plugins: [],
};
