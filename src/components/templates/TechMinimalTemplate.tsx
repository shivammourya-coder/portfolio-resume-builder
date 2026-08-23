import React from "react";
import { PortfolioData } from "../../types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Terminal, Cpu, BookOpen, Sparkles } from "lucide-react";

interface TemplateProps {
  data: PortfolioData;
}

export const TechMinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, theme } = data;
  const primaryColor = theme.primaryColor || "#0f172a";
  const accentColor = theme.accentColor || "#2563eb";

  return (
    <div
      id="resume-tech-minimal"
      className="bg-white text-slate-900 shadow-sm print:shadow-none min-h-[1100px] w-full p-8 sm:p-10 transition-all duration-200"
      style={{ fontFamily: theme.fontFamily === "serif" ? "Georgia, serif" : theme.fontFamily === "mono" ? "ui-monospace, monospace" : "inherit" }}
    >
      {/* Header section with technical typography & accent border */}
      <header className="border-b-2 pb-6 mb-8 border-slate-900 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider mb-2" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
            <Terminal className="w-3 h-3" />
            <span>Developer Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-mono">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-base sm:text-lg font-medium text-slate-600 mt-1">
            {personalInfo.title || "Full Stack Developer"}
          </p>

          {/* Quick contact / links ribbon */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mt-4 text-xs font-mono text-slate-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-slate-950">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.github && (
              <a
                href={personalInfo.github.startsWith("http") ? personalInfo.github : `https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-950 font-bold"
                style={{ color: accentColor }}
              >
                <Github className="w-3.5 h-3.5" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, "")}</span>
              </a>
            )}
            {personalInfo.website && (
              <a
                href={personalInfo.website.startsWith("http") ? personalInfo.website : `https://${personalInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-950"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin.startsWith("http") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-950"
              >
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "")}</span>
              </a>
            )}
          </div>
        </div>

        {personalInfo.avatarUrl && (
          <div className="shrink-0">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Summary / Bio */}
      {personalInfo.summary && (
        <section id="section-tech-summary" className="mb-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-slate-400">// 01</span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900">
              Overview
            </h2>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {personalInfo.summary}
          </div>
        </section>
      )}

      {/* Skills Matrix */}
      {skills && skills.length > 0 && (
        <section id="section-tech-skills" className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-slate-400">// 02</span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" style={{ color: accentColor }} />
              Technical Arsenal
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id} className="p-3 bg-white rounded border border-slate-200">
                <div className="text-xs font-mono font-bold text-slate-800 mb-2 flex items-center justify-between">
                  <span>{skillGroup.category}</span>
                  <span className="text-[10px] text-slate-400 font-normal">[{skillGroup.items.length}]</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-mono bg-slate-100 text-slate-800 rounded border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section id="section-tech-experience" className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold text-slate-400">// 03</span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900">
              Work History
            </h2>
          </div>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="group relative">
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-950 font-mono">{exp.role}</h3>
                    <span className="text-xs font-medium text-slate-500">@</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800" style={{ color: accentColor }}>
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {exp.startDate} → {exp.current ? "Current" : exp.endDate || "Present"}
                  </div>
                </div>
                {exp.location && (
                  <div className="text-[11px] text-slate-500 mb-2">{exp.location}</div>
                )}
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans pl-2 border-l-2 border-slate-200">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section id="section-tech-projects" className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold text-slate-400">// 04</span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
              Highlighted Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-400 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-bold font-mono text-slate-900">{proj.title}</h3>
                    <div className="flex items-center gap-2 text-slate-500 shrink-0">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-slate-900"
                          title="Source Code"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600"
                          title="Live Preview"
                          style={{ color: accentColor }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.role && (
                    <div className="text-[11px] font-mono text-slate-500 mb-2">{proj.role}</div>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {proj.description}
                  </p>
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-slate-100">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-50 text-slate-600 rounded border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Credentials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
        {education && education.length > 0 && (
          <section id="section-tech-education">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-slate-400">// 05</span>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900">
                Education
              </h2>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900 font-mono">{edu.degree}</div>
                  {edu.field && <div className="text-slate-700">{edu.field}</div>}
                  <div className="text-slate-500 font-mono text-[11px]">
                    {edu.school} | {edu.startDate} - {edu.endDate || "Present"}
                  </div>
                  {edu.description && <div className="text-slate-600 text-[11px] mt-1">{edu.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section id="section-tech-certifications">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-slate-400">// 06</span>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900">
                Certifications
              </h2>
            </div>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs font-mono p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-800">{cert.name}</div>
                  <div className="text-[10px] text-slate-500">{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
