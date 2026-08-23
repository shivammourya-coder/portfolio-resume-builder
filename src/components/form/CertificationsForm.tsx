import React from "react";
import { CertificationItem } from "../../types";
import { Plus, Trash2, Award } from "lucide-react";

interface CertificationsFormProps {
  certifications: CertificationItem[];
  onChange: (certifications: CertificationItem[]) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({
  certifications,
  onChange,
}) => {
  const addCert = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      date: "",
    };
    onChange([...certifications, newItem]);
  };

  const updateItem = (id: string, field: keyof CertificationItem, value: string) => {
    onChange(
      certifications.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    onChange(certifications.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Certifications & Licenses ({certifications.length})
          </h3>
          <p className="text-[11px] text-slate-500">
            Industry accreditations, cloud certifications, and honors.
          </p>
        </div>
        <button
          type="button"
          onClick={addCert}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certificate</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-600">No certifications added</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Include credentials like AWS Certified, PMP, CFA, etc.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, "name", e.target.value)}
                  placeholder="Certificate Name (e.g. AWS Solutions Architect)"
                  className="px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={item.issuer}
                  onChange={(e) => updateItem(item.id, "issuer", e.target.value)}
                  placeholder="Issuing Org (e.g. Amazon Web Services)"
                  className="px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) => updateItem(item.id, "date", e.target.value)}
                  placeholder="Issue Year (e.g. 2023)"
                  className="px-2.5 py-1.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors self-end sm:self-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
