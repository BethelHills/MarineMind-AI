import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts — MarineMind AI" }] }),
  component: () => (
    <AppShell title="Alerts">
      <div className="bg-card rounded-2xl border border-border p-10 text-center text-muted-foreground">
        Alerts feed coming soon.
      </div>
    </AppShell>
  ),
});
