import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Wrench, CalendarCheck, Bot, Bell, FileBarChart,
  FileText, Settings, Moon, Search, Anchor,
} from "lucide-react";
import type { ReactNode } from "react";
import { PageEnter, HoverPressable, HoverIcon } from "@/components/motion";
import { spring } from "@/lib/motion";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/equipment", label: "Equipment", icon: Wrench },
  { to: "/maintenance", label: "Maintenance", icon: CalendarCheck },
  { to: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ title, children, headerRight }: { title: string; children: ReactNode; headerRight?: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col">
        <HoverPressable className="px-5 py-5 flex items-center gap-2">
          <HoverIcon>
            <div className="size-8 rounded-lg bg-sidebar-active/20 grid place-items-center text-sidebar-active">
              <Anchor className="size-5" />
            </div>
          </HoverIcon>
          <span className="font-semibold text-lg">MarineMind AI</span>
        </HoverPressable>
        <nav className="flex-1 px-3 py-2 space-y-1">
          {nav.map((item) => {
            const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
            const Icon = item.icon;
            return (
              <motion.div
                key={item.to}
                whileHover={{ x: active ? 0 : 4, scale: active ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={spring}
              >
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                    active
                      ? "bg-sidebar-active text-primary-foreground font-medium shadow-sm"
                      : "text-sidebar-muted hover:bg-white/5 hover:text-sidebar-foreground"
                  }`}
                >
                  <motion.span whileHover={{ rotate: active ? 0 : -8, scale: 1.1 }} transition={spring}>
                    <Icon className="size-4" />
                  </motion.span>
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <motion.button
          className="mx-3 mb-4 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-muted hover:bg-white/5"
          whileHover={{ x: 4, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={spring}
        >
          <Moon className="size-4" /> Dark Mode
        </motion.button>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="flex items-center gap-4 px-8 py-5 border-b border-border bg-card">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <div className="flex-1 max-w-md ml-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={spring}
            >
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search anything..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow hover:shadow-sm"
              />
            </motion.div>
          </div>
          <div className="flex items-center gap-4">
            {headerRight}
            <motion.button
              className="relative p-2 rounded-lg hover:bg-muted"
              whileHover={{ scale: 1.08, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
            >
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-critical" />
            </motion.button>
            <motion.div
              className="flex items-center gap-3 cursor-default"
              whileHover={{ scale: 1.02 }}
              transition={spring}
            >
              <motion.div
                className="size-9 rounded-full bg-gradient-to-br from-primary to-accent-foreground grid place-items-center text-primary-foreground text-sm font-semibold"
                whileHover={{ scale: 1.08 }}
                transition={spring}
              >
                SO
              </motion.div>
              <div className="text-sm leading-tight">
                <div className="font-medium text-foreground">Samson O.</div>
                <div className="text-muted-foreground text-xs">Chief Engineer</div>
              </div>
            </motion.div>
          </div>
        </header>
        <div className="p-8">
          <PageEnter>{children}</PageEnter>
        </div>
      </main>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Healthy: "bg-success/15 text-success-foreground",
    Warning: "bg-warning/20 text-warning-foreground",
    Critical: "bg-critical/15 text-critical",
    Completed: "bg-success/15 text-success-foreground",
    Normal: "bg-success/15 text-success-foreground",
  };
  return (
    <motion.span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}
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
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning-foreground"
      whileHover={{ scale: 1.08 }}
      transition={spring}
    >
      {text}
    </motion.span>
  );
}
