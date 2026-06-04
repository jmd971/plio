// ── FORMATAGE ───────────────────────────────────────────────────────────────

// Affiche une date ISO (yyyy-mm-dd) au format FR sans décalage UTC.
export function formatDateFR(isoDate) {
  if (!isoDate) return "—";
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

// Taille de fichier lisible.
export function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return bytes + " o";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " Ko";
  return (bytes / (1024 * 1024)).toFixed(1) + " Mo";
}

// Nettoie un nom de catégorie « 03-Revenus » → « Revenus ».
export function cleanCategory(cat) {
  return (cat || "Autres").replace(/^\d+-/, "");
}

// Identifiant court aléatoire.
export const genId = () => Math.random().toString(36).substr(2, 9);
