import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "MarineMind AI API is healthy",
    status: "OK",
  });
});

app.post("/api/ai-diagnose", async (req, res) => {
  try {
    const { message, equipment, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemPrompt = `
You are MarineMind AI, an expert marine maintenance assistant.

When a user reports an equipment fault, always respond using this structure:

Equipment:
[Equipment Name]

Possible Causes:
- Cause 1
- Cause 2
- Cause 3

Risk Level:
Low, Medium, or High

Inspection Checklist:
- Step 1
- Step 2
- Step 3

Recommended Actions:
- Action 1
- Action 2
- Action 3

Safety Precautions:
- Precaution 1
- Precaution 2

Maintenance Fault Report Summary:
Short professional summary.

Common vessel maintenance fault examples you should diagnose accurately:
- Main engine overheating
- Cooling pump vibration
- Fuel purifier failure
- Generator low voltage
- Bilge pump blockage
- Hydraulic pressure loss
- Lubrication oil contamination
- Exhaust temperature imbalance

Use marine engineering knowledge tailored to these and similar faults.
Always use these exact section headings in this order for equipment fault reports.
Use the selected equipment name when provided.
Do not skip sections or rename headings.
For greetings or general questions, respond naturally and briefly without the fault report format.
    `.trim();

    const userMessage = `
Selected equipment: ${equipment || "Not selected"}

${message.trim()}
    `.trim();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...history.slice(-6).map((item) => ({
          role: item.role,
          content: item.text,
        })),
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return res.json({
      reply: response.choices[0]?.message?.content ?? "",
    });
  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "MarineMind AI could not generate a response right now.",
    });
  }
});

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`MarineMind AI server running on port ${PORT}`);
});
