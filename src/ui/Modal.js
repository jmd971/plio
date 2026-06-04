import React, { useEffect } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";

// Fenêtre modale centrée avec fond assombri et fermeture (clic extérieur / Échap).
export function Modal({ title, subtitle, icon: Icon, onClose, children, width = 460 }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 16, 32, 0.42)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
      }}
    >
      <div
        className="card-lg anim-slide-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            padding: "20px 22px",
            borderBottom: "1px solid var(--border)",
            position: "sticky",
            top: 0,
            background: "var(--surface)",
            borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
            zIndex: 1,
          }}
        >
          <div className="row gap-12">
            {Icon && (
              <div
                className="row"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "var(--brand-soft)",
                  color: "var(--brand)",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} />
              </div>
            )}
            <div className="col">
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--heading)" }}>
                {title}
              </span>
              {subtitle && <span style={{ fontSize: 13, color: "var(--muted)" }}>{subtitle}</span>}
            </div>
          </div>
          <IconButton icon={X} onClick={onClose} title="Fermer" />
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}
