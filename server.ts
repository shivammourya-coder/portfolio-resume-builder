import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy/safe Gemini AI initialization
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// AI Enhancement Endpoint
app.post("/api/ai/enhance", async (req, res) => {
  try {
    const { text, type = "general", mode = "polish", context = "" } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text is required for enhancement" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback enhancement if API key is not yet configured
      const fallback = enhanceTextLocally(text, mode);
      return res.json({ enhancedText: fallback, isFallback: true });
    }

    let instruction = "";
    if (type === "bio" || type === "summary") {
      instruction = `You are an elite executive resume writer and career coach.
Refine this professional summary / About Me section to be engaging, high-impact, authentic, and memorable.
Style mode requested: ${mode} (polish = clean professional; action_verbs = active and dynamic; quantify = structured for impact metrics; concise = tight 2-3 sentence elevator pitch; executive = strategic leadership presence).
Keep the factual background of the person strictly accurate without inventing unmentioned credentials.
Return ONLY the polished text without meta commentary, quotes, or markdown wrappers.`;
    } else if (type === "experience") {
      instruction = `You are a top tech & executive recruiter and resume expert.
Transform the following job description / achievement draft into strong, results-oriented, STAR-method bullet points (or refined narrative if given as a paragraph).
Use strong action verbs (e.g., Architected, Spearheaded, Accelerated, Engineered, Streamlined), clarify the business impact, and highlight measurable outcomes while keeping the core truths intact.
Style mode requested: ${mode}.
Context / Role: ${context || "Professional"}.
Return ONLY the improved bullet points or description without meta commentary or markdown enclosures.`;
    } else if (type === "project") {
      instruction = `You are a senior tech lead and portfolio curator.
Improve this project description to clearly highlight: the problem solved, architectural approach/technologies used, and tangible impact or features delivered.
Style mode requested: ${mode}.
Context: ${context || "Portfolio Project"}.
Return ONLY the refined description text without meta explanations or extra quotes.`;
    } else {
      instruction = `You are a professional copywriter and resume editor.
Improve the clarity, tone, flow, and vocabulary of the provided text for a professional portfolio/resume.
Style mode: ${mode}.
Return ONLY the refined text directly.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Text to enhance:\n"""\n${text}\n"""`,
      config: {
        systemInstruction: instruction,
        temperature: 0.4,
      },
    });

    const enhancedText = response.text ? response.text.trim() : text;
    res.json({ enhancedText, isFallback: false });
  } catch (error: any) {
    console.error("Gemini AI Enhance Error:", error);
    // Fallback gracefully on error so user experience never breaks
    const { text, mode } = req.body;
    res.json({
      enhancedText: enhanceTextLocally(text || "", mode || "polish"),
      isFallback: true,
      error: error.message || "Failed to reach AI service",
    });
  }
});

// AI Generate Summary Endpoint
app.post("/api/ai/generate-summary", async (req, res) => {
  try {
    const { name, title, experience = [], skills = [], targetRole } = req.body;
    const ai = getGeminiClient();

    const promptContext = `
Name: ${name || "Professional"}
Current Title: ${title || "Professional"}
Target Role: ${targetRole || title || "Specialist"}
Skills: ${Array.isArray(skills) ? skills.join(", ") : skills}
Recent Roles: ${experience.map((e: any) => `${e.role || ""} at ${e.company || ""}`).filter(Boolean).join("; ")}
`;

    if (!ai) {
      const fallbackSummary = `Results-driven ${title || "professional"} with proven expertise in ${Array.isArray(skills) && skills.length > 0 ? skills.slice(0, 3).join(", ") : "industry best practices"}. Dedicated to building scalable solutions, collaborating across cross-functional teams, and delivering measurable business value.`;
      return res.json({ summary: fallbackSummary, isFallback: true });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Generate a compelling, high-converting 3-4 sentence professional summary based on these credentials:\n${promptContext}`,
      config: {
        systemInstruction: "You are an elite career strategist. Write a crisp, powerful, first- or third-person executive summary tailored for modern portfolios. Avoid cliché buzzwords like 'go-getter'. Focus on core competencies, problem-solving ability, and value delivery. Output ONLY the summary text.",
        temperature: 0.6,
      },
    });

    const summary = response.text ? response.text.trim() : "";
    res.json({ summary, isFallback: false });
  } catch (error: any) {
    console.error("Generate summary error:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// AI Review & ATS Scoring Endpoint
app.post("/api/ai/review-resume", async (req, res) => {
  try {
    const { resumeData } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        score: 85,
        strengths: ["Clear section hierarchy", "Comprehensive skills listed", "Detailed project breakdown"],
        improvements: ["Add more quantifiable metrics (% improved, $ saved)", "Include active links to live demos", "Tailor summary to specific target roles"],
        isFallback: true,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Review this resume/portfolio data and provide constructive scoring and feedback in JSON:\n${JSON.stringify(resumeData, null, 2)}`,
      config: {
        systemInstruction: `You are an expert ATS (Applicant Tracking System) auditor and senior hiring manager.
Analyze the provided portfolio/resume data for clarity, impact, grammar, structure, keyword density, and appeal.
Return a JSON object with:
- score: integer from 60 to 98
- summaryFeedback: a 1-sentence assessment
- strengths: array of 3 specific strengths
- improvements: array of 3 actionable, high-impact suggestions`,
        responseMimeType: "application/json",
      },
    });

    let result;
    try {
      result = JSON.parse(response.text || "{}");
    } catch {
      result = {
        score: 88,
        summaryFeedback: "Solid portfolio structure with strong presentation of core skills.",
        strengths: ["Well organized experience", "Clean layout information", "Good diversity of skills"],
        improvements: ["Quantify achievements in past roles", "Add measurable outcomes to top projects"],
      };
    }

    res.json(result);
  } catch (error: any) {
    console.error("Resume review error:", error);
    res.json({
      score: 85,
      summaryFeedback: "Well-structured profile with good breadth of experience.",
      strengths: ["Clear technical skill grouping", "Professional job history", "Accessible contact details"],
      improvements: ["Add numerical impact metrics to experience items", "Expand project descriptions with architecture details"],
      isFallback: true,
    });
  }
});

// Local fallback helper for polish
function enhanceTextLocally(text: string, mode: string): string {
  let cleaned = text.trim();
  if (!cleaned) return "";

  // Capitalize first letter
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  if (!cleaned.endsWith(".") && !cleaned.endsWith("!") && !cleaned.includes("\n")) {
    cleaned += ".";
  }

  // Replace common weak words with action verbs if appropriate
  cleaned = cleaned
    .replace(/\bworked on\b/gi, "developed and delivered")
    .replace(/\bhelped with\b/gi, "collaborated on")
    .replace(/\bwas responsible for\b/gi, "spearheaded")
    .replace(/\bmade\b/gi, "engineered")
    .replace(/\bdid\b/gi, "executed");

  return cleaned;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio Builder Server running on http://localhost:${PORT}`);
  });
}

startServer();
