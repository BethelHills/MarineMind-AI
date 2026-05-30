import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MarineCard, PageShell } from "@/components/marine-ui";
import { SlidersHorizontal } from "lucide-react";
import { settingsCards } from "@/lib/marine-dashboard-data";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MarineMind AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell title="Settings">
      <PageShell
        title="Settings"
        subtitle="Manage profile, company information, notifications, and AI preferences."
        button="Save Changes"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {settingsCards.map((item) => (
            <MarineCard key={item}>
              <motion.span whileHover={{ scale: 1.12, rotate: -6 }} transition={spring}>
                <SlidersHorizontal className="mb-5 h-7 w-7 text-cyan-600" />
              </motion.span>
              <h3 className="text-lg font-black">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Configure this section for your MarineMind AI workspace.
              </p>
            </MarineCard>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}
