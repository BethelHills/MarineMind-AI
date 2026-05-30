import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { AIAssistantPageContent } from "@/components/ai-assistant-page";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — MarineMind AI" },
      {
        name: "description",
        content: "Diagnose marine equipment faults faster with AI guidance.",
      },
    ],
  }),
  component: AIAssistantPage,
});

function AIAssistantPage() {
  return (
    <AppShell title="AI Assistant">
      <AIAssistantPageContent />
    </AppShell>
  );
}
