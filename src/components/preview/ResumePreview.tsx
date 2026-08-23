import React, { useState, useRef } from "react";
import { PortfolioData } from "../../types";
import { ModernExecutiveTemplate } from "../templates/ModernExecutiveTemplate";
import { TechMinimalTemplate } from "../templates/TechMinimalTemplate";
import { CreativeElegantTemplate } from "../templates/CreativeElegantTemplate";
import { exportToPdf, printResume } from "../../utils/pdfExport";
import { Download, Printer, ZoomIn, ZoomOut, Maximize2, Minimize2, Check, RefreshCw } from "lucide-react";

interface ResumePreviewProps {
  data: PortfolioData;
  onOpenAudit?: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, onOpenAudit }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    try {
      const fileName = `${(data.personalInfo.fullName || "Resume").replace(/[^a-zA-Z0-9]/g, "_")}_Portfolio.pdf`;
      await exportToPdf("resume-preview-container", fileName);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error("PDF Export failed:", err);
      // If canvas export fails, fall back to native high-res print
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const renderTemplate = () => {
    switch (data.theme.templateId) {
      case "modern-executive":
        return <ModernExecutiveTemplate data={data} />;
      case "creative-elegant":
        return <CreativeElegantTemplate data={data} />;
      case "tech-minimal":
      default:
        return <TechMinimalTemplate data={data} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-full bg-slate-900/90 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none bg-slate-950" : ""
      }`}
    >
      {/* Top Preview Controls Toolbar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Live Preview
          </span>
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
            • A4 Document Canvas
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
              className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-slate-300 select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.3, Number((z + 0.1).toFixed(2))))}
              className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Print / Save as PDF Native */}
          <button
            onClick={printResume}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold transition-colors"
            title="Print or Save via Browser System Dialog (A4 Vector Quality)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Print / Browser PDF</span>
          </button>

          {/* Direct PDF Download Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all disabled:opacity-50"
          >
            {isExporting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : exportSuccess ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>
              {isExporting ? "Rendering PDF..." : exportSuccess ? "Downloaded!" : "Export PDF"}
            </span>
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-slate-900/60 custom-scrollbar">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
          }}
          className="shadow-2xl rounded-sm shrink-0"
        >
          <div
            id="resume-preview-container"
            className="w-[210mm] min-h-[297mm] bg-white overflow-hidden text-left"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
