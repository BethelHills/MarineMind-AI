type ChatHistoryEntry = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message: string;
  equipment: string;
  history?: ChatHistoryEntry[];
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function sendChatMessage({ message, equipment, history }: ChatRequest) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, equipment, history }),
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(errorBody?.error ?? "Failed to reach AI backend");
  }

  const data = (await response.json()) as { reply?: string };
  return data.reply ?? "";
}
