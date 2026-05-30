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

app.post("/api/ai-diagnose", async (req, res) => {
  try {
    const { message, equipment, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      instructions: `
You are MarineMind AI, a marine maintenance assistant.

Your job is to help marine engineers diagnose equipment faults and generate useful maintenance reports.

If the user greets you, respond naturally and explain what you can help with.

If the user describes a fault, respond with:

1. Quick Understanding
2. Possible Causes
3. Inspection Checklist
4. Safety Precautions
5. Recommended Maintenance Action
6. Maintenance Fault Report Summary

Keep the response clear, practical, and professional.
Do not claim certainty. Say "possible" or "likely" where needed.
      `,
      input: [
        ...history.map((item) => ({
          role: item.role,
          content: item.text,
        })),
        {
          role: "user",
          content: `Selected equipment: ${equipment || "Not selected"}\n\nUser message: ${message}`,
        },
      ],
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      error: "MarineMind AI could not generate a response right now.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`MarineMind AI server running on port ${PORT}`);
});
