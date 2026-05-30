import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  Anchor,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Edit3,
  Eye,
  Filter,
  Gauge,
  Layers3,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  ShipWheel,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverPressable, HoverRow, HoverTableRow } from "@/components/motion";
import { spring } from "@/lib/motion";
import {
  initialEquipment,
  liveActivities,
  statusOptions,
  typeOptions,
  type EquipmentItem,
} from "@/lib/equipment-data";
import { equipmentStatusStyle, healthBarColor } from "@/lib/equipment-utils";

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

function EquipmentForm({ onAdd }: { onAdd: (item: EquipmentItem) => void }) {
  const [form, setForm] = useState({
    name: "",
    type: "Engine",
    location: "Engine Room",
    status: "Healthy",
    health: 85,
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.name.trim()) return;

    onAdd({
      id: `${form.type.slice(0, 2).toUpperCase()}-${Math.floor(Math.random() * 90 + 10)}`,
      name: form.name,
      type: form.type,
      location: form.location,
      status: form.status,
      health: Number(form.health),
      runningHours: "0 hrs",
      lastMaintenance: "Not recorded",
      nextMaintenance: "Not scheduled",
      assignedTo: "Unassigned",
      issue: "New equipment added",
    });

    setForm({ name: "", type: "Engine", location: "Engine Room", status: "Healthy", health: 85 });
  }

  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-[#03131f] text-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent text-white shadow-none">
        <CardContent className="p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-black">Add Equipment</h3>
              <p className="mt-1 text-sm text-slate-400">Create a new asset record for your vessel.</p>
            </div>
            <motion.div
              className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/15"
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={spring}
            >
              <Plus className="h-5 w-5 text-cyan-300" />
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-slate-300">Equipment Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Example: Main Engine Alpha"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-300">Type</span>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
                >
                  {typeOptions.filter((type) => type !== "All").map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Status</span>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
                >
                  {statusOptions.filter((status) => status !== "All").map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-slate-300">Location</span>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
              />
            </label>

            <label className="block">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Health Score</span>
                <span>{form.health}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={form.health}
                onChange={(e) => setForm({ ...form, health: Number(e.target.value) })}
                className="mt-3 w-full accent-cyan-300"
              />
            </label>

            <HoverPressable>
              <Button
                type="submit"
                className="h-12 w-full rounded-2xl bg-cyan-400 font-bold text-slate-950 hover:bg-cyan-300"
              >
                Add Equipment
              </Button>
            </HoverPressable>
          </form>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function EquipmentCard({
  item,
  onSelect,
  onDelete,
}: {
  item: EquipmentItem;
  onSelect: (item: EquipmentItem) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
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
                  <Cpu className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-black text-slate-950">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.id} • {item.type}
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
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${equipmentStatusStyle(item.status)}`}
                whileHover={{ scale: 1.08 }}
                transition={spring}
              >
                {item.status}
              </motion.span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                <MapPin className="h-3.5 w-3.5" /> {item.location}
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Health Score</span>
                <span className="font-black text-slate-950">{item.health}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <motion.div
                  className={`h-3 rounded-full ${healthBarColor(item.health)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.health}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <motion.div className="rounded-2xl bg-slate-50 p-3" whileHover={{ scale: 1.02 }} transition={spring}>
                <p className="text-xs text-slate-400">Running Hours</p>
                <p className="mt-1 font-bold text-slate-800">{item.runningHours}</p>
              </motion.div>
              <motion.div className="rounded-2xl bg-slate-50 p-3" whileHover={{ scale: 1.02 }} transition={spring}>
                <p className="text-xs text-slate-400">Next Service</p>
                <p className="mt-1 font-bold text-slate-800">{item.nextMaintenance}</p>
              </motion.div>
            </div>

            <motion.div
              className="mt-5 rounded-2xl bg-[#f5fbff] p-4"
              whileHover={{ backgroundColor: "#e0f2fe" }}
              transition={spring}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Current Note</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.issue}</p>
            </motion.div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <HoverPressable>
                <Button onClick={() => onSelect(item)} variant="outline" className="w-full rounded-2xl">
                  <Eye className="mr-1 h-4 w-4" /> View
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button variant="outline" className="w-full rounded-2xl">
                  <Edit3 className="mr-1 h-4 w-4" /> Edit
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button
                  onClick={() => onDelete(item.id)}
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

function DetailBox({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
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

function EquipmentDetails({
  item,
  onClose,
}: {
  item: EquipmentItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <motion.div
      key="equipment-details"
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
            <p className="text-sm text-slate-500">Equipment Details</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{item.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {item.id} • {item.type}
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Health Score</p>
              <h3 className="mt-2 text-5xl font-black">{item.health}%</h3>
            </div>
            <motion.span whileHover={{ rotate: 90, scale: 1.1 }} transition={spring}>
              <Gauge className="h-14 w-14 text-cyan-300" />
            </motion.span>
          </div>
          <div className="mt-5 h-3 rounded-full bg-white/10">
            <div
              className={`h-3 rounded-full ${healthBarColor(item.health)}`}
              style={{ width: `${item.health}%` }}
            />
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailBox icon={MapPin} label="Location" value={item.location} />
          <DetailBox icon={Activity} label="Running Hours" value={item.runningHours} />
          <DetailBox icon={CalendarClock} label="Last Maintenance" value={item.lastMaintenance} />
          <DetailBox icon={Wrench} label="Next Maintenance" value={item.nextMaintenance} />
        </div>

        <motion.div
          className="mt-6 rounded-3xl border bg-slate-50 p-5"
          whileHover={{ scale: 1.01 }}
          transition={spring}
        >
          <h3 className="font-black text-slate-950">AI Maintenance Note</h3>
          <p className="mt-3 leading-7 text-slate-700">
            {item.issue}. Recommended action: review maintenance log, inspect affected parts, and
            update equipment status after inspection.
          </p>
        </motion.div>

        <div className="mt-6 space-y-3">
          <h3 className="font-black text-slate-950">Recent Timeline</h3>
          {["Inspection record updated", "Health score recalculated", "Maintenance reminder generated"].map(
            (event) => (
              <HoverRow key={event} className="flex list-none items-center gap-3 rounded-2xl border p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-sm text-slate-700">{event}</span>
              </HoverRow>
            ),
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EquipmentPageContent() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(initialEquipment);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selected, setSelected] = useState<EquipmentItem | null>(null);

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch = `${item.name} ${item.id} ${item.type} ${item.location}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [equipment, query, statusFilter, typeFilter]);

  const summary = useMemo(() => {
    const total = equipment.length;
    const critical = equipment.filter((item) => item.status === "Critical").length;
    const due = equipment.filter(
      (item) => item.status === "Due" || item.nextMaintenance === "Today",
    ).length;
    const avgHealth = Math.round(equipment.reduce((sum, item) => sum + item.health, 0) / total);
    return { total, critical, due, avgHealth };
  }, [equipment]);

  function handleAdd(newEquipment: EquipmentItem) {
    setEquipment((current) => [newEquipment, ...current]);
  }

  function handleDelete(id: string) {
    setEquipment((current) => current.filter((item) => item.id !== id));
    if (selected?.id === id) setSelected(null);
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
              MarineMind AI Equipment Control
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Manage vessel equipment in one live dashboard.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Track equipment health, maintenance status, running hours, locations, and AI-backed
              fault notes from a clean responsive page.
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 sm:grid-cols-2 lg:w-80">
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Fleet Health</p>
              <p className="mt-2 text-3xl font-black text-cyan-300">{summary.avgHealth}%</p>
            </motion.div>
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Critical</p>
              <p className="mt-2 text-3xl font-black text-red-300">{summary.critical}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={Layers3} label="Total Equipment" value={summary.total} note="Registered assets" className="bg-cyan-500/15 text-cyan-700" />
        <SummaryCard icon={AlertTriangle} label="Critical Units" value={summary.critical} note="Needs quick attention" className="bg-red-500/15 text-red-700" />
        <SummaryCard icon={CalendarClock} label="Service Due" value={summary.due} note="Upcoming or due today" className="bg-amber-500/15 text-amber-700" />
        <SummaryCard icon={ShipWheel} label="Average Health" value={`${summary.avgHealth}%`} note="Across equipment" className="bg-emerald-500/15 text-emerald-700" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-4 sm:p-5">
                <div className="grid gap-3 lg:grid-cols-[1fr_170px_170px_auto]">
                  <motion.div
                    className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3"
                    whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(14, 165, 233, 0.08)" }}
                    transition={spring}
                  >
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by name, ID, type, or location..."
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </motion.div>

                  <div className="relative">
                    <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full appearance-none rounded-2xl border bg-white px-10 py-3 text-sm outline-none transition hover:border-cyan-300"
                    >
                      {statusOptions.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>

                  <div className="relative">
                    <Cpu className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full appearance-none rounded-2xl border bg-white px-10 py-3 text-sm outline-none transition hover:border-cyan-300"
                    >
                      {typeOptions.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>

                  <div className="flex rounded-2xl border bg-slate-50 p-1">
                    {(["grid", "table"] as const).map((mode) => (
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

          {viewMode === "grid" ? (
            <div className="grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredEquipment.map((item) => (
                  <EquipmentCard
                    key={item.id}
                    item={item}
                    onSelect={setSelected}
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
                    <table className="w-full min-w-[980px] text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          {["Equipment", "Type", "Location", "Status", "Health", "Next Service", "Actions"].map(
                            (h) => (
                              <th key={h} className="px-5 py-4 font-semibold">
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEquipment.map((item) => (
                          <HoverTableRow key={item.id}>
                            <td className="px-5 py-4">
                              <p className="font-black text-slate-950">{item.name}</p>
                              <p className="text-xs text-slate-500">{item.id}</p>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{item.type}</td>
                            <td className="px-5 py-4 text-slate-600">{item.location}</td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${equipmentStatusStyle(item.status)}`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="h-2 w-24 rounded-full bg-slate-100">
                                <div
                                  className={`h-2 rounded-full ${healthBarColor(item.health)}`}
                                  style={{ width: `${item.health}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-600">{item.health}%</span>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{item.nextMaintenance}</td>
                            <td className="px-5 py-4">
                              <HoverPressable>
                                <Button
                                  onClick={() => setSelected(item)}
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

          {filteredEquipment.length === 0 && (
            <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
              <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                <CardContent className="grid min-h-72 place-items-center p-8 text-center">
                  <div>
                    <Search className="mx-auto mb-4 h-10 w-10 text-slate-300" />
                    <h3 className="text-xl font-black text-slate-950">No equipment found</h3>
                    <p className="mt-2 text-slate-500">Try changing your search or filters.</p>
                  </div>
                </CardContent>
              </Card>
            </HoverCard>
          )}
        </div>

        <div className="space-y-6">
          <EquipmentForm onAdd={handleAdd} />

          <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">Live Activity</h3>
                    <p className="text-sm text-slate-500">Recent equipment updates</p>
                  </div>
                  <motion.span whileHover={{ scale: 1.15, rotate: 8 }} transition={spring}>
                    <Activity className="h-6 w-6 text-cyan-600" />
                  </motion.span>
                </div>
                <div className="mt-5 space-y-3">
                  {liveActivities.map((activity) => (
                    <HoverRow key={activity} className="flex list-none gap-3 rounded-2xl bg-slate-50 p-4">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                      <p className="text-sm leading-6 text-slate-700">{activity}</p>
                    </HoverRow>
                  ))}
                </div>
              </CardContent>
            </Card>
          </HoverCard>
        </div>
      </section>

      <AnimatePresence>
        {selected && <EquipmentDetails item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
