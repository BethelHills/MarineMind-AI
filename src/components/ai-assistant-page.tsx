import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Anchor,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Copy,
  Gauge,
  History,
  Lightbulb,
  Loader2,
  Mic,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  ThermometerSun,
  Trash2,
  Upload,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverPressable, HoverRow } from "@/components/motion";
import { spring } from "@/lib/motion";
import { sendChatMessage } from "@/lib/ai-chat-api";
import {
  aiSuggestedChecks,
  commonFaultAreas,
  conversationHistory,
  equipmentOptions,
  initialMessages,
  quickPrompts,
  type ChatMessage,
} from "@/lib/ai-assistant-data";
import { generateAIResponse, historyStatusStyle } from "@/lib/ai-assistant-utils";

const faultAreaIcons: Record<string, LucideIcon> = {
  Temperature: ThermometerSun,
  Pressure: Gauge,
  Mechanical: Wrench,
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

function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  async function handleCopy() {
    await navigator.clipboard.writeText(message.text);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <motion.div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700"
          whileHover={{ scale: 1.1, rotate: -6 }}
          transition={spring}
        >
          <Bot className="h-5 w-5" />
        </motion.div>
      )}

      <div
        className={`max-w-[85%] rounded-3xl p-4 sm:max-w-[75%] ${
          isUser ? "bg-[#03131f] text-white" : "bg-white text-slate-800 shadow-sm"
        }`}
      >
        <p className="text-sm leading-7">{message.text}</p>
        <div
          className={`mt-3 flex items-center justify-between gap-4 text-xs ${
            isUser ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <span>{message.time}</span>
          {!isUser && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 hover:text-cyan-600"
            >
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <motion.div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-900 text-white"
          whileHover={{ scale: 1.1 }}
          transition={spring}
        >
          <UserRound className="h-5 w-5" />
        </motion.div>
      )}
    </motion.div>
  );
}

function HistoryPanel({
  active,
  setActive,
}: {
  active: string;
  setActive: (title: string) => void;
}) {
  return (
    <HoverCard lift={false} className="h-full rounded-3xl border-0 bg-white shadow-sm">
      <Card className="h-full rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-950">History</h3>
              <p className="text-sm text-slate-500">Recent diagnostics</p>
            </div>
            <HoverPressable>
              <Button size="sm" variant="outline" className="rounded-xl">
                <Plus className="h-4 w-4" />
              </Button>
            </HoverPressable>
          </div>

          <motion.div
            className="flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3"
            whileHover={{ scale: 1.01 }}
            transition={spring}
          >
            <Search className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search history..."
            />
          </motion.div>

          <div className="mt-5 space-y-3">
            {conversationHistory.map((item) => (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => setActive(item.title)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={spring}
                className={`w-full rounded-2xl border p-4 text-left transition hover:bg-slate-50 ${
                  active === item.title ? "border-cyan-200 bg-cyan-50" : "border-slate-100 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${historyStatusStyle(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function RecommendationPanel({ selectedEquipment }: { selectedEquipment: string }) {
  return (
    <div className="space-y-6">
      <HoverCard lift={false} className="rounded-3xl border-0 bg-[#03131f] text-white shadow-sm">
        <Card className="rounded-3xl border-0 bg-transparent text-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-black">AI Context</h3>
                <p className="mt-1 text-sm text-slate-400">Selected equipment</p>
              </div>
              <motion.span whileHover={{ rotate: 12, scale: 1.1 }} transition={spring}>
                <BrainCircuit className="h-7 w-7 text-cyan-300" />
              </motion.span>
            </div>
            <motion.div
              className="mt-5 rounded-3xl bg-white/8 p-4"
              whileHover={{ scale: 1.02 }}
              transition={spring}
            >
              <p className="text-sm text-slate-400">Current Asset</p>
              <p className="mt-2 text-xl font-black">{selectedEquipment}</p>
            </motion.div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
                <p className="text-xs text-slate-400">Risk Level</p>
                <p className="mt-2 font-black text-amber-300">Medium</p>
              </motion.div>
              <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
                <p className="text-xs text-slate-400">Confidence</p>
                <p className="mt-2 font-black text-cyan-300">86%</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </HoverCard>

      <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
        <Card className="rounded-3xl border-0 bg-transparent shadow-none">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-950">Suggested Checks</h3>
                <p className="text-sm text-slate-500">Use this before field inspection</p>
              </div>
              <ClipboardList className="h-6 w-6 text-cyan-600" />
            </div>
            <div className="space-y-3">
              {aiSuggestedChecks.map((item) => (
                <HoverRow key={item} className="flex list-none items-start gap-3 rounded-2xl border bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </HoverRow>
              ))}
            </div>
          </CardContent>
        </Card>
      </HoverCard>

      <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
        <Card className="rounded-3xl border-0 bg-transparent shadow-none">
          <CardContent className="p-5">
            <h3 className="text-lg font-black text-slate-950">Common Fault Areas</h3>
            <div className="mt-5 space-y-3">
              {commonFaultAreas.map(({ title, text }) => {
                const Icon = faultAreaIcons[title] ?? Wrench;
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
  );
}

export function AIAssistantPageContent() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState("Main Engine Alpha");
  const [activeHistory, setActiveHistory] = useState("Engine overheating");
  const [mobilePanel, setMobilePanel] = useState<"history" | "context" | null>(null);

  const stats = useMemo(() => {
    const assistantReplies = messages.filter((message) => message.role === "assistant").length;
    return {
      diagnostics: assistantReplies,
      activeFaults: 3,
      savedReports: 8,
      responseRate: "Fast",
    };
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const prompt = input.trim();
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage: ChatMessage = { role: "user", text: prompt, time: now };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendChatMessage({
        message: prompt,
        equipment: selectedEquipment,
        history: messages.map((message) => ({
          role: message.role,
          content: message.text,
        })),
      });

      setMessages((current) => [
        ...current,
        { role: "assistant", text: reply, time: now },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: generateAIResponse(prompt, selectedEquipment),
          time: now,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuickPrompt(prompt: string) {
    setInput(prompt);
  }

  function handleClearChat() {
    setMessages([
      {
        role: "assistant",
        text: "Chat cleared. Describe a new equipment fault and I will help you diagnose it.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
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
              MarineMind AI Diagnostic Assistant
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Diagnose marine equipment faults faster with AI.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Enter a fault description and get possible causes, inspection steps, and maintenance
              actions for vessel equipment.
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 sm:grid-cols-2 lg:w-80">
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Diagnostics</p>
              <p className="mt-2 text-3xl font-black text-cyan-300">{stats.diagnostics}</p>
            </motion.div>
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Response</p>
              <p className="mt-2 text-3xl font-black text-emerald-300">{stats.responseRate}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={Bot} label="AI Replies" value={stats.diagnostics} note="Generated in this chat" className="bg-cyan-500/15 text-cyan-700" />
        <SummaryCard icon={AlertTriangle} label="Active Faults" value={stats.activeFaults} note="Open equipment issues" className="bg-red-500/15 text-red-700" />
        <SummaryCard icon={ShieldCheck} label="Saved Reports" value={stats.savedReports} note="Ready for export" className="bg-emerald-500/15 text-emerald-700" />
        <SummaryCard icon={Sparkles} label="AI Mode" value="Assist" note="Maintenance guidance" className="bg-amber-500/15 text-amber-700" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[300px_1fr_330px]">
        <div className="hidden xl:block">
          <HistoryPanel active={activeHistory} setActive={setActiveHistory} />
        </div>

        <HoverCard lift={false} className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
          <Card className="rounded-3xl border-0 bg-transparent shadow-none">
            <CardContent className="p-0">
              <div className="border-b bg-white p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700"
                      whileHover={{ scale: 1.1, rotate: -6 }}
                      transition={spring}
                    >
                      <BrainCircuit className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-black text-slate-950">Marine Diagnostic Chat</h3>
                      <p className="text-sm text-slate-500">AI guidance for vessel maintenance teams</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                    <div className="relative">
                      <select
                        value={selectedEquipment}
                        onChange={(e) => setSelectedEquipment(e.target.value)}
                        className="w-full appearance-none rounded-2xl border bg-slate-50 px-4 py-3 pr-10 text-sm outline-none transition hover:border-cyan-300"
                      >
                        {equipmentOptions.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    <HoverPressable>
                      <Button
                        onClick={() => setMobilePanel("history")}
                        variant="outline"
                        className="rounded-2xl xl:hidden"
                      >
                        <History className="mr-2 h-4 w-4" /> History
                      </Button>
                    </HoverPressable>
                    <HoverPressable>
                      <Button
                        onClick={handleClearChat}
                        variant="outline"
                        className="rounded-2xl text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Clear
                      </Button>
                    </HoverPressable>
                  </div>
                </div>
              </div>

              <div className="h-[560px] overflow-y-auto bg-[#f8fcff] p-4 sm:p-6">
                <div className="space-y-5">
                  {messages.map((message, index) => (
                    <ChatMessageBubble
                      key={`${message.role}-${index}-${message.time}`}
                      message={message}
                    />
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div className="rounded-3xl bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Loader2 className="h-4 w-4 animate-spin text-cyan-600" />
                          Analyzing fault...
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="border-t bg-white p-4 sm:p-5">
                <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                  {quickPrompts.map((prompt) => (
                    <motion.button
                      key={prompt}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={spring}
                      className="shrink-0 rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
                    >
                      {prompt.slice(0, 42)}...
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-end gap-3 rounded-3xl border bg-slate-50 p-3">
                  <motion.button
                    type="button"
                    className="hidden rounded-2xl border bg-white p-3 text-slate-500 hover:text-cyan-600 sm:block"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={spring}
                  >
                    <Upload className="h-5 w-5" />
                  </motion.button>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void handleSend();
                      }
                    }}
                    disabled={isLoading}
                    placeholder="Describe the fault, symptoms, readings, or equipment behavior..."
                    className="min-h-12 flex-1 resize-none bg-transparent px-2 py-3 text-sm outline-none disabled:opacity-60"
                  />
                  <motion.button
                    type="button"
                    className="hidden rounded-2xl border bg-white p-3 text-slate-500 hover:text-cyan-600 sm:block"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={spring}
                  >
                    <Mic className="h-5 w-5" />
                  </motion.button>
                  <HoverPressable>
                    <Button
                      onClick={() => void handleSend()}
                      disabled={isLoading}
                      className="h-12 rounded-2xl bg-cyan-500 px-5 text-white hover:bg-cyan-600 disabled:opacity-60"
                    >
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </Button>
                  </HoverPressable>
                </div>
              </div>
            </CardContent>
          </Card>
        </HoverCard>

        <div className="hidden xl:block">
          <RecommendationPanel selectedEquipment={selectedEquipment} />
        </div>
      </section>

      <AnimatePresence>
        {mobilePanel && (
          <motion.div
            key="mobile-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/40 p-3 backdrop-blur-sm xl:hidden"
            onClick={() => setMobilePanel(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={spring}
              className="h-full overflow-y-auto rounded-[2rem] bg-[#f5fbff] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-950">
                  {mobilePanel === "history" ? "History" : "AI Context"}
                </h3>
                <HoverPressable>
                  <button
                    type="button"
                    onClick={() => setMobilePanel(null)}
                    className="rounded-2xl border bg-white p-3"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </HoverPressable>
              </div>
              {mobilePanel === "history" ? (
                <HistoryPanel active={activeHistory} setActive={setActiveHistory} />
              ) : (
                <RecommendationPanel selectedEquipment={selectedEquipment} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setMobilePanel("context")}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#03131f] text-white shadow-xl xl:hidden"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={spring}
      >
        <Lightbulb className="h-6 w-6" />
      </motion.button>
    </>
  );
}
