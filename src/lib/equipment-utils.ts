export function equipmentStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Healthy: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
    Warning: "bg-amber-500/15 text-amber-700 border-amber-200",
    Critical: "bg-red-500/15 text-red-700 border-red-200",
    Due: "bg-sky-500/15 text-sky-700 border-sky-200",
  };
  return styles[status] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function healthBarColor(health: number) {
  if (health >= 80) return "bg-emerald-500";
  if (health >= 60) return "bg-amber-500";
  return "bg-red-500";
}
