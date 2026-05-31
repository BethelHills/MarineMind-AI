import { Link } from "@tanstack/react-router";
import { StatCard, MarineCard } from "@/components/marine-ui";
import { HoverCard, HoverPressable, HoverRow } from "@/components/motion";
import {
  AlertTriangle,
  Bot,
  CalendarClock,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { chartData, maintenanceRows, pieData } from "@/lib/marine-dashboard-data";
import { statusStyle } from "@/lib/status-style";
import { spring } from "@/lib/motion";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Gauge}
          title="Total Equipment"
          value="28"
          note="Across 4 vessel sections"
          tone="bg-cyan-500/15 text-cyan-700"
        />
        <StatCard
          icon={AlertTriangle}
          title="Active Alerts"
          value="5"
          note="1 critical, 3 warnings"
          tone="bg-red-500/15 text-red-700"
        />
        <StatCard
          icon={CalendarClock}
          title="Maintenance Due"
          value="9"
          note="Next 7 days"
          tone="bg-amber-500/15 text-amber-700"
        />
        <StatCard
          icon={ShieldCheck}
          title="Fleet Health"
          value="82%"
          note="+4% from last week"
          tone="bg-emerald-500/15 text-emerald-700"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <MarineCard>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-950">Equipment Health Trend</h3>
              <p className="text-sm text-slate-500">Weekly equipment performance overview</p>
            </div>
            <HoverPressable>
              <Button variant="outline" className="rounded-2xl">
                View Report
              </Button>
            </HoverPressable>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="health" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#health)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MarineCard>

        <HoverCard className="rounded-3xl border-0 bg-[#03131f] text-white shadow-sm">
          <Card className="rounded-3xl border-0 bg-transparent text-white shadow-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-black">AI Maintenance Insight</h3>
              <p className="mt-2 text-sm text-slate-400">Generated from recent equipment logs.</p>
              <motion.div
                className="mt-6 rounded-3xl bg-white/8 p-5"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.12)" }}
                transition={spring}
              >
                <Bot className="mb-4 h-8 w-8 text-cyan-300" />
                <p className="leading-7 text-slate-200">
                  Cooling Pump CP-04 shows abnormal vibration. Inspect bearings, alignment, and
                  suction line restriction before next operation cycle.
                </p>
              </motion.div>
              <HoverPressable className="mt-5 block">
                <Button
                  asChild
                  className="w-full rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                >
                  <Link to="/ai-assistant">Open AI Assistant</Link>
                </Button>
              </HoverPressable>
            </CardContent>
          </Card>
        </HoverCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <MarineCard>
          <h3 className="text-xl font-black text-slate-950">Upcoming Maintenance</h3>
          <div className="mt-5 space-y-3">
            {maintenanceRows.slice(0, 3).map((item) => (
              <HoverRow
                key={item.equipment}
                className="flex list-none items-center justify-between rounded-2xl border bg-slate-50 p-4"
              >
                <div>
                  <p className="font-bold text-slate-950">{item.equipment}</p>
                  <p className="text-sm text-slate-500">
                    {item.type} • {item.technician}
                  </p>
                </div>
                <motion.span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(item.status)}`}
                  whileHover={{ scale: 1.1 }}
                  transition={spring}
                >
                  {item.status}
                </motion.span>
              </HoverRow>
            ))}
          </div>
        </MarineCard>

        <MarineCard>
          <h3 className="text-xl font-black text-slate-950">Health Distribution</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={58} outerRadius={90} paddingAngle={4}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </MarineCard>
      </div>
    </div>
  );
}
