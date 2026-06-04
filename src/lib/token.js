// ── TOKEN CLIENT ────────────────────────────────────────────────────────────
// Génère/décode le jeton inclus dans le lien envoyé au client. La date de
// naissance est hashée (jamais en clair) et sert de vérification d'accès.

export function hashDob(dob) {
  return btoa(dob.replace(/\D/g, ""));
}

export function generateToken(dossier) {
  const payload = {
    id: dossier.id,
    prenom: dossier.prenom,
    nom: dossier.nom,
    type: dossier.type,
    dobHash: hashDob(dossier.dob || ""),
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

export function decodeToken(token) {
  try {
    const p = JSON.parse(decodeURIComponent(escape(atob(token))));
    return p.exp < Date.now() ? null : p;
  } catch {
    return null;
  }
}

export function verifyDob(inputDob, dobHash) {
  return hashDob(inputDob) === dobHash;
}

export function getClientUrl(token) {
  return window.location.origin + "/#/client/" + token;
}
