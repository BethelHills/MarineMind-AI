import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MarineCard, PageShell } from "@/components/marine-ui";
import { motion } from "framer-motion";
import { alertCards } from "@/lib/marine-dashboard-data";
import { statusStyle } from "@/lib/status-style";
import { spring } from "@/lib/motion";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts — MarineMind AI" }] }),
  component: AlertsPage,
});

function AlertsPage() {
  return (
    <AppShell title="Alerts">
      <PageShell
        title="Alerts Center"
        subtitle="View critical warnings, maintenance alerts, and system notifications."
        button="Resolve Alerts"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {alertCards.map((alert) => (
            <MarineCard key={alert.title}>
              <div className="flex items-start justify-between p-0">
                <div>
                  <p className="font-bold text-slate-950">{alert.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{alert.time}</p>
                </div>
                <motion.span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(alert.level)}`}
                  whileHover={{ scale: 1.1 }}
                  transition={spring}
                >
                  {alert.level}
                </motion.span>
              </div>
            </MarineCard>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}
