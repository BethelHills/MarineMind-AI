import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Gauge,
  ShieldCheck,
  Wrench,
  BellRing,
  FileText,
  ArrowRight,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cardHover, spring } from "@/lib/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MarineMind AI — AI-Powered Maintenance for Marine Operations" },
      {
        name: "description",
        content:
          "Smart maintenance. Fewer breakdowns. Safer operations. AI diagnostics, predictive alerts, and reports for marine fleets.",
      },
      { property: "og:title", content: "MarineMind AI" },
      {
        property: "og:description",
        content: "AI-powered maintenance assistant for marine operations.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: MarineMindLandingPage,
});

const features = [
  {
    icon: Bot,
    title: "AI Diagnostics",
    text: "Describe a fault and get clear possible causes, checks, and maintenance actions.",
  },
  {
    icon: Wrench,
    title: "Maintenance Tracking",
    text: "Log repairs, inspections, spare parts, and service history for each equipment.",
  },
  {
    icon: BellRing,
    title: "Smart Alerts",
    text: "Know what equipment needs attention before small issues become breakdowns.",
  },
  {
    icon: FileText,
    title: "Reports",
    text: "Generate clean maintenance reports for teams, engineers, and managers.",
  },
];

const stats = [
  { label: "Equipment Tracked", value: "28+" },
  { label: "Active Alerts", value: "5" },
  { label: "Health Score", value: "82%" },
];

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#demo", label: "Demo" },
];

const checklistItems = ["Equipment logs", "AI fault checks", "Maintenance reports"];

const alertItems = [
  { text: "Main Engine inspection due in 2 days", tone: "due" as const },
  { text: "Fuel Purifier service due in 5 days", tone: "due" as const },
  { text: "Cooling Pump warning detected", tone: "warning" as const },
];

const workflowSteps = [
  ["01", "Add Equipment", "Register engines, pumps, generators, and other key vessel assets."],
  [
    "02",
    "Log Faults",
    "Record symptoms, inspections, maintenance actions, and engineer notes.",
  ],
  [
    "03",
    "Get AI Guidance",
    "Receive possible causes, recommended checks, and report-ready summaries.",
  ],
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      className="relative text-slate-300"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
    >
      <motion.span variants={{ rest: { color: "#cbd5e1" }, hover: { color: "#ffffff" } }}>
        {label}
      </motion.span>
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-cyan-300"
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.25 }}
      />
    </motion.a>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" className="h-full">
      <motion.div variants={cardHover}>
        <Card className="group h-full cursor-pointer overflow-hidden rounded-3xl border-white/10 bg-white/8 backdrop-blur transition-colors hover:border-cyan-300/40 hover:bg-white/12 hover:shadow-[0_20px_50px_rgba(34,211,238,0.12)]">
          <CardContent className="p-6">
            <motion.div
              className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15"
              variants={{
                rest: { scale: 1, rotate: 0 },
                hover: { scale: 1.12, rotate: -6 },
              }}
              transition={spring}
            >
              <Icon className="h-6 w-6 text-cyan-300" />
            </motion.div>
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-lg font-bold text-white">{title}</h4>
              <motion.span
                className="mt-1 text-cyan-300 opacity-0"
                variants={{ rest: { opacity: 0, x: -6 }, hover: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </div>
            <motion.p
              className="mt-3 text-sm leading-7 text-slate-300"
              variants={{ rest: { color: "#cbd5e1" }, hover: { color: "#e2e8f0" } }}
            >
              {text}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function MarineMindLandingPage() {
  return (
    <div className="min-h-screen bg-[#03131f] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1d9bf0_0%,transparent_28%),radial-gradient(circle_at_top_left,#16d6a5_0%,transparent_24%)] opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between py-6">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={spring}
          >
            <Logo size="md" />
            <div>
              <h1 className="text-lg font-bold tracking-tight">MarineMind AI</h1>
              <p className="text-xs text-slate-300">Smart marine maintenance</p>
            </div>
          </motion.div>

          <div className="hidden items-center gap-7 text-sm md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={spring}>
            <Button
              asChild
              className="rounded-full bg-cyan-400 px-5 text-slate-950 hover:bg-cyan-300"
            >
              <Link to="/dashboard">Open Dashboard</Link>
            </Button>
          </motion.div>
        </nav>

        <section className="grid gap-12 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/5 px-4 py-2 text-sm text-cyan-100 backdrop-blur"
              whileHover={{ scale: 1.04, borderColor: "rgba(103, 232, 249, 0.6)" }}
              transition={spring}
            >
              <motion.span animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Activity className="h-4 w-4 text-cyan-300" />
              </motion.span>
              Built for #BuildQuik
            </motion.div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              AI-powered maintenance for safer marine operations.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              MarineMind AI helps engineers track equipment health, manage maintenance schedules,
              diagnose faults, and reduce unexpected breakdowns.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                <Button
                  asChild
                  className="group h-12 rounded-full bg-cyan-400 px-7 text-base font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  <Link to="/dashboard" className="inline-flex items-center">
                    Start Building
                    <motion.span
                      className="ml-2 inline-flex"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={spring}
                    >
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-base text-white hover:border-cyan-300/40 hover:bg-white/10"
                >
                  <a href="#demo">View Demo</a>
                </Button>
              </motion.div>
            </div>

            <div className="mt-8 grid max-w-xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {checklistItems.map((item) => (
                <motion.div
                  key={item}
                  className="flex cursor-default items-center gap-2 rounded-xl px-2 py-1.5"
                  whileHover={{ x: 4, color: "#ffffff", backgroundColor: "rgba(255,255,255,0.06)" }}
                  transition={spring}
                >
                  <motion.span whileHover={{ scale: 1.2, rotate: 8 }} transition={spring}>
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  </motion.span>
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="demo"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="absolute -inset-4 rounded-[2rem] bg-cyan-400/20 blur-3xl"
              animate={{ opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl transition-colors hover:border-cyan-300/30">
              <CardContent className="p-5 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Live Dashboard</p>
                    <h3 className="text-2xl font-bold text-white">Vessel Health Overview</h3>
                  </div>
                  <motion.div
                    className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200"
                    whileHover={{ scale: 1.08 }}
                    transition={spring}
                  >
                    Healthy
                  </motion.div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="cursor-pointer rounded-2xl border border-white/10 bg-[#061d2e]/80 p-4"
                      whileHover={{
                        y: -6,
                        scale: 1.04,
                        borderColor: "rgba(103, 232, 249, 0.45)",
                        boxShadow: "0 12px 30px rgba(34, 211, 238, 0.15)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={spring}
                    >
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <motion.p
                        className="mt-2 text-3xl font-black text-white"
                        whileHover={{ scale: 1.08, color: "#67e8f9" }}
                        transition={spring}
                      >
                        {stat.value}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-5 cursor-pointer rounded-3xl border border-white/10 bg-[#061d2e]/80 p-5"
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(103, 232, 249, 0.35)",
                    backgroundColor: "rgba(6, 29, 46, 0.95)",
                  }}
                  transition={spring}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-bold text-white">AI Insight</h4>
                    <motion.span whileHover={{ rotate: 90, scale: 1.15 }} transition={spring}>
                      <Gauge className="h-5 w-5 text-cyan-300" />
                    </motion.span>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">
                    Main Engine ME-01 shows rising exhaust temperature and vibration. Inspect
                    cooling line, fuel injector, and engine mounts.
                  </p>
                </motion.div>

                <div className="mt-5 space-y-3">
                  {alertItems.map((item) => (
                    <motion.div
                      key={item.text}
                      className="flex cursor-pointer items-center justify-between rounded-2xl bg-white/5 px-4 py-3"
                      whileHover={{
                        x: 6,
                        scale: 1.01,
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                      whileTap={{ scale: 0.99 }}
                      transition={spring}
                    >
                      <span className="text-sm text-slate-200">{item.text}</span>
                      <motion.span
                        className={`rounded-full px-3 py-1 text-xs ${
                          item.tone === "warning"
                            ? "bg-amber-400/15 text-amber-200"
                            : "bg-cyan-400/15 text-cyan-200"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        transition={spring}
                      >
                        {item.tone === "warning" ? "Warning" : "Due"}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="features" className="py-14">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Core Features
            </p>
            <h3 className="mt-3 text-3xl font-black sm:text-4xl">
              Everything needed to manage marine equipment smarter.
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section id="workflow" className="grid gap-8 py-16 lg:grid-cols-3">
          {workflowSteps.map(([step, title, text]) => (
            <motion.div
              key={step}
              className="cursor-pointer rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7"
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              variants={{
                rest: { y: 0, scale: 1, borderColor: "rgba(255,255,255,0.1)" },
                hover: {
                  y: -10,
                  scale: 1.03,
                  borderColor: "rgba(103, 232, 249, 0.45)",
                  boxShadow: "0 24px 50px rgba(34, 211, 238, 0.12)",
                },
              }}
              transition={spring}
            >
              <motion.p
                className="text-sm font-bold text-cyan-300"
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
              >
                {step}
              </motion.p>
              <h4 className="mt-4 text-2xl font-black">{title}</h4>
              <p className="mt-3 leading-7 text-slate-300">{text}</p>
            </motion.div>
          ))}
        </section>

        <section className="pb-20">
          <motion.div
            className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 text-center sm:p-12"
            whileHover={{
              scale: 1.01,
              borderColor: "rgba(103, 232, 249, 0.5)",
              boxShadow: "0 24px 60px rgba(34, 211, 238, 0.15)",
            }}
            transition={spring}
          >
            <motion.div whileHover={{ scale: 1.12, rotate: 6 }} transition={spring}>
              <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-cyan-300" />
            </motion.div>
            <h3 className="text-3xl font-black sm:text-4xl">
              Reduce breakdowns. Improve maintenance decisions.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
              A practical AI assistant for marine engineers, vessel operators, and maintenance teams
              who need fast, clear, and organized equipment support.
            </p>
            <motion.div
              className="mt-7 inline-block"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              <Button
                asChild
                className="group h-12 rounded-full bg-white px-7 text-base font-semibold text-slate-950 hover:bg-slate-200"
              >
                <Link to="/dashboard" className="inline-flex items-center">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
