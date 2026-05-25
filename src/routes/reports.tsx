import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { ChevronDown, Calendar } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";
import { maintenanceSummary, healthScoreTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — MarineMind AI" }, { name: "description", content: "Maintenance and equipment health reports." }] }),
  component: Reports,
});

const typeData = [
  { name: "Preventive", value: 12, color: "oklch(0.55 0.22 275)" },
  { name: "Corrective", value: 5, color: "oklch(0.82 0.16 75)" },
  { name: "Predictive", value: 1, color: "oklch(0.72 0.18 155)" },
];

const topAlerts = [
  { name: "Fresh Water Generator (FWG-01)", status: "Critical" },
  { name: "Auxiliary Generator (GEN-02)", status: "Warning" },
  { name: "Cooling Pump (CP-02)", status: "Warning" },
];

function Reports() {
  return (
    <AppShell
      title="Reports"
      headerRight={
        <button className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
          Generate Report
        </button>
      }
    >
      <div className="flex flex-wrap gap-3 mb-6">
        <Select label="All Reports" />
        <DateField value="May 1, 2025" />
        <DateField value="May 24, 2025" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground">Maintenance Summary</h3>
          <p className="text-sm text-muted-foreground mt-1">Total Maintenance</p>
          <div className="flex items-end justify-between mt-3">
            <div className="text-4xl font-semibold text-foreground">18</div>
            <div className="text-sm space-x-3">
              <span className="text-success-foreground">Completed 15</span>
              <span className="text-critical">Overdue 3</span>
            </div>
          </div>
          <div className="h-40 mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceSummary}>
                <XAxis dataKey="day" stroke="oklch(0.52 0.02 260)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: "oklch(0.95 0.02 275)" }} />
                <Bar dataKey="value" fill="oklch(0.55 0.22 275)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground">Equipment Health</h3>
          <p className="text-sm text-muted-foreground mt-1">Average Health Score</p>
          <div className="flex items-end justify-between mt-3">
            <div className="text-4xl font-semibold text-foreground">82%</div>
            <div className="text-sm text-success-foreground">+6% from last period</div>
          </div>
          <div className="h-40 mt-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthScoreTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 255)" vertical={false} />
                <XAxis dataKey="m" stroke="oklch(0.52 0.02 260)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="oklch(0.72 0.18 155)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Top Equipment Alerts</h3>
          <ol className="space-y-3">
            {topAlerts.map((a, i) => (
              <li key={a.name} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{i + 1}. {a.name}</span>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Maintenance by Type</h3>
          <div className="flex items-center gap-6">
            <div className="relative size-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={typeData} dataKey="value" innerRadius={50} outerRadius={72} paddingAngle={2}>
                    {typeData.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-foreground">18</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>
            </div>
            <ul className="flex-1 space-y-2 text-sm">
              {typeData.map((d) => (
                <li key={d.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-foreground">{d.name}</span>
                  </span>
                  <span className="text-muted-foreground">{d.value} ({Math.round(d.value / 18 * 100)}%)</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Select({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-foreground">
      {label} <ChevronDown className="size-4 text-muted-foreground" />
    </button>
  );
}

function DateField({ value }: { value: string }) {
  return (
    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-foreground">
      <Calendar className="size-4 text-muted-foreground" /> {value}
    </button>
  );
}
