import React from "react";
import { TemplateId, ThemeConfig } from "../../types";
import { LayoutTemplate, Palette, Type, Check } from "lucide-react";

interface ThemeSettingsProps {
  theme: ThemeConfig;
  onChange: (theme: ThemeConfig) => void;
}

const TEMPLATES: {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  previewBg: string;
  previewAccent: string;
}[] = [
  {
    id: "modern-executive",
    name: "Modern Executive",
    category: "Corporate & Leadership",
    description: "Distinguished top header, structured milestone timeline, dual-column balance for high-impact profiles.",
    previewBg: "#0f233a",
    previewAccent: "#0284c7",
  },
  {
    id: "tech-minimal",
    name: "Minimalist Tech",
    category: "Developers & Engineers",
    description: "Crisp technical typography, terminal tags, code repository cards, and structured markdown layout.",
    previewBg: "#0f172a",
    previewAccent: "#2563eb",
  },
  {
    id: "creative-elegant",
    name: "Creative Elegant",
    category: "Designers & Editorial",
    description: "Warm editorial layout, serif display typography, magazine quotes, and artistic project showcase cards.",
    previewBg: "#431407",
    previewAccent: "#c2410c",
  },
];

const COLOR_PALETTES = [
  { name: "Navy & Azure", primary: "#0f233a", accent: "#0284c7" },
  { name: "Slate & Royal", primary: "#0f172a", accent: "#2563eb" },
  { name: "Charcoal & Emerald", primary: "#18181b", accent: "#059669" },
  { name: "Terracotta & Ochre", primary: "#431407", accent: "#c2410c" },
  { name: "Deep Violet & Indigo", primary: "#1e1b4b", accent: "#6366f1" },
  { name: "Dark Teal & Cyan", primary: "#042f2e", accent: "#0891b2" },
];

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ theme, onChange }) => {
  const setTemplate = (id: TemplateId) => {
    // Also adjust default accent/primary color if matching template archetype
    let primary = theme.primaryColor;
    let accent = theme.accentColor;
    let font = theme.fontFamily;

    if (id === "modern-executive") {
      primary = "#0f233a";
      accent = "#0284c7";
      font = "sans";
    } else if (id === "tech-minimal") {
      primary = "#0f172a";
      accent = "#2563eb";
      font = "sans";
    } else if (id === "creative-elegant") {
      primary = "#431407";
      accent = "#c2410c";
      font = "serif";
    }

    onChange({
      ...theme,
      templateId: id,
      primaryColor: primary,
      accentColor: accent,
      fontFamily: font,
    });
  };

  return (
    <div className="space-y-7">
      {/* 1. Template Chooser */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <LayoutTemplate className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Choose Portfolio / Resume Template
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 mb-3">
          Select one of the three handcrafted professional layouts. All your data adapts instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TEMPLATES.map((tmpl) => {
            const isSelected = theme.templateId === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setTemplate(tmpl.id)}
                className={`text-left p-3.5 rounded-xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/20 shadow-md ring-2 ring-indigo-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div
                    className="h-12 w-full rounded-md mb-3 flex items-center px-3 justify-between"
                    style={{ backgroundColor: tmpl.previewBg }}
                  >
                    <div className="w-8 h-2 rounded bg-white/40" />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tmpl.previewAccent }}
                    />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {tmpl.category}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                    {tmpl.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    {tmpl.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color Scheme Palette */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Color Palette & Accents
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {COLOR_PALETTES.map((pal, idx) => {
            const isMatch = theme.primaryColor === pal.primary && theme.accentColor === pal.accent;
            return (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  onChange({
                    ...theme,
                    primaryColor: pal.primary,
                    accentColor: pal.accent,
                  })
                }
                className={`p-2.5 rounded-lg border flex items-center gap-2.5 transition-all ${
                  isMatch
                    ? "border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex -space-x-1 shrink-0">
                  <div
                    className="w-4 h-4 rounded-full border border-white shadow-2xs"
                    style={{ backgroundColor: pal.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-white shadow-2xs"
                    style={{ backgroundColor: pal.accent }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-700 truncate">{pal.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Typography & Font Family */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Typography Style
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "sans" as const, label: "Modern Sans", desc: "Clean & readable", fontStyle: "font-sans" },
            { id: "serif" as const, label: "Editorial Serif", desc: "Classic & elegant", fontStyle: "font-serif" },
            { id: "mono" as const, label: "Tech Monospace", desc: "Engineer & developer", fontStyle: "font-mono" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange({ ...theme, fontFamily: f.id })}
              className={`p-3 rounded-xl border text-left transition-all ${
                theme.fontFamily === f.id
                  ? "border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-500"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className={`text-sm font-bold text-slate-900 ${f.fontStyle}`}>Aa Bb 12</div>
              <div className="text-xs font-semibold text-slate-700 mt-1">{f.label}</div>
              <div className="text-[10px] text-slate-400">{f.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
