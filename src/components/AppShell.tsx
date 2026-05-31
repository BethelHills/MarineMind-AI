import { useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import AppLayout from "@/components/AppLayout";
import { spring } from "@/lib/motion";
import { statusStyle } from "@/lib/status-style";

export function AppShell({
  children,
  title: _title,
  headerRight: _headerRight,
}: {
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
}) {
  const navigate = useNavigate();
  const activePath = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AppLayout activePath={activePath} onNavigate={(path) => navigate({ to: path })}>
      {children}
    </AppLayout>
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
