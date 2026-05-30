import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MarineCard, PageShell } from "@/components/marine-ui";
import { HoverCard } from "@/components/motion";
import { FolderOpen, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { documentCards } from "@/lib/marine-dashboard-data";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — MarineMind AI" }] }),
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <AppShell title="Documents">
      <PageShell
        title="Documents"
        subtitle="Store manuals, certificates, inspection files, and maintenance reports."
        button="Upload File"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {documentCards.map((doc) => (
            <MarineCard key={doc.title}>
              <motion.span whileHover={{ scale: 1.12, rotate: -6 }} transition={spring}>
                <FolderOpen className="mb-5 h-8 w-8 text-cyan-600" />
              </motion.span>
              <h3 className="font-black text-slate-950">{doc.title}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {doc.type} • {doc.date}
              </p>
            </MarineCard>
          ))}
          <HoverCard className="rounded-3xl border-2 border-dashed border-cyan-200 bg-cyan-50/60">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="grid h-full min-h-44 place-items-center p-6 text-center">
                <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={spring}>
                  <Upload className="mx-auto mb-3 h-8 w-8 text-cyan-600" />
                  <p className="font-bold text-slate-950">Upload new document</p>
                </motion.div>
              </CardContent>
            </Card>
          </HoverCard>
        </div>
      </PageShell>
    </AppShell>
  );
}
