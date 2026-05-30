export function maintenanceStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Scheduled: "bg-sky-500/15 text-sky-700 border-sky-200",
    "In Progress": "bg-cyan-500/15 text-cyan-700 border-cyan-200",
    Completed: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
    Overdue: "bg-red-500/15 text-red-700 border-red-200",
  };
  return styles[status] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function maintenancePriorityStyle(priority: string) {
  const styles: Record<string, string> = {
    Low: "bg-slate-500/10 text-slate-700 border-slate-200",
    Medium: "bg-amber-500/15 text-amber-700 border-amber-200",
    High: "bg-orange-500/15 text-orange-700 border-orange-200",
    Critical: "bg-red-500/15 text-red-700 border-red-200",
  };
  return styles[priority] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}
