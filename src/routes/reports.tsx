import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MarineCard, PageShell } from "@/components/marine-ui";
import { HoverPressable } from "@/components/motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reportCards } from "@/lib/marine-dashboard-data";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — MarineMind AI" },
      { name: "description", content: "Maintenance and equipment health reports." },
    ],
  }),
  component: ReportsPage,
  ssr: false,
});

function ReportsPage() {
  return (
    <AppShell title="Reports">
      <PageShell
        title="Reports"
        subtitle="Generate summaries, analytics, and export maintenance data."
        button="Generate Report"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {reportCards.map((item) => (
            <MarineCard key={item}>
              <motion.span whileHover={{ scale: 1.12, rotate: -6 }} transition={spring}>
                <FileText className="mb-5 h-8 w-8 text-cyan-600" />
              </motion.span>
              <h3 className="text-lg font-black">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Export clean reports for your team and vessel records.
              </p>
              <HoverPressable className="mt-5 inline-block">
                <Button variant="outline" className="rounded-2xl">
                  Export PDF
                </Button>
              </HoverPressable>
            </MarineCard>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}
