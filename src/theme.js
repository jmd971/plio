// ── DESIGN TOKENS ───────────────────────────────────────────────────────────
// Source unique de vérité pour les couleurs/styles utilisés en JS (valeurs
// dynamiques : anneaux de progression, accents par statut, etc.).
// Les styles statiques vivent dans index.css via les variables CSS (--xxx).

export const T = {
  // Marque
  brand: "#003B8E",
  brandLight: "#1E5BC8",
  brandSoft: "#EAF1FC",
  orange: "#E8550A",
  orangeSoft: "#FFF3EB",

  // Surfaces (thème clair premium)
  bg: "#F6F8FC",
  surface: "#FFFFFF",
  surfaceAlt: "#FBFCFE",
  border: "#E7ECF3",
  borderStrong: "#D6DEEA",

  // Texte
  text: "#0E1726",
  heading: "#0A1020",
  muted: "#677489",
  faint: "#94A2B8",

  // États
  green: "#0E9F6E",
  greenSoft: "#E7F8F0",
  blue: "#2563EB",
  blueSoft: "#EAF1FC",
  red: "#E5484D",
  redSoft: "#FDECEC",
  amber: "#E8550A",
  amberSoft: "#FFF3EB",

  // Divers
  fontDisplay: "'Plus Jakarta Sans', 'Inter', sans-serif",
  fontBody: "'Inter', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
};

// Configuration d'affichage par statut de pièce
export const STATUS = {
  MANQUANT: { label: "À fournir", color: T.muted, soft: "#EEF1F6", dot: T.faint },
  RECU: { label: "Reçu", color: T.blue, soft: T.blueSoft, dot: T.blue },
  VALIDE: { label: "Validé", color: T.green, soft: T.greenSoft, dot: T.green },
  REFUSE: { label: "À refaire", color: T.amber, soft: T.amberSoft, dot: T.amber },
};

// Configuration d'affichage par statut de dossier
export const DOSSIER_STATUT = {
  EN_COURS: { label: "En cours", color: T.blue, soft: T.blueSoft },
  INCOMPLET: { label: "Incomplet", color: T.red, soft: T.redSoft },
  COMPLET: { label: "Complet", color: T.green, soft: T.greenSoft },
};

// Couleur de progression selon le pourcentage
export function pctColor(value) {
  if (value >= 100) return T.green;
  if (value > 60) return T.blue;
  return T.orange;
}
