import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, Activity, Wrench, Bell, BarChart3, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MarineMind AI — AI-Powered Maintenance for Marine Operations" },
      { name: "description", content: "Smart maintenance. Fewer breakdowns. Safer operations. AI diagnostics, predictive alerts, and reports for marine fleets." },
      { property: "og:title", content: "MarineMind AI" },
      { property: "og:description", content: "AI-powered maintenance assistant for marine operations." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

const features = [
  { icon: Activity, label: "AI Diagnostics" },
  { icon: Wrench, label: "Maintenance Tracking" },
  { icon: Bell, label: "Predictive Alerts" },
  { icon: BarChart3, label: "Reports & Analytics" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-12 rounded-xl bg-primary/10 grid place-items-center text-primary">
            <Anchor className="size-7" />
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">MarineMind AI</span>
        </div>
        <p className="text-sm text-muted-foreground mb-10">
          AI-Powered Maintenance<br />Assistant for Marine Operations
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
          Smart maintenance.<br />Fewer breakdowns.<br />Safer operations.
        </h1>
        <ul className="mt-10 space-y-4">
          {features.map((f) => (
            <li key={f.label} className="flex items-center gap-3 text-foreground">
              <span className="size-6 rounded-full bg-primary/10 grid place-items-center text-primary">
                <f.icon className="size-3.5" />
              </span>
              <span className="text-base">{f.label}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/dashboard"
          className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
        >
          Open Dashboard <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
