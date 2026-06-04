import React, { useState } from "react";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { CONSEILLER_PASSWORD } from "../data/dossierTypes";

export function LoginPage({ onLogin }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);

  const handle = () => {
    if (pwd === CONSEILLER_PASSWORD) {
      sessionStorage.setItem("plio_auth", "1");
      onLogin();
    } else {
      setErr(true);
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 60%)," +
          "radial-gradient(ellipse 60% 40% at 100% 100%, rgba(165,243,252,0.06) 0%, transparent 50%)," +
          "var(--bg)",
      }}
    >
      <div
        className={"card card-glass" + (shake ? " anim-shake" : " anim-slide-in")}
        style={{ width: 400, maxWidth: "100%", padding: 40, boxShadow: "var(--shadow-xl), var(--shadow-glow)" }}
      >
        <div className="col" style={{ alignItems: "center", textAlign: "center", marginBottom: 32 }}>
          <Logo size={52} showText={false} />
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 26,
              color: "var(--heading)",
              marginTop: 16,
              letterSpacing: "-0.04em",
            }}
          >
            plio
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
            Portail conseillers
          </div>
          <div
            className="row gap-6"
            style={{
              marginTop: 14,
              fontSize: 12,
              fontWeight: 600,
              color: "var(--brand-light)",
              background: "var(--brand-soft)",
              padding: "5px 14px",
              borderRadius: 20,
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <ShieldCheck size={13} /> Espace Conseillers
          </div>
        </div>

        <label className="field-label">Mot de passe</label>
        <div style={{ position: "relative" }}>
          <Lock
            size={16}
            color="var(--faint)"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          />
          <input
            type="password"
            value={pwd}
            autoFocus
            onChange={(e) => { setPwd(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === "Enter" && handle()}
            placeholder="••••••••••"
            className={"input" + (err ? " error" : "")}
            style={{ paddingLeft: 42 }}
          />
        </div>
        {err && (
          <div style={{ color: "var(--red)", fontSize: 12.5, marginTop: 7, display: "flex", alignItems: "center", gap: 6 }}>
            Mot de passe incorrect
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <Button size="lg" onClick={handle}>
            Accéder au tableau de bord <ArrowRight size={16} />
          </Button>
        </div>

        <div className="row gap-6" style={{ justifyContent: "center", color: "var(--faint)", fontSize: 11.5, marginTop: 22 }}>
          <Lock size={11} /> Accès réservé aux conseillers
        </div>
      </div>
    </div>
  );
}