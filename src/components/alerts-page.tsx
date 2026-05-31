import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Anchor,
  BellRing,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  Gauge,
  MapPin,
  MoreHorizontal,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShipWheel,
  Siren,
  ThermometerSun,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverPressable, HoverRow, HoverTableRow } from "@/components/motion";
import { spring } from "@/lib/motion";
import {
  alertCategoryHighlights,
  alertCategoryOptions,
  alertIntelligenceSummary,
  alertResponseChecklist,
  alertSeverityOptions,
  alertStatusOptions,
  initialAlerts,
  type AlertItem,
} from "@/lib/alerts-data";
import {
  alertSeverityBadgeClass,
  alertSeverityIcon,
  alertSeverityStyle,
  alertStatusStyle,
} from "@/lib/alerts-utils";

const categoryIcons: Record<string, LucideIcon> = {
  Temperature: ThermometerSun,
  Pressure: Gauge,
  Maintenance: Wrench,
  Vibration: AlertTriangle,
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

function AlertCard({
  alert,
  onSelect,
  onResolve,
  onMute,
  onDelete,
}: {
  alert: AlertItem;
  onSelect: (alert: AlertItem) => void;
  onResolve: (id: string) => void;
  onMute: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const Icon = alertSeverityIcon(alert.severity);

  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
        <Card className="rounded-3xl border-0 bg-transparent shadow-none">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <motion.div
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${alertSeverityBadgeClass(alert.severity)}`}
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={spring}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-black text-slate-950">{alert.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {alert.id} • {alert.equipment}
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
              <motion.span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${alertSeverityStyle(alert.severity)}`}
                whileHover={{ scale: 1.08 }}
                transition={spring}
              >
                {alert.severity}
              </motion.span>
              <motion.span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${alertStatusStyle(alert.status)}`}
                whileHover={{ scale: 1.08 }}
                transition={spring}
              >
                {alert.status}
              </motion.span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {alert.category}
              </span>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <InfoBox icon={MapPin} label="Location" value={alert.location} />
              <InfoBox icon={Clock} label="Detected" value={alert.time} />
            </div>

            <motion.div
              className="mt-5 rounded-2xl bg-[#f5fbff] p-4"
              whileHover={{ backgroundColor: "#e0f2fe" }}
              transition={spring}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Alert Message</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{alert.message}</p>
            </motion.div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <HoverPressable>
                <Button onClick={() => onSelect(alert)} variant="outline" className="w-full rounded-2xl">
                  <Eye className="mr-1 h-4 w-4" /> View
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button
                  onClick={() => onResolve(alert.id)}
                  variant="outline"
                  className="w-full rounded-2xl text-emerald-700 hover:text-emerald-800"
                >
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Resolve
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button
                  onClick={() => onMute(alert.id)}
                  variant="outline"
                  className="w-full rounded-2xl text-slate-600"
                >
                  <BellRing className="mr-1 h-4 w-4" /> Mute
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button
                  onClick={() => onDelete(alert.id)}
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

function AlertDetails({
  alert,
  onClose,
  onResolve,
}: {
  alert: AlertItem | null;
  onClose: () => void;
  onResolve: (id: string) => void;
}) {
  if (!alert) return null;

  const Icon = alertSeverityIcon(alert.severity);

  return (
    <motion.div
      key="alert-details"
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
            <p className="text-sm text-slate-500">Alert Details</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{alert.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {alert.id} • {alert.equipmentId}
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
              <p className="text-sm text-slate-400">Severity Level</p>
              <h3 className="mt-2 text-4xl font-black">{alert.severity}</h3>
              <p className="mt-2 text-sm text-slate-400">Status: {alert.status}</p>
            </div>
            <motion.span whileHover={{ rotate: 12, scale: 1.1 }} transition={spring}>
              <Icon className="h-14 w-14 text-cyan-300" />
            </motion.span>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailBox icon={Gauge} label="Equipment" value={alert.equipment} />
          <DetailBox icon={MapPin} label="Location" value={alert.location} />
          <DetailBox icon={CalendarClock} label="Date" value={alert.date} />
          <DetailBox icon={Clock} label="Detected" value={alert.time} />
        </div>

        <motion.div
          className="mt-6 rounded-3xl border bg-slate-50 p-5"
          whileHover={{ scale: 1.01 }}
          transition={spring}
        >
          <h3 className="font-black text-slate-950">Alert Message</h3>
          <p className="mt-3 leading-7 text-slate-700">{alert.message}</p>
        </motion.div>

        <motion.div
          className="mt-6 rounded-3xl border bg-cyan-50 p-5"
          whileHover={{ scale: 1.01 }}
          transition={spring}
        >
          <h3 className="font-black text-slate-950">Recommended Action</h3>
          <p className="mt-3 leading-7 text-slate-700">{alert.recommendation}</p>
        </motion.div>

        <div className="mt-6 space-y-3">
          <h3 className="font-black text-slate-950">Response Checklist</h3>
          {alertResponseChecklist.map((item) => (
            <HoverRow key={item} className="flex list-none items-center gap-3 rounded-2xl border p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-slate-700">{item}</span>
            </HoverRow>
          ))}
        </div>

        <HoverPressable>
          <Button
            onClick={() => onResolve(alert.id)}
            className="mt-6 h-12 w-full rounded-2xl bg-cyan-500 font-bold text-white hover:bg-cyan-600"
          >
            Mark Alert as Resolved
          </Button>
        </HoverPressable>
      </motion.div>
    </motion.div>
  );
}

export function AlertsPageContent() {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [query, setQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const text =
        `${alert.title} ${alert.equipment} ${alert.equipmentId} ${alert.severity} ${alert.category}`.toLowerCase();
      const matchesSearch = text.includes(query.toLowerCase());
      const matchesSeverity = severityFilter === "All" || alert.severity === severityFilter;
      const matchesStatus = statusFilter === "All" || alert.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || alert.category === categoryFilter;
      return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
    });
  }, [alerts, query, severityFilter, statusFilter, categoryFilter]);

  const summary = useMemo(
    () => ({
      total: alerts.length,
      open: alerts.filter((alert) => alert.status === "Open").length,
      critical: alerts.filter((alert) => alert.severity === "Critical" && alert.status === "Open").length,
      resolved: alerts.filter((alert) => alert.status === "Resolved").length,
    }),
    [alerts],
  );

  function handleResolve(id: string) {
    setAlerts((current) =>
      current.map((alert) => (alert.id === id ? { ...alert, status: "Resolved" } : alert)),
    );
    setSelectedAlert(null);
  }

  function handleMute(id: string) {
    setAlerts((current) =>
      current.map((alert) => (alert.id === id ? { ...alert, status: "Muted" } : alert)),
    );
  }

  function handleDelete(id: string) {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
    if (selectedAlert?.id === id) setSelectedAlert(null);
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
              MarineMind AI Alerts Center
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Monitor vessel alerts before they become failures.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Track critical warnings, maintenance alerts, pressure issues, temperature changes, and
              equipment health updates from one live page.
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 sm:grid-cols-2 lg:w-80">
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Open Alerts</p>
              <p className="mt-2 text-3xl font-black text-cyan-300">{summary.open}</p>
            </motion.div>
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Critical</p>
              <p className="mt-2 text-3xl font-black text-red-300">{summary.critical}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={BellRing} label="Total Alerts" value={summary.total} note="All alert records" className="bg-cyan-500/15 text-cyan-700" />
        <SummaryCard icon={ShieldAlert} label="Open Alerts" value={summary.open} note="Needs review" className="bg-amber-500/15 text-amber-700" />
        <SummaryCard icon={Siren} label="Critical" value={summary.critical} note="High priority" className="bg-red-500/15 text-red-700" />
        <SummaryCard icon={ShieldCheck} label="Resolved" value={summary.resolved} note="Closed issues" className="bg-emerald-500/15 text-emerald-700" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-4 sm:p-5">
                <div className="grid gap-3 xl:grid-cols-[1fr_160px_160px_170px_auto]">
                  <motion.div
                    className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3"
                    whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(14, 165, 233, 0.08)" }}
                    transition={spring}
                  >
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search alert, equipment, category, or ID..."
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </motion.div>

                  <SelectFilter icon={Filter} value={severityFilter} onChange={setSeverityFilter} options={alertSeverityOptions} />
                  <SelectFilter icon={BellRing} value={statusFilter} onChange={setStatusFilter} options={alertStatusOptions} />
                  <SelectFilter icon={Wrench} value={categoryFilter} onChange={setCategoryFilter} options={alertCategoryOptions} />

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
                {filteredAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onSelect={setSelectedAlert}
                    onResolve={handleResolve}
                    onMute={handleMute}
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
                    <table className="w-full min-w-[1020px] text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          {["Alert", "Equipment", "Category", "Severity", "Status", "Detected", "Actions"].map(
                            (h) => (
                              <th key={h} className="px-5 py-4 font-semibold">
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAlerts.map((alert) => (
                          <HoverTableRow key={alert.id}>
                            <td className="px-5 py-4">
                              <p className="font-black text-slate-950">{alert.title}</p>
                              <p className="text-xs text-slate-500">{alert.id}</p>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{alert.equipment}</td>
                            <td className="px-5 py-4 text-slate-600">{alert.category}</td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${alertSeverityStyle(alert.severity)}`}
                              >
                                {alert.severity}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${alertStatusStyle(alert.status)}`}
                              >
                                {alert.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{alert.time}</td>
                            <td className="px-5 py-4">
                              <HoverPressable>
                                <Button
                                  onClick={() => setSelectedAlert(alert)}
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

          {filteredAlerts.length === 0 && (
            <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
              <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                <CardContent className="grid min-h-72 place-items-center p-8 text-center">
                  <div>
                    <Search className="mx-auto mb-4 h-10 w-10 text-slate-300" />
                    <h3 className="text-xl font-black text-slate-950">No alerts found</h3>
                    <p className="mt-2 text-slate-500">Try changing your search or filters.</p>
                  </div>
                </CardContent>
              </Card>
            </HoverCard>
          )}
        </div>

        <div className="space-y-6">
          <HoverCard lift={false} className="rounded-3xl border-0 bg-[#03131f] text-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent text-white shadow-none">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black">Alert Intelligence</h3>
                    <p className="text-sm text-slate-400">Current risk overview</p>
                  </div>
                  <motion.span whileHover={{ scale: 1.15, rotate: 8 }} transition={spring}>
                    <ShipWheel className="h-7 w-7 text-cyan-300" />
                  </motion.span>
                </div>
                <motion.div
                  className="mt-5 rounded-3xl bg-white/8 p-5"
                  whileHover={{ scale: 1.02 }}
                  transition={spring}
                >
                  <p className="text-sm leading-7 text-slate-200">{alertIntelligenceSummary}</p>
                </motion.div>
                <HoverPressable>
                  <Button className="mt-5 h-12 w-full rounded-2xl bg-cyan-400 font-bold text-slate-950 hover:bg-cyan-300">
                    Generate AI Report
                  </Button>
                </HoverPressable>
              </CardContent>
            </Card>
          </HoverCard>

          <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-5">
                <h3 className="text-lg font-black text-slate-950">Alert Categories</h3>
                <div className="mt-5 space-y-3">
                  {alertCategoryHighlights.map(({ title, text }) => {
                    const Icon = categoryIcons[title] ?? AlertTriangle;
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
        </div>
      </section>

      <AnimatePresence>
        {selectedAlert && (
          <AlertDetails alert={selectedAlert} onClose={() => setSelectedAlert(null)} onResolve={handleResolve} />
        )}
      </AnimatePresence>
    </>
  );
}
