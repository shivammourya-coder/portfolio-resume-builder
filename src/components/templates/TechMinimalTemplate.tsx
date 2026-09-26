import React from "react";
import { PortfolioData } from "../../types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Sparkles, Feather, Bookmark, Compass } from "lucide-react";
import { formatUrl, formatDisplayUrl } from "../../utils/urlUtils";

interface TemplateProps {
  data: PortfolioData;
}

export const CreativeElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, theme } = data;
  const primaryColor = theme.primaryColor || "#431407";
  const accentColor = theme.accentColor || "#c2410c";

  return (
    <div
      id="resume-creative-elegant"
      className="bg-[#fcfbf9] text-stone-800 shadow-sm print:shadow-none min-h-[1100px] w-full p-8 sm:p-12 transition-all duration-200"
      style={{ fontFamily: theme.fontFamily === "mono" ? "ui-monospace, monospace" : theme.fontFamily === "sans" ? "ui-sans-serif, system-ui, sans-serif" : "Georgia, Cambria, 'Times New Roman', serif" }}
    >
      {/* Editorial Header */}
      <header className="border-b border-stone-300 pb-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="h-px w-6" style={{ backgroundColor: accentColor }} />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: accentColor }}>
                Portfolio & Curriculum Vitae
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-normal tracking-tight mb-2 text-stone-900"
              style={{ color: primaryColor }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg sm:text-xl font-light italic text-stone-600 mb-4">
              {personalInfo.title || "Creative Director & Product Strategist"}
            </p>

            {/* Contact info in refined inline row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-xs text-stone-600 font-sans">
              {personalInfo.email && (
                <a href={formatUrl(personalInfo.email)} className="flex items-center gap-1.5 hover:text-stone-900 transition-colors">
                  <Mail className="w-3.5 h-3.5 opacity-70" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a href={formatUrl(personalInfo.phone)} className="flex items-center gap-1.5 hover:text-stone-900 transition-colors">
                  <Phone className="w-3.5 h-3.5 opacity-70" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 opacity-70" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <a
                  href={formatUrl(personalInfo.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-medium hover:underline"
                  style={{ color: accentColor }}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{formatDisplayUrl(personalInfo.website)}</span>
                </a>
              )}
              {personalInfo.linkedin && (
                <a
                  href={formatUrl(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-stone-900"
                >
                  <Linkedin className="w-3.5 h-3.5 opacity-70" />
                  <span>{formatDisplayUrl(personalInfo.linkedin)}</span>
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={formatUrl(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-stone-900"
                >
                  <Github className="w-3.5 h-3.5 opacity-70" />
                  <span>{formatDisplayUrl(personalInfo.github)}</span>
                </a>
              )}
            </div>
          </div>

          {personalInfo.avatarUrl && (
            <div className="shrink-0">
              <div className="relative p-1 bg-white border border-stone-300 rounded-full shadow-sm">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover grayscale-[20%] contrast-105"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Narrative Profile / Bio */}
      {personalInfo.summary && (
        <section id="section-creative-summary" className="mb-9">
          <div className="relative pl-6 border-l-2 py-1" style={{ borderColor: accentColor }}>
            <p className="text-base sm:text-lg text-stone-700 font-light leading-relaxed italic">
              "{personalInfo.summary}"
            </p>
          </div>
        </section>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Column (8 cols) */}
        <div className="md:col-span-8 space-y-9">
          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section id="section-creative-experience">
              <div className="flex items-center gap-3 mb-5 border-b border-stone-200 pb-2">
                <Feather className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-lg font-normal tracking-wide text-stone-900" style={{ color: primaryColor }}>
                  Selected Experience
                </h2>
              </div>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-stone-900">{exp.role}</h3>
                      <span className="text-xs font-sans text-stone-500 tracking-wider">
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs font-sans uppercase tracking-wider text-stone-600 font-medium">
                      {exp.company} {exp.location ? `• ${exp.location}` : ""}
                    </div>
                    <div className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans pt-1 whitespace-pre-line">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Works / Projects */}
          {projects && projects.length > 0 && (
            <section id="section-creative-projects">
              <div className="flex items-center gap-3 mb-5 border-b border-stone-200 pb-2">
                <Compass className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-lg font-normal tracking-wide text-stone-900" style={{ color: primaryColor }}>
                  Featured Works & Case Studies
                </h2>
              </div>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-white rounded border border-stone-200/90 shadow-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-stone-900">{proj.title}</h3>
                      {proj.role && <span className="text-xs font-sans italic text-stone-500">{proj.role}</span>}
                    </div>
                    <p className="text-xs font-sans text-stone-600 leading-relaxed mb-2.5">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 font-sans text-xs">
                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {proj.technologies.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-[10px] bg-stone-100 text-stone-700 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {(proj.link || proj.github) && (
                        <div className="flex gap-3 text-xs">
                          {proj.link && (
                            <a
                              href={formatUrl(proj.link)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium hover:underline cursor-pointer"
                              style={{ color: accentColor }}
                            >
                              Explore Live →
                            </a>
                          )}
                          {proj.github && (
                            <a
                              href={formatUrl(proj.github)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-stone-500 hover:text-stone-900 cursor-pointer"
                            >
                              Source ↗
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column (4 cols) */}
        <div className="md:col-span-4 space-y-7">
          {/* Skills & Disciplines */}
          {skills && skills.length > 0 && (
            <section id="section-creative-skills">
              <div className="flex items-center gap-2 mb-4 border-b border-stone-200 pb-2">
                <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                  Core Disciplines
                </h2>
              </div>
              <div className="space-y-4">
                {skills.map((group) => (
                  <div key={group.id}>
                    <h3 className="text-xs font-bold font-sans text-stone-800 mb-1.5">{group.category}</h3>
                    <div className="flex flex-wrap gap-1.5 font-sans">
                      {group.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] bg-stone-200/60 text-stone-800 rounded-full"
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

          {/* Education */}
          {education && education.length > 0 && (
            <section id="section-creative-education">
              <div className="flex items-center gap-2 mb-4 border-b border-stone-200 pb-2">
                <Bookmark className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                  Academic Background
                </h2>
              </div>
              <div className="space-y-3.5 font-sans">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-bold text-stone-900 text-sm font-serif">{edu.degree}</h3>
                    {edu.field && <div className="text-stone-700 font-medium">{edu.field}</div>}
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      {edu.school} {edu.location ? `• ${edu.location}` : ""}
                    </div>
                    <div className="text-stone-400 text-[10px]">
                      {edu.startDate} – {edu.endDate || "Present"}
                    </div>
                    {edu.description && <p className="text-stone-600 mt-1 italic font-serif">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Honors & Certifications */}
          {certifications && certifications.length > 0 && (
            <section id="section-creative-certifications">
              <div className="flex items-center gap-2 mb-3 border-b border-stone-200 pb-2">
                <Bookmark className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                  Honors & Certs
                </h2>
              </div>
              <div className="space-y-2 font-sans">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-2.5 bg-stone-100/70 rounded text-xs border border-stone-200/60">
                    <div className="font-semibold text-stone-900">{cert.name}</div>
                    <div className="text-[11px] text-stone-500">{cert.issuer} {cert.date ? `(${cert.date})` : ""}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
