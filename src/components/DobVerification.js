import React, { useState } from "react";
import { Lock, ArrowRight, ShieldCheck, Calendar } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { DobInput } from "../ui/Field";
import { verifyDob } from "../lib/token";

// Vérification de la date de naissance avant accès aux documents du client.
export function DobVerification({ prenom, dobHash, onVerified }) {
  const [dob, setDob] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const blocked = attempts >= 5;
  const left = 5 - attempts;

  const verify = () => {
    if (!dob || blocked) return;
    if (verifyDob(dob, dobHash)) {
      onVerified();
    } else {
      setAttempts((a) => a + 1);
      setErr(true);
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
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
        style={{ width: 420, maxWidth: "100%", padding: 36, boxShadow: "var(--shadow-xl)" }}
      >
        <div className="col" style={{ alignItems: "center", textAlign: "center", marginBottom: 24 }}>
          <Logo size={54} showText={false} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--heading)", marginTop: 14 }}>
            plio
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 3 }}>
            Espace documents sécurisé
          </div>
        </div>

        <div
          style={{
            background: "var(--brand-soft)",
            borderRadius: "var(--radius)",
            padding: "14px 16px",
            marginBottom: 22,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--heading)", fontSize: 15, fontWeight: 700 }}>Bonjour {prenom} 👋</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>
            Confirmez votre date de naissance pour accéder à vos documents en toute sécurité.
          </div>
        </div>

        {blocked ? (
          <div
            style={{
              background: "#FDECEC",
              border: "1px solid #F3CDCE",
              borderRadius: "var(--radius)",
              padding: 18,
              textAlign: "center",
            }}
          >
            <Lock size={26} color="var(--red)" style={{ marginBottom: 8 }} />
            <div style={{ color: "var(--red)", fontWeight: 700, fontSize: 14 }}>Accès temporairement bloqué</div>
            <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 6 }}>
              Trop de tentatives. Contactez votre conseiller.
            </div>
          </div>
        ) : (
          <>
            <label className="field-label">
              <Calendar size={13} style={{ verticalAlign: "-2px", marginRight: 5 }} />
              Votre date de naissance
            </label>
            <DobInput value={dob} onChange={setDob} />
            {err && (
              <div style={{ color: "var(--red)", fontSize: 12.5, marginTop: 8 }}>
                Date incorrecte — {left} tentative{left > 1 ? "s" : ""} restante{left > 1 ? "s" : ""}
              </div>
            )}
            <div style={{ marginTop: 18 }}>
              <Button size="lg" onClick={verify} disabled={!dob}>
                Accéder à mes documents <ArrowRight size={17} />
              </Button>
            </div>
          </>
        )}

        <div
          className="row gap-6"
          style={{ justifyContent: "center", color: "var(--faint)", fontSize: 11.5, marginTop: 20, flexWrap: "wrap" }}
        >
          <ShieldCheck size={12} /> Données chiffrées · Conforme RGPD
        </div>
      </div>
    </div>
  );
}