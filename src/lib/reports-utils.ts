export function reportStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Open: "bg-amber-500/15 text-amber-700 border-amber-200",
    Completed: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
    Archived: "bg-slate-500/10 text-slate-700 border-slate-200",
  };
  return styles[status] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function reportRiskStyle(risk: string) {
  if (risk === "High" || risk === "Medium-High") {
    return "bg-red-500/15 text-red-700 border-red-200";
  }
  if (risk === "Medium") {
    return "bg-amber-500/15 text-amber-700 border-amber-200";
  }
  return "bg-emerald-500/15 text-emerald-700 border-emerald-200";
}

export function reportHealthBarColor(value: number) {
  if (value >= 80) return "bg-emerald-500";
  if (value >= 60) return "bg-cyan-500";
  return "bg-amber-500";
}
