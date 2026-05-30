import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { DataTable, HoverTableRow, PageShell } from "@/components/marine-ui";
import { motion } from "framer-motion";
import { equipmentRows } from "@/lib/marine-dashboard-data";
import { statusStyle } from "@/lib/status-style";
import { spring } from "@/lib/motion";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment — MarineMind AI" },
      { name: "description", content: "All equipment, health scores, status, and maintenance history." },
    ],
  }),
  component: EquipmentPage,
});

function EquipmentPage() {
  return (
    <AppShell title="Equipment">
      <PageShell
        title="Equipment Management"
        subtitle="Track all vessel equipment, health score, status, and maintenance history."
        button="Add Equipment"
      >
        <DataTable headers={["Equipment", "Type", "Location", "Status", "Health", "Last Maintenance"]}>
          {equipmentRows.map((item) => (
            <HoverTableRow key={item.name}>
              <td className="px-4 py-4 font-bold text-slate-950">{item.name}</td>
              <td className="px-4 py-4 text-slate-600">{item.type}</td>
              <td className="px-4 py-4 text-slate-600">{item.location}</td>
              <td className="px-4 py-4">
                <motion.span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(item.status)}`}
                  whileHover={{ scale: 1.1 }}
                  transition={spring}
                >
                  {item.status}
                </motion.span>
              </td>
              <td className="px-4 py-4">
                <div className="h-2 w-24 rounded-full bg-slate-200">
                  <motion.div
                    className="h-2 rounded-full bg-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.health}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs text-slate-500">{item.health}%</span>
              </td>
              <td className="px-4 py-4 text-slate-600">{item.last}</td>
            </HoverTableRow>
          ))}
        </DataTable>
      </PageShell>
    </AppShell>
  );
}
