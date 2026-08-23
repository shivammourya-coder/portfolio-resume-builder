import React, { useState } from "react";
import { Sparkles, Wand2, RefreshCw } from "lucide-react";
import { generateSummaryWithAi } from "../../services/aiService";
import { PortfolioData } from "../../types";

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
  onOpenAiEnhance: (text: string, fieldType: "summary" | "bio") => void;
  fullData: PortfolioData;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({
  summary,
  onChange,
  onOpenAiEnhance,
  fullData,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    try {
      const skillsFlat = fullData.skills.flatMap((s) => s.items);
      const res = await generateSummaryWithAi(
        fullData.personalInfo.fullName,
        fullData.personalInfo.title,
        fullData.experience,
        skillsFlat,
        fullData.personalInfo.title
      );
      if (res.summary) {
        onChange(res.summary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-slate-800">
            Professional Summary / About Me
          </label>
          <p className="text-[11px] text-slate-500">
            A concise, high-converting overview of your key expertise and achievements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-generate summary */}
          <button
            type="button"
            onClick={handleAutoGenerate}
            disabled={isGenerating}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors disabled:opacity-50"
            title="Generate summary based on your experience and skills"
          >
            {isGenerating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Wand2 className="w-3.5 h-3.5" />
            )}
            <span>{isGenerating ? "Generating..." : "Auto-Draft"}</span>
          </button>

          {/* AI Enhance button */}
          <button
            type="button"
            onClick={() => onOpenAiEnhance(summary, "summary")}
            disabled={!summary.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enhance with AI</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          rows={6}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Results-driven Software Engineer with 6+ years designing high-throughput distributed systems and cloud architectures. Proven record of improving system uptime to 99.99% and mentoring engineering teams..."
          className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden leading-relaxed resize-y"
        />
        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
          <span>Tip: Focus on your core value proposition and tangible career highlights.</span>
          <span className="font-mono">{summary.length} characters</span>
        </div>
      </div>
    </div>
  );
};
