import React from "react";
import { Zap } from "lucide-react";

// Marque AXECIME : pastille dégradée + wordmark optionnel.
export function Logo({ size = 40, showText = true, subtitle }) {
  return (
    <div className="row gap-12">
      <div className="logo-mark" style={{ width: size, height: size }}>
        <Zap size={size * 0.5} strokeWidth={2.4} fill="currentColor" />
      </div>
      {showText && (
        <div className="col" style={{ gap: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: size * 0.42,
              letterSpacing: "-0.01em",
              color: "var(--heading)",
              lineHeight: 1.05,
            }}
          >
            AXECIME
          </span>
          {subtitle && (
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}
