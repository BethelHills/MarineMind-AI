import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateAIResponse } from "./ai-assistant-utils";

const diagnosticInputSchema = z.object({
  message: z.string().min(1),
  equipment: z.string().min(1),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .optional(),
});

const systemPrompt = `You are MarineMind AI, a marine equipment diagnostic assistant for vessel maintenance teams.
Provide concise, practical guidance: possible causes, inspection steps, and recommended maintenance actions.
Focus on safety first. Use clear bullet-style sentences when helpful. Keep responses under 200 words unless more detail is essential.`;

export const getDiagnosticReply = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => diagnosticInputSchema.parse(data))
  .handler(async ({ data }) => {
    const recentHistory = (data.history ?? []).slice(-8).map((entry) => ({
      role: entry.role,
      content: entry.content,
    }));

    try {
      const { createChatCompletion } = await import("./openai.server");

      return await createChatCompletion([
        { role: "system", content: `${systemPrompt}\n\nSelected equipment: ${data.equipment}` },
        ...recentHistory,
        { role: "user", content: data.message },
      ]);
    } catch (error) {
      console.error("OpenAI diagnostic chat failed:", error);
      return generateAIResponse(data.message, data.equipment);
    }
  });
