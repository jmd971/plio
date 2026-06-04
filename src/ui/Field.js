import React, { useState } from "react";

// Champ texte avec label.
export function Field({ label, error, hint, ...rest }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label className="field-label">{label}</label>}
      <input className={"input" + (error ? " error" : "")} {...rest} />
      {error && (
        <div style={{ color: "var(--red)", fontSize: 12, marginTop: 6 }}>{error}</div>
      )}
      {hint && !error && (
        <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>{hint}</div>
      )}
    </div>
  );
}

// Select avec label.
export function SelectField({ label, children, ...rest }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label className="field-label">{label}</label>}
      <select className="select" {...rest}>
        {children}
      </select>
    </div>
  );
}

// ── Date de naissance (Jour / Mois / Année) ───────────────────────────────
export function DobInput({ value, onChange }) {
  const [parts, setParts] = useState(() => {
    if (value) {
      const p = value.split("-");
      if (p.length === 3) return { y: p[0], m: p[1], d: p[2] };
    }
    return { y: "", m: "", d: "" };
  });

  const setPart = (k, v) => {
    const next = { ...parts, [k]: v };
    setParts(next);
    onChange(next.y && next.m && next.d ? next.y + "-" + next.m + "-" + next.d : "");
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = [
    { v: "01", l: "Janvier" }, { v: "02", l: "Février" }, { v: "03", l: "Mars" },
    { v: "04", l: "Avril" }, { v: "05", l: "Mai" }, { v: "06", l: "Juin" },
    { v: "07", l: "Juillet" }, { v: "08", l: "Août" }, { v: "09", l: "Septembre" },
    { v: "10", l: "Octobre" }, { v: "11", l: "Novembre" }, { v: "12", l: "Décembre" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <select className="select" value={parts.d} onChange={(e) => setPart("d", e.target.value)} style={{ flex: 1 }}>
        <option value="">Jour</option>
        {days.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>
      <select className="select" value={parts.m} onChange={(e) => setPart("m", e.target.value)} style={{ flex: 2 }}>
        <option value="">Mois</option>
        {months.map((m) => <option key={m.v} value={m.v}>{m.l}</option>)}
      </select>
      <select className="select" value={parts.y} onChange={(e) => setPart("y", e.target.value)} style={{ flex: 1.4 }}>
        <option value="">Année</option>
        {years.map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
}
