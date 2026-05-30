import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Anchor,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Edit3,
  Eye,
  Filter,
  Gauge,
  MoreHorizontal,
  Plus,
  Search,
  ShipWheel,
  TimerReset,
  Trash2,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverPressable, HoverRow, HoverTableRow } from "@/components/motion";
import { spring } from "@/lib/motion";
import {
  equipmentSelectOptions,
  initialTasks,
  maintenanceBoardColumns,
  maintenanceChecklist,
  maintenancePriorityOptions,
  maintenanceStatusOptions,
  maintenanceTimeline,
  maintenanceTypeOptions,
  type MaintenanceTask,
} from "@/lib/maintenance-data";
import { maintenancePriorityStyle, maintenanceStatusStyle } from "@/lib/maintenance-utils";

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

function MaintenanceForm({ onAdd }: { onAdd: (task: MaintenanceTask) => void }) {
  const [form, setForm] = useState({
    equipment: "Main Engine Alpha",
    type: "Inspection",
    priority: "Medium",
    technician: "Engr. Bethel",
    date: "May 30, 2026",
    time: "09:00 AM",
    notes: "",
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.equipment.trim() || !form.notes.trim()) return;

    onAdd({
      id: `MT-${Math.floor(Math.random() * 9000 + 1000)}`,
      equipment: form.equipment,
      equipmentId: "NEW",
      type: form.type,
      priority: form.priority,
      status: "Scheduled",
      technician: form.technician,
      date: form.date,
      time: form.time,
      estimatedTime: "1 hr",
      location: "Not assigned",
      notes: form.notes,
    });

    setForm({
      equipment: "Main Engine Alpha",
      type: "Inspection",
      priority: "Medium",
      technician: "Engr. Bethel",
      date: "May 30, 2026",
      time: "09:00 AM",
      notes: "",
    });
  }

  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-[#03131f] text-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent text-white shadow-none">
        <CardContent className="p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-black">Create Maintenance</h3>
              <p className="mt-1 text-sm text-slate-400">Schedule a new equipment task.</p>
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
              <span className="text-sm text-slate-300">Equipment</span>
              <select
                value={form.equipment}
                onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
              >
                {equipmentSelectOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-300">Type</span>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
                >
                  {maintenanceTypeOptions
                    .filter((type) => type !== "All")
                    .map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Priority</span>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#09243a] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
                >
                  {maintenancePriorityOptions
                    .filter((priority) => priority !== "All")
                    .map((priority) => (
                      <option key={priority}>{priority}</option>
                    ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-slate-300">Technician</span>
              <input
                value={form.technician}
                onChange={(e) => setForm({ ...form, technician: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-300">Date</span>
                <input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">Time</span>
                <input
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-slate-300">Task Notes</span>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Describe what should be inspected or repaired..."
                className="mt-2 min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
              />
            </label>

            <HoverPressable>
              <Button
                type="submit"
                className="h-12 w-full rounded-2xl bg-cyan-400 font-bold text-slate-950 hover:bg-cyan-300"
              >
                Create Task
              </Button>
            </HoverPressable>
          </form>
        </CardContent>
      </Card>
    </HoverCard>
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

function MaintenanceCard({
  task,
  onSelect,
  onDelete,
  onComplete,
}: {
  task: MaintenanceTask;
  onSelect: (task: MaintenanceTask) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
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
                  <Wrench className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="font-black text-slate-950">{task.equipment}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {task.id} • {task.type}
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
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${maintenanceStatusStyle(task.status)}`}
                whileHover={{ scale: 1.08 }}
                transition={spring}
              >
                {task.status}
              </motion.span>
              <motion.span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${maintenancePriorityStyle(task.priority)}`}
                whileHover={{ scale: 1.08 }}
                transition={spring}
              >
                {task.priority}
              </motion.span>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <InfoBox icon={CalendarClock} label="Date" value={task.date} />
              <InfoBox icon={Clock} label="Time" value={task.time} />
              <InfoBox icon={UserRound} label="Technician" value={task.technician} />
              <InfoBox icon={TimerReset} label="Duration" value={task.estimatedTime} />
            </div>

            <motion.div
              className="mt-5 rounded-2xl bg-[#f5fbff] p-4"
              whileHover={{ backgroundColor: "#e0f2fe" }}
              transition={spring}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Task Notes</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{task.notes}</p>
            </motion.div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <HoverPressable>
                <Button onClick={() => onSelect(task)} variant="outline" className="w-full rounded-2xl">
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
                  onClick={() => onComplete(task.id)}
                  variant="outline"
                  className="w-full rounded-2xl text-emerald-700 hover:text-emerald-800"
                >
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Done
                </Button>
              </HoverPressable>
              <HoverPressable>
                <Button
                  onClick={() => onDelete(task.id)}
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

function TaskDetails({ task, onClose }: { task: MaintenanceTask | null; onClose: () => void }) {
  if (!task) return null;

  return (
    <motion.div
      key="task-details"
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
            <p className="text-sm text-slate-500">Maintenance Details</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">{task.equipment}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {task.id} • {task.type}
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
              <p className="text-sm text-slate-400">Current Status</p>
              <h3 className="mt-2 text-4xl font-black">{task.status}</h3>
              <p className="mt-2 text-sm text-slate-400">Priority: {task.priority}</p>
            </div>
            <motion.span whileHover={{ rotate: 12, scale: 1.1 }} transition={spring}>
              <ClipboardCheck className="h-14 w-14 text-cyan-300" />
            </motion.span>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailBox icon={CalendarClock} label="Date" value={task.date} />
          <DetailBox icon={Clock} label="Time" value={task.time} />
          <DetailBox icon={UserRound} label="Technician" value={task.technician} />
          <DetailBox icon={TimerReset} label="Estimated Time" value={task.estimatedTime} />
        </div>

        <motion.div
          className="mt-6 rounded-3xl border bg-slate-50 p-5"
          whileHover={{ scale: 1.01 }}
          transition={spring}
        >
          <h3 className="font-black text-slate-950">Maintenance Notes</h3>
          <p className="mt-3 leading-7 text-slate-700">{task.notes}</p>
        </motion.div>

        <div className="mt-6 space-y-3">
          <h3 className="font-black text-slate-950">Suggested Checklist</h3>
          {maintenanceChecklist.map((item) => (
            <HoverRow key={item} className="flex list-none items-center gap-3 rounded-2xl border p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-slate-700">{item}</span>
            </HoverRow>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MaintenancePageContent() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(initialTasks);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"board" | "table">("board");
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const text =
        `${task.equipment} ${task.equipmentId} ${task.type} ${task.technician} ${task.status}`.toLowerCase();
      const matchesSearch = text.includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      const matchesType = typeFilter === "All" || task.type === typeFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [tasks, query, statusFilter, priorityFilter, typeFilter]);

  const summary = useMemo(
    () => ({
      total: tasks.length,
      scheduled: tasks.filter((task) => task.status === "Scheduled").length,
      overdue: tasks.filter((task) => task.status === "Overdue").length,
      completed: tasks.filter((task) => task.status === "Completed").length,
    }),
    [tasks],
  );

  function handleAdd(task: MaintenanceTask) {
    setTasks((current) => [task, ...current]);
  }

  function handleDelete(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
    if (selectedTask?.id === id) setSelectedTask(null);
  }

  function handleComplete(id: string) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status: "Completed" } : task)),
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
              MarineMind AI Maintenance Control
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Plan, track, and complete vessel maintenance tasks.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Manage scheduled work, overdue jobs, repair tasks, technician assignments, and
              AI-ready maintenance notes from one responsive page.
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 sm:grid-cols-2 lg:w-80">
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Completed</p>
              <p className="mt-2 text-3xl font-black text-emerald-300">{summary.completed}</p>
            </motion.div>
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Overdue</p>
              <p className="mt-2 text-3xl font-black text-red-300">{summary.overdue}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={ClipboardCheck} label="Total Tasks" value={summary.total} note="All maintenance records" className="bg-cyan-500/15 text-cyan-700" />
        <SummaryCard icon={CalendarClock} label="Scheduled" value={summary.scheduled} note="Planned maintenance" className="bg-sky-500/15 text-sky-700" />
        <SummaryCard icon={AlertTriangle} label="Overdue" value={summary.overdue} note="Needs action now" className="bg-red-500/15 text-red-700" />
        <SummaryCard icon={CheckCircle2} label="Completed" value={summary.completed} note="Closed work orders" className="bg-emerald-500/15 text-emerald-700" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-4 sm:p-5">
                <div className="grid gap-3 xl:grid-cols-[1fr_160px_160px_160px_auto]">
                  <motion.div
                    className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3"
                    whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(14, 165, 233, 0.08)" }}
                    transition={spring}
                  >
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search task, equipment, technician, or status..."
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </motion.div>

                  <SelectFilter icon={Filter} value={statusFilter} onChange={setStatusFilter} options={maintenanceStatusOptions} />
                  <SelectFilter icon={Gauge} value={priorityFilter} onChange={setPriorityFilter} options={maintenancePriorityOptions} />
                  <SelectFilter icon={Wrench} value={typeFilter} onChange={setTypeFilter} options={maintenanceTypeOptions} />

                  <div className="flex rounded-2xl border bg-slate-50 p-1">
                    {(["board", "table"] as const).map((mode) => (
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

          {viewMode === "board" ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {maintenanceBoardColumns.map((column) => {
                const columnTasks = filteredTasks.filter((task) => task.status === column);
                return (
                  <HoverCard key={column} lift={false} className="rounded-3xl border-0 bg-white/70 shadow-sm">
                    <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                      <CardContent className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-black text-slate-950">{column}</h3>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                            {columnTasks.length}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <AnimatePresence mode="popLayout">
                            {columnTasks.map((task) => (
                              <MaintenanceCard
                                key={task.id}
                                task={task}
                                onSelect={setSelectedTask}
                                onDelete={handleDelete}
                                onComplete={handleComplete}
                              />
                            ))}
                          </AnimatePresence>
                          {columnTasks.length === 0 && (
                            <div className="rounded-3xl border border-dashed bg-white p-6 text-center text-sm text-slate-500">
                              No tasks in this column.
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </HoverCard>
                );
              })}
            </div>
          ) : (
            <HoverCard lift={false} className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
              <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1080px] text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          {["Task", "Equipment", "Technician", "Date", "Priority", "Status", "Actions"].map(
                            (h) => (
                              <th key={h} className="px-5 py-4 font-semibold">
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTasks.map((task) => (
                          <HoverTableRow key={task.id}>
                            <td className="px-5 py-4">
                              <p className="font-black text-slate-950">{task.type}</p>
                              <p className="text-xs text-slate-500">{task.id}</p>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{task.equipment}</td>
                            <td className="px-5 py-4 text-slate-600">{task.technician}</td>
                            <td className="px-5 py-4 text-slate-600">
                              {task.date} • {task.time}
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${maintenancePriorityStyle(task.priority)}`}
                              >
                                {task.priority}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold ${maintenanceStatusStyle(task.status)}`}
                              >
                                {task.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <HoverPressable>
                                <Button
                                  onClick={() => setSelectedTask(task)}
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

          {filteredTasks.length === 0 && (
            <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
              <Card className="rounded-3xl border-0 bg-transparent shadow-none">
                <CardContent className="grid min-h-72 place-items-center p-8 text-center">
                  <div>
                    <Search className="mx-auto mb-4 h-10 w-10 text-slate-300" />
                    <h3 className="text-xl font-black text-slate-950">No maintenance task found</h3>
                    <p className="mt-2 text-slate-500">Try changing your search or filters.</p>
                  </div>
                </CardContent>
              </Card>
            </HoverCard>
          )}
        </div>

        <div className="space-y-6">
          <MaintenanceForm onAdd={handleAdd} />

          <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">Maintenance Timeline</h3>
                    <p className="text-sm text-slate-500">Live task movement</p>
                  </div>
                  <motion.span whileHover={{ scale: 1.15, rotate: 8 }} transition={spring}>
                    <ShipWheel className="h-6 w-6 text-cyan-600" />
                  </motion.span>
                </div>
                <div className="mt-5 space-y-3">
                  {maintenanceTimeline.map((activity) => (
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
        {selectedTask && <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} />}
      </AnimatePresence>
    </>
  );
}
