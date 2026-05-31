import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SettingsPageContent } from "@/components/settings-page";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — MarineMind AI" },
      {
        name: "description",
        content: "Control your workspace, AI behavior, and vessel preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell title="Settings">
      <SettingsPageContent />
    </AppShell>
  );
}
