import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { EquipmentPageContent } from "@/components/equipment-page";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment — MarineMind AI" },
      {
        name: "description",
        content: "Track vessel equipment health, maintenance status, and AI fault notes.",
      },
    ],
  }),
  component: EquipmentPage,
});

function EquipmentPage() {
  return (
    <AppShell title="Equipment">
      <EquipmentPageContent />
    </AppShell>
  );
}
