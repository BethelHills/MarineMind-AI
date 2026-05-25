import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { FileText, FileSpreadsheet, FileImage, Upload, Search, Download } from "lucide-react";

const docs = [
  { name: "Main Engine Service Manual.pdf", type: "Manual", size: "12.4 MB", updated: "May 18, 2025", owner: "John D.", kind: "pdf" },
  { name: "Auxiliary Generator Maintenance Log.xlsx", type: "Log", size: "248 KB", updated: "May 16, 2025", owner: "Mike S.", kind: "xlsx" },
  { name: "Fuel Purifier Inspection Report.pdf", type: "Report", size: "3.1 MB", updated: "May 14, 2025", owner: "John D.", kind: "pdf" },
  { name: "Cooling Pump Disassembly.jpg", type: "Photo", size: "1.8 MB", updated: "May 12, 2025", owner: "Mike S.", kind: "img" },
  { name: "Hydraulic Pump Spec Sheet.pdf", type: "Spec", size: "865 KB", updated: "May 9, 2025", owner: "Samson O.", kind: "pdf" },
  { name: "Fresh Water Generator Alarm Log.xlsx", type: "Log", size: "412 KB", updated: "May 8, 2025", owner: "Samson O.", kind: "xlsx" },
  { name: "Steering System Drawing.pdf", type: "Drawing", size: "5.6 MB", updated: "May 5, 2025", owner: "John D.", kind: "pdf" },
];

function iconFor(kind: string) {
  if (kind === "xlsx") return { Icon: FileSpreadsheet, color: "text-success-foreground bg-success/15" };
  if (kind === "img") return { Icon: FileImage, color: "text-primary bg-primary/10" };
  return { Icon: FileText, color: "text-critical bg-critical/10" };
}

function DocumentsPage() {
  return (
    <AppShell title="Documents">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90">
          <Upload className="size-4" /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Documents", value: docs.length },
          { label: "Manuals", value: 1 },
          { label: "Reports", value: 1 },
          { label: "Logs", value: 2 },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className="mt-2 text-3xl font-semibold text-foreground">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Library</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr className="text-left">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Size</th>
              <th className="px-6 py-3 font-medium">Updated</th>
              <th className="px-6 py-3 font-medium">Owner</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {docs.map((d) => {
              const { Icon, color } = iconFor(d.kind);
              return (
                <tr key={d.name} className="hover:bg-muted/30">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-lg grid place-items-center ${color}`}>
                        <Icon className="size-4" />
                      </div>
                      <span className="font-medium text-foreground">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{d.type}</td>
                  <td className="px-6 py-3 text-muted-foreground">{d.size}</td>
                  <td className="px-6 py-3 text-muted-foreground">{d.updated}</td>
                  <td className="px-6 py-3 text-muted-foreground">{d.owner}</td>
                  <td className="px-6 py-3 text-right">
                    <button className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                      <Download className="size-4" /> Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — MarineMind AI" }] }),
  component: DocumentsPage,
});
