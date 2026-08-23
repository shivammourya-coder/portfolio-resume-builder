import React, { useState } from "react";
import { SkillCategory } from "../../types";
import { Plus, Trash2, Tag, X, Sparkles, Layers } from "lucide-react";

interface SkillsFormProps {
  skills: SkillCategory[];
  onChange: (skills: SkillCategory[]) => void;
}

const POPULAR_SUGGESTIONS: { category: string; items: string[] }[] = [
  {
    category: "Languages & Core",
    items: ["TypeScript", "JavaScript", "Python", "Go", "Java", "SQL", "Rust", "C++", "HTML5/CSS3"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "Vue.js", "Node.js", "Express", "Tailwind CSS", "FastAPI", "Django", "GraphQL"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Kafka", "CI/CD", "Terraform", "Google Cloud"],
  },
  {
    category: "Product & Strategy",
    items: ["System Design", "Agile/Scrum", "Microservices", "Design Systems", "A/B Testing", "User Research"],
  },
];

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [tagInputs, setTagInputs] = useState<{ [catId: string]: string }>({});

  const addCategory = (categoryName: string = "New Category", initialItems: string[] = []) => {
    const newCat: SkillCategory = {
      id: `skill-${Date.now()}`,
      category: categoryName,
      items: initialItems,
    };
    onChange([...skills, newCat]);
  };

  const updateCategoryName = (id: string, name: string) => {
    onChange(skills.map((c) => (c.id === id ? { ...c, category: name } : c)));
  };

  const removeCategory = (id: string) => {
    onChange(skills.filter((c) => c.id !== id));
  };

  const addSkillTag = (catId: string, category: SkillCategory) => {
    const input = (tagInputs[catId] || "").trim();
    if (input) {
      const itemsToAdd = input.split(",").map((s) => s.trim()).filter(Boolean);
      const updated = Array.from(new Set([...category.items, ...itemsToAdd]));
      onChange(skills.map((c) => (c.id === catId ? { ...c, items: updated } : c)));
      setTagInputs({ ...tagInputs, [catId]: "" });
    }
  };

  const removeSkillTag = (catId: string, category: SkillCategory, itemIndex: number) => {
    const updated = category.items.filter((_, i) => i !== itemIndex);
    onChange(skills.map((c) => (c.id === catId ? { ...c, items: updated } : c)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Skills & Competencies ({skills.length} categories)
          </h3>
          <p className="text-[11px] text-slate-500">
            Organize your technical, strategic, and domain proficiencies.
          </p>
        </div>
        <button
          type="button"
          onClick={() => addCategory("Technical Skills", [])}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Suggested Stacks */}
      <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Quick-Add Skill Categories:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SUGGESTIONS.map((sugg, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addCategory(sugg.category, sugg.items)}
              className="text-[11px] font-semibold bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Plus className="w-3 h-3" />
              <span>{sugg.category}</span>
            </button>
          ))}
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-600">No skill categories configured</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Add a category above or choose from the suggested groups.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((cat) => (
            <div
              key={cat.id}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                  placeholder="Category Name (e.g. Frontend Stack)"
                  className="font-bold text-xs text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 outline-hidden px-1 py-0.5"
                />
                <button
                  type="button"
                  onClick={() => removeCategory(cat.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="Remove category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Tag Input Box */}
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border border-slate-300 rounded-lg">
                {cat.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 text-slate-800 text-xs font-medium rounded-md shadow-2xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkillTag(cat.id, cat, sIdx)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInputs[cat.id] || ""}
                  onChange={(e) => setTagInputs({ ...tagInputs, [cat.id]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addSkillTag(cat.id, cat);
                    }
                  }}
                  onBlur={() => addSkillTag(cat.id, cat)}
                  placeholder={cat.items.length === 0 ? "Type a skill and press Enter (e.g. React, TypeScript)..." : "Add skill..."}
                  className="flex-1 min-w-[140px] bg-transparent text-xs outline-hidden text-slate-800 placeholder-slate-400 py-0.5"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
