import React, { useState } from "react";
import {
  Mail, Phone, Cake, FolderOpen, Package, Download, Link2, Copy, Check,
  MessageCircle, Folder, FileText, ExternalLink, Trash2, CheckCircle2, XCircle,
} from "lucide-react";
import { ProgressRing } from "../ui/ProgressRing";
import { StatusBadge, Pill } from "../ui/Badge";
import { Button } from "../ui/Button";
import { DOSSIER_TYPES } from "../data/dossierTypes";
import { getClientUrl } from "../lib/token";
import { formatDateFR, formatSize, cleanCategory } from "../lib/format";
import { useToast } from "../ui/Toast";
import { useConfirm } from "../ui/Confirm";

// Panneau de détail d'un dossier sélectionné.
export function DossierDetail({ dossier: d, onValidate, onDelete }) {
  const toast = useToast();
  const confirm = useConfirm();
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const typeInfo = DOSSIER_TYPES[d.type];
  const TypeIcon = typeInfo?.Icon || Folder;
  const pct = Math.round((d.pieces.filter((p) => p.status !== "MANQUANT").length / d.pieces.length) * 100);
  const clientUrl = getClientUrl(d.token);

  const copyLink = () => {
    navigator.clipboard.writeText(clientUrl).then(() => {
      setCopied(true);
      toast.success("Lien copié dans le presse-papier");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePiece = async (code, status) => {
    setSaving(code);
    try {
      await onValidate(d.id, code, status);
      toast.success(status === "VALIDE" ? "Pièce validée" : "Pièce refusée — le client sera invité à la refaire");
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Supprimer ce dossier ?",
      message: `Le dossier de ${d.prenom} ${d.nom} sera définitivement supprimé. Cette action est irréversible.`,
      confirmLabel: "Supprimer",
      danger: true,
    });
    if (!ok) return;
    setDeleting(true);
    try {
      await onDelete(d.id);
    } finally {
      setDeleting(false);
    }
  };

  const waUrl =
    d.tel &&
    "https://wa.me/" +
      d.tel.replace(/\D/g, "") +
      "?text=" +
      encodeURIComponent(
        "Bonjour " + d.prenom + " ! 👋\n\nVoici votre lien sécurisé AXECIME pour déposer vos documents :\n" +
          clientUrl +
          "\n\nVous devrez confirmer votre date de naissance pour y accéder.\nLien valable 30 jours.\n\nL'équipe AXECIME"
      );
  const mailUrl =
    d.email &&
    "mailto:" + d.email + "?subject=Vos documents AXECIME&body=" +
      encodeURIComponent(
        "Bonjour " + d.prenom + ",\n\nVoici votre lien sécurisé :\n\n" + clientUrl +
          "\n\nConfirmez votre date de naissance pour y accéder.\nLien valable 30 jours.\n\nCordialement,\nL'équipe AXECIME"
      );

  const bycat = d.pieces.reduce((acc, p) => {
    const c = p.category || "Autres";
    (acc[c] = acc[c] || []).push(p);
    return acc;
  }, {});

  return (
    <div style={{ padding: 24, maxWidth: 820 }}>
      {/* En-tête dossier */}
      <div className="card-lg" style={{ padding: 22, marginBottom: 16, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div className="grow">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 800, color: "var(--heading)" }}>
            {d.prenom} {d.nom}
          </div>
          <div className="row gap-16" style={{ color: "var(--muted)", fontSize: 13, marginTop: 6, flexWrap: "wrap" }}>
            {d.email && <span className="row gap-4"><Mail size={13} /> {d.email}</span>}
            {d.tel && <span className="row gap-4"><Phone size={13} /> {d.tel}</span>}
            {d.dob && <span className="row gap-4"><Cake size={13} /> {formatDateFR(d.dob)}</span>}
          </div>
          <div className="row gap-8" style={{ marginTop: 12, flexWrap: "wrap" }}>
            <Pill color={typeInfo?.accent || "var(--brand)"} soft="var(--brand-soft)" icon={TypeIcon}>
              {typeInfo?.label}
            </Pill>
            {d.conseiller && <span className="row gap-4" style={{ color: "var(--muted)", fontSize: 12.5 }}>👤 {d.conseiller}</span>}
          </div>
          <div className="row gap-4 mono" style={{ marginTop: 8, color: "var(--faint)", fontSize: 11 }}>
            <FolderOpen size={12} /> dossiers/{d.id}
          </div>
        </div>
        <div className="col" style={{ alignItems: "center", gap: 4 }}>
          <ProgressRing value={pct} size={66} />
          <span style={{ color: "var(--muted)", fontSize: 11 }}>Complétion</span>
        </div>
      </div>

      {/* Stockage / ZIP */}
      <div
        className="card row gap-12"
        style={{ padding: "12px 16px", marginBottom: 16, flexWrap: "wrap" }}
      >
        <div className="row" style={{ width: 36, height: 36, borderRadius: 10, background: "var(--brand-soft)", color: "var(--brand)", justifyContent: "center", flexShrink: 0 }}>
          <Package size={18} />
        </div>
        <div className="grow" style={{ fontSize: 12.5, color: "var(--muted)", minWidth: 180 }}>
          <strong style={{ color: "var(--text)" }}>Stockage interne</strong> — rétention automatique 30 jours après upload
        </div>
        <a className="btn btn-soft btn-sm" href={"/api/dossier-zip?id=" + d.id} download>
          <Download size={15} /> Télécharger le ZIP
        </a>
      </div>

      {/* Lien client */}
      <div className="card" style={{ padding: 18, marginBottom: 18, background: "var(--surface-alt)" }}>
        <div className="row gap-8" style={{ color: "var(--brand)", fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
          <Link2 size={16} /> Lien à envoyer au client
        </div>
        <div
          className="mono"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 9,
            padding: "9px 12px",
            fontSize: 11.5,
            color: "var(--muted)",
            wordBreak: "break-all",
            marginBottom: 12,
          }}
        >
          {clientUrl}
        </div>
        <div className="row gap-8" style={{ flexWrap: "wrap" }}>
          <Button variant={copied ? "success" : "primary"} size="sm" onClick={copyLink} icon={copied ? Check : Copy}>
            {copied ? "Copié !" : "Copier le lien"}
          </Button>
          {waUrl && (
            <a
              className="btn btn-sm"
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              style={{ background: "#E7F8EF", color: "#128C7E", border: "1px solid #BCE8D4" }}
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          )}
          {mailUrl && (
            <a
              className="btn btn-sm"
              href={mailUrl}
              style={{ background: "var(--orange-soft)", color: "var(--orange)", border: "1px solid #FAD9C4" }}
            >
              <Mail size={15} /> Email
            </a>
          )}
        </div>
        <div style={{ color: "var(--faint)", fontSize: 11.5, marginTop: 10 }}>
          Valable 30 jours · protégé par date de naissance · stockage interne
        </div>
      </div>

      {/* Pièces */}
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--heading)", marginBottom: 12 }}>
        Pièces justificatives
      </div>
      {Object.entries(bycat).map(([cat, catPieces]) => (
        <div key={cat} style={{ marginBottom: 16 }}>
          <div className="row gap-8" style={{ marginBottom: 8 }}>
            <Folder size={14} color="var(--brand)" />
            <span style={{ color: "var(--heading)", fontSize: 13, fontWeight: 700 }}>{cleanCategory(cat)}</span>
            <span style={{ color: "var(--muted)", fontSize: 11.5 }}>
              ({catPieces.filter((p) => p.status !== "MANQUANT").length}/{catPieces.length} reçues)
            </span>
          </div>
          <div className="col gap-6">
            {catPieces.map((p) => (
              <div
                key={p.code}
                className="card"
                style={{ padding: "11px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}
              >
                <div className="grow">
                  <div style={{ color: "var(--text)", fontSize: 13.5, fontWeight: 600 }}>{p.label}</div>
                  <div className="mono" style={{ color: "var(--faint)", fontSize: 10.5, marginTop: 2 }}>{p.code}</div>
                  {p.file && p.file.url && (
                    <div className="row gap-4" style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 4 }}>
                      <FileText size={12} /> {p.file.name} · {formatSize(p.file.size)}
                      {p.file.uploadedAt && <span>· reçu le {new Date(p.file.uploadedAt).toLocaleDateString("fr-FR")}</span>}
                    </div>
                  )}
                </div>
                <div className="row gap-6" style={{ flexShrink: 0 }}>
                  <StatusBadge status={p.status} />
                  {p.file && p.file.url && (
                    <a className="btn btn-soft btn-sm" href={p.file.url} target="_blank" rel="noreferrer" download>
                      <ExternalLink size={14} /> Voir
                    </a>
                  )}
                  {p.status === "RECU" && (
                    <>
                      <Button variant="success" size="sm" loading={saving === p.code} onClick={() => handlePiece(p.code, "VALIDE")} icon={CheckCircle2}>
                        Valider
                      </Button>
                      <Button variant="danger" size="sm" loading={saving === p.code} onClick={() => handlePiece(p.code, "REFUSE")} icon={XCircle}>
                        Refuser
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Actions rapides */}
      <div className="card" style={{ padding: 16, marginTop: 8 }}>
        <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Actions rapides</div>
        <div className="row gap-8" style={{ flexWrap: "wrap" }}>
          {mailUrl && (
            <a className="btn btn-ghost btn-sm" href={mailUrl}>
              <Mail size={15} /> Relance email
            </a>
          )}
          {waUrl && (
            <a className="btn btn-ghost btn-sm" href={waUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={15} /> Relance WhatsApp
            </a>
          )}
          {d.tel && (
            <a className="btn btn-ghost btn-sm" href={"tel:" + d.tel}>
              <Phone size={15} /> Appeler
            </a>
          )}
          <Button variant="danger" size="sm" loading={deleting} onClick={handleDelete} icon={Trash2} style={{ marginLeft: "auto" }}>
            Supprimer ce dossier
          </Button>
        </div>
      </div>
    </div>
  );
}
