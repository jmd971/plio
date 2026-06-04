import { Home, ShieldCheck, LineChart, RefreshCw, HardHat } from "lucide-react";

// ── TYPES DE DOSSIERS ───────────────────────────────────────────────────────
// Chaque type définit son libellé, son icône (lucide), une couleur d'accent et
// la liste des pièces justificatives attendues (regroupées par catégorie).
export const DOSSIER_TYPES = {
  PRET_IMMO: {
    label: "Prêt Immobilier",
    Icon: Home,
    accent: "#003B8E",
    pieces: [
      { code: "CNI", label: "Carte d'identité (recto-verso)", type: "IDENTITE", category: "01-Identité" },
      { code: "JUSTIF_DOM", label: "Justificatif de domicile < 3 mois", type: "DOMICILE", category: "02-Domicile" },
      { code: "BULL_SAL_1", label: "Bulletin de salaire M-1", type: "REVENUS", category: "03-Revenus" },
      { code: "BULL_SAL_2", label: "Bulletin de salaire M-2", type: "REVENUS", category: "03-Revenus" },
      { code: "BULL_SAL_3", label: "Bulletin de salaire M-3", type: "REVENUS", category: "03-Revenus" },
      { code: "AVIS_IMPOS_N1", label: "Avis d'imposition N-1", type: "REVENUS", category: "03-Revenus" },
      { code: "AVIS_IMPOS_N2", label: "Avis d'imposition N-2", type: "REVENUS", category: "03-Revenus" },
      { code: "REL_BANC_1", label: "Relevé bancaire M-1", type: "BANQUE", category: "04-Banques" },
      { code: "REL_BANC_2", label: "Relevé bancaire M-2", type: "BANQUE", category: "04-Banques" },
      { code: "REL_BANC_3", label: "Relevé bancaire M-3", type: "BANQUE", category: "04-Banques" },
      { code: "TABLEAU_AMORT", label: "Tableau d'amortissement crédit(s) en cours", type: "CREDIT", category: "05-Crédits" },
      { code: "BAIL", label: "Bail signé (si propriétaire bailleur)", type: "LOCATIF", category: "06-Locatif" },
      { code: "QUITTANCES", label: "3 dernières quittances de loyer reçu", type: "LOCATIF", category: "06-Locatif" },
      { code: "COMPROMIS", label: "Compromis de vente signé", type: "BIEN", category: "07-Projet" },
      { code: "DIVERS", label: "Document complémentaire (si nécessaire)", type: "DIVERS", category: "08-Divers" },
    ],
  },
  ASSUR_PRET: {
    label: "Assurance de Prêt",
    Icon: ShieldCheck,
    accent: "#0E9F6E",
    pieces: [
      { code: "CNI", label: "Carte d'identité (recto-verso)", type: "IDENTITE", category: "01-Identité" },
      { code: "OFFRE_PRET", label: "Offre de prêt bancaire", type: "FINANCEMENT", category: "02-Financement" },
      { code: "TABLEAU_AMORT", label: "Tableau d'amortissement", type: "FINANCEMENT", category: "02-Financement" },
      { code: "CERTIFICAT_EMPLOI", label: "Certificat d'emploi", type: "REVENUS", category: "03-Revenus" },
      { code: "BULL_SAL_1", label: "Bulletin de salaire M-1", type: "REVENUS", category: "03-Revenus" },
      { code: "QUESTIONNAIRE_SANTE", label: "Questionnaire de santé complété", type: "SANTE", category: "04-Santé" },
    ],
  },
  DEFISC: {
    label: "Défiscalisation Pinel OM",
    Icon: LineChart,
    accent: "#7C3AED",
    pieces: [
      { code: "CNI", label: "Carte d'identité (recto-verso)", type: "IDENTITE", category: "01-Identité" },
      { code: "AVIS_IMPOS_N1", label: "Avis d'imposition N-1", type: "REVENUS", category: "02-Revenus" },
      { code: "AVIS_IMPOS_N2", label: "Avis d'imposition N-2", type: "REVENUS", category: "02-Revenus" },
      { code: "ACTE_VENTE", label: "Acte de vente ou VEFA signé", type: "BIEN", category: "03-Bien" },
      { code: "RIB", label: "Relevé d'Identité Bancaire", type: "FINANCEMENT", category: "04-Financement" },
      { code: "PLAN_FINANCEMENT", label: "Plan de financement détaillé", type: "FINANCEMENT", category: "04-Financement" },
    ],
  },
  RACHAT_CREDIT: {
    label: "Rachat de Crédit",
    Icon: RefreshCw,
    accent: "#E8550A",
    pieces: [
      { code: "CNI", label: "Carte d'identité (recto-verso)", type: "IDENTITE", category: "01-Identité" },
      { code: "JUSTIF_DOM", label: "Justificatif de domicile < 3 mois", type: "DOMICILE", category: "02-Domicile" },
      { code: "BULL_SAL_1", label: "Bulletin de salaire M-1", type: "REVENUS", category: "03-Revenus" },
      { code: "BULL_SAL_2", label: "Bulletin de salaire M-2", type: "REVENUS", category: "03-Revenus" },
      { code: "BULL_SAL_3", label: "Bulletin de salaire M-3", type: "REVENUS", category: "03-Revenus" },
      { code: "AVIS_IMPOS_N1", label: "Avis d'imposition N-1", type: "REVENUS", category: "03-Revenus" },
      { code: "REL_BANC_1", label: "Relevé bancaire M-1", type: "BANQUE", category: "04-Banques" },
      { code: "REL_BANC_2", label: "Relevé bancaire M-2", type: "BANQUE", category: "04-Banques" },
      { code: "REL_BANC_3", label: "Relevé bancaire M-3", type: "BANQUE", category: "04-Banques" },
      { code: "TABLEAU_AMORT_1", label: "Tableau d'amortissement crédit 1", type: "CREDIT", category: "05-Crédits à racheter" },
      { code: "TABLEAU_AMORT_2", label: "Tableau d'amortissement crédit 2 (si applicable)", type: "CREDIT", category: "05-Crédits à racheter" },
      { code: "TABLEAU_AMORT_3", label: "Tableau d'amortissement crédit 3 (si applicable)", type: "CREDIT", category: "05-Crédits à racheter" },
    ],
  },
  DOMMAGE_OUVRAGE: {
    label: "Dommage Ouvrage",
    Icon: HardHat,
    accent: "#B45309",
    pieces: [
      { code: "CNI_MO", label: "Carte d'identité du maître d'ouvrage", type: "IDENTITE", category: "01-Identité" },
      { code: "JUSTIF_DOM", label: "Justificatif de domicile < 3 mois", type: "DOMICILE", category: "01-Identité" },
      { code: "TITRE_PROPRIO", label: "Titre de propriété ou acte d'acquisition du terrain", type: "ADMINISTRATIF", category: "02-Documents administratifs" },
      { code: "PERMIS_CONSTRUIRE", label: "Permis de construire ou déclaration préalable", type: "ADMINISTRATIF", category: "02-Documents administratifs" },
      { code: "QUESTIONNAIRE_DO", label: "Questionnaire de déclaration du risque (rempli)", type: "ADMINISTRATIF", category: "02-Documents administratifs" },
      { code: "PLAN_MASSE", label: "Plan de masse du terrain", type: "TECHNIQUE", category: "03-Documents techniques" },
      { code: "PLAN_FONDATIONS", label: "Plans de fondations", type: "TECHNIQUE", category: "03-Documents techniques" },
      { code: "PLANS_NIVEAUX", label: "Plans des niveaux et façades", type: "TECHNIQUE", category: "03-Documents techniques" },
      { code: "DESCRIPTIF_TRAVAUX", label: "Descriptif technique des travaux", type: "TECHNIQUE", category: "03-Documents techniques" },
      { code: "ESTIMATION_COUT", label: "Estimation du coût total de l'opération (TTC)", type: "TECHNIQUE", category: "03-Documents techniques" },
      { code: "CONTRAT_CCMI", label: "CCMI ou contrat de maîtrise d'œuvre", type: "CONTRACTUEL", category: "04-Documents contractuels" },
      { code: "DEVIS_ENTREPRISES", label: "Devis de chaque corps d'état", type: "CONTRACTUEL", category: "04-Documents contractuels" },
      { code: "ATTESTATION_RCD", label: "Attestations RCD des entreprises", type: "CONTRACTUEL", category: "04-Documents contractuels" },
      { code: "ASSURANCE_DECEN", label: "Attestations assurance décennale des entrepreneurs", type: "CONTRACTUEL", category: "04-Documents contractuels" },
      { code: "GFL", label: "Garantie financière de livraison (GFL)", type: "CONTRACTUEL", category: "04-Documents contractuels" },
      { code: "RIB", label: "Relevé d'Identité Bancaire", type: "FINANCEMENT", category: "05-Financement" },
    ],
  },
};

// Mot de passe espace conseiller (conservé tel quel)
export const CONSEILLER_PASSWORD = "plio2026";