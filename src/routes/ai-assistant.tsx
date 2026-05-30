import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MarineCard, PageShell } from "@/components/marine-ui";
import { HoverPressable, HoverRow } from "@/components/motion";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aiHistory, aiSuggestedChecks } from "@/lib/marine-dashboard-data";
import { spring } from "@/lib/motion";
import { useState } from "react";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — MarineMind AI" },
      { name: "description", content: "Ask the AI assistant about equipment, faults, or maintenance." },
    ],
  }),
  component: AIAssistantPage,
});

function AIAssistantPage() {
  const [input, setInput] = useState("");

  return (
    <AppShell title="AI Assistant">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.4fr_0.8fr]">
        <MarineCard>
          <h3 className="text-xl font-black">History</h3>
          <div className="mt-5 space-y-3">
            {aiHistory.map((chat) => (
              <HoverRow
                key={chat}
                className="list-none rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700"
              >
                {chat}
              </HoverRow>
            ))}
          </div>
        </MarineCard>

        <MarineCard>
          <h3 className="text-xl font-black">AI Diagnostic Assistant</h3>
          <motion.div
            className="mt-5 rounded-3xl bg-[#03131f] p-5 text-white"
            whileHover={{ scale: 1.01 }}
            transition={spring}
          >
            <p className="text-sm text-slate-400">Engineer input</p>
            <p className="mt-2">Main engine temperature is rising after 3 hours of operation.</p>
          </motion.div>
          <motion.div
            className="mt-4 rounded-3xl bg-cyan-50 p-5"
            whileHover={{ scale: 1.01, boxShadow: "0 12px 30px rgba(14, 165, 233, 0.12)" }}
            transition={spring}
          >
            <p className="text-sm font-bold text-cyan-700">AI Response</p>
            <p className="mt-2 leading-7 text-slate-700">
              Possible causes: restricted cooling line, dirty heat exchanger, faulty thermostat, or
              fuel injector imbalance. Recommended action: inspect cooling flow, check exhaust
              temperature, and review last maintenance log.
            </p>
          </motion.div>
          <motion.div
            className="mt-5 flex gap-3 rounded-2xl border bg-slate-50 p-3"
            whileHover={{ scale: 1.01 }}
            transition={spring}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              placeholder="Describe equipment fault..."
            />
            <HoverPressable>
              <Button className="rounded-xl bg-cyan-500 hover:bg-cyan-600">Send</Button>
            </HoverPressable>
          </motion.div>
        </MarineCard>

        <MarineCard>
          <h3 className="text-xl font-black">Suggested Checks</h3>
          <div className="mt-5 space-y-3">
            {aiSuggestedChecks.map((item) => (
              <HoverRow
                key={item}
                className="flex list-none items-center gap-3 rounded-2xl border p-4"
              >
                <motion.span whileHover={{ scale: 1.15, rotate: 8 }} transition={spring}>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </motion.span>
                <span className="text-sm text-slate-700">{item}</span>
              </HoverRow>
            ))}
          </div>
        </MarineCard>
      </div>
    </AppShell>
  );
}
