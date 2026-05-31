import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Archive,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  Eye,
  FileCheck2,
  FileImage,
  FileText,
  Filter,
  FolderOpen,
  Gauge,
  HardDrive,
  MoreHorizontal,
  Search,
  Settings2,
  ShieldCheck,
  ShipWheel,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverPressable, HoverRow, HoverTableRow } from "@/components/motion";
import { spring } from "@/lib/motion";
import {
  documentActionChecklist,
  documentCategoryHighlights,
  documentCategoryOptions,
  documentEquipmentOptions,
  documentFileTypeOptions,
  documentInsight,
  documentStatusOptions,
  initialDocuments,
  type DocumentItem,
} from "@/lib/documents-data";
import { documentFileIcon, documentStatusStyle } from "@/lib/documents-utils";

const categoryHighlightIcons: Record<string, LucideIcon> = {
  FileText,
  FileCheck2,
  ClipboardList,
  FileImage,
};

function SummaryCard({
  icon: Icon,
  label,
  value,
  note,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  note: string;
  className: string;
}) {
  return (
    <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <motion.h3
                className="mt-2 text-3xl font-black text-slate-950"
                whileHover={{ scale: 1.04, color: "#0ea5e9" }}
                transition={spring}
              >
                {value}
              </motion.h3>
              <p className="mt-2 text-sm text-slate-500">{note}</p>
            </div>
            <motion.div
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${className}`}
              whileHover={{ scale: 1.12, rotate: -8 }}
              transition={spring}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function SelectFilter({
  icon: Icon,
  value,
  onChange,
  options,
}: {
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border bg-white px-10 py-3 text-sm outline-none transition hover:border-cyan-300"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function InfoBox({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <motion.div className="rounded-2xl bg-slate-50 p-3" whileHover={{ scale: 1.02 }} transition={spring}>
      <Icon className="mb-2 h-4 w-4 text-cyan-600" />
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-slate-800">{value}</p>
    </motion.div>
  );
}

function DetailBox({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <motion.div
      className="rounded-3xl border bg-white p-4"
      whileHover={{ y: -4, scale: 1.02, boxShadow: "0 12px 30px rgba(14, 165, 233, 0.1)" }}
      transition={spring}
    >
      <Icon className="mb-3 h-5 w-5 text-cyan-600" />
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-slate-900">{value}</p>
    </motion.div>
  );
}

function DocumentCard({
  document: doc,
  onView,
  onArchive,
  onDelete,
}: {
  document: DocumentItem;
  onView: (doc: DocumentItem) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const Icon = documentFileIcon(doc.fileType);

  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
        <Card className="rounded-3xl border-0 bg-transparent shadow-none">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <motion.div
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700"
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={spring}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-black text-slate-950">{doc.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {doc.id} • {doc.equipment}
                  </p>
                </div>
              </div>
              <motion.button
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={spring}
              >
                <MoreHorizontal className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${documentStatusStyle(doc.status)}`}
              >
                {doc.status}
              </span>
              <span className="rounded-full border border-cyan-200 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700">
                {doc.category}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {doc.fileType}
              </span>
            </div>

            <motion.div
              className="mt-5 rounded-2xl bg-[#f5fbff] p-4"
              whileHover={{ backgroundColor: "#e0f2fe" }}
              transition={spring}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Description</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{doc.description}</p>
            </motion.div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <InfoBox icon={HardDrive} label="File Size" value={doc.size} />
              <InfoBox icon={CalendarClock} label="Uploaded" value={doc.uploaded} />
              <InfoBox icon={UserRound} label="Owner" value={doc.owner} />
              <InfoBox icon={Gauge} label="Equipment" value={doc.equipment} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <HoverPressable>
                <Button onClick={() => onView(doc)} variant="outline" className="w-full rounded-2xl">
                  <Eye className="mr-1 h-4 w-4" /> View
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button variant="outline" className="w-full rounded-2xl text-cyan-700">
                  <Download className="mr-1 h-4 w-4" /> Save
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button
                  onClick={() => onArchive(doc.id)}
                  variant="outline"
                  className="w-full rounded-2xl text-slate-600"
                >
                  <Archive className="mr-1 h-4 w-4" /> Archive
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button
                  onClick={() => onDelete(doc.id)}
                  variant="outline"
                  className="w-full rounded-2xl text-red-600 hover:text-red-700"
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </HoverPressable>
            </div>
          </CardContent>
        </Card>
      </HoverCard>
    </motion.div>
  );
}

function UploadPanel({ onUpload }: { onUpload: (doc: DocumentItem) => void }) {
  const [form, setForm] = useState({
    title: "",
    equipment: "Main Engine Alpha",
    category: "Manual",
    fileType: "PDF",
    description: "",
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.title.trim()) return;

    onUpload({
      id: `DOC-${Math.floor(Math.random() * 9000 + 1000)}`,
      title: form.title,
      equipment: form.equipment,
      category: form.category,
      fileType: form.fileType,
      size: "New Upload",
      owner: "Bethel Hillary",
      status: "Review",
      uploaded: "Today",
      description: form.description || "New vessel document uploaded for review and classification.",
    });

    setForm({
      title: "",
      equipment: "Main Engine Alpha",
      category: "Manual",
      fileType: "PDF",
      description: "",
    });
  }

  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-[#03131f] text-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent text-white shadow-none">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-black">Upload Document</h3>
              <p className="mt-1 text-sm text-slate-400">Add manuals, reports, certificates, and images.</p>
            </div>
            <motion.span whileHover={{ rotate: 12, scale: 1.1 }} transition={spring}>
              <Upload className="h-7 w-7 text-cyan-300" />
            </motion.span>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Document Name</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Example: Main Engine Manual.pdf"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Equipment</span>
              <select
                value={form.equipment}
                onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none"
              >
                {documentEquipmentOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-300">Category</span>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none"
                >
                  {documentCategoryOptions
                    .filter((item) => item !== "All")
                    .map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">File Type</span>
                <select
                  value={form.fileType}
                  onChange={(e) => setForm({ ...form, fileType: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none"
                >
                  {documentFileTypeOptions
                    .filter((item) => item !== "All")
                    .map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-slate-300">Description</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short note about this document..."
                className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <HoverPressable>
              <Button
                type="submit"
                className="h-12 w-full rounded-2xl bg-cyan-400 font-bold text-slate-950 hover:bg-cyan-300"
              >
                Add Document
              </Button>
            </HoverPressable>
          </form>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function DocumentDetails({ document: doc, onClose }: { document: DocumentItem | null; onClose: () => void }) {
  if (!doc) return null;

  const Icon = documentFileIcon(doc.fileType);

  return (
    <motion.div
      key="document-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: 420, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 420, opacity: 0 }}
        transition={spring}
        className="h-full w-full max-w-xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Document Details</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{doc.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {doc.id} • {doc.fileType}
            </p>
          </div>
          <HoverPressable>
            <button onClick={onClose} className="rounded-2xl border p-3 hover:bg-slate-50">
              <X className="h-5 w-5" />
            </button>
          </HoverPressable>
        </div>

        <motion.div
          className="mt-6 rounded-3xl bg-[#03131f] p-6 text-white"
          whileHover={{ scale: 1.01 }}
          transition={spring}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Document Status</p>
              <h3 className="mt-2 text-4xl font-black">{doc.status}</h3>
              <p className="mt-2 text-sm text-slate-400">Category: {doc.category}</p>
            </div>
            <Icon className="h-14 w-14 text-cyan-300" />
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailBox icon={Gauge} label="Equipment" value={doc.equipment} />
          <DetailBox icon={HardDrive} label="Size" value={doc.size} />
          <DetailBox icon={CalendarClock} label="Uploaded" value={doc.uploaded} />
          <DetailBox icon={UserRound} label="Owner" value={doc.owner} />
        </div>

        <motion.div
          className="mt-6 rounded-3xl border bg-slate-50 p-5"
          whileHover={{ scale: 1.01 }}
          transition={spring}
        >
          <h3 className="font-black text-slate-950">Description</h3>
          <p className="mt-3 leading-7 text-slate-700">{doc.description}</p>
        </motion.div>

        <div className="mt-6 space-y-3">
          <h3 className="font-black text-slate-950">Document Actions</h3>
          {documentActionChecklist.map((item) => (
            <HoverRow key={item} className="flex list-none items-center gap-3 rounded-2xl border p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-slate-700">{item}</span>
            </HoverRow>
          ))}
        </div>

        <HoverPressable>
          <Button className="mt-6 h-12 w-full rounded-2xl bg-cyan-500 font-bold text-white hover:bg-cyan-600">
            <Download className="mr-2 h-5 w-5" /> Download Document
          </Button>
        </HoverPressable>
      </motion.div>
    </motion.div>
  );
}

export function DocumentsPageContent() {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fileTypeFilter, setFileTypeFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const text =
        `${doc.title} ${doc.id} ${doc.equipment} ${doc.category} ${doc.owner}`.toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (categoryFilter === "All" || doc.category === categoryFilter) &&
        (statusFilter === "All" || doc.status === statusFilter) &&
        (fileTypeFilter === "All" || doc.fileType === fileTypeFilter)
      );
    });
  }, [documents, query, categoryFilter, statusFilter, fileTypeFilter]);

  const summary = useMemo(
    () => ({
      total: documents.length,
      approved: documents.filter((doc) => doc.status === "Approved").length,
      review: documents.filter((doc) => doc.status === "Review").length,
      ai: documents.filter((doc) => doc.status === "AI Generated").length,
    }),
    [documents],
  );

  function handleUpload(doc: DocumentItem) {
    setDocuments((current) => [doc, ...current]);
  }

  function handleArchive(id: string) {
    setDocuments((current) =>
      current.map((doc) => (doc.id === id ? { ...doc, status: "Archived" } : doc)),
    );
  }

  function handleDelete(id: string) {
    setDocuments((current) => current.filter((doc) => doc.id !== id));
    if (selectedDocument?.id === id) setSelectedDocument(null);
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-[2rem] bg-[#03131f] p-6 text-white shadow-xl sm:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/8 px-4 py-2 text-sm text-cyan-100"
              whileHover={{ scale: 1.04 }}
              transition={spring}
            >
              <Anchor className="h-4 w-4 text-cyan-300" />
              MarineMind AI Document Vault
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Store vessel documents, reports, manuals, and certificates.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Keep maintenance reports, inspection records, certificates, images, and manuals organized
              for every vessel equipment.
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 sm:grid-cols-2 lg:w-80">
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Documents</p>
              <p className="mt-2 text-3xl font-black text-cyan-300">{summary.total}</p>
            </motion.div>
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">For Review</p>
              <p className="mt-2 text-3xl font-black text-amber-300">{summary.review}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={FolderOpen} label="Total Files" value={summary.total} note="All stored documents" className="bg-cyan-500/15 text-cyan-700" />
        <SummaryCard icon={ShieldCheck} label="Approved" value={summary.approved} note="Ready for records" className="bg-emerald-500/15 text-emerald-700" />
        <SummaryCard icon={ClipboardList} label="Review" value={summary.review} note="Needs checking" className="bg-amber-500/15 text-amber-700" />
        <SummaryCard icon={Sparkles} label="AI Generated" value={summary.ai} note="Created by MarineMind AI" className="bg-violet-500/15 text-violet-700" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-4 sm:p-5">
                <div className="grid gap-3 xl:grid-cols-[1fr_180px_160px_160px_auto]">
                  <motion.div
                    className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3"
                    whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(14, 165, 233, 0.08)" }}
                    transition={spring}
                  >
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search document, equipment, owner, or ID..."
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </motion.div>
                  <SelectFilter icon={Filter} value={categoryFilter} onChange={setCategoryFilter} options={documentCategoryOptions} />
                  <SelectFilter icon={Settings2} value={statusFilter} onChange={setStatusFilter} options={documentStatusOptions} />
                  <SelectFilter icon={FileText} value={fileTypeFilter} onChange={setFileTypeFilter} options={documentFileTypeOptions} />
                  <div className="flex rounded-2xl border bg-slate-50 p-1">
                    {(["cards", "table"] as const).map((mode) => (
                      <motion.button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={spring}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize ${
                          viewMode === mode ? "bg-[#03131f] text-white" : "text-slate-600"
                        }`}
                      >
                        {mode}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </HoverCard>

          {viewMode === "cards" ? (
            <div className="grid gap-5 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredDocuments.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onView={setSelectedDocument}
                    onArchive={handleArchive}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <HoverCard lift={false} className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
              <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1080px] text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          {["Document", "Equipment", "Category", "Type", "Status", "Uploaded", "Action"].map(
                            (h) => (
                              <th key={h} className="px-5 py-4 font-semibold">
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocuments.map((doc) => (
                          <HoverTableRow key={doc.id}>
                            <td className="px-5 py-4">
                              <p className="font-black text-slate-950">{doc.title}</p>
                              <p className="text-xs text-slate-500">{doc.id}</p>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{doc.equipment}</td>
                            <td className="px-5 py-4 text-slate-600">{doc.category}</td>
                            <td className="px-5 py-4 text-slate-600">{doc.fileType}</td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${documentStatusStyle(doc.status)}`}
                              >
                                {doc.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{doc.uploaded}</td>
                            <td className="px-5 py-4">
                              <HoverPressable>
                                <Button
                                  onClick={() => setSelectedDocument(doc)}
                                  variant="outline"
                                  className="rounded-xl"
                                >
                                  View
                                </Button>
                              </HoverPressable>
                            </td>
                          </HoverTableRow>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </HoverCard>
          )}

          {filteredDocuments.length === 0 && (
            <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
              <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                <CardContent className="grid min-h-72 place-items-center p-8 text-center">
                  <div>
                    <Search className="mx-auto mb-4 h-10 w-10 text-slate-300" />
                    <h3 className="text-xl font-black text-slate-950">No documents found</h3>
                    <p className="mt-2 text-slate-500">Try changing your search or filters.</p>
                  </div>
                </CardContent>
              </Card>
            </HoverCard>
          )}
        </div>

        <div className="space-y-6">
          <UploadPanel onUpload={handleUpload} />

          <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">Document Categories</h3>
                    <p className="text-sm text-slate-500">Quick vault overview</p>
                  </div>
                  <BookOpen className="h-6 w-6 text-cyan-600" />
                </div>
                <div className="mt-5 space-y-3">
                  {documentCategoryHighlights.map(({ title, text, icon }) => {
                    const Icon = categoryHighlightIcons[icon] ?? FileText;
                    return (
                      <HoverRow key={title} className="flex list-none gap-3 rounded-2xl bg-slate-50 p-4">
                        <Icon className="h-5 w-5 shrink-0 text-cyan-600" />
                        <div>
                          <p className="font-bold text-slate-950">{title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
                        </div>
                      </HoverRow>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </HoverCard>

          <HoverCard className="rounded-3xl border-0 bg-cyan-50 shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-5">
                <ShipWheel className="mb-4 h-7 w-7 text-cyan-700" />
                <h3 className="text-lg font-black text-slate-950">MarineMind Insight</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{documentInsight}</p>
              </CardContent>
            </Card>
          </HoverCard>
        </div>
      </section>

      <AnimatePresence>
        {selectedDocument && (
          <DocumentDetails document={selectedDocument} onClose={() => setSelectedDocument(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
