PortfolioCraft AI
A professional, high-converting portfolio and resume builder web application crafted in React, TypeScript, and Tailwind CSS with server-side Gemini AI integration, real-time A4 preview, and vector-accurate PDF export.
✨ Features
Live A4 Document Canvas: Real-time rendering with A4 dimension formatting, dynamic zooming (40%–130%), and fullscreen preview mode.
3 Executive Resume Templates:
Modern Executive: Contemporary corporate layout featuring clear section hierarchies, metrics badges, and crisp accent styling.
Tech Minimal: Clean single-column layout optimized for software engineers, tech leads, and technical recruiters.
Creative Elegant: Refined typography pairing with styled headers for designers, marketers, and product leaders.
AI-Powered Capabilities (Gemini 2.5 Flash):
AI Bullet Point Polish: Transforms raw job bullets into measurable, high-impact XYZ-style achievements.
Summary Auto-Drafting: Synthesizes professional summaries based on role history and skill sets.
ATS & Recruiter Review: Scans resumes against ATS standards, offering readability scores, keyword density, and actionable suggestions.
Bulletproof A4 PDF & Print Export:
Direct PDF download with multi-page pagination.
Native browser vector print & Save-as-PDF support.
Fully compatible with modern CSS color profiles (oklch, lab, CSS variables).
Interactive Form Suite:
Personal Info: Avatar photo drag-and-drop / URL upload, contact details, social and portfolio links.
Work Experience: Dynamic roles, date pickers, present role toggles, and responsibilities editor.
Projects Showcase: Tech stack tags, live links, and GitHub repositories.
Skills Matrix: Categorized proficiencies with interactive tagging.
Education & Certifications: Academic history and credentials.
Data Portability:
Sample Presets: Instant starter presets for Full Stack Engineers, Product Designers, and Growth Executives.
JSON Backup & Import: Export resume configurations and restore them anytime.
🛠️ Tech Stack
Frontend: React 18, TypeScript, Tailwind CSS v4, Vite
Icons: Lucide React
PDF Generation: html-to-image, jsPDF
Backend & AI: Express.js server, @google/genai (Gemini API)
🚀 Getting Started
Prerequisites
Node.js (v18+)
npm or yarn
Installation
Clone or download the repository.
Install dependencies:
code
Bash
npm install
Set your Gemini API key (optional for AI polish features):
code
Bash
cp .env.example .env
# Add your GEMINI_API_KEY to .env
Running Locally
code
Bash
# Start development server on port 3000
npm run dev
Production Build
code
Bash
# Build frontend and server bundle
npm run build

# Start production server
npm start