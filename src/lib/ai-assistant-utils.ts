import { generateStructuredFallback } from "./agent-prompt";

export function historyStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Warning: "bg-amber-500/15 text-amber-700 border-amber-200",
    Critical: "bg-red-500/15 text-red-700 border-red-200",
    Resolved: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
  };
  return styles[status] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function generateAIResponse(prompt: string, equipment: string) {
  return generateStructuredFallback(prompt, equipment);
}
