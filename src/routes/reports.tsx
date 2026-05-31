import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ReportsPageContent } from "@/components/reports-page";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — MarineMind AI" },
      {
        name: "description",
        content: "Generate, analyze, and export vessel maintenance reports.",
      },
    ],
  }),
  component: ReportsPage,
  ssr: false,
});

function ReportsPage() {
  return (
    <AppShell title="Reports">
      <ReportsPageContent />
    </AppShell>
  );
}
