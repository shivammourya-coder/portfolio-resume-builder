 import React from "react";
import { PortfolioData } from "../../types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Briefcase, GraduationCap, Code2, Award, FolderGit2 } from "lucide-react";
import { formatUrl, formatDisplayUrl } from "../../utils/urlUtils";

interface TemplateProps {
  data: PortfolioData;
}

export const ModernExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, theme } = data;
  const primaryColor = theme.primaryColor || "#0f233a";
  const accentColor = theme.accentColor || "#0284c7";

  return (
    <div
      id="resume-modern-executive"
      className="bg-white text-slate-800 shadow-sm print:shadow-none min-h-[1100px] w-full font-sans transition-all duration-200"
      style={{ fontFamily: theme.fontFamily === "serif" ? "Georgia, serif" : theme.fontFamily === "mono" ? "ui-monospace, monospace" : "inherit" }}
    >
      {/* Top Header Bar */}
      <header
        className="p-8 text-white relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {personalInfo.avatarUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white/20 shadow-md"
              />
            </div>
          )}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p
              className="text-lg font-medium tracking-wide mb-4"
              style={{ color: accentColor === "#0284c7" ? "#7dd3fc" : accentColor }}
            >
              {personalInfo.title || "Professional Title"}
            </p>

            {/* Contact details */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-4 text-xs text-slate-200">
              {personalInfo.email && (
                <a
                  href={formatUrl(personalInfo.email)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a
                  href={formatUrl(personalInfo.phone)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <a
                  href={formatUrl(personalInfo.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{formatDisplayUrl(personalInfo.website)}</span>
                </a>
              )}
              {personalInfo.linkedin && (
                <a
                  href={formatUrl(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{formatDisplayUrl(personalInfo.linkedin)}</span>
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={formatUrl(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{formatDisplayUrl(personalInfo.github)}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left / Main Column (7 cols) */}
        <div className="md:col-span-8 space-y-7">
          {/* Summary / About */}
          {personalInfo.summary && (
            <section id="section-executive-summary">
              <div className="flex items-center gap-2 border-b-2 pb-1.5 mb-3" style={{ borderColor: primaryColor }}>
                <Briefcase className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Executive Profile
                </h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section id="section-executive-experience">
              <div className="flex items-center gap-2 border-b-2 pb-1.5 mb-4" style={{ borderColor: primaryColor }}>
                <Briefcase className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Professional Experience
                </h2>
              </div>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                    <div
                      className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-0.5">
                      <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-600 mb-2">
                      <span className="font-semibold text-slate-800">{exp.company}</span>
                      {exp.location && <span> • {exp.location}</span>}
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Projects */}
          {projects && projects.length > 0 && (
            <section id="section-executive-projects">
              <div className="flex items-center gap-2 border-b-2 pb-1.5 mb-4" style={{ borderColor: primaryColor }}>
                <FolderGit2 className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Key Projects & Portfolio
                </h2>
              </div>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                      {proj.role && <span className="text-xs font-medium text-slate-500">{proj.role}</span>}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {proj.description}
                    </p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {(proj.link || proj.github) && (
                      <div className="flex gap-3 text-[11px]">
                        {proj.link && (
                          <a
                            href={formatUrl(proj.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:underline flex items-center gap-1 cursor-pointer"
                            style={{ color: accentColor }}
                          >
                            <Globe className="w-3 h-3" /> Live Demo
                          </a>
                        )}
                        {proj.github && (
                          <a
                            href={formatUrl(proj.github)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                          >
                            <Github className="w-3 h-3" /> Code Repository
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar Column (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section id="section-executive-skills">
              <div className="flex items-center gap-2 border-b-2 pb-1.5 mb-3" style={{ borderColor: primaryColor }}>
                <Code2 className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Skills & Expertise
                </h2>
              </div>
              <div className="space-y-3.5">
                {skills.map((cat) => (
                  <div key={cat.id}>
                    <h3 className="text-xs font-bold text-slate-700 mb-1.5">{cat.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-800 rounded-md border border-slate-200/60"
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
            <section id="section-executive-education">
              <div className="flex items-center gap-2 border-b-2 pb-1.5 mb-3" style={{ borderColor: primaryColor }}>
                <GraduationCap className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Education
                </h2>
              </div>
              <div className="space-y-3.5">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                    {edu.field && <div className="text-slate-700 font-medium">{edu.field}</div>}
                    <div className="text-slate-600">{edu.school} {edu.location ? `• ${edu.location}` : ""}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      {edu.startDate} – {edu.endDate || "Present"}
                    </div>
                    {edu.description && <p className="text-slate-600 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section id="section-executive-certifications">
              <div className="flex items-center gap-2 border-b-2 pb-1.5 mb-3" style={{ borderColor: primaryColor }}>
                <Award className="w-4 h-4" style={{ color: accentColor }} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Certifications
                </h2>
              </div>
              <div className="space-y-2.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs bg-slate-50 p-2.5 rounded border border-slate-200">
                    <div className="font-bold text-slate-800">{cert.name}</div>
                    <div className="text-slate-600 text-[11px]">{cert.issuer} {cert.date ? `(${cert.date})` : ""}</div>
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
