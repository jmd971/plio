export const T = {
  brand: "#6366f1",
  brandLight: "#818cf8",
  brandSoft: "rgba(99, 102, 241, 0.12)",
  cyan: "#a5f3fc",
  cyanSoft: "rgba(165, 243, 252, 0.10)",

  bg: "#08090f",
  surface: "#141520",
  surfaceAlt: "#1a1c2e",
  surfaceRaised: "#1e2035",
  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.12)",

  text: "#e2e8f0",
  heading: "#f8fafc",
  muted: "#94a3b8",
  faint: "#475569",

  green: "#34d399",
  greenSoft: "rgba(52, 211, 153, 0.12)",
  blue: "#60a5fa",
  blueSoft: "rgba(96, 165, 250, 0.12)",
  red: "#f87171",
  redSoft: "rgba(248, 113, 113, 0.12)",
  amber: "#fbbf24",
  amberSoft: "rgba(251, 191, 36, 0.12)",

  fontDisplay: "'Inter', system-ui, sans-serif",
  fontBody: "'Inter', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
};

export const STATUS = {
  MANQUANT: { label: "À fournir", color: T.faint, soft: T.surfaceRaised, dot: T.faint },
  RECU: { label: "Reçu", color: T.blue, soft: T.blueSoft, dot: T.blue },
  VALIDE: { label: "Validé", color: T.green, soft: T.greenSoft, dot: T.green },
  REFUSE: { label: "À refaire", color: T.amber, soft: T.amberSoft, dot: T.amber },
};

export const DOSSIER_STATUT = {
  EN_COURS: { label: "En cours", color: T.blue, soft: T.blueSoft },
  INCOMPLET: { label: "Incomplet", color: T.red, soft: T.redSoft },
  COMPLET: { label: "Complet", color: T.green, soft: T.greenSoft },
};

export function pctColor(value) {
  if (value >= 100) return T.green;
  if (value > 60) return T.brand;
  return T.amber;
}