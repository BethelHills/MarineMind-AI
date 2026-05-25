import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Filter } from "lucide-react";

type Severity = "Critical" | "Warning" | "Info";

const alerts: {
  id: string;
  severity: Severity;
  equipment: string;
  message: string;
  time: string;
  acknowledged: boolean;
}[] = [
  { id: "A-1042", severity: "Critical", equipment: "Fresh Water Generator (FWG-01)", message: "Salinity above threshold (12 ppm). Immediate inspection required.", time: "8 min ago", acknowledged: false },
  { id: "A-1041", severity: "Warning", equipment: "Cooling Pump (CP-02)", message: "Vibration trending upward over last 6 hours.", time: "42 min ago", acknowledged: false },
  { id: "A-1040", severity: "Warning", equipment: "Auxiliary Generator (GEN-02)", message: "Exhaust temperature 12% above baseline.", time: "1 h ago", acknowledged: false },
  { id: "A-1039", severity: "Info", equipment: "Main Engine (ME-01)", message: "Scheduled maintenance window opens in 48 hours.", time: "3 h ago", acknowledged: true },
  { id: "A-1038", severity: "Warning", equipment: "Fuel Purifier (FP-01)", message: "Differential pressure approaching alarm limit.", time: "5 h ago", acknowledged: true },
  { id: "A-1037", severity: "Info", equipment: "Air Compressor (AC-01)", message: "Auto-drain cycle completed successfully.", time: "Yesterday", acknowledged: true },
  { id: "A-1036", severity: "Critical", equipment: "Steering System (SS-01)", message: "Hydraulic pressure dropout detected. Resolved by redundant unit.", time: "Yesterday", acknowledged: true },
];

const sevIcon = {
  Critical: AlertCircle,
  Warning: AlertTriangle,
  Info: Info,
};

const sevStyles: Record<Severity, string> = {
  Critical: "bg-critical/10 text-critical border-critical/30",
  Warning: "bg-warning/15 text-warning-foreground border-warning/30",
  Info: "bg-primary/10 text-primary border-primary/30",
};

function AlertsPage() {
  const counts = {
    Critical: alerts.filter((a) => a.severity === "Critical" && !a.acknowledged).length,
    Warning: alerts.filter((a) => a.severity === "Warning" && !a.acknowledged).length,
    Info: alerts.filter((a) => a.severity === "Info" && !a.acknowledged).length,
    Resolved: alerts.filter((a) => a.acknowledged).length,
  };

  return (
    <AppShell title="Alerts">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {([
          { label: "Critical", value: counts.Critical, color: "text-critical", icon: AlertCircle },
          { label: "Warnings", value: counts.Warning, color: "text-warning-foreground", icon: AlertTriangle },
          { label: "Informational", value: counts.Info, color: "text-primary", icon: Info },
          { label: "Resolved (24h)", value: counts.Resolved, color: "text-success-foreground", icon: CheckCircle2 },
        ]).map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <Icon className={`size-5 ${s.color}`} />
              </div>
              <div className="mt-3 text-3xl font-semibold text-foreground">{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Active & Recent Alerts</h2>
          <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Filter className="size-4" /> Filter
          </button>
        </div>
        <ul className="divide-y divide-border">
          {alerts.map((a) => {
            const Icon = sevIcon[a.severity];
            return (
              <li key={a.id} className="flex items-start gap-4 px-6 py-4">
                <div className={`mt-0.5 size-9 rounded-lg border grid place-items-center ${sevStyles[a.severity]}`}>
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-foreground">{a.equipment}</span>
                    <span className="text-xs text-muted-foreground">#{a.id}</span>
                    {a.acknowledged && <StatusBadge status="Completed" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{a.message}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
                  {!a.acknowledged && (
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
                      Acknowledge
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </AppShell>
  );
}

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts — MarineMind AI" }] }),
  component: AlertsPage,
});
