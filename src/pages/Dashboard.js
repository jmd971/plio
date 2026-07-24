import React, { useState, useMemo } from "react";
import {
  RefreshCw, Plus, LogOut, Eraser, Search, FolderOpen, Inbox,
} from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button, IconButton } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressRing";
import { DOSSIER_TYPES } from "../data/dossierTypes";
import { DOSSIER_STATUT } from "../theme";
import { DossierDetail } from "../components/DossierDetail";
import { useToast } from "../ui/Toast";
import { useConfirm } from "../ui/Confirm";

const FILTERS = [
  { key: "ALL", label: "Tous" },
  { key: "EN_COURS", label: "En cours" },
  { key: "INCOMPLET", label: "Incomplets" },
  { key: "COMPLET", label: "Complets" },
];

// Carte d'un dossier dans la liste latérale.
function DossierCard({ dos, selected, onClick }) {
  const typeInfo = DOSSIER_TYPES[dos.type];
  const TypeIcon = typeInfo?.Icon;
  const pct = Math.round((dos.pieces.filter((p) => p.status !== "MANQUANT").length / dos.pieces.length) * 100);
  const st = DOSSIER_STATUT[dos.statut];

  return (
    <div
      className="card card-interactive"
      onClick={onClick}
      style={{
        padding: "11px 13px",
        marginBottom: 8,
        borderColor: selected ? "var(--brand-light)" : "var(--border)",
        background: selected ? "var(--brand-soft)" : "var(--surface)",
        boxShadow: selected ? "0 0 0 1px var(--brand-light)" : "var(--shadow-xs)",
      }}
    >
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div className="grow">
          <div style={{ color: "var(--heading)", fontWeight: 700, fontSize: 13.5 }}>
            {dos.prenom} {dos.nom}
          </div>
          <div className="row gap-4" style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>
            {TypeIcon && <TypeIcon size={12} />} {typeInfo?.label}
          </div>
          {dos.conseiller && (
            <div style={{ color: "var(--faint)", fontSize: 10.5, marginTop: 1 }}>👤 {dos.conseiller}</div>
          )}
        </div>
        {st && (
          <span
            className="badge"
            style={{ background: st.soft, color: st.color, fontSize: 10.5, padding: "2px 8px" }}
          >
            {st.label}
          </span>
        )}
      </div>
      <ProgressBar value={pct} height={4} />
      <div className="row" style={{ justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ color: "var(--muted)", fontSize: 10.5 }}>
          {dos.pieces.filter((p) => p.status !== "MANQUANT").length}/{dos.pieces.length} pièces
        </span>
        <span className="mono" style={{ color: "var(--faint)", fontSize: 10.5 }}>{pct}%</span>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card" style={{ padding: "11px 13px", marginBottom: 8 }}>
      <div className="skeleton" style={{ height: 13, width: "55%", marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 10, width: "75%", marginBottom: 10 }} />
      <div className="skeleton" style={{ height: 4, width: "100%" }} />
    </div>
  );
}

// Tableau de bord conseiller.
export function Dashboard({ dossiers, loading, onValidate, onTogglePiece, onNewDossier, onLogout, onRefresh, onDelete, onResetDemo }) {
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [query, setQuery] = useState("");
  const [cleaning, setCleaning] = useState(false);
  const toast = useToast();
  const confirm = useConfirm();

  const stats = {
    total: dossiers.length,
    enCours: dossiers.filter((d) => d.statut === "EN_COURS").length,
    incomplets: dossiers.filter((d) => d.statut === "INCOMPLET").length,
    complets: dossiers.filter((d) => d.statut === "COMPLET").length,
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dossiers.filter((d) => {
      if (filter !== "ALL" && d.statut !== filter) return false;
      if (!q) return true;
      return (
        (d.prenom + " " + d.nom).toLowerCase().includes(q) ||
        (d.conseiller || "").toLowerCase().includes(q) ||
        (DOSSIER_TYPES[d.type]?.label || "").toLowerCase().includes(q)
      );
    });
  }, [dossiers, filter, query]);

  const selected = dossiers.find((x) => x.id === sel);

  const handleResetDemo = async () => {
    const ok = await confirm({
      title: "Nettoyer les dossiers de démo ?",
      message: "Tous les faux dossiers de démonstration (Jean Dupont, Nadège Martin, Christophe Beaumont) seront supprimés.",
      confirmLabel: "Nettoyer",
      danger: true,
    });
    if (!ok) return;
    setCleaning(true);
    try {
      const r = await onResetDemo();
      toast.success((r.count || 0) + " dossier(s) démo supprimé(s)");
    } finally {
      setCleaning(false);
    }
  };

  const statCards = [
    { l: "Total", v: stats.total, c: "var(--heading)" },
    { l: "En cours", v: stats.enCours, c: DOSSIER_STATUT.EN_COURS.color },
    { l: "Incomplets", v: stats.incomplets, c: DOSSIER_STATUT.INCOMPLET.color },
    { l: "Complets", v: stats.complets, c: DOSSIER_STATUT.COMPLET.color },
  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      {/* Barre supérieure */}
      <div
        className="row gap-12"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "0 18px", height: 58, flexShrink: 0 }}
      >
        <Logo size={34} subtitle="Espace Conseillers" />
        <div className="row gap-8" style={{ marginLeft: "auto" }}>
          <IconButton icon={RefreshCw} onClick={onRefresh} title="Actualiser" />
          <Button variant="ghost" size="sm" onClick={handleResetDemo} loading={cleaning} icon={Eraser} className="hide-mobile">
            Nettoyer démos
          </Button>
          <Button size="sm" onClick={onNewDossier} icon={Plus}>
            Nouveau dossier
          </Button>
          <IconButton icon={LogOut} onClick={onLogout} title="Se déconnecter" />
        </div>
      </div>

      <div className="row" style={{ flex: 1, overflow: "hidden", alignItems: "stretch" }}>
        {/* Sidebar */}
        <div
          className="col"
          style={{ width: 296, background: "var(--surface)", borderRight: "1px solid var(--border)", flexShrink: 0 }}
        >
          <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              {statCards.map((k) => (
                <div key={k.l} className="card" style={{ padding: "9px 11px" }}>
                  <div className="mono" style={{ color: k.c, fontSize: 19, fontWeight: 700 }}>{k.v}</div>
                  <div style={{ color: "var(--muted)", fontSize: 10.5 }}>{k.l}</div>
                </div>
              ))}
            </div>

            <div style={{ position: "relative", marginBottom: 10 }}>
              <Search size={15} color="var(--faint)" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
              <input
                className="input"
                placeholder="Rechercher un dossier…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ paddingLeft: 34, padding: "9px 12px 9px 34px", fontSize: 13 }}
              />
            </div>

            <div className="row gap-4" style={{ flexWrap: "wrap" }}>
              {FILTERS.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{
                      background: active ? "var(--brand)" : "var(--bg)",
                      color: active ? "#fff" : "var(--muted)",
                      border: "1px solid " + (active ? "var(--brand)" : "var(--border)"),
                      borderRadius: 20,
                      padding: "4px 11px",
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
            {loading ? (
              [0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)
            ) : filtered.length === 0 ? (
              <div className="col" style={{ alignItems: "center", gap: 8, marginTop: 40, color: "var(--faint)", textAlign: "center", padding: 16 }}>
                <Inbox size={32} />
                <span style={{ fontSize: 13 }}>{query || filter !== "ALL" ? "Aucun résultat" : "Aucun dossier"}</span>
              </div>
            ) : (
              filtered.map((dos) => (
                <DossierCard key={dos.id} dos={dos} selected={sel === dos.id} onClick={() => setSel(dos.id)} />
              ))
            )}
          </div>
        </div>

        {/* Panneau principal */}
        <div className="grow" style={{ overflowY: "auto", background: "var(--bg)" }}>
          {selected ? (
            <DossierDetail
              dossier={selected}
              onValidate={onValidate}
              onTogglePiece={onTogglePiece}
              onDelete={async (id) => {
                await onDelete(id);
                if (sel === id) setSel(null);
                toast.success("Dossier supprimé");
              }}
            />
          ) : (
            <div className="col" style={{ height: "100%", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--faint)", textAlign: "center", padding: 24 }}>
              <div className="row" style={{ width: 76, height: 76, borderRadius: 22, background: "var(--surface)", boxShadow: "var(--shadow-sm)", justifyContent: "center", color: "var(--brand)" }}>
                <FolderOpen size={36} />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--heading)" }}>
                Sélectionnez un dossier
              </div>
              <div style={{ fontSize: 13.5, maxWidth: 280 }}>
                Le lien client, la progression et les pièces apparaîtront ici.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
