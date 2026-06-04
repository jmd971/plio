import React, { useState, useRef } from "react";
import {
  Folder, FileText, UploadCloud, RefreshCcw, Loader2, CheckCircle2,
  PartyPopper, ShieldCheck, Clock,
} from "lucide-react";
import { Logo } from "../ui/Logo";
import { ProgressRing, ProgressBar } from "../ui/ProgressRing";
import { StatusBadge } from "../ui/Badge";
import { DOSSIER_TYPES } from "../data/dossierTypes";
import { apiUploadFile } from "../lib/api";
import { formatSize, cleanCategory } from "../lib/format";

// Ligne d'une pièce avec glisser-déposer + upload.
function PieceRow({ piece, dossier, pieces, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const done = piece.status !== "MANQUANT";

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await apiUploadFile(file, { ...dossier, pieces }, piece.code);
      onUploaded(piece.code, file);
    } catch (e) {
      setError(e.message);
    }
    setUploading(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  return (
    <div
      className={"card dropzone" + (dragging ? " dragging" : "")}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      style={{
        padding: "13px 15px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        borderColor: done ? "#C4ECD9" : "var(--border)",
        background: done ? "#FBFEFC" : "var(--surface)",
      }}
    >
      <div
        className="row"
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          justifyContent: "center",
          flexShrink: 0,
          background: done ? "#E7F8F0" : "var(--bg)",
          color: done ? "var(--green)" : "var(--faint)",
        }}
      >
        {done ? <CheckCircle2 size={20} /> : <FileText size={18} />}
      </div>

      <div className="grow">
        <div style={{ color: "var(--text)", fontSize: 13.5, fontWeight: 600 }}>{piece.label}</div>
        {piece.file && piece.file.name ? (
          <div className="row gap-6" style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 3 }}>
            <FileText size={12} />
            <span className="truncate" style={{ maxWidth: 200 }}>{piece.file.name}</span>
            {piece.file.size != null && <span>· {formatSize(piece.file.size)}</span>}
          </div>
        ) : (
          <div style={{ color: "var(--faint)", fontSize: 11.5, marginTop: 3 }}>
            Glissez le fichier ici ou cliquez sur Envoyer · PDF, JPG, PNG
          </div>
        )}
        {error && <div style={{ color: "var(--red)", fontSize: 11.5, marginTop: 3 }}>{error}</div>}
      </div>

      <div className="row gap-8" style={{ flexShrink: 0 }}>
        <StatusBadge status={piece.status} />
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files && e.target.files[0];
            handleFile(f);
            e.target.value = "";
          }}
        />
        <button
          className={"btn btn-sm " + (done ? "btn-success" : "btn-primary")}
          disabled={uploading}
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          {uploading ? (
            <><Loader2 size={15} className="spin" /> Envoi…</>
          ) : done ? (
            <><RefreshCcw size={15} /> Remplacer</>
          ) : (
            <><UploadCloud size={15} /> Envoyer</>
          )}
        </button>
      </div>
    </div>
  );
}

// Vue checklist complète côté client.
export function ClientChecklist({ dossier }) {
  const [pieces, setPieces] = useState(dossier.pieces);
  const typeInfo = DOSSIER_TYPES[dossier.type];
  const TypeIcon = typeInfo.Icon;

  const received = pieces.filter((p) => p.status !== "MANQUANT").length;
  const pct = Math.round((received / pieces.length) * 100);

  const onUploaded = (code, file) => {
    setPieces((prev) =>
      prev.map((p) =>
        p.code === code
          ? { ...p, status: "RECU", file: { name: file.name, size: file.size, uploadedAt: new Date().toISOString() } }
          : p
      )
    );
  };

  const bycat = pieces.reduce((acc, p) => {
    const c = p.category || "Autres";
    (acc[c] = acc[c] || []).push(p);
    return acc;
  }, {});

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      {/* Header */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "13px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Logo size={38} showText={false} />
        <div className="grow">
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--heading)" }}>
            Bonjour {dossier.prenom}
          </div>
          <div className="row gap-6 truncate" style={{ color: "var(--muted)", fontSize: 12.5 }}>
            <TypeIcon size={13} /> {typeInfo.label}
          </div>
        </div>
        <ProgressRing value={pct} size={52} />
      </div>

      {/* Progression */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "12px 18px" }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "var(--muted)", fontSize: 12.5 }}>
            {received} / {pieces.length} documents reçus
          </span>
          <span className="mono" style={{ color: pct === 100 ? "var(--green)" : "var(--orange)", fontSize: 12.5, fontWeight: 700 }}>
            {pct}%
          </span>
        </div>
        <ProgressBar value={pct} />
      </div>

      {/* Contenu */}
      <div style={{ flex: 1, overflowY: "auto", padding: 18, maxWidth: 760, width: "100%", margin: "0 auto" }}>
        {pct === 100 && (
          <div
            className="anim-fade-up"
            style={{
              background: "linear-gradient(135deg, #E7F8F0, #F0FBF6)",
              border: "1px solid #C4ECD9",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              textAlign: "center",
              marginBottom: 18,
            }}
          >
            <PartyPopper size={36} color="var(--green)" style={{ marginBottom: 6 }} />
            <div style={{ color: "var(--green)", fontWeight: 800, fontSize: 17, fontFamily: "var(--font-display)" }}>
              Dossier complet !
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 4 }}>
              Merci {dossier.prenom}. Votre conseiller vous contactera sous 24–48h.
            </div>
          </div>
        )}

        {Object.entries(bycat).map(([cat, catPieces]) => {
          const catDone = catPieces.filter((p) => p.status !== "MANQUANT").length;
          const full = catDone === catPieces.length;
          return (
            <div key={cat} style={{ marginBottom: 22 }}>
              <div className="row gap-8" style={{ marginBottom: 10 }}>
                <Folder size={15} color={full ? "var(--green)" : "var(--brand)"} />
                <span style={{ color: "var(--heading)", fontWeight: 700, fontSize: 13.5 }}>{cleanCategory(cat)}</span>
                <span
                  className="mono"
                  style={{
                    color: full ? "var(--green)" : "var(--muted)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    background: full ? "#E7F8F0" : "var(--bg)",
                    padding: "1px 8px",
                    borderRadius: 20,
                  }}
                >
                  {catDone}/{catPieces.length}
                </span>
              </div>
              <div className="col gap-8">
                {catPieces.map((p) => (
                  <PieceRow key={p.code} piece={p} dossier={dossier} pieces={pieces} onUploaded={onUploaded} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="row gap-12"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          padding: "11px 18px",
          justifyContent: "center",
          color: "var(--faint)",
          fontSize: 11.5,
          flexWrap: "wrap",
        }}
      >
        <span className="row gap-4"><ShieldCheck size={13} /> Sauvegarde sécurisée</span>
        <span className="row gap-4"><Clock size={13} /> Rétention 30 jours</span>
        <span>Conforme RGPD</span>
      </div>
    </div>
  );
}