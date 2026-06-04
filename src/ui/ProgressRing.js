import React from "react";
import { pctColor, T } from "../theme";

// Anneau de progression animé avec pourcentage au centre.
export function ProgressRing({ value, size = 56, stroke = 5, showLabel = true }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = pctColor(value);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s var(--ease-out), stroke 0.4s" }}
      />
      {showLabel && (
        <text
          x={size / 2}
          y={size / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: color,
            fontSize: size * 0.26,
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
          }}
          transform={"rotate(90," + size / 2 + "," + size / 2 + ")"}
        >
          {value}%
        </text>
      )}
    </svg>
  );
}

// Barre de progression linéaire.
export function ProgressBar({ value, height = 6 }) {
  return (
    <div style={{ background: T.border, borderRadius: 99, height, overflow: "hidden" }}>
      <div
        style={{
          width: value + "%",
          height: "100%",
          background: pctColor(value),
          borderRadius: 99,
          transition: "width 0.6s var(--ease-out), background 0.4s",
        }}
      />
    </div>
  );
}
