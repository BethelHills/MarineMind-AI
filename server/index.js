import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";

dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 5000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "MarineMind AI backend is running",
    status: "OK",
    api: "/api/ai-diagnose",
  });
});

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

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      instructions: `
You are MarineMind AI, a helpful AI assistant for marine engineers and vessel maintenance teams.

You can chat naturally like ChatGPT, but your main specialty is marine equipment maintenance.

If the user greets you or asks how you are, respond naturally and briefly.

If the user asks a general question, answer clearly.

If the user describes an equipment fault, respond with:

Quick Understanding:
Possible Causes:
Inspection Checklist:
Safety Precautions:
Recommended Maintenance Action:
Maintenance Fault Report Summary:

Keep your answers practical, clear, and professional.
Do not force every message into a fault report.
Only use the fault report format when the user describes a real equipment problem.
      `,
      input: [
        {
          role: "user",
          content: `
Selected equipment: ${equipment || "Not selected"}

Conversation history:
${history
  .slice(-6)
  .map((item) => `${item.role}: ${item.text}`)
  .join("\n")}

User message:
${message}
          `,
        },
      ],
    });

    return res.json({
      reply: response.output_text,
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

app.listen(PORT, () => {
  console.log(`MarineMind AI server running on port ${PORT}`);
});
