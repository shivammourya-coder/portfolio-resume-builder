import { AiEnhanceMode, PortfolioData } from "../types";

export interface EnhanceResponse {
  enhancedText: string;
  isFallback?: boolean;
  error?: string;
}

export async function enhanceTextWithAi(
  text: string,
  type: "bio" | "summary" | "experience" | "project" | "skill" | "general",
  mode: AiEnhanceMode = "polish",
  context: string = ""
): Promise<EnhanceResponse> {
  const response = await fetch("/api/ai/enhance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, type, mode, context }),
  });

  if (!response.ok) {
    throw new Error(`AI service failed with status ${response.status}`);
  }

  return response.json();
}

export async function generateSummaryWithAi(
  name: string,
  title: string,
  experience: any[],
  skills: string[],
  targetRole?: string
): Promise<{ summary: string; isFallback?: boolean }> {
  const response = await fetch("/api/ai/generate-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, title, experience, skills, targetRole }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate summary");
  }

  return response.json();
}

export async function reviewResumeWithAi(resumeData: PortfolioData): Promise<{
  score: number;
  summaryFeedback: string;
  strengths: string[];
  improvements: string[];
  isFallback?: boolean;
}> {
  const response = await fetch("/api/ai/review-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeData }),
  });

  if (!response.ok) {
    throw new Error("Failed to audit resume");
  }

  return response.json();
}
