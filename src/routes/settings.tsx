import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MarineMind AI" }] }),
  component: () => (
    <AppShell title="Settings">
      <div className="bg-card rounded-2xl border border-border p-10 text-center text-muted-foreground">
        Settings coming soon.
      </div>
    </AppShell>
  ),
});
