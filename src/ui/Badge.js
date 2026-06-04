import React from "react";
import { STATUS } from "../theme";

// Badge de statut d'une pièce.
export function StatusBadge({ status }) {
  const c = STATUS[status] || STATUS.MANQUANT;
  return (
    <span className="badge" style={{ background: c.soft, color: c.color }}>
      <span className="dot" style={{ background: c.dot }} />
      {c.label}
    </span>
  );
}

// Badge générique (couleur libre).
export function Pill({ color, soft, children, icon: Icon }) {
  return (
    <span
      className="badge"
      style={{ background: soft, color }}
    >
      {Icon && <Icon size={13} />}
      {children}
    </span>
  );
}
