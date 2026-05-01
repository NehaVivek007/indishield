import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      {/* Main content area — offset by sidebar width on desktop, padded at bottom so content never hides behind fixed footer */}
      <main
        className={[
          "flex-1 flex flex-col overflow-y-auto bg-background pb-14",
          isMobile ? "w-full" : "ml-64",
        ].join(" ")}
      >
        <div className="flex-1 min-h-full">{children}</div>
      </main>

      {/* Fixed footer — always visible at the bottom of the viewport, offset by sidebar on desktop */}
      <footer
        className={[
          "fixed bottom-0 right-0 z-50 bg-card border-t border-border px-6 py-3",
          isMobile ? "left-0" : "left-64",
        ].join(" ")}
      >
        <p className="text-muted-foreground text-xs text-center">
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>{" "}
          &copy; {new Date().getFullYear()}
          <span className="mx-2 opacity-40">|</span>
          IndiShield provides legal awareness only — not formal legal advice.
        </p>
      </footer>
    </div>
  );
}
