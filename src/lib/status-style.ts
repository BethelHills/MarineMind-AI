export function statusStyle(status: string) {
  if (status === "Healthy" || status === "Completed")
    return "bg-emerald-500/15 text-emerald-700 border-emerald-200";
  if (status === "Critical" || status === "Overdue")
    return "bg-red-500/15 text-red-700 border-red-200";
  if (status === "Warning" || status === "Due" || status === "Scheduled")
    return "bg-amber-500/15 text-amber-700 border-amber-200";
  return "bg-sky-500/15 text-sky-700 border-sky-200";
}
