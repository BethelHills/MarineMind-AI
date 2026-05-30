import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HoverCard, HoverPressable } from "@/components/motion";
import { Bot, Send, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { spring } from "@/lib/motion";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — MarineMind AI" }, { name: "description", content: "Ask the AI assistant about equipment, faults, or maintenance." }] }),
  component: AIAssistant,
});

interface Msg {
  role: "user" | "assistant";
  content: string;
  causes?: string[];
  actions?: string[];
  time?: string;
}

const initialMessages: Msg[] = [
  { role: "user", content: "Main engine temperature is high and vibration is increasing. What could be the problem?" },
  {
    role: "assistant",
    content: "Based on your description, possible causes include:",
    causes: ["Dirty fuel injector", "Turbocharger malfunction", "Cooling system blockage", "Worn engine mounts"],
    actions: ["Check and clean fuel injectors", "Inspect turbocharger for leaks", "Check cooler and sea water filters", "Inspect engine mounts"],
    time: "08:45 AM",
  },
];

function AIAssistant() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", content: input },
      { role: "assistant", content: "Thanks — I'll analyze the equipment logs and follow up shortly. (Demo response)", time: "Just now" },
    ]);
    setInput("");
  };

  return (
    <AppShell title="AI Assistant">
      <HoverCard lift={false} className="bg-card rounded-2xl border border-border max-w-3xl mx-auto flex flex-col hover:border-primary/25" style={{ height: "calc(100vh - 200px)" }}>
        <div className="text-center pt-8 pb-6 px-6 border-b border-border">
          <h2 className="text-xl font-semibold text-primary">MarineMind AI Assistant</h2>
          <p className="text-sm text-muted-foreground mt-1">Ask anything about your equipment, faults, or maintenance.</p>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: i * 0.03 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "user" ? (
                <motion.div
                  className="max-w-md bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 text-sm cursor-default"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={spring}
                >
                  {m.content}
                </motion.div>
              ) : (
                <div className="flex gap-3 max-w-xl">
                  <motion.div
                    className="size-9 rounded-full bg-primary/10 grid place-items-center text-primary shrink-0"
                    whileHover={{ scale: 1.12, rotate: -8 }}
                    transition={spring}
                  >
                    <Bot className="size-5" />
                  </motion.div>
                  <motion.div
                    className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm cursor-default"
                    whileHover={{ scale: 1.01, y: -2, boxShadow: "0 8px 24px oklch(0.55 0.22 275 / 0.08)" }}
                    transition={spring}
                  >
                    <p className="text-foreground">{m.content}</p>
                    {m.causes && (
                      <ul className="mt-2 space-y-1 list-disc pl-5 text-foreground">
                        {m.causes.map((c) => <li key={c}>{c}</li>)}
                      </ul>
                    )}
                    {m.actions && (
                      <>
                        <p className="mt-3 font-medium text-foreground">Recommended actions:</p>
                        <ul className="mt-1 space-y-1 text-foreground">
                          {m.actions.map((a) => (
                            <motion.li
                              key={a}
                              className="flex items-center gap-2"
                              whileHover={{ x: 4 }}
                              transition={spring}
                            >
                              <Check className="size-4 text-success-foreground shrink-0" /> {a}
                            </motion.li>
                          ))}
                        </ul>
                      </>
                    )}
                    {m.time && <div className="text-[10px] text-muted-foreground mt-2 text-right">{m.time}</div>}
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="border-t border-border p-4">
          <motion.div
            className="flex items-center gap-2 bg-muted rounded-full px-4 py-2"
            whileHover={{ scale: 1.01, boxShadow: "0 4px 16px oklch(0.55 0.22 275 / 0.06)" }}
            transition={spring}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            <HoverPressable>
              <button onClick={send} className="size-9 rounded-full bg-primary text-primary-foreground grid place-items-center hover:bg-primary/90">
                <Send className="size-4" />
              </button>
            </HoverPressable>
          </motion.div>
        </div>
      </HoverCard>
    </AppShell>
  );
}
