import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AlertsPageContent } from "@/components/alerts-page";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — MarineMind AI" },
      {
        name: "description",
        content: "Monitor vessel alerts before they become failures.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  return (
    <AppShell title="Alerts">
      <AlertsPageContent />
    </AppShell>
  );
}
