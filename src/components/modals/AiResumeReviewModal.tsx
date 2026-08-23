import React, { useState, useEffect } from "react";
import { PortfolioData } from "../../types";
import { reviewResumeWithAi } from "../../services/aiService";
import { Sparkles, X, CheckCircle2, AlertTriangle, RefreshCw, Award } from "lucide-react";

interface AiResumeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const AiResumeReviewModal: React.FC<AiResumeReviewModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState<{
    score: number;
    summaryFeedback: string;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const fetchReview = async () => {
    setIsLoading(true);
    try {
      const result = await reviewResumeWithAi(data);
      setReview(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchReview();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const score = review?.score || 85;
  const scoreColor = score >= 90 ? "text-emerald-600 bg-emerald-50 border-emerald-200" : score >= 75 ? "text-blue-600 bg-blue-50 border-blue-200" : "text-amber-600 bg-amber-50 border-amber-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                AI Portfolio & ATS Review
              </h3>
              <p className="text-xs text-slate-300">
                Automated recruiter screening & quality check
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

        <div className="p-6 overflow-y-auto space-y-5">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-sm font-semibold text-slate-900">
                Auditing Resume Structure & Content with Gemini AI...
              </p>
              <p className="text-xs text-slate-500 max-w-xs">
                Scanning keywords, impact metrics, formatting, and ATS readability.
              </p>
            </div>
          ) : review ? (
            <>
              {/* Score card */}
              <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl border ${scoreColor} shrink-0`}>
                  <span className="text-2xl font-black">{review.score}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">/ 100</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {review.score >= 90 ? "Excellent ATS & Recruiter Readiness" : review.score >= 75 ? "Strong Foundation – Few Quick Wins" : "Needs Additional Polish"}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {review.summaryFeedback}
                  </p>
                </div>
              </div>

              {/* Strengths */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Strengths
                </h4>
                <ul className="space-y-1.5">
                  {review.strengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Recommended Improvements
                </h4>
                <ul className="space-y-1.5">
                  {review.improvements.map((imp, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={fetchReview}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Re-Audit</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
