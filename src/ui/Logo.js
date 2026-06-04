import React from "react";

function PlioMark({ size }) {
  return (
    <svg
      width={size * 0.52}
      height={size * 0.52}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="3" height="18" rx="1.5" fill="white" />
      <path
        d="M8 4 C8 4 19 4 19 10 C19 16 8 16 8 16"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="4" r="2.2" fill="rgba(165,243,252,0.9)" />
    </svg>
  );
}

export function Logo({ size = 40, showText = true, subtitle }) {
  return (
    <div className="row gap-12">
      <div className="logo-mark" style={{ width: size, height: size }}>
        <PlioMark size={size} />
      </div>
      {showText && (
        <div className="col" style={{ gap: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: size * 0.45,
              letterSpacing: "-0.03em",
              color: "var(--heading)",
              lineHeight: 1.05,
            }}
          >
            plio
          </span>
          {subtitle && (
            <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.02em" }}>{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}