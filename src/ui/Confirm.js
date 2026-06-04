import React, { createContext, useContext, useState, useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

const ConfirmCtx = createContext(() => Promise.resolve(false));

// Hook : const confirm = useConfirm();
// const ok = await confirm({ title, message, confirmLabel, danger });
export function useConfirm() {
  return useContext(ConfirmCtx);
}

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);

  const confirm = useCallback((opts) => {
    return new Promise((resolve) => {
      setState({ ...opts, resolve });
    });
  }, []);

  const close = (result) => {
    if (state) state.resolve(result);
    setState(null);
  };

  return (
    <ConfirmCtx.Provider value={confirm}>
      {children}
      {state && (
        <div
          onClick={() => close(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 16, 32, 0.42)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2500,
            padding: 20,
          }}
        >
          <div
            className="card-lg anim-slide-in"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 420, maxWidth: "100%", padding: 26, boxShadow: "var(--shadow-xl)" }}
          >
            <div className="row gap-12" style={{ marginBottom: 14, alignItems: "flex-start" }}>
              <div
                className="row"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  justifyContent: "center",
                  background: state.danger ? "#FDECEC" : "var(--brand-soft)",
                  color: state.danger ? "var(--red)" : "var(--brand)",
                  flexShrink: 0,
                }}
              >
                <AlertTriangle size={22} />
              </div>
              <div className="grow">
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--heading)" }}>
                  {state.title || "Confirmer"}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 5, lineHeight: 1.5 }}>
                  {state.message}
                </div>
              </div>
            </div>
            <div className="row gap-8" style={{ justifyContent: "flex-end", marginTop: 8 }}>
              <Button variant="ghost" onClick={() => close(false)}>
                {state.cancelLabel || "Annuler"}
              </Button>
              <Button variant={state.danger ? "danger" : "primary"} onClick={() => close(true)}>
                {state.confirmLabel || "Confirmer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ConfirmCtx.Provider>
  );
}
