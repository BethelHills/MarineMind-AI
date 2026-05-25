import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { Plus, Search, Wrench } from "lucide-react";
import { equipment, parameters } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/equipment")({
  head: () => ({ meta: [{ title: "Equipment — MarineMind AI" }, { name: "description", content: "All equipment, health scores, and parameters." }] }),
  component: EquipmentPage,
});

const tabs = ["Overview", "Maintenance", "History", "Documents"];

function EquipmentPage() {
  const [selectedId, setSelectedId] = useState(equipment[0].id);
  const [tab, setTab] = useState("Overview");
  const selected = equipment.find((e) => e.id === selectedId)!;

  return (
    <AppShell
      title="Equipment"
      headerRight={
        <button className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
          <Plus className="size-4" /> Add Equipment
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="relative mb-3">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search equipment..." className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <ul className="space-y-1">
            {equipment.map((e) => (
              <li key={e.id}>
                <button
                  onClick={() => setSelectedId(e.id)}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition ${
                    selectedId === e.id ? "bg-accent" : "hover:bg-muted"
                  }`}
                >
                  <span className="size-9 rounded-lg bg-muted grid place-items-center text-muted-foreground">
                    <Wrench className="size-4" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-foreground truncate">{e.name}</span>
                    <span className="block text-xs text-muted-foreground">{e.code}</span>
                  </span>
                  <StatusBadge status={e.status} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{selected.name} ({selected.code})</h2>
              <p className="text-xs text-muted-foreground mt-1">Last updated: Today, 08:45 AM</p>
            </div>
            <StatusBadge status={selected.status} />
          </div>

          <div className="flex gap-6 mt-5 border-b border-border">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`pb-3 text-sm transition border-b-2 -mb-px ${
                  tab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <Info label="Operating Hours" value={`${selected.operatingHours.toLocaleString()} hrs`} />
            <Info label="Last Maintenance" value={selected.lastMaintenance} />
            <Info label="Next Maintenance" value={selected.nextMaintenance} />
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-xs text-muted-foreground">Health Score</div>
              <div className="text-2xl font-semibold text-success-foreground mt-1">{selected.healthScore}%</div>
              <div className="mt-2 h-2 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-success" style={{ width: `${selected.healthScore}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-foreground mb-3">Parameters</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-4 py-3">Parameter</th>
                    <th className="text-left px-4 py-3">Value</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((p, i) => (
                    <tr key={p.name} className={i !== parameters.length - 1 ? "border-b border-border" : ""}>
                      <td className="px-4 py-3 text-foreground">{p.name}</td>
                      <td className="px-4 py-3 text-foreground">{p.value}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/50 rounded-xl p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold text-foreground mt-1">{value}</div>
    </div>
  );
}
