import React, { useRef } from "react";
import { PersonalInfo } from "../../types";
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Upload, Trash2, Camera } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const SAMPLE_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
];

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          updateField("avatarUrl", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Profile Photo
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative shrink-0">
            {data.avatarUrl ? (
              <img
                src={data.avatarUrl}
                alt={data.fullName || "Avatar"}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-2 border-slate-300 shadow-xs"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                <Camera className="w-6 h-6" />
                <span className="text-[10px] mt-1">No photo</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Custom Image</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {data.avatarUrl && (
                <button
                  type="button"
                  onClick={() => updateField("avatarUrl", "")}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-medium transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            {/* Preset Avatars */}
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="text-[11px] text-slate-500">Or pick preset:</span>
              {SAMPLE_AVATARS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateField("avatarUrl", url)}
                  className={`w-6 h-6 rounded-full overflow-hidden border transition-all ${
                    data.avatarUrl === url ? "ring-2 ring-indigo-500 scale-110" : "border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={url} alt="Preset" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            Full Name *
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="e.g. Alex Rivera"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            Professional Headline / Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="e.g. alex@example.com"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="e.g. +1 (555) 234-5678"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="e.g. San Francisco, CA"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            Portfolio / Personal Website
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => updateField("website", e.target.value)}
            placeholder="e.g. https://alexrivera.dev"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5 text-slate-400" />
            LinkedIn Profile
          </label>
          <input
            type="text"
            value={data.linkedin}
            onChange={(e) => updateField("linkedin", e.target.value)}
            placeholder="e.g. linkedin.com/in/alex-rivera"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Github className="w-3.5 h-3.5 text-slate-400" />
            GitHub / Portfolio Repository
          </label>
          <input
            type="text"
            value={data.github}
            onChange={(e) => updateField("github", e.target.value)}
            placeholder="e.g. github.com/alexrivera"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
          />
        </div>
      </div>
    </div>
  );
};
