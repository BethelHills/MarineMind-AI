import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Gauge,
  Wrench,
  Bot,
  BellRing,
  BarChart3,
  FolderOpen,
  Settings,
  ShipWheel,
  ChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { HoverPressable } from "@/components/motion";
import { Logo } from "@/components/Logo";
import { spring } from "@/lib/motion";
import { statusStyle } from "@/lib/status-style";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { name: "Equipment", icon: Gauge, to: "/equipment" },
  { name: "Maintenance", icon: Wrench, to: "/maintenance" },
  { name: "AI Assistant", icon: Bot, to: "/ai-assistant" },
  { name: "Alerts", icon: BellRing, to: "/alerts" },
  { name: "Reports", icon: BarChart3, to: "/reports" },
  { name: "Documents", icon: FolderOpen, to: "/documents" },
  { name: "Settings", icon: Settings, to: "/settings" },
];

export function AppShell({
  title,
  children,
  headerRight,
}: {
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string) =>
    path === to || (to !== "/dashboard" && path.startsWith(to));

  return (
    <div className="min-h-screen bg-[#f5fbff] text-slate-900">
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`${mobileOpen ? "fixed inset-y-0 left-0 z-50 w-72" : "hidden"} border-r border-white/10 bg-[#03131f] p-5 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:w-72`}
      >
        <div className="flex items-center justify-between">
          <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
            <Logo size="lg" />
            <div>
              <h1 className="text-lg font-black tracking-tight">MarineMind AI</h1>
              <p className="text-xs text-slate-400">Maintenance Command</p>
            </div>
          </Link>
          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <motion.div
                key={item.to}
                whileHover={{ x: active ? 0 : 4, scale: active ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={spring}
              >
                <Link
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                    active
                      ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <motion.span whileHover={{ rotate: -8, scale: 1.1 }} transition={spring}>
                      <Icon className="h-5 w-5" />
                    </motion.span>
                    {item.name}
                  </span>
                  {active && (
                    <motion.span initial={{ x: -4, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                      <ChevronRight className="h-4 w-4" />
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          className="absolute bottom-5 left-5 right-5 rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-5"
          whileHover={{ scale: 1.02, borderColor: "rgba(103, 232, 249, 0.45)" }}
          transition={spring}
        >
          <motion.div
            className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-white/10"
            whileHover={{ rotate: 12 }}
            transition={spring}
          >
            <ShipWheel className="h-6 w-6 text-cyan-300" />
          </motion.div>
          <p className="font-bold">Vessel Alpha</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Health score stable. 3 tasks need attention.
          </p>
        </motion.div>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[#f5fbff]/85 px-4 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HoverPressable>
                <button
                  className="rounded-xl border bg-white p-2 lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </HoverPressable>
              <div>
                <p className="text-sm text-slate-500">MarineMind AI</p>
                <h2 className="text-2xl font-black text-slate-950">{title}</h2>
              </div>
            </div>

            <motion.div
              className="hidden max-w-md flex-1 items-center gap-2 rounded-2xl border bg-white px-4 py-3 md:flex"
              whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(14, 165, 233, 0.08)" }}
              transition={spring}
            >
              <Search className="h-5 w-5 text-slate-400" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Search equipment, reports, alerts..."
              />
            </motion.div>

            <div className="flex items-center gap-3">
              {headerRight}
              <HoverPressable>
                <button className="rounded-2xl border bg-white p-3">
                  <BellRing className="h-5 w-5 text-slate-700" />
                </button>
              </HoverPressable>
              <motion.div
                className="hidden rounded-2xl bg-[#03131f] px-4 py-3 text-white sm:block"
                whileHover={{ scale: 1.03 }}
                transition={spring}
              >
                <p className="text-xs text-slate-400">Engineer</p>
                <p className="text-sm font-bold">Bethel Hillary</p>
              </motion.div>
            </div>
          </div>
        </header>

        <motion.div
          key={path}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-4 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <motion.span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(status)}`}
      whileHover={{ scale: 1.08 }}
      transition={spring}
    >
      {status}
    </motion.span>
  );
}

export function DueBadge({ text }: { text: string }) {
  return (
    <motion.span
      className="inline-flex items-center rounded-full border border-amber-200 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700"
      whileHover={{ scale: 1.08 }}
      transition={spring}
    >
      {text}
    </motion.span>
  );
}
