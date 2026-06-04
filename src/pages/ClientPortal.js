import React, { useState, useEffect } from "react";
import { Ban, Loader2 } from "lucide-react";
import { DOSSIER_TYPES } from "../data/dossierTypes";
import { decodeToken } from "../lib/token";
import { apiGetDossier } from "../lib/api";
import { DobVerification } from "../components/DobVerification";
import { ClientChecklist } from "../components/ClientChecklist";

// État « lien invalide / expiré ».
function InvalidLink() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        background: "var(--bg)",
      }}
    >
      <div
        className="row"
        style={{ width: 72, height: 72, borderRadius: 20, background: "#FDECEC", color: "var(--red)", justifyContent: "center" }}
      >
        <Ban size={36} />
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--heading)", textAlign: "center" }}>
        Lien invalide ou expiré
      </div>
      <div style={{ color: "var(--muted)", fontSize: 14, textAlign: "center", maxWidth: 340, lineHeight: 1.5 }}>
        Ce lien n'est plus valide. Contactez votre conseiller pour en obtenir un nouveau.
      </div>
      <div className="card" style={{ padding: "12px 22px", marginTop: 4 }}>
        <span style={{ fontWeight: 700, color: "var(--brand)" }}>plio.fr</span>
      </div>
    </div>
  );
}

// Portail client complet : décodage du jeton → vérification DOB → checklist.
export function ClientPortal({ token }) {
  const payload = decodeToken(token);
  const [verified, setVerified] = useState(false);
  const [pieces, setPieces] = useState(() =>
    payload ? DOSSIER_TYPES[payload.type].pieces.map((p) => ({ ...p, status: "MANQUANT" })) : []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!verified || !payload) return;
    setLoading(true);
    apiGetDossier(payload.id)
      .then((data) => {
        if (data && data.pieces) setPieces(data.pieces);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [verified]);

  if (!payload) return <InvalidLink />;

  const dossier = { id: payload.id, prenom: payload.prenom, nom: payload.nom, type: payload.type, pieces };

  if (!verified) {
    return <DobVerification prenom={payload.prenom} dobHash={payload.dobHash} onVerified={() => setVerified(true)} />;
  }

  if (loading) {
    return (
      <div
        className="row"
        style={{ height: "100vh", justifyContent: "center", gap: 10, color: "var(--muted)", background: "var(--bg)" }}
      >
        <Loader2 size={18} className="spin" /> Chargement de vos documents…
      </div>
    );
  }

  return <ClientChecklist dossier={dossier} />;
}