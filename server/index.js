import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import { buildSystemMessage, generateStructuredFallback } from "./agent-prompt.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env.local") });
dotenv.config({ path: path.join(rootDir, ".env") });

const app = express();
const port = Number(process.env.PORT) || 5000;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  return new OpenAI({ apiKey });
}

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:8081",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:8081",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "marinemind-ai-backend" });
});

app.post("/api/chat", async (req, res) => {
  const { message, equipment, history = [] } = req.body ?? {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }

  if (!equipment || typeof equipment !== "string" || !equipment.trim()) {
    return res.status(400).json({ error: "equipment is required" });
  }

  const recentHistory = Array.isArray(history)
    ? history
        .slice(-8)
        .filter(
          (entry) =>
            entry &&
            (entry.role === "user" || entry.role === "assistant") &&
            typeof entry.content === "string",
        )
        .map((entry) => ({
          role: entry.role,
          content: entry.content,
        }))
    : [];

  try {
    const client = getOpenAIClient();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: buildSystemMessage(equipment) },
        ...recentHistory,
        { role: "user", content: message.trim() },
      ],
    });

    const reply = response.choices[0]?.message?.content ?? "";
    return res.json({ reply });
  } catch (error) {
    console.error("OpenAI chat failed:", error);
    return res.json({ reply: generateStructuredFallback(message.trim(), equipment) });
  }
});

app.listen(port, () => {
  console.log(`MarineMind AI backend running on http://localhost:${port}`);
});
