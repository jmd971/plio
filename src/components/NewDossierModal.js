import React, { useState } from "react";
import { Sparkles, Calendar, ShieldCheck } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Field, SelectField, DobInput } from "../ui/Field";
import { DOSSIER_TYPES } from "../data/dossierTypes";
import { formatDateFR } from "../lib/format";

// Modal de création d'un nouveau dossier client.
export function NewDossierModal({ onClose, onCreate, saving }) {
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", tel: "", dob: "", type: "PRET_IMMO", conseiller: "",
  });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const valid = form.prenom && form.nom && form.dob;

  return (
    <Modal title="Nouveau dossier client" subtitle="Créez un espace de dépôt sécurisé" icon={Sparkles} onClose={onClose} width={480}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Prénom *" placeholder="Jean" value={form.prenom} onChange={(e) => set("prenom", e.target.value)} />
        <Field label="Nom *" placeholder="Dupont" value={form.nom} onChange={(e) => set("nom", e.target.value)} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label className="field-label">
          <Calendar size={13} style={{ verticalAlign: "-2px", marginRight: 5 }} />
          Date de naissance * — sert de code d'accès au client
        </label>
        <DobInput value={form.dob} onChange={(v) => set("dob", v)} />
        {form.dob && (
          <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>📅 {formatDateFR(form.dob)}</div>
        )}
      </div>

      <Field label="Email" type="email" placeholder="jean@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
      <Field
        label="Tél WhatsApp (avec indicatif)"
        type="tel"
        placeholder="+596690000000"
        value={form.tel}
        onChange={(e) => set("tel", e.target.value)}
      />
      <Field label="Conseiller assigné" placeholder="Marie L." value={form.conseiller} onChange={(e) => set("conseiller", e.target.value)} />

      <SelectField label="Type de dossier" value={form.type} onChange={(e) => set("type", e.target.value)}>
        {Object.entries(DOSSIER_TYPES).map(([k, v]) => (
          <option key={k} value={k}>{v.label}</option>
        ))}
      </SelectField>

      <div
        className="row gap-8"
        style={{ background: "var(--brand-soft)", borderRadius: "var(--radius-sm)", padding: "11px 14px", marginBottom: 18 }}
      >
        <ShieldCheck size={16} color="var(--brand)" style={{ flexShrink: 0 }} />
        <span style={{ color: "var(--brand)", fontSize: 12.5, lineHeight: 1.4 }}>
          Vérification par date de naissance · Stockage interne · Rétention 30 jours
        </span>
      </div>

      <div className="row gap-8">
        <Button variant="ghost" onClick={onClose} disabled={saving} style={{ flex: 1 }}>
          Annuler
        </Button>
        <Button
          onClick={() => valid && !saving && onCreate(form)}
          disabled={!valid || saving}
          loading={saving}
          style={{ flex: 1 }}
        >
          {saving ? "Création…" : "Créer le dossier"}
        </Button>
      </div>
    </Modal>
  );
}
