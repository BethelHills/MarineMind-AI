type ChatHistoryEntry = {
  role: "user" | "assistant";
  text: string;
  time?: string;
};

export async function getMarineMindResponse(
  message: string,
  equipment: string,
  history: ChatHistoryEntry[] = [],
) {
  const API_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${API_URL}/api/ai-diagnose`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      equipment,
      history: history.map(({ role, text }) => ({ role, text })),
    }),
  });

  const data = (await response.json()) as { reply?: string; error?: string };

  if (!response.ok) {
    throw new Error(data.error || "Failed to get AI response.");
  }

  return data.reply ?? "";
}
