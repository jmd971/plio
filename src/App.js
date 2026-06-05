import React, { useState, useEffect, useCallback } from "react";
import { DOSSIER_TYPES } from "./data/dossierTypes";
import { generateToken } from "./lib/token";
import { genId } from "./lib/format";
import {
  apiGetDossiers, apiCreateDossier, apiUpdatePiece, apiDeleteDossier, apiResetDemo,
} from "./lib/api";
import { useToast } from "./ui/Toast";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { ClientPortal } from "./pages/ClientPortal";
import { NewDossierModal } from "./components/NewDossierModal";

// Routing par hash (#/, #/client/:token).
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useEffect(() => {
    const h = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  const toast = useToast();
  const [auth, setAuth] = useState(() => sessionStorage.getItem("plio_auth") === "1");
  const [dossiers, setDossiers] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [savingNew, setSavingNew] = useState(false);

  const loadDossiers = useCallback(async () => {
    setLoadingData(true);
    try {
      const data = await apiGetDossiers();
      setDossiers(data);
    } catch (e) {
      console.error("Erreur chargement:", e);
      toast.error("Chargement des dossiers : " + e.message, 7000);
    } finally {
      setLoadingData(false);
    }
  }, [toast]);

  const clientMatch = route.match(/#\/client\/(.+)/);
  const isClient = !!clientMatch;

  useEffect(() => {
    if (!isClient && auth) loadDossiers();
  }, [isClient, auth, loadDossiers]);

  if (clientMatch) return <ClientPortal token={clientMatch[1]} />;
  if (!auth) return <LoginPage onLogin={() => setAuth(true)} />;

  const handleValidate = async (dossierId, pieceCode, newStatus, fileData) => {
    try {
      const updated = await apiUpdatePiece(dossierId, pieceCode, newStatus, fileData);
      setDossiers((prev) => prev.map((d) => (d.id === dossierId ? updated : d)));
    } catch (e) {
      console.error("Erreur mise à jour:", e);
      toast.error("Mise à jour de la pièce : " + e.message);
    }
  };

  const handleCreate = async (form) => {
    setSavingNew(true);
    try {
      const newD = {
        id: "dos-" + genId(),
        ...form,
        statut: "EN_COURS",
        pieces: DOSSIER_TYPES[form.type].pieces.map((p) => ({ ...p, status: "MANQUANT" })),
      };
      newD.token = generateToken(newD);
      const saved = await apiCreateDossier(newD);
      setDossiers((prev) => [saved, ...prev]);
      setShowNew(false);
      toast.success("Dossier de " + form.prenom + " " + form.nom + " créé");
    } catch (e) {
      console.error("Erreur création:", e);
      toast.error("Impossible de créer le dossier : " + e.message, 8000);
    } finally {
      setSavingNew(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDeleteDossier(id);
      setDossiers((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      console.error("Erreur suppression:", e);
      toast.error("Erreur de suppression : " + e.message);
      throw e;
    }
  };

  const handleResetDemo = async () => {
    try {
      const r = await apiResetDemo();
      await loadDossiers();
      return r;
    } catch (e) {
      console.error("Erreur reset démo:", e);
      toast.error("Erreur : " + e.message);
      return { count: 0 };
    }
  };

  return (
    <>
      <Dashboard
        dossiers={dossiers}
        loading={loadingData}
        onValidate={handleValidate}
        onNewDossier={() => setShowNew(true)}
        onLogout={() => {
          sessionStorage.removeItem("plio_auth");
          setAuth(false);
        }}
        onRefresh={loadDossiers}
        onDelete={handleDelete}
        onResetDemo={handleResetDemo}
      />
      {showNew && <NewDossierModal onClose={() => setShowNew(false)} onCreate={handleCreate} saving={savingNew} />}
    </>
  );
}