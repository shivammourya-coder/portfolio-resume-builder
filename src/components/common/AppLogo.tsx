import React from "react";

export const AppLogo: React.FC<{ className?: string; size?: number }> = ({
  className = "w-9 h-9",
  size = 36,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Fountain Pen Nib (Left Tool) */}
        <g transform="translate(18, 12) rotate(-15)">
          {/* Pen Nib Body */}
          <path
            d="M10 28 L14 10 L19 2 L24 10 L28 28 Z"
            fill="#F59E0B"
          />
          {/* Nib slit & breather hole */}
          <path
            d="M19 2 L19 18"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="19" cy="18" r="2" fill="#FFFFFF" />
          {/* Nib grip ring */}
          <path
            d="M10 28 Q19 32 28 28 L27 33 Q19 36 11 33 Z"
            fill="#334155"
          />
        </g>

        {/* Paintbrush (Right Tool) */}
        <g transform="translate(46, 10) rotate(15)">
          {/* Brush Bristles with purple paint tip */}
          <path
            d="M12 22 Q12 8 20 2 Q28 8 28 22 Q24 26 20 26 Q16 26 12 22 Z"
            fill="#8B5CF6"
          />
          {/* Paint highlight curve */}
          <path
            d="M16 8 Q21 4 23 8"
            stroke="#DDD6FE"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Brush Ferrule */}
          <path
            d="M13 23 L27 23 L26 29 L14 29 Z"
            fill="#94A3B8"
          />
          {/* Brush Handle */}
          <path
            d="M16 29 L24 29 L23 37 L17 37 Z"
            fill="#475569"
          />
        </g>

        {/* Briefcase Handle */}
        <path
          d="M34 40 C34 26 66 26 66 40"
          stroke="#1E293B"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Briefcase Main Body - Upper Flap */}
        <rect
          x="16"
          y="38"
          width="68"
          height="22"
          rx="6"
          fill="#1E293B"
        />

        {/* Briefcase Main Body - Lower Base */}
        <path
          d="M16 52 L84 52 L84 66 C84 71 80 75 75 75 L25 75 C20 75 16 71 16 66 Z"
          fill="#0F172A"
        />

        {/* Briefcase Seam Highlight */}
        <line
          x1="18"
          y1="51"
          x2="82"
          y2="51"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Briefcase Center Lock Clasp */}
        <rect
          x="43"
          y="46"
          width="14"
          height="14"
          rx="7"
          fill="#F8FAFC"
          stroke="#334155"
          strokeWidth="2"
        />
        <circle cx="50" cy="53" r="3" fill="#0F172A" />

        {/* Pencil (Bottom Tool) */}
        <g transform="translate(24, 66)">
          {/* Pink Eraser */}
          <rect
            x="4"
            y="3"
            width="8"
            height="11"
            rx="2.5"
            fill="#F472B6"
          />
          {/* Metal Band (Ferrule) */}
          <rect
            x="12"
            y="3"
            width="4"
            height="11"
            fill="#CBD5E1"
          />
          {/* Yellow/Orange Pencil Body */}
          <rect
            x="16"
            y="3"
            width="28"
            height="11"
            fill="#F59E0B"
          />
          {/* Pencil Highlights */}
          <line
            x1="16"
            y1="6.5"
            x2="44"
            y2="6.5"
            stroke="#FBBF24"
            strokeWidth="1.5"
          />
          <line
            x1="16"
            y1="10.5"
            x2="44"
            y2="10.5"
            stroke="#D97706"
            strokeWidth="1"
          />
          {/* Sharpened Wood Cone */}
          <path
            d="M44 3 L54 8.5 L44 14 Z"
            fill="#FED7AA"
          />
          {/* Graphite Pencil Tip */}
          <path
            d="M51 7 L56 8.5 L51 10 Z"
            fill="#1E293B"
          />
        </g>
      </svg>
    </div>
  );
};
