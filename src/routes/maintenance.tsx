import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { DataTable, HoverTableRow, PageShell } from "@/components/marine-ui";
import { motion } from "framer-motion";
import { maintenanceRows } from "@/lib/marine-dashboard-data";
import { statusStyle } from "@/lib/status-style";
import { spring } from "@/lib/motion";

export const Route = createFileRoute("/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance — MarineMind AI" },
      { name: "description", content: "Scheduled and completed maintenance activities." },
    ],
  }),
  component: MaintenancePage,
});

function MaintenancePage() {
  return (
    <AppShell title="Maintenance">
      <PageShell
        title="Maintenance Tasks"
        subtitle="Schedule, monitor, and complete all maintenance operations."
        button="Create Task"
      >
        <DataTable headers={["Equipment", "Type", "Technician", "Date", "Status"]}>
          {maintenanceRows.map((item) => (
            <HoverTableRow key={`${item.equipment}-${item.type}`}>
              <td className="px-4 py-4 font-bold text-slate-950">{item.equipment}</td>
              <td className="px-4 py-4 text-slate-600">{item.type}</td>
              <td className="px-4 py-4 text-slate-600">{item.technician}</td>
              <td className="px-4 py-4 text-slate-600">{item.date}</td>
              <td className="px-4 py-4">
                <motion.span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(item.status)}`}
                  whileHover={{ scale: 1.1 }}
                  transition={spring}
                >
                  {item.status}
                </motion.span>
              </td>
            </HoverTableRow>
          ))}
        </DataTable>
      </PageShell>
    </AppShell>
  );
}
