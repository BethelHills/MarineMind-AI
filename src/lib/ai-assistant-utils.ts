import { generateStructuredFallback } from "./agent-prompt";
import type { ChatMessage } from "./ai-assistant-data";

export function historyStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Warning: "bg-amber-500/15 text-amber-700 border-amber-200",
    Critical: "bg-red-500/15 text-red-700 border-red-200",
    Resolved: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
  };
  return styles[status] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function generateAIResponse(prompt: string, equipment: string) {
  return generateStructuredFallback(prompt, equipment);
}

type SpeechRecognitionResultList = {
  [index: number]: { [index: number]: { transcript: string } };
  length: number;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: SpeechRecognitionResultList;
};

export type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

export function createSpeechRecognition(): SpeechRecognitionInstance | null {
  if (typeof window === "undefined") return null;
  const windowWithSpeech = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  };
  const SpeechRecognitionCtor =
    windowWithSpeech.SpeechRecognition ?? windowWithSpeech.webkitSpeechRecognition;
  return SpeechRecognitionCtor ? new SpeechRecognitionCtor() : null;
}

export function downloadChatTranscript(messages: ChatMessage[], equipment: string) {
  const header = [
    "MarineMind AI — Chat Export",
    `Equipment: ${equipment}`,
    `Exported: ${new Date().toLocaleString()}`,
    "-".repeat(52),
    "",
  ].join("\n");

  const body = messages
    .map((message) => {
      const speaker = message.role === "user" ? "Engineer" : "MarineMind AI";
      return `[${message.time}] ${speaker}:\n${message.text}`;
    })
    .join("\n\n");

  const blob = new Blob([`${header}${body}\n`], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `marinemind-chat-${new Date().toISOString().slice(0, 10)}.txt`;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
