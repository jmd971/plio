import React, { useState } from "react";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { CONSEILLER_PASSWORD } from "../data/dossierTypes";

// Page de connexion de l'espace conseiller.
export function LoginPage({ onLogin }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);

  const handle = () => {
    if (pwd === CONSEILLER_PASSWORD) {
      sessionStorage.setItem("axecime_auth", "1");
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
          "radial-gradient(120% 80% at 100% 0%, rgba(232,85,10,0.06) 0%, transparent 50%)," +
          "radial-gradient(120% 90% at 0% 100%, rgba(0,59,142,0.08) 0%, transparent 55%)," +
          "var(--bg)",
      }}
    >
      <div
        className={"card-lg" + (shake ? " anim-shake" : " anim-slide-in")}
        style={{ width: 400, maxWidth: "100%", padding: 38, boxShadow: "var(--shadow-xl)" }}
      >
        <div className="col" style={{ alignItems: "center", textAlign: "center", marginBottom: 28 }}>
          <Logo size={56} showText={false} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--heading)", marginTop: 16 }}>
            AXECIME
          </div>
          <div
            className="row gap-6"
            style={{
              marginTop: 8,
              fontSize: 12.5,
              fontWeight: 600,
              color: "var(--brand)",
              background: "var(--brand-soft)",
              padding: "4px 12px",
              borderRadius: 20,
            }}
          >
            <ShieldCheck size={14} /> Espace Conseillers
          </div>
        </div>

        <label className="field-label">Mot de passe</label>
        <div style={{ position: "relative" }}>
          <Lock
            size={17}
            color="var(--faint)"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          />
          <input
            type="password"
            value={pwd}
            autoFocus
            onChange={(e) => {
              setPwd(e.target.value);
              setErr(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handle()}
            placeholder="••••••••••"
            className={"input" + (err ? " error" : "")}
            style={{ paddingLeft: 42 }}
          />
        </div>
        {err && <div style={{ color: "var(--red)", fontSize: 12.5, marginTop: 7 }}>Mot de passe incorrect</div>}

        <div style={{ marginTop: 22 }}>
          <Button size="lg" onClick={handle}>
            Accéder au tableau de bord <ArrowRight size={17} />
          </Button>
        </div>

        <div className="row gap-6" style={{ justifyContent: "center", color: "var(--faint)", fontSize: 11.5, marginTop: 20 }}>
          <Lock size={12} /> Accès réservé aux conseillers AXECIME
        </div>
      </div>
    </div>
  );
}
