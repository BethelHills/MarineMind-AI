import { useState, type ReactNode } from "react";
import {
  Anchor,
  BellRing,
  Bot,
  FileText,
  FolderOpen,
  Gauge,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/notification-bell";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Equipment", path: "/equipment", icon: Gauge },
  { name: "Maintenance", path: "/maintenance", icon: Wrench },
  { name: "AI Assistant", path: "/ai-assistant", icon: Bot },
  { name: "Alerts", path: "/alerts", icon: BellRing },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Documents", path: "/documents", icon: FolderOpen },
  { name: "Settings", path: "/settings", icon: Settings },
];

type AppLayoutProps = {
  children: ReactNode;
  activePath: string;
  onNavigate: (path: string) => void;
};

export default function AppLayout({
  children,
  activePath,
  onNavigate,
}: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNavigate(path: string) {
    onNavigate(path);
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f5fbff] text-slate-900">
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#03131f] p-5 text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-300/30">
              <Anchor className="h-7 w-7 text-cyan-300" />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">MarineMind AI</h1>
              <p className="text-xs text-slate-400">Maintenance Command</p>
            </div>
          </div>

          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePath === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active
                    ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-5">
          <p className="font-bold">Vessel Alpha</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Health score stable. 3 tasks need attention.
          </p>
        </div>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[#f5fbff]/90 px-4 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              className="rounded-xl border bg-white p-2 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden max-w-md flex-1 items-center gap-2 rounded-2xl border bg-white px-4 py-3 md:flex">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Search equipment, reports, alerts..."
              />
            </div>

            <div className="ml-auto flex items-center gap-3">
              <NotificationBell onNavigate={handleNavigate} />

              <Button className="rounded-2xl bg-[#03131f] text-white hover:bg-[#09243a]">
                Bethel
              </Button>
            </div>
          </div>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
}
