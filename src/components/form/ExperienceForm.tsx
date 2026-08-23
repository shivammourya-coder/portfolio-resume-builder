import React from "react";
import { ExperienceItem } from "../../types";
import { Plus, Trash2, Sparkles, Building, Briefcase, Calendar, MapPin, Check } from "lucide-react";

interface ExperienceFormProps {
  experience: ExperienceItem[];
  onChange: (experience: ExperienceItem[]) => void;
  onOpenAiEnhance: (text: string, fieldType: "experience", contextTitle: string, onUpdate: (enhanced: string) => void) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experience,
  onChange,
  onOpenAiEnhance,
}) => {
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange([newItem, ...experience]);
  };

  const updateItem = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange(
      experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    onChange(experience.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Work Experience ({experience.length})
          </h3>
          <p className="text-[11px] text-slate-500">
            Detail your career journey and quantifiable achievements.
          </p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-600">No experience added yet</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Click "Add Position" to include your career milestones.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3.5 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                  <span>Position #{index + 1}</span>
                  {item.company && <span className="text-slate-700">• {item.company}</span>}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="Remove position"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-slate-400" />
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => updateItem(item.id, "role", e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Building className="w-3 h-3 text-slate-400" />
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => updateItem(item.id, "company", e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => updateItem(item.id, "location", e.target.value)}
                    placeholder="e.g. New York, NY (or Remote)"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={item.startDate}
                      onChange={(e) => updateItem(item.id, "startDate", e.target.value)}
                      placeholder="e.g. 2021-06"
                      className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      disabled={item.current}
                      value={item.current ? "Present" : item.endDate}
                      onChange={(e) => updateItem(item.id, "endDate", e.target.value)}
                      placeholder="e.g. 2023-12"
                      className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={item.current}
                    onChange={(e) => updateItem(item.id, "current", e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>I currently work in this role</span>
                </label>
              </div>

              {/* Description & AI Enhance */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Key Responsibilities & Measurable Achievements
                  </label>
                  <button
                    type="button"
                    disabled={!item.description.trim()}
                    onClick={() =>
                      onOpenAiEnhance(
                        item.description,
                        "experience",
                        `${item.role} at ${item.company}`,
                        (enhanced) => updateItem(item.id, "description", enhanced)
                      )
                    }
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200 transition-colors disabled:opacity-40"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>AI Polish Bullet Points</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="• Spearheaded development of core microservices handling 50k requests/sec...&#10;• Reduced latency by 35% through Redis caching..."
                  className="w-full p-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs leading-relaxed outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
