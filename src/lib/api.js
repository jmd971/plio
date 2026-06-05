// ── API ─────────────────────────────────────────────────────────────────────
// Couche d'accès au backend (Vercel functions : Redis + Blob). Contrat de
// données inchangé par rapport à la version précédente.

async function readApiError(res) {
  try {
    const d = await res.json();
    return d.error || "HTTP " + res.status;
  } catch {
    return "HTTP " + res.status;
  }
}

export async function apiGetDossiers() {
  const res = await fetch("/api/dossiers");
  if (!res.ok) throw new Error(await readApiError(res));
  return res.json();
}

export async function apiCreateDossier(dossier) {
  const res = await fetch("/api/dossiers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dossier),
  });
  if (!res.ok) throw new Error(await readApiError(res));
  return res.json();
}

export async function apiGetDossier(id) {
  const res = await fetch("/api/dossier?id=" + encodeURIComponent(id));
  if (!res.ok) return null;
  return res.json();
}

export async function apiUpdatePiece(id, pieceCode, newStatus, fileData) {
  const res = await fetch("/api/dossier", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, pieceCode, newStatus, ...(fileData ? { fileData } : {}) }),
  });
  if (!res.ok) throw new Error("Erreur mise à jour");
  return res.json();
}

export async function apiDeleteDossier(id) {
  const res = await fetch("/api/dossier?id=" + encodeURIComponent(id), { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur suppression");
  return res.json();
}

export async function apiResetDemo() {
  const res = await fetch("/api/admin/reset-demo", { method: "POST" });
  if (!res.ok) throw new Error("Erreur nettoyage démos");
  return res.json();
}

// Upload vers Vercel Blob via /api/upload (rétention 30 jours).
export async function apiUploadFile(file, dossier, pieceCode, onProgress) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const base64 = e.target.result.split(",")[1];
        const piece = (dossier.pieces || []).find((p) => p.code === pieceCode);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dossierId: dossier.id,
            pieceCode,
            category: piece?.category || "",
            fileName: file.name,
            fileBase64: base64,
            mimeType: file.type,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || "Erreur upload");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Erreur lecture fichier"));
    reader.readAsDataURL(file);
  });
}