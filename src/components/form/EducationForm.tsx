import React from "react";
import { EducationItem } from "../../types";
import { Plus, Trash2, GraduationCap, School, MapPin, Calendar } from "lucide-react";

interface EducationFormProps {
  education: EducationItem[];
  onChange: (education: EducationItem[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: "",
      field: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...education, newItem]);
  };

  const updateItem = (id: string, field: keyof EducationItem, value: string) => {
    onChange(
      education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Education & Academics ({education.length})
          </h3>
          <p className="text-[11px] text-slate-500">
            Degrees, academic honors, institutions, and specializations.
          </p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-600">No education entries added</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Add your university, college, or bootcamp history.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-indigo-600">
                  Education #{index + 1} {item.school ? `• ${item.school}` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-slate-400" />
                    Degree / Certificate *
                  </label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => updateItem(item.id, "degree", e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Major / Field of Study
                  </label>
                  <input
                    type="text"
                    value={item.field}
                    onChange={(e) => updateItem(item.id, "field", e.target.value)}
                    placeholder="e.g. Software Systems & AI"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <School className="w-3 h-3 text-slate-400" />
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    value={item.school}
                    onChange={(e) => updateItem(item.id, "school", e.target.value)}
                    placeholder="e.g. UC Berkeley"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Start Year
                    </label>
                    <input
                      type="text"
                      value={item.startDate}
                      onChange={(e) => updateItem(item.id, "startDate", e.target.value)}
                      placeholder="e.g. 2017"
                      className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      End Year (or Expected)
                    </label>
                    <input
                      type="text"
                      value={item.endDate}
                      onChange={(e) => updateItem(item.id, "endDate", e.target.value)}
                      placeholder="e.g. 2021"
                      className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Honors, Activities & Relevant Coursework
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="e.g. Magna Cum Laude, President of Computer Science Club, GPA: 3.9"
                  className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
