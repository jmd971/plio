import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

const ToastCtx = createContext(() => {});

// Hook : const toast = useToast(); toast.success("..."), toast.error("..."), toast.info("...")
export function useToast() {
  return useContext(ToastCtx);
}

const VARIANTS = {
  success: { icon: CheckCircle2, color: "#0E9F6E", soft: "#E7F8F0", border: "#C4ECD9" },
  error: { icon: AlertTriangle, color: "#E5484D", soft: "#FDECEC", border: "#F3CDCE" },
  info: { icon: Info, color: "#2563EB", soft: "#EAF1FC", border: "#CFE0FA" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (message, variant = "info", duration = 4000) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, message, variant }]);
      if (duration) setTimeout(() => remove(id), duration);
    },
    [remove]
  );

  const api = {
    push,
    success: (m, d) => push(m, "success", d),
    error: (m, d) => push(m, "error", d),
    info: (m, d) => push(m, "info", d),
  };

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 3000,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        {toasts.map((t) => {
          const v = VARIANTS[t.variant];
          const Icon = v.icon;
          return (
            <div
              key={t.id}
              className="card"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 11,
                padding: "13px 15px",
                width: 360,
                maxWidth: "100%",
                borderLeft: "3px solid " + v.color,
                boxShadow: "var(--shadow-lg)",
                animation: "toastIn 0.32s var(--ease-out) both",
              }}
            >
              <Icon size={19} color={v.color} style={{ flexShrink: 0, marginTop: 1 }} />
              <div className="grow" style={{ fontSize: 13.5, color: "var(--text)", lineHeight: 1.45 }}>
                {t.message}
              </div>
              <button
                onClick={() => remove(t.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--faint)", padding: 2 }}
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}
