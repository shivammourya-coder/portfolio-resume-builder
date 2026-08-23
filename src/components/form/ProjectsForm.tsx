import React, { useState } from "react";
import { ProjectItem } from "../../types";
import { Plus, Trash2, Sparkles, FolderGit2, Globe, Github, Tag, X } from "lucide-react";

interface ProjectsFormProps {
  projects: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
  onOpenAiEnhance: (text: string, fieldType: "project", contextTitle: string, onUpdate: (enhanced: string) => void) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  projects,
  onChange,
  onOpenAiEnhance,
}) => {
  const [techInputs, setTechInputs] = useState<{ [id: string]: string }>({});

  const addProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "",
      role: "",
      technologies: [],
      description: "",
      link: "",
      github: "",
    };
    onChange([newItem, ...projects]);
  };

  const updateItem = (id: string, field: keyof ProjectItem, value: any) => {
    onChange(
      projects.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    onChange(projects.filter((item) => item.id !== id));
  };

  const addTechTag = (id: string, project: ProjectItem) => {
    const input = (techInputs[id] || "").trim();
    if (input) {
      const tags = input.split(",").map((t) => t.trim()).filter(Boolean);
      const unique = Array.from(new Set([...project.technologies, ...tags]));
      updateItem(id, "technologies", unique);
      setTechInputs({ ...techInputs, [id]: "" });
    }
  };

  const removeTechTag = (id: string, project: ProjectItem, tagIndex: number) => {
    const updated = project.technologies.filter((_, i) => i !== tagIndex);
    updateItem(id, "technologies", updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Projects & Portfolio ({projects.length})
          </h3>
          <p className="text-[11px] text-slate-500">
            Highlight your best work, case studies, and code repositories.
          </p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-600">No projects added yet</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Showcase your notable builds, open source work, and case studies.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                  <span>Project #{index + 1}</span>
                  {proj.title && <span className="text-slate-700">• {proj.title}</span>}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(proj.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="Remove project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateItem(proj.id, "title", e.target.value)}
                    placeholder="e.g. OmniStream Event Pipeline"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Role in Project
                  </label>
                  <input
                    type="text"
                    value={proj.role}
                    onChange={(e) => updateItem(proj.id, "role", e.target.value)}
                    placeholder="e.g. Creator & Lead Engineer"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={proj.link}
                    onChange={(e) => updateItem(proj.id, "link", e.target.value)}
                    placeholder="e.g. https://myproject.com"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Github className="w-3 h-3 text-slate-400" />
                    GitHub / Source Repo
                  </label>
                  <input
                    type="url"
                    value={proj.github}
                    onChange={(e) => updateItem(proj.id, "github", e.target.value)}
                    placeholder="e.g. https://github.com/user/repo"
                    className="w-full px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Technologies Tags */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-slate-400" />
                  Tech Stack (press Enter or Comma to add)
                </label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border border-slate-300 rounded-lg">
                  {proj.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-800 text-[11px] font-medium rounded shadow-2xs"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechTag(proj.id, proj, tIdx)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={techInputs[proj.id] || ""}
                    onChange={(e) => setTechInputs({ ...techInputs, [proj.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTechTag(proj.id, proj);
                      }
                    }}
                    onBlur={() => addTechTag(proj.id, proj)}
                    placeholder={proj.technologies.length === 0 ? "e.g. React, TypeScript, Node.js" : "Add more..."}
                    className="flex-1 min-w-[120px] bg-transparent text-xs outline-hidden text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Description & AI Enhance */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Project Overview & Outcomes
                  </label>
                  <button
                    type="button"
                    disabled={!proj.description.trim()}
                    onClick={() =>
                      onOpenAiEnhance(
                        proj.description,
                        "project",
                        proj.title || "Project",
                        (enhanced) => updateItem(proj.id, "description", enhanced)
                      )
                    }
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200 transition-colors disabled:opacity-40"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>AI Polish Description</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={proj.description}
                  onChange={(e) => updateItem(proj.id, "description", e.target.value)}
                  placeholder="Architected a high-throughput event processing bus delivering sub-10ms latency..."
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
