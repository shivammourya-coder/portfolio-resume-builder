export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  avatarUrl: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  technologies: string[];
  description: string;
  link: string;
  github: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export type TemplateId = "modern-executive" | "tech-minimal" | "creative-elegant";

export interface ThemeConfig {
  templateId: TemplateId;
  primaryColor: string;
  accentColor: string;
  fontFamily: "sans" | "serif" | "mono";
  spacing: "compact" | "standard" | "relaxed";
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  theme: ThemeConfig;
}

export type AiEnhanceMode = "polish" | "action_verbs" | "quantify" | "concise" | "executive";
