import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { HoverCard, HoverPressable, HoverTab, HoverTableRow } from "@/components/motion";
import { Plus } from "lucide-react";
import { maintenanceLog } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance — MarineMind AI" }, { name: "description", content: "Scheduled and completed maintenance activities." }] }),
  component: MaintenancePage,
});

const tabs = ["All", "Scheduled", "Completed", "Overdue"];

function MaintenancePage() {
  const [tab, setTab] = useState("Completed");
  return (
    <AppShell title="Maintenance">
      <HoverCard lift={false} className="bg-card rounded-2xl border border-border">
        <div className="flex items-center justify-between px-6 pt-5">
          <div className="flex gap-6">
            {tabs.map((t) => (
              <HoverTab
                key={t}
                active={tab === t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm border-b-2 -mb-px transition ${
                  tab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"
                }`}
              >
                {t}
              </HoverTab>
            ))}
          </div>
          <HoverPressable>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
              <Plus className="size-4" /> Add Maintenance
            </button>
          </HoverPressable>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground text-xs uppercase tracking-wide border-b border-border">
              <tr>
                {["Equipment", "Type", "Description", "Date", "Status", "Technician"].map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {maintenanceLog.map((m) => (
                <HoverTableRow key={m.equipment + m.date} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium text-foreground">{m.equipment}</td>
                  <td className="px-6 py-4 text-muted-foreground">{m.type}</td>
                  <td className="px-6 py-4 text-muted-foreground">{m.description}</td>
                  <td className="px-6 py-4 text-muted-foreground">{m.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={m.status} /></td>
                  <td className="px-6 py-4 text-muted-foreground">{m.technician}</td>
                </HoverTableRow>
              ))}
            </tbody>
          </table>
        </div>
      </HoverCard>
    </AppShell>
  );
}
