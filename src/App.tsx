import React, { useState, useEffect } from "react";
import { PortfolioData, TemplateId } from "./types";
import { sampleSoftwareEngineer, sampleDesigner, sampleExecutive } from "./data/sampleData";
import { PersonalInfoForm } from "./components/form/PersonalInfoForm";
import { SummaryForm } from "./components/form/SummaryForm";
import { ExperienceForm } from "./components/form/ExperienceForm";
import { ProjectsForm } from "./components/form/ProjectsForm";
import { SkillsForm } from "./components/form/SkillsForm";
import { EducationForm } from "./components/form/EducationForm";
import { CertificationsForm } from "./components/form/CertificationsForm";
import { ThemeSettings } from "./components/form/ThemeSettings";
import { ResumePreview } from "./components/preview/ResumePreview";
import { AiEnhanceModal } from "./components/modals/AiEnhanceModal";
import { AiResumeReviewModal } from "./components/modals/AiResumeReviewModal";
import { AppLogo } from "./components/common/AppLogo";
import {
  FileText,
  User,
  AlignLeft,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Award,
  Palette,
  Sparkles,
  RotateCcw,
  Upload,
  Download,
  Eye,
  Edit3,
  CheckCircle,
  FolderOpen,
} from "lucide-react";

type FormTab = "personal" | "summary" | "experience" | "projects" | "skills" | "education" | "certifications" | "theme";

const STORAGE_KEY = "portfolio_builder_data_v1";

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    return sampleSoftwareEngineer;
  });

  const [activeTab, setActiveTab] = useState<FormTab>("personal");
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  // AI Modal States
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiOriginalText, setAiOriginalText] = useState("");
  const [aiFieldType, setAiFieldType] = useState<"bio" | "summary" | "experience" | "project" | "skill" | "general">("general");
  const [aiContextTitle, setAiContextTitle] = useState("");
  const [aiApplyCallback, setAiApplyCallback] = useState<((enhanced: string) => void) | null>(null);

  // Resume Review Modal
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to persist data", e);
    }
  }, [data]);

  // Open AI Enhancement dialog
  const handleOpenAiEnhance = (
    text: string,
    fieldType: "bio" | "summary" | "experience" | "project" | "skill" | "general",
    contextTitle: string = "",
    onApplyCustom?: (enhanced: string) => void
  ) => {
    setAiOriginalText(text);
    setAiFieldType(fieldType);
    setAiContextTitle(contextTitle);
    if (onApplyCustom) {
      setAiApplyCallback(() => onApplyCustom);
    } else {
      setAiApplyCallback(() => (enhanced: string) => {
        if (fieldType === "summary" || fieldType === "bio") {
          setData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, summary: enhanced },
          }));
        }
      });
    }
    setAiModalOpen(true);
  };

  const handleApplyAiText = (enhancedText: string) => {
    if (aiApplyCallback) {
      aiApplyCallback(enhancedText);
    }
  };

  const loadPreset = (preset: PortfolioData) => {
    setData(preset);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.personalInfo.fullName || "Portfolio").replace(/\s+/g, "_")}_Data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          if (parsed && parsed.personalInfo) {
            setData(parsed);
          }
        } catch {
          alert("Invalid JSON configuration file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all data? This will reset the form.")) {
      setData({
        personalInfo: {
          fullName: "",
          title: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          linkedin: "",
          github: "",
          summary: "",
          avatarUrl: "",
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        theme: {
          templateId: "modern-executive",
          primaryColor: "#0f233a",
          accentColor: "#0284c7",
          fontFamily: "sans",
          spacing: "standard",
        },
      });
    }
  };

  const handleQuickTemplateSwitch = (tmplId: TemplateId) => {
    let primary = data.theme.primaryColor;
    let accent = data.theme.accentColor;
    let font = data.theme.fontFamily;

    if (tmplId === "modern-executive") {
      primary = "#0f233a";
      accent = "#0284c7";
      font = "sans";
    } else if (tmplId === "tech-minimal") {
      primary = "#0f172a";
      accent = "#2563eb";
      font = "sans";
    } else if (tmplId === "creative-elegant") {
      primary = "#431407";
      accent = "#c2410c";
      font = "serif";
    }

    setData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        templateId: tmplId,
        primaryColor: primary,
        accentColor: accent,
        fontFamily: font,
      },
    }));
  };

  const TABS: { id: FormTab; label: string; icon: React.ReactNode }[] = [
    { id: "personal", label: "Personal & Photo", icon: <User className="w-3.5 h-3.5" /> },
    { id: "summary", label: "Bio / Summary", icon: <AlignLeft className="w-3.5 h-3.5" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { id: "skills", label: "Skills", icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: "certifications", label: "Certs", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "theme", label: "Templates & Styling", icon: <Palette className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navbar */}
      <header className="no-print bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AppLogo size={38} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold tracking-tight text-white">
                Portfolio & Resume Builder
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI Powered
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              3 Professional Templates • Real-Time Preview • PDF Export
            </p>
          </div>
        </div>

        {/* Quick Template Switcher Pills */}
        <div className="hidden lg:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 px-2">Template:</span>
          {[
            { id: "modern-executive" as const, label: "Executive" },
            { id: "tech-minimal" as const, label: "Tech Minimal" },
            { id: "creative-elegant" as const, label: "Creative" },
          ].map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleQuickTemplateSwitch(tmpl.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                data.theme.templateId === tmpl.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tmpl.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* AI Audit / ATS Score */}
          <button
            onClick={() => setAuditModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-indigo-300 text-xs font-bold transition-colors shadow-2xs"
            title="Scan resume for ATS compatibility and recruiter score"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">AI Resume Review</span>
          </button>

          {/* Presets dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors">
              <FolderOpen className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sample Presets</span>
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 hidden group-hover:block z-40">
              <button
                onClick={() => loadPreset(sampleSoftwareEngineer)}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Full Stack Engineer
              </button>
              <button
                onClick={() => loadPreset(sampleDesigner)}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Product Designer
              </button>
              <button
                onClick={() => loadPreset(sampleExecutive)}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Growth & VP Executive
              </button>
            </div>
          </div>

          {/* Export JSON / Backup */}
          <button
            onClick={handleExportJson}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            title="Backup / Export JSON"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Import JSON */}
          <label
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors"
            title="Import JSON Backup"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            title="Reset Form"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mobile view toggle */}
          <div className="flex lg:hidden bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setMobileView("editor")}
              className={`p-1.5 rounded text-xs font-semibold ${
                mobileView === "editor" ? "bg-indigo-600 text-white" : "text-slate-400"
              }`}
              title="Edit Mode"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={`p-1.5 rounded text-xs font-semibold ${
                mobileView === "preview" ? "bg-indigo-600 text-white" : "text-slate-400"
              }`}
              title="Preview Mode"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout: Form on Left, Live Preview on Right */}
      <main className="flex-1 flex overflow-hidden max-w-[1920px] w-full mx-auto">
        {/* Left Column: Form Editor */}
        <div
          className={`w-full lg:w-[48%] xl:w-[45%] flex flex-col border-r border-slate-800 bg-slate-900/40 shrink-0 ${
            mobileView === "preview" ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Sub-tabs header */}
          <div className="no-print bg-slate-950/70 border-b border-slate-800/80 px-3 py-2 overflow-x-auto custom-scrollbar">
            <div className="flex gap-1.5 min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-slate-800 text-white border border-slate-700 shadow-2xs"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-slate-950/30">
            <div className="max-w-2xl mx-auto">
              {activeTab === "personal" && (
                <PersonalInfoForm
                  data={data.personalInfo}
                  onChange={(personalInfo) => setData({ ...data, personalInfo })}
                />
              )}

              {activeTab === "summary" && (
                <SummaryForm
                  summary={data.personalInfo.summary}
                  onChange={(summary) =>
                    setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, summary },
                    })
                  }
                  onOpenAiEnhance={(text, type) => handleOpenAiEnhance(text, type, "Summary / Bio")}
                  fullData={data}
                />
              )}

              {activeTab === "experience" && (
                <ExperienceForm
                  experience={data.experience}
                  onChange={(experience) => setData({ ...data, experience })}
                  onOpenAiEnhance={(text, type, context, cb) => handleOpenAiEnhance(text, type, context, cb)}
                />
              )}

              {activeTab === "projects" && (
                <ProjectsForm
                  projects={data.projects}
                  onChange={(projects) => setData({ ...data, projects })}
                  onOpenAiEnhance={(text, type, context, cb) => handleOpenAiEnhance(text, type, context, cb)}
                />
              )}

              {activeTab === "skills" && (
                <SkillsForm
                  skills={data.skills}
                  onChange={(skills) => setData({ ...data, skills })}
                />
              )}

              {activeTab === "education" && (
                <EducationForm
                  education={data.education}
                  onChange={(education) => setData({ ...data, education })}
                />
              )}

              {activeTab === "certifications" && (
                <CertificationsForm
                  certifications={data.certifications}
                  onChange={(certifications) => setData({ ...data, certifications })}
                />
              )}

              {activeTab === "theme" && (
                <ThemeSettings
                  theme={data.theme}
                  onChange={(theme) => setData({ ...data, theme })}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Resume Canvas & PDF Export */}
        <div
          className={`flex-1 p-2 sm:p-4 bg-slate-950 overflow-hidden ${
            mobileView === "editor" ? "hidden lg:flex" : "flex"
          }`}
        >
          <ResumePreview
            data={data}
            onOpenAudit={() => setAuditModalOpen(true)}
          />
        </div>
      </main>

      {/* AI Enhancement Modal */}
      <AiEnhanceModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        originalText={aiOriginalText}
        fieldType={aiFieldType}
        contextTitle={aiContextTitle}
        onApply={handleApplyAiText}
      />

      {/* AI Resume & ATS Review Modal */}
      <AiResumeReviewModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        data={data}
      />
    </div>
  );
}
