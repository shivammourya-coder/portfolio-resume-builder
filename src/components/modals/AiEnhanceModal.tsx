import React, { useState, useEffect } from "react";
import { AiEnhanceMode } from "../../types";
import { enhanceTextWithAi } from "../../services/aiService";
import { Sparkles, Check, X, RefreshCw, Wand2, Zap, BarChart3, Minimize2, Crown, AlertCircle } from "lucide-react";

interface AiEnhanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  fieldType: "bio" | "summary" | "experience" | "project" | "skill" | "general";
  contextTitle?: string;
  onApply: (newText: string) => void;
}

const MODES: { id: AiEnhanceMode; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: "polish",
    label: "Professional Polish",
    description: "Refine grammar, tone, and sentence structure for maximum professionalism.",
    icon: <Wand2 className="w-3.5 h-3.5" />,
  },
  {
    id: "action_verbs",
    label: "Action Verbs",
    description: "Lead with strong power verbs (Spearheaded, Architected, Accelerated).",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    id: "quantify",
    label: "Quantify Impact",
    description: "Structure bullet points for measurable outcomes and business metrics.",
    icon: <BarChart3 className="w-3.5 h-3.5" />,
  },
  {
    id: "concise",
    label: "Crisp & Concise",
    description: "Trim unnecessary filler words while keeping maximum impact.",
    icon: <Minimize2 className="w-3.5 h-3.5" />,
  },
  {
    id: "executive",
    label: "Executive Presence",
    description: "Elevate tone for leadership, strategy, and high-level ownership.",
    icon: <Crown className="w-3.5 h-3.5" />,
  },
];

export const AiEnhanceModal: React.FC<AiEnhanceModalProps> = ({
  isOpen,
  onClose,
  originalText,
  fieldType,
  contextTitle = "",
  onApply,
}) => {
  const [selectedMode, setSelectedMode] = useState<AiEnhanceMode>("polish");
  const [enhancedText, setEnhancedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = async (mode: AiEnhanceMode) => {
    if (!originalText.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await enhanceTextWithAi(originalText, fieldType, mode, contextTitle);
      setEnhancedText(res.enhancedText);
    } catch (err: any) {
      setError(err.message || "Failed to generate enhancement");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && originalText) {
      setSelectedMode("polish");
      handleEnhance("polish");
    }
  }, [isOpen, originalText]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                AI Text Enhancement
              </h3>
              <p className="text-xs text-slate-300">
                Enhancing {fieldType} {contextTitle ? `• ${contextTitle}` : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enhancement Style Selector */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <div className="flex gap-2">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setSelectedMode(mode.id);
                  handleEnhance(mode.id);
                }}
                disabled={isLoading}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedMode === mode.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {mode.icon}
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Comparison */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original Draft */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Original Draft
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {originalText.length} chars
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap min-h-[140px] leading-relaxed select-all">
                {originalText || <span className="italic text-slate-400">No original text provided.</span>}
              </div>
            </div>

            {/* AI Enhanced Output */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Enhanced Version
                </span>
                <span className="text-[11px] text-indigo-500 font-mono">
                  {enhancedText.length} chars
                </span>
              </div>
              <div className="relative flex-1">
                {isLoading ? (
                  <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 min-h-[140px] flex flex-col items-center justify-center text-center gap-2">
                    <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin" />
                    <p className="text-xs font-medium text-indigo-900">
                      Transforming with Gemini AI...
                    </p>
                  </div>
                ) : (
                  <textarea
                    value={enhancedText}
                    onChange={(e) => setEnhancedText(e.target.value)}
                    rows={6}
                    className="w-full p-3.5 bg-indigo-50/30 focus:bg-white rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 whitespace-pre-wrap leading-relaxed outline-hidden transition-all resize-y"
                    placeholder="Enhanced text will appear here..."
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => handleEnhance(selectedMode)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Regenerate</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (enhancedText.trim()) {
                  onApply(enhancedText);
                  onClose();
                }
              }}
              disabled={isLoading || !enhancedText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply to Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
