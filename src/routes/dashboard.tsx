import { createFileRoute } from "@tanstack/react-router";
import { AppShell, DueBadge } from "@/components/AppShell";
import { Wrench, AlertTriangle, CalendarClock, TrendingUp, Bot, ChevronRight } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { equipment, upcomingMaintenance, healthTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MarineMind AI" }, { name: "description", content: "Fleet health overview, alerts, and upcoming maintenance." }] }),
  component: Dashboard,
});

function Stat({ icon: Icon, label, value, sub, tone = "primary" }: any) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    critical: "bg-critical/10 text-critical",
    warning: "bg-warning/20 text-warning-foreground",
    success: "bg-success/15 text-success-foreground",
  };
  return (
    <div className="bg-card rounded-2xl p-5 border border-border">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="text-3xl font-semibold mt-2 text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground mt-1">{sub}</div>
        </div>
        <div className={`size-10 rounded-xl grid place-items-center ${tones[tone]}`}>
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const healthCounts = {
    Healthy: equipment.filter((e) => e.status === "Healthy").length,
    Warning: equipment.filter((e) => e.status === "Warning").length,
    Critical: equipment.filter((e) => e.status === "Critical").length,
  };
  const total = equipment.length;
  const pieData = [
    { name: "Healthy", value: healthCounts.Healthy, color: "oklch(0.72 0.18 155)" },
    { name: "Warning", value: healthCounts.Warning, color: "oklch(0.82 0.16 75)" },
    { name: "Critical", value: healthCounts.Critical, color: "oklch(0.65 0.22 25)" },
  ];

  return (
    <AppShell title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Stat icon={Wrench} label="Total Equipment" value={total} sub="+4 this month" tone="primary" />
        <Stat icon={AlertTriangle} label="Active Alerts" value={5} sub="View alerts" tone="critical" />
        <Stat icon={CalendarClock} label="Maintenance Due" value={7} sub="Next 7 days" tone="warning" />
        <Stat icon={TrendingUp} label="Equipment Healthy" value="82%" sub="+6% this month" tone="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold mb-4 text-foreground">Equipment Health Overview</h3>
          <div className="flex items-center gap-6">
            <div className="relative size-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={88} paddingAngle={2}>
                    {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-foreground">{total}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>
            </div>
            <ul className="space-y-3 text-sm flex-1">
              {pieData.map((d) => (
                <li key={d.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-foreground">{d.name}</span>
                  </span>
                  <span className="text-muted-foreground">{d.value} ({Math.round(d.value / total * 100)}%)</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold mb-4 text-foreground">Upcoming Maintenance</h3>
          <ul className="space-y-3">
            {upcomingMaintenance.map((u) => (
              <li key={u.equipment} className="flex items-center justify-between py-2">
                <span className="flex items-center gap-3 text-sm">
                  <span className="size-8 rounded-lg bg-muted grid place-items-center text-muted-foreground">
                    <Wrench className="size-4" />
                  </span>
                  <span className="text-foreground">{u.equipment}</span>
                </span>
                <DueBadge text={u.due} />
              </li>
            ))}
          </ul>
          <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
            View all maintenance <ChevronRight className="size-4" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold mb-4 text-foreground">Health Trend (Last 7 Days)</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 255)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.52 0.02 260)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.52 0.02 260)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} ticks={[0,25,50,75,100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="oklch(0.55 0.22 275)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border flex flex-col">
          <h3 className="font-semibold mb-3 text-foreground">AI Insights</h3>
          <p className="text-sm text-muted-foreground flex-1">
            Main Engine (ME-01) shows increasing exhaust temperature. Consider inspection.
          </p>
          <div className="flex items-end justify-between mt-4">
            <a href="#" className="text-sm text-primary font-medium inline-flex items-center gap-1">
              View details <ChevronRight className="size-4" />
            </a>
            <div className="size-12 rounded-full bg-primary/10 grid place-items-center text-primary">
              <Bot className="size-6" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
