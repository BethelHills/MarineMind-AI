import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env.local") });
dotenv.config({ path: path.join(rootDir, ".env") });

const app = express();
const port = Number(process.env.PORT) || 3001;

const systemPrompt = `You are MarineMind AI, a marine equipment diagnostic assistant for vessel maintenance teams.
Provide concise, practical guidance: possible causes, inspection steps, and recommended maintenance actions.
Focus on safety first. Use clear bullet-style sentences when helpful. Keep responses under 200 words unless more detail is essential.`;

function generateFallbackResponse(prompt, equipment) {
  const text = prompt.toLowerCase();

  if (text.includes("temperature") || text.includes("overheat") || text.includes("hot")) {
    return `Analysis for ${equipment}: temperature rise may be linked to poor cooling flow, blocked heat exchanger, low coolant level, heavy load, or fuel injector imbalance. Start by checking cooling water pressure, coolant level, exhaust temperature reading, heat exchanger cleanliness, and engine load history. Suggested action: reduce load if needed, inspect cooling lines, and log readings before restarting full operation.`;
  }

  if (text.includes("vibration") || text.includes("shake")) {
    return `Analysis for ${equipment}: vibration can come from bearing wear, shaft misalignment, loose foundation bolts, cavitation, damaged coupling, or imbalance. Check bearing temperature, mounting bolts, alignment marks, suction pressure, and vibration trend. Suggested action: isolate the unit if vibration is increasing and inspect before continuous operation.`;
  }

  if (text.includes("voltage") || text.includes("generator") || text.includes("load")) {
    return `Analysis for ${equipment}: unstable voltage may be caused by automatic voltage regulator fault, unstable load, loose wiring, poor fuel supply, or governor issue. Check load changes, wiring terminals, AVR readings, fuel pressure, and generator frequency. Suggested action: record voltage trend and inspect control panel before adding more load.`;
  }

  if (text.includes("sludge") || text.includes("purifier") || text.includes("fuel")) {
    return `Analysis for ${equipment}: high sludge discharge may indicate dirty fuel, incorrect temperature, wrong gravity disc, poor separation, or bowl contamination. Check fuel temperature, bowl condition, sludge interval, sealing water, and purifier settings. Suggested action: clean the bowl and confirm the correct operating parameters.`;
  }

  return `Analysis for ${equipment}: based on the fault description, start with safe isolation, visual inspection, operating readings, last maintenance record, and abnormal sound, temperature, pressure, or vibration data. Suggested action: document the fault, inspect related components, and create a maintenance task for follow-up.`;
}

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
        { role: "system", content: `${systemPrompt}\n\nSelected equipment: ${equipment}` },
        ...recentHistory,
        { role: "user", content: message.trim() },
      ],
    });

    const reply = response.choices[0]?.message?.content ?? "";
    return res.json({ reply });
  } catch (error) {
    console.error("OpenAI chat failed:", error);
    return res.json({ reply: generateFallbackResponse(message.trim(), equipment) });
  }
});

app.listen(port, () => {
  console.log(`MarineMind AI backend running on http://localhost:${port}`);
});
