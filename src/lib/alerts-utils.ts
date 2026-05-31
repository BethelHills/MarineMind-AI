import { AlertTriangle, BellRing, Siren, type LucideIcon } from "lucide-react";

export function alertSeverityStyle(severity: string) {
  const styles: Record<string, string> = {
    Critical: "bg-red-500/15 text-red-700 border-red-200",
    Warning: "bg-amber-500/15 text-amber-700 border-amber-200",
    Info: "bg-sky-500/15 text-sky-700 border-sky-200",
  };
  return styles[severity] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function alertStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Open: "bg-red-500/15 text-red-700 border-red-200",
    Resolved: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
    Muted: "bg-slate-500/10 text-slate-700 border-slate-200",
  };
  return styles[status] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function alertSeverityIcon(severity: string): LucideIcon {
  if (severity === "Critical") return Siren;
  if (severity === "Warning") return AlertTriangle;
  return BellRing;
}

export function alertSeverityBadgeClass(severity: string) {
  if (severity === "Critical") return "bg-red-500/10 text-red-700";
  if (severity === "Warning") return "bg-amber-500/10 text-amber-700";
  return "bg-sky-500/10 text-sky-700";
}
