import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { DocumentsPageContent } from "@/components/documents-page";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — MarineMind AI" },
      {
        name: "description",
        content: "Store vessel documents, reports, manuals, and certificates.",
      },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <AppShell title="Documents">
      <DocumentsPageContent />
    </AppShell>
  );
}
