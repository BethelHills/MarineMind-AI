import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Anchor,
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

function MarineMindLandingPage() {
  return (
    <div className="min-h-screen bg-[#03131f] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1d9bf0_0%,transparent_28%),radial-gradient(circle_at_top_left,#16d6a5_0%,transparent_24%)] opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-300/30">
              <Anchor className="h-6 w-6 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">MarineMind AI</h1>
              <p className="text-xs text-slate-300">Smart marine maintenance</p>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#workflow" className="hover:text-white">
              Workflow
            </a>
            <a href="#demo" className="hover:text-white">
              Demo
            </a>
          </div>

          <Button
            asChild
            className="rounded-full bg-cyan-400 px-5 text-slate-950 hover:bg-cyan-300"
          >
            <Link to="/dashboard">Open Dashboard</Link>
          </Button>
        </nav>

        <section className="grid gap-12 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/5 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
              <Activity className="h-4 w-4 text-cyan-300" />
              Built for #BuildQuik
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              AI-powered maintenance for safer marine operations.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              MarineMind AI helps engineers track equipment health, manage maintenance schedules,
              diagnose faults, and reduce unexpected breakdowns.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-cyan-400 px-7 text-base font-semibold text-slate-950 hover:bg-cyan-300"
              >
                <Link to="/dashboard">
                  Start Building <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10"
              >
                <a href="#demo">View Demo</a>
              </Button>
            </div>

            <div className="mt-8 grid max-w-xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {["Equipment logs", "AI fault checks", "Maintenance reports"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="demo"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/20 blur-3xl" />
            <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
              <CardContent className="p-5 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Live Dashboard</p>
                    <h3 className="text-2xl font-bold text-white">Vessel Health Overview</h3>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">
                    Healthy
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-[#061d2e]/80 p-4"
                    >
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <p className="mt-2 text-3xl font-black text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-[#061d2e]/80 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-bold text-white">AI Insight</h4>
                    <Gauge className="h-5 w-5 text-cyan-300" />
                  </div>
                  <p className="text-sm leading-7 text-slate-300">
                    Main Engine ME-01 shows rising exhaust temperature and vibration. Inspect
                    cooling line, fuel injector, and engine mounts.
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Main Engine inspection due in 2 days",
                    "Fuel Purifier service due in 5 days",
                    "Cooling Pump warning detected",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"
                    >
                      <span className="text-sm text-slate-200">{item}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${index === 2 ? "bg-amber-400/15 text-amber-200" : "bg-cyan-400/15 text-cyan-200"}`}
                      >
                        {index === 2 ? "Warning" : "Due"}
                      </span>
                    </div>
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
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="rounded-3xl border-white/10 bg-white/8 backdrop-blur transition hover:-translate-y-1 hover:bg-white/12"
                >
                  <CardContent className="p-6">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15">
                      <Icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <h4 className="text-lg font-bold text-white">{feature.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{feature.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="workflow" className="grid gap-8 py-16 lg:grid-cols-3">
          {[
            [
              "01",
              "Add Equipment",
              "Register engines, pumps, generators, and other key vessel assets.",
            ],
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
          ].map(([step, title, text]) => (
            <div
              key={step}
              className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7"
            >
              <p className="text-sm font-bold text-cyan-300">{step}</p>
              <h4 className="mt-4 text-2xl font-black">{title}</h4>
              <p className="mt-3 leading-7 text-slate-300">{text}</p>
            </div>
          ))}
        </section>

        <section className="pb-20">
          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 text-center sm:p-12">
            <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-cyan-300" />
            <h3 className="text-3xl font-black sm:text-4xl">
              Reduce breakdowns. Improve maintenance decisions.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
              A practical AI assistant for marine engineers, vessel operators, and maintenance teams
              who need fast, clear, and organized equipment support.
            </p>
            <Button
              asChild
              className="mt-7 h-12 rounded-full bg-white px-7 text-base font-semibold text-slate-950 hover:bg-slate-200"
            >
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
