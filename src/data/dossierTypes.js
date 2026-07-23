import { Home, ShieldCheck, LineChart, RefreshCw, HardHat, HeartPulse, Hammer, Briefcase, Users } from "lucide-react";

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
    supportsCoEmprunteur: true,
    pieces: [
      { code: "CNI", label: "Carte nationale d'identité", type: "IDENTITE", category: "01-Identité" },
      { code: "LIVRET_FAMILLE", label: "Livret de famille", type: "IDENTITE", category: "01-Identité" },
      { code: "TABLEAU_AMORT", label: "Tableau d'amortissement des prêts en cours", type: "FINANCEMENT", category: "02-Financement" },
      { code: "OFFRE_PRET", label: "Offres de prêt", type: "FINANCEMENT", category: "02-Financement" },
      { code: "ADHESION_PREC", label: "Adhésion assurance de prêt précédente", type: "ASSURANCE", category: "03-Assurance" },
      { code: "CERTIFICAT_TRAVAIL", label: "Certificat de travail", type: "EMPLOI", category: "04-Emploi" },
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
  ASSUR_HABITATION: {
    label: "Assurance Habitation",
    Icon: Home,
    accent: "#0369A1",
    pieces: [
      { code: "CNI", label: "Carte d'identité (recto-verso)", type: "IDENTITE", category: "01-Identité" },
      { code: "JUSTIF_DOM", label: "Justificatif de domicile < 3 mois", type: "DOMICILE", category: "02-Logement" },
      { code: "BAIL_OU_TITRE", label: "Bail locatif ou titre de propriété", type: "DOMICILE", category: "02-Logement" },
      { code: "PLAN_LOGEMENT", label: "Plan ou description du logement (surface en m²)", type: "DOMICILE", category: "02-Logement" },
      { code: "ATTESTATION_PREC", label: "Attestation assurance précédente (si renouvellement)", type: "ASSURANCE", category: "03-Assurance actuelle" },
      { code: "RELEVE_SINISTRES", label: "Relevé de sinistres (3 dernières années)", type: "ASSURANCE", category: "03-Assurance actuelle" },
      { code: "INVENTAIRE_MOBILIER", label: "Inventaire mobilier / liste des objets de valeur", type: "BIENS", category: "04-Biens à assurer" },
      { code: "FACTURES_VALEUR", label: "Factures ou expertises des objets de valeur", type: "BIENS", category: "04-Biens à assurer" },
      { code: "DIVERS", label: "Document complémentaire (si nécessaire)", type: "DIVERS", category: "05-Divers" },
    ],
  },
  MUTUELLE_INDIVIDUELLE: {
    label: "Mutuelle individuelle",
    Icon: HeartPulse,
    accent: "#0D9488",
    pieces: [
      { code: "CNI", label: "Pièce d'identité valide (recto-verso)", type: "IDENTITE", category: "01-Identité" },
      { code: "CARTE_VITALE", label: "Carte Vitale", type: "SECU", category: "02-Sécurité sociale" },
      { code: "ATTEST_SS", label: "Attestation de sécurité sociale", type: "SECU", category: "02-Sécurité sociale" },
      { code: "RIB", label: "RIB", type: "BANQUE", category: "03-Bancaire" },
    ],
  },
  MUTUELLE_COLLECTIVE: {
    label: "Mutuelle collective",
    Icon: HeartPulse,
    accent: "#0F766E",
    pieces: [
      { code: "CNI", label: "Pièce d'identité valide (recto-verso)", type: "IDENTITE", category: "01-Identité" },
      { code: "CARTE_VITALE", label: "Carte Vitale", type: "SECU", category: "02-Sécurité sociale" },
      { code: "ATTEST_SS", label: "Attestation de sécurité sociale", type: "SECU", category: "02-Sécurité sociale" },
      { code: "RIB_ASSURE", label: "RIB de l'assuré", type: "BANQUE", category: "03-Bancaire" },
      { code: "KBIS", label: "Extrait Kbis < 3 mois de la société", type: "SOCIETE", category: "04-Société" },
      { code: "RIB_SOCIETE", label: "RIB de la société", type: "SOCIETE", category: "04-Société" },
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
  RC_DECENNALE: {
    label: "RC Décennale",
    Icon: Hammer,
    accent: "#B91C1C",
    pieces: [
      { code: "CNI_GERANT", label: "Pièce d'identité du gérant", type: "IDENTITE", category: "01-Identité" },
      { code: "CARTE_ARTISAN", label: "Carte d'artisan", type: "IDENTITE", category: "01-Identité" },
      { code: "KBIS", label: "Extrait Kbis < 3 mois", type: "SOCIETE", category: "02-Société" },
      { code: "DBE", label: "Déclaration des bénéficiaires effectifs de la société", type: "SOCIETE", category: "02-Société" },
      { code: "TAMPON_ENTETE", label: "Tampon ou papier à en-tête", type: "SOCIETE", category: "02-Société" },
      { code: "RIB_SOCIETE", label: "RIB de la société", type: "BANQUE", category: "02-Société" },
      { code: "RELEVE_SINISTRALITE", label: "Relevé de sinistralité (RI)", type: "ASSURANCE", category: "03-Assurance" },
      { code: "ATTEST_ASSUR", label: "Dernière attestation d'assurance", type: "ASSURANCE", category: "03-Assurance" },
      { code: "JUSTIF_EXP_CV", label: "Justificatif d'expérience (recommandation, CV)", type: "EXPERIENCE", category: "04-Expérience" },
      { code: "JUSTIF_EXP_DIPLOME", label: "Justificatif d'expérience (diplôme)", type: "EXPERIENCE", category: "04-Expérience" },
      { code: "JUSTIF_EXP_EMPLOYEUR", label: "Justificatif d'expérience (certificat employeur, fiche de paie)", type: "EXPERIENCE", category: "04-Expérience" },
      { code: "QUESTIONNAIRE_RCD", label: "Questionnaire RC Décennale", type: "CONTRACTUEL", category: "05-Contrat" },
      { code: "DEVIS_AGENCE", label: "Devis agence signé", type: "CONTRACTUEL", category: "05-Contrat" },
      { code: "CP_CONTRAT", label: "Conditions particulières (contrat) signées", type: "CONTRACTUEL", category: "05-Contrat" },
    ],
  },
  RC_PRO: {
    label: "RC Pro",
    Icon: Briefcase,
    accent: "#0891B2",
    pieces: [
      { code: "CNI_GERANT", label: "Pièce d'identité du gérant", type: "IDENTITE", category: "01-Identité" },
      { code: "KBIS", label: "Extrait Kbis (< 3 mois si possible)", type: "SOCIETE", category: "02-Société" },
      { code: "DBE", label: "Déclaration des bénéficiaire(s) effectif(s)", type: "SOCIETE", category: "02-Société" },
      { code: "RIB_SOCIETE", label: "RIB de la société", type: "BANQUE", category: "02-Société" },
      { code: "RELEVE_SINISTRALITE", label: "Relevé de sinistralité (si assurance précédente)", type: "ASSURANCE", category: "03-Assurance" },
      { code: "ATTEST_ASSUR", label: "Dernière attestation d'assurance souscrite", type: "ASSURANCE", category: "03-Assurance" },
      { code: "JUSTIF_EXP_RECO", label: "Justificatif d'expérience (recommandation)", type: "EXPERIENCE", category: "04-Expérience" },
      { code: "JUSTIF_EXP_DIPLOME", label: "Justificatif d'expérience (diplômes)", type: "EXPERIENCE", category: "04-Expérience" },
      { code: "JUSTIF_EXP_EMPLOYEUR", label: "Justificatif d'expérience (attestations d'employeur)", type: "EXPERIENCE", category: "04-Expérience" },
      { code: "JUSTIF_EXP_PAIE", label: "Justificatif d'expérience (fiches de paie)", type: "EXPERIENCE", category: "04-Expérience" },
      { code: "JUSTIF_EXP_CV", label: "Justificatif d'expérience (CV)", type: "EXPERIENCE", category: "04-Expérience" },
      { code: "MODELE_MARCHE", label: "Modèle de marché ou convention de prestations type", type: "ACTIVITE", category: "05-Activité" },
      { code: "SUPPORTS_COMM", label: "Supports commerciaux (plaquette, prospectus, mail type, site internet…)", type: "ACTIVITE", category: "05-Activité" },
      { code: "DEVIS_AGENCE", label: "Devis agence signé", type: "CONTRACTUEL", category: "06-Contrat" },
      { code: "CONTRAT_SIGNE", label: "Contrat signé", type: "CONTRACTUEL", category: "06-Contrat" },
    ],
  },
  RC_PRO_ASSOCIATION: {
    label: "RC Pro Association",
    Icon: Users,
    accent: "#7E22CE",
    pieces: [
      { code: "CNI_PRESIDENT", label: "Pièce d'identité du président", type: "IDENTITE", category: "01-Identité" },
      { code: "CNI_REPRESENTANT", label: "Pièce d'identité du représentant ayant mandat au nom de l'association", type: "IDENTITE", category: "01-Identité" },
      { code: "COORD_BUREAU", label: "Coordonnées du Bureau", type: "ASSOCIATION", category: "02-Association" },
      { code: "COORD_TRESORIER", label: "Coordonnées du trésorier", type: "ASSOCIATION", category: "02-Association" },
      { code: "STATUTS", label: "Statuts de l'association", type: "ASSOCIATION", category: "02-Association" },
      { code: "FICHE_INSEE", label: "Fiche INSEE", type: "ASSOCIATION", category: "02-Association" },
      { code: "ENREG_PREFECTURE", label: "Enregistrement à la Préfecture", type: "ASSOCIATION", category: "02-Association" },
      { code: "RIB_ASSOCIATION", label: "RIB de l'association", type: "BANQUE", category: "03-Bancaire" },
      { code: "RELEVE_SINISTRALITE", label: "Relevé de sinistralité (si assurance précédente)", type: "ASSURANCE", category: "04-Assurance" },
      { code: "ATTEST_ASSUR", label: "Dernière attestation d'assurance souscrite", type: "ASSURANCE", category: "04-Assurance" },
      { code: "SUPPORTS_COMM", label: "Plaquette commerciale et/ou prospectus", type: "ACTIVITE", category: "05-Activité" },
      { code: "SUPPORTS_DIGITAL", label: "Mail type de proposition client et/ou site internet", type: "ACTIVITE", category: "05-Activité" },
    ],
  },
};

// Construit la liste des pièces d'un dossier à partir de son type.
// Pour les types qui supportent le co-emprunteur (ex. Assurance de Prêt), si
// `opts.coEmprunteur` est vrai, la liste est dupliquée par emprunteur avec des
// codes uniques (`__E1`/`__E2`) et des catégories distinctes pour l'affichage.
export function buildPieces(typeKey, opts = {}) {
  const def = DOSSIER_TYPES[typeKey];
  if (!def) return [];
  if (!def.supportsCoEmprunteur || !opts.coEmprunteur) {
    return def.pieces.map((p) => ({ ...p, status: "MANQUANT" }));
  }
  const labels =
    opts.labels && opts.labels.length ? opts.labels : ["Emprunteur 1", "Emprunteur 2"];
  const out = [];
  labels.forEach((who, i) => {
    const n = i + 1;
    def.pieces.forEach((p) => {
      const num = (p.category.match(/^(\d+)-/) || [null, "00"])[1];
      const rest = (p.category || "Autres").replace(/^\d+-/, "");
      out.push({
        ...p,
        code: p.code + "__E" + n,
        borrower: n,
        borrowerLabel: who,
        category: n + num + "-" + who + " · " + rest,
        status: "MANQUANT",
      });
    });
  });
  return out;
}

// Mot de passe espace conseiller (conservé tel quel)
export const CONSEILLER_PASSWORD = "plio2026";
