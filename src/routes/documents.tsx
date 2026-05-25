import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — MarineMind AI" }] }),
  component: () => (
    <AppShell title="Documents">
      <div className="bg-card rounded-2xl border border-border p-10 text-center text-muted-foreground">
        Document library coming soon.
      </div>
    </AppShell>
  ),
});
