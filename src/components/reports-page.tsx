import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Gauge,
  Lightbulb,
  PieChart as PieChartIcon,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverPressable, HoverRow, HoverTableRow } from "@/components/motion";
import { spring } from "@/lib/motion";
import {
  initialReports,
  marineMindInsight,
  reportCategoryOptions,
  reportChecklist,
  reportEquipmentHealth,
  reportExportOptions,
  reportFaultData,
  reportHealthData,
  reportStatusOptions,
  reportTypeOptions,
  type ReportItem,
} from "@/lib/reports-data";
import { reportHealthBarColor, reportRiskStyle, reportStatusStyle } from "@/lib/reports-utils";

const exportIcons: Record<string, LucideIcon> = {
  FileText,
  FileSpreadsheet,
  Download,
  Sparkles,
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

function ReportCard({
  report,
  onView,
  onArchive,
}: {
  report: ReportItem;
  onView: (report: ReportItem) => void;
  onArchive: (id: string) => void;
}) {
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
                  <FileText className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-black text-slate-950">{report.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {report.id} • {report.equipment}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${reportStatusStyle(report.status)}`}
              >
                {report.status}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-200 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700">
                {report.category}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {report.type}
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${reportRiskStyle(report.risk)}`}
              >
                {report.risk} Risk
              </span>
            </div>

            <motion.div
              className="mt-5 rounded-2xl bg-[#f5fbff] p-4"
              whileHover={{ backgroundColor: "#e0f2fe" }}
              transition={spring}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Report Summary</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{report.summary}</p>
            </motion.div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <InfoBox icon={CalendarClock} label="Date" value={report.date} />
              <InfoBox icon={Wrench} label="Engineer" value={report.engineer} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <HoverPressable>
                <Button onClick={() => onView(report)} variant="outline" className="w-full rounded-2xl">
                  <Eye className="mr-1 h-4 w-4" /> View
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button variant="outline" className="w-full rounded-2xl text-cyan-700">
                  <Download className="mr-1 h-4 w-4" /> PDF
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button
                  onClick={() => onArchive(report.id)}
                  variant="outline"
                  className="w-full rounded-2xl text-slate-600"
                >
                  Archive
                </Button>
              </HoverPressable>
            </div>
          </CardContent>
        </Card>
      </HoverCard>
    </motion.div>
  );
}

function AIReportGenerator({ onGenerate }: { onGenerate: (report: ReportItem) => void }) {
  const [issue, setIssue] = useState("");
  const [equipment, setEquipment] = useState("Main Engine Alpha");

  function handleGenerate() {
    if (!issue.trim()) return;

    onGenerate({
      id: `REP-${Math.floor(Math.random() * 9000 + 1000)}`,
      title: `${equipment} AI Fault Report`,
      equipment,
      category: "AI Diagnostic",
      engineer: "MarineMind AI",
      status: "Open",
      type: "AI Generated",
      date: "Today",
      summary: `AI report generated from issue: ${issue}. Suggested action: inspect equipment readings, review maintenance history, and schedule corrective maintenance if abnormal values continue.`,
      risk: "Medium",
    });
    setIssue("");
  }

  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-[#03131f] text-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent text-white shadow-none">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-black">AI Report Generator</h3>
              <p className="mt-1 text-sm text-slate-400">Create maintenance reports from fault notes.</p>
            </div>
            <motion.span whileHover={{ rotate: 12, scale: 1.1 }} transition={spring}>
              <Sparkles className="h-7 w-7 text-cyan-300" />
            </motion.span>
          </div>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Equipment</span>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none"
              >
                {reportEquipmentHealth.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Fault Description</span>
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Example: Main engine temperature rises after 3 hours..."
                className="mt-2 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <HoverPressable>
              <Button
                onClick={handleGenerate}
                className="h-12 w-full rounded-2xl bg-cyan-400 font-bold text-slate-950 hover:bg-cyan-300"
              >
                Generate AI Report
              </Button>
            </HoverPressable>
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function ReportDetails({ report, onClose }: { report: ReportItem | null; onClose: () => void }) {
  if (!report) return null;

  return (
    <motion.div
      key="report-details"
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
            <p className="text-sm text-slate-500">Report Details</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{report.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {report.id} • {report.type}
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
              <p className="text-sm text-slate-400">Risk Level</p>
              <h3 className="mt-2 text-4xl font-black">{report.risk}</h3>
              <p className="mt-2 text-sm text-slate-400">Status: {report.status}</p>
            </div>
            <FileText className="h-14 w-14 text-cyan-300" />
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailBox icon={Gauge} label="Equipment" value={report.equipment} />
          <DetailBox icon={Settings2} label="Category" value={report.category} />
          <DetailBox icon={CalendarClock} label="Date" value={report.date} />
          <DetailBox icon={Wrench} label="Engineer" value={report.engineer} />
        </div>

        <motion.div
          className="mt-6 rounded-3xl border bg-slate-50 p-5"
          whileHover={{ scale: 1.01 }}
          transition={spring}
        >
          <h3 className="font-black text-slate-950">Summary</h3>
          <p className="mt-3 leading-7 text-slate-700">{report.summary}</p>
        </motion.div>

        <div className="mt-6 space-y-3">
          <h3 className="font-black text-slate-950">Report Checklist</h3>
          {reportChecklist.map((item) => (
            <HoverRow key={item} className="flex list-none items-center gap-3 rounded-2xl border p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-slate-700">{item}</span>
            </HoverRow>
          ))}
        </div>

        <HoverPressable>
          <Button className="mt-6 h-12 w-full rounded-2xl bg-cyan-500 font-bold text-white hover:bg-cyan-600">
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </Button>
        </HoverPressable>
      </motion.div>
    </motion.div>
  );
}

export function ReportsPageContent() {
  const [reports, setReports] = useState<ReportItem[]>(initialReports);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const text =
        `${report.title} ${report.id} ${report.equipment} ${report.category} ${report.engineer}`.toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (statusFilter === "All" || report.status === statusFilter) &&
        (categoryFilter === "All" || report.category === categoryFilter) &&
        (typeFilter === "All" || report.type === typeFilter)
      );
    });
  }, [reports, query, statusFilter, categoryFilter, typeFilter]);

  const summary = useMemo(
    () => ({
      total: reports.length,
      open: reports.filter((report) => report.status === "Open").length,
      completed: reports.filter((report) => report.status === "Completed").length,
      ai: reports.filter((report) => report.type === "AI Generated").length,
    }),
    [reports],
  );

  function handleGenerate(report: ReportItem) {
    setReports((current) => [report, ...current]);
  }

  function handleArchive(id: string) {
    setReports((current) =>
      current.map((report) => (report.id === id ? { ...report, status: "Archived" } : report)),
    );
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
              MarineMind AI Reports Center
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Generate, analyze, and export vessel maintenance reports.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Track maintenance records, AI-generated fault reports, equipment health trends, and
              export-ready vessel documentation.
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 sm:grid-cols-2 lg:w-80">
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Total Reports</p>
              <p className="mt-2 text-3xl font-black text-cyan-300">{summary.total}</p>
            </motion.div>
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">AI Reports</p>
              <p className="mt-2 text-3xl font-black text-emerald-300">{summary.ai}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={FileText} label="Total Reports" value={summary.total} note="All report records" className="bg-cyan-500/15 text-cyan-700" />
        <SummaryCard icon={ClipboardList} label="Open Reports" value={summary.open} note="Needs review" className="bg-amber-500/15 text-amber-700" />
        <SummaryCard icon={CheckCircle2} label="Completed" value={summary.completed} note="Closed reports" className="bg-emerald-500/15 text-emerald-700" />
        <SummaryCard icon={Sparkles} label="AI Generated" value={summary.ai} note="Created by MarineMind AI" className="bg-violet-500/15 text-violet-700" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
              <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-950">Equipment Health Trend</h3>
                      <p className="text-sm text-slate-500">Weekly maintenance health movement</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={reportHealthData}>
                        <defs>
                          <linearGradient id="reportHealth" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="health"
                          stroke="#0ea5e9"
                          strokeWidth={3}
                          fill="url(#reportHealth)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </HoverCard>

            <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
              <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-950">Fault Distribution</h3>
                      <p className="text-sm text-slate-500">Report categories</p>
                    </div>
                    <PieChartIcon className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportFaultData}
                          dataKey="value"
                          innerRadius={55}
                          outerRadius={88}
                          paddingAngle={4}
                        >
                          {reportFaultData.map((item) => (
                            <Cell key={item.name} fill={item.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 space-y-2">
                    {reportFaultData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          {item.name}
                        </span>
                        <span className="font-bold text-slate-900">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </HoverCard>
          </div>

          <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-4 sm:p-5">
                <div className="grid gap-3 xl:grid-cols-[1fr_160px_170px_160px_auto]">
                  <motion.div
                    className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3"
                    whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(14, 165, 233, 0.08)" }}
                    transition={spring}
                  >
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search reports, equipment, engineer, or ID..."
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </motion.div>
                  <SelectFilter icon={Filter} value={statusFilter} onChange={setStatusFilter} options={reportStatusOptions} />
                  <SelectFilter icon={Settings2} value={categoryFilter} onChange={setCategoryFilter} options={reportCategoryOptions} />
                  <SelectFilter icon={Sparkles} value={typeFilter} onChange={setTypeFilter} options={reportTypeOptions} />
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
                {filteredReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onView={setSelectedReport}
                    onArchive={handleArchive}
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
                          {["Report", "Equipment", "Category", "Engineer", "Status", "Date", "Action"].map(
                            (h) => (
                              <th key={h} className="px-5 py-4 font-semibold">
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReports.map((report) => (
                          <HoverTableRow key={report.id}>
                            <td className="px-5 py-4">
                              <p className="font-black text-slate-950">{report.title}</p>
                              <p className="text-xs text-slate-500">{report.id}</p>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{report.equipment}</td>
                            <td className="px-5 py-4 text-slate-600">{report.category}</td>
                            <td className="px-5 py-4 text-slate-600">{report.engineer}</td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${reportStatusStyle(report.status)}`}
                              >
                                {report.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{report.date}</td>
                            <td className="px-5 py-4">
                              <HoverPressable>
                                <Button
                                  onClick={() => setSelectedReport(report)}
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
        </div>

        <div className="space-y-6">
          <AIReportGenerator onGenerate={handleGenerate} />

          <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">Equipment Health</h3>
                    <p className="text-sm text-slate-500">Report-based health scores</p>
                  </div>
                  <BarChart3 className="h-6 w-6 text-cyan-600" />
                </div>
                <div className="mt-5 space-y-4">
                  {reportEquipmentHealth.map((item) => (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-700">{item.name}</span>
                        <span className="font-black text-slate-950">{item.value}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-100">
                        <motion.div
                          className={`h-3 rounded-full ${reportHealthBarColor(item.value)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={spring}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </HoverCard>

          <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-5">
                <h3 className="text-lg font-black text-slate-950">Export Center</h3>
                <div className="mt-5 grid gap-3">
                  {reportExportOptions.map(({ title, icon }) => {
                    const Icon = exportIcons[icon] ?? Download;
                    return (
                      <HoverPressable key={title}>
                        <Button variant="outline" className="h-12 w-full justify-start rounded-2xl">
                          <Icon className="mr-3 h-5 w-5 text-cyan-600" /> {title}
                        </Button>
                      </HoverPressable>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </HoverCard>

          <HoverCard className="rounded-3xl border-0 bg-cyan-50 shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-5">
                <Lightbulb className="mb-4 h-7 w-7 text-cyan-700" />
                <h3 className="text-lg font-black text-slate-950">MarineMind Insight</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{marineMindInsight}</p>
              </CardContent>
            </Card>
          </HoverCard>
        </div>
      </section>

      <AnimatePresence>
        {selectedReport && (
          <ReportDetails report={selectedReport} onClose={() => setSelectedReport(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
