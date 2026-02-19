import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🔒 Resolve paths based on THIS FILE location (not cwd)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is ONE LEVEL UP from ai-agent folder
const PROJECT_ROOT = path.resolve(__dirname, "..");

console.log("AI Agent project root:", PROJECT_ROOT);

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "AI agent server is running" });
});

// AI edit endpoint
app.post("/api/ai/edit", async (req, res) => {
  try {
    const { instruction, files } = req.body;

    if (!instruction || !files || !Array.isArray(files)) {
      return res.status(400).json({ error: "instruction and files[] are required" });
    }

    // Read files from REAL project root
    const fileContents = files.map(p => {
      const abs = path.resolve(PROJECT_ROOT, p);
      return {
        path: p,
        content: fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : ""
      };
    });

    const systemPrompt = `
You are a senior React + TypeScript engineer with strong UI/UX sense.

Rules:
- You receive project files and an instruction.
- You MUST return ONLY valid JSON in this exact format:

{
  "files": [
    { "path": "path/to/file", "content": "FULL FILE CONTENT" }
  ]
}

- Always return FULL file contents.
- Create new files if needed.
- Reuse existing components and styles.
- Keep design consistent with the app.
- Keep TypeScript strict and correct.
- Do not remove logic unless instructed.
- Do not include explanations. Only JSON.
`;

    const userPrompt = `
Instruction:
${instruction}

Project files:
${JSON.stringify(fileContents, null, 2)}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2
    });

    // Get AI text
    let text = completion.choices[0].message.content;

    // Strip ```json ``` or ``` wrappers if present
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "").trim();
    }

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      return res.status(400).json({
        error: "AI did not return valid JSON",
        raw: text
      });
    }

    if (!result.files || !Array.isArray(result.files)) {
      return res.status(400).json({ error: "Invalid AI response format", raw: result });
    }

    // Write files to REAL project root
    for (const file of result.files) {
      const abs = path.resolve(PROJECT_ROOT, file.path);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, file.content, "utf8");
    }

    res.json({
      ok: true,
      written: result.files.map(f => f.path)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI agent error", details: String(err) });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`AI Agent running on http://localhost:${PORT}`);
});
