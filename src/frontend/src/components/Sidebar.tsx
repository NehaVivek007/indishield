import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  Clock,
  House,
  LogIn,
  LogOut,
  Menu,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface NavLinkItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  requiresAuth: boolean;
}

const navLinks: NavLinkItem[] = [
  {
    label: "Main Page",
    to: "/",
    icon: <House size={18} />,
    requiresAuth: false,
  },
  {
    label: "New Assessment",
    to: "/assessment",
    icon: <ClipboardList size={18} />,
    requiresAuth: true,
  },
  {
    label: "History",
    to: "/history",
    icon: <Clock size={18} />,
    requiresAuth: true,
  },
  {
    label: "Resources",
    to: "/resources",
    icon: <BookOpen size={18} />,
    requiresAuth: false,
  },
];

interface SidebarContentProps {
  onNavClick?: () => void;
}

export function SidebarContent({ onNavClick }: SidebarContentProps) {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    principalAbbrev,
    login,
    logout,
  } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (requiresAuth: boolean) => {
    if (requiresAuth && !isAuthenticated) {
      login();
      return;
    }
    onNavClick?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Branding */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#c9a84c]/20 border border-[#c9a84c]/40">
            <Shield size={18} className="text-[#c9a84c]" />
          </div>
          <span className="text-white font-display font-semibold text-lg tracking-tight">
            IndiShield
          </span>
        </div>
        <p className="text-[#c9a84c] text-xs leading-snug pl-[42px] opacity-90">
          Know your claim's legal strength before submitting.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3" data-ocid="sidebar.nav">
        <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest px-2 mb-2">
          Navigation
        </p>
        {navLinks.map((item) => {
          const active = isActive(item.to);
          const locked = item.requiresAuth && !isAuthenticated;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => handleNavClick(item.requiresAuth)}
              data-ocid={`sidebar.nav.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-smooth group relative",
                active
                  ? "bg-white/10 text-[#c9a84c] font-medium border-l-2 border-[#c9a84c] pl-[10px]"
                  : "text-white/70 hover:bg-white/8 hover:text-white",
                locked ? "cursor-pointer" : "",
              ].join(" ")}
            >
              <span
                className={
                  active
                    ? "text-[#c9a84c]"
                    : "text-white/50 group-hover:text-white/80"
                }
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
              {locked && (
                <span className="ml-auto">
                  <LogIn size={12} className="text-white/30" />
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Auth section */}
      <div className="px-3 py-4 border-t border-white/10">
        {isAuthenticated ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
              <div className="w-6 h-6 rounded-full bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#c9a84c] text-[10px] font-bold">ID</span>
              </div>
              <span className="text-white/60 text-xs font-mono truncate">
                {principalAbbrev}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              data-ocid="sidebar.logout_button"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/8 transition-smooth"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={login}
            disabled={isInitializing || isLoggingIn}
            data-ocid="sidebar.login_button"
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium bg-[#c9a84c] text-[#1a2744] hover:bg-[#d4b060] transition-smooth disabled:opacity-50"
          >
            <LogIn size={16} />
            <span>
              {isInitializing
                ? "Loading…"
                : isLoggingIn
                  ? "Signing In…"
                  : "Sign In with Internet Identity"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          data-ocid="sidebar.mobile_menu_button"
          className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a2744] text-white shadow-lg"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        {/* Mobile drawer backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Close navigation"
          />
        )}

        {/* Mobile drawer */}
        <aside
          className={[
            "fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300 ease-in-out",
            "bg-[#1a2744]",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
          aria-label="Sidebar navigation"
        >
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            data-ocid="sidebar.mobile_close_button"
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
          <SidebarContent onNavClick={() => setMobileOpen(false)} />
        </aside>
      </>
    );
  }

  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 bg-[#1a2744] flex flex-col z-30 shadow-xl"
      aria-label="Sidebar navigation"
    >
      <SidebarContent />
    </aside>
  );
}
