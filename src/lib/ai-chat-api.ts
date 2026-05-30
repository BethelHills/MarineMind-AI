type ChatHistoryEntry = {
  role: "user" | "assistant";
  text: string;
};

export async function getMarineMindResponse(
  message: string,
  equipment: string,
  history: ChatHistoryEntry[] = [],
) {
  const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

  const response = await fetch(`${apiUrl}/api/ai-diagnose`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      equipment,
      history,
    }),
  });

  const data = (await response.json()) as { reply?: string; error?: string };

  if (!response.ok) {
    throw new Error(data.error || "Failed to get AI response.");
  }

  return data.reply ?? "";
}
