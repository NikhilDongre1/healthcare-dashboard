import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Check,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/constants/routes";
import { WelcomeNotification } from "@/features/notifications/WelcomNotification";
import { useNotification } from "@/hooks/useNotification";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: ROUTES.DASHBOARD },
  { label: "Analytics", icon: BarChart2, path: ROUTES.ANALYTICS },
  { label: "Patients", icon: Users, path: ROUTES.PATIENTS },
];

const pageTitles: Record<string, string> = {
  [ROUTES.DASHBOARD]: "Dashboard",
  [ROUTES.ANALYTICS]: "Analytics",
  [ROUTES.PATIENTS]: "Patients",
};

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const notifications = useUIStore((s) => s.notifications);
  const markAllRead = useUIStore((s) => s.markAllRead);
  const markOneRead = useUIStore((s) => s.markOneRead);

  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { permission, requestPermission } = useNotification();
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const pageTitle =
    Object.entries(pageTitles).find(([path]) =>
      location.pathname.startsWith(path),
    )?.[1] ?? "HealthCore";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const userInitials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : (user?.email?.slice(0, 2).toUpperCase() ?? "U");

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-white/10
          ${sidebarCollapsed ? "justify-center" : ""}`}
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-xs">HC</span>
        </div>
        {!sidebarCollapsed && (
          <span className="text-white font-semibold text-sm">HealthCore</span>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-default group relative",
                sidebarCollapsed ? "justify-center" : "",
                isActive
                  ? "bg-white/15 text-white"
                  : "text-sidebar-text hover:bg-white/10 hover:text-white",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
                )}
                <Icon size={18} className="shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{label}</span>
                )}
                {sidebarCollapsed && (
                  <div
                    className="
                    absolute left-full ml-3 px-2 py-1
                    bg-text-primary text-white text-xs rounded
                    opacity-0 group-hover:opacity-100
                    pointer-events-none transition-default whitespace-nowrap z-50
                  "
                  >
                    {label}
                    <ChevronRight size={10} className="inline ml-1" />
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-2 py-4 border-t border-white/10 flex flex-col gap-1">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <Avatar initials={userInitials} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">
                {user?.displayName ?? "Admin"}
              </p>
              <p className="text-sidebar-text text-xs truncate">
                {user?.email}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-sidebar-text hover:bg-white/10 hover:text-white
            transition-default w-full
            ${sidebarCollapsed ? "justify-center" : ""}
          `}
        >
          <LogOut size={18} className="shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <aside
        className={`
          hidden lg:flex flex-col shrink-0
          bg-sidebar shadow-sidebar
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "w-16" : "w-56"}
        `}
      >
        {SidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-56 bg-sidebar flex flex-col z-50">
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {permission === "default" && (
          <div
            className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2
                  bg-primary-light border-b border-blue-200 text-xs"
          >
            <div className="flex items-center gap-2 text-primary">
              <Bell size={13} className="shrink-0" />
              <span>
                Enable notifications to get appointment reminders and alerts.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={requestPermission}
                className="font-semibold text-primary hover:text-primary-dark transition-default"
              >
                Enable
              </button>
            </div>
          </div>
        )}

        <header className="h-16 bg-surface border-b border-border flex items-center px-4 lg:px-6 gap-4 shrink-0">
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden text-text-secondary hover:text-text-primary transition-default"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            onClick={toggleSidebar}
            className="hidden lg:flex text-text-secondary hover:text-text-primary transition-default"
            aria-label="Collapse sidebar"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-base font-semibold text-text-primary flex-1">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-2">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((p) => !p)}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg
                  text-text-secondary hover:text-text-primary hover:bg-bg
                  transition-default"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
                )}
              </button>
              {notifOpen && (
                <div
                  className="
                  absolute right-0 top-full mt-2 w-80
                  bg-surface border border-border rounded-xl shadow-modal
                  z-50 overflow-hidden
                "
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <span className="text-sm font-semibold text-text-primary">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-primary hover:text-primary-dark
                          font-medium transition-default flex items-center gap-1"
                      >
                        <Check size={12} />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-border">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <Bell
                          size={24}
                          className="text-text-muted mx-auto mb-2"
                        />
                        <p className="text-sm text-text-muted">
                          No notifications yet
                        </p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markOneRead(n.id)}
                          className={`
                            px-4 py-3 cursor-pointer hover:bg-bg transition-default
                            ${n.read ? "" : "bg-primary-light/30"}
                          `}
                        >
                          <div className="flex items-start gap-2">
                            {!n.read && (
                              <span className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-text-primary">
                                {n.title}
                              </p>
                              <p className="text-xs text-text-secondary mt-0.5">
                                {n.message}
                              </p>
                              <p className="text-xs text-text-muted mt-1">
                                {n.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="px-4 py-2.5 border-t border-border">
                      <Badge color="info" size="sm">
                        {unreadCount} unread
                      </Badge>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5 pl-2 border-l border-border">
              <Avatar initials={userInitials} size="sm" />
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-text-primary leading-tight">
                  {user?.displayName ?? "Admin"}
                </p>
                <p className="text-xs text-text-muted leading-tight">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
      <WelcomeNotification />
    </div>
  );
};
