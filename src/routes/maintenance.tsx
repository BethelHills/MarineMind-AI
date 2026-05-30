import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MaintenancePageContent } from "@/components/maintenance-page";

export const Route = createFileRoute("/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance — MarineMind AI" },
      {
        name: "description",
        content: "Plan, track, and complete vessel maintenance tasks.",
      },
    ],
  }),
  component: MaintenancePage,
});

function MaintenancePage() {
  return (
    <AppShell title="Maintenance">
      <MaintenancePageContent />
    </AppShell>
  );
}
