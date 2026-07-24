import { Home, ShieldCheck, LineChart, RefreshCw, HardHat, HeartPulse, Hammer, Briefcase, Users, Car } from "lucide-react";

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
  ASSUR_AUTO_MOTO: {
    label: "Assurance Auto / Moto",
    Icon: Car,
    accent: "#CA8A04",
    pieces: [
      { code: "CNI_SOUSCRIPTEUR", label: "Pièce d'identité du souscripteur", type: "IDENTITE", category: "01-Identité & permis" },
      { code: "PERMIS_CONDUIRE", label: "Permis de conduire (recto-verso)", type: "IDENTITE", category: "01-Identité & permis" },
      { code: "CARTE_GRISE", label: "Carte grise provisoire ou définitive (recto-verso)", type: "VEHICULE", category: "02-Véhicule" },
      { code: "FACTURE_VEHICULE", label: "Facture ou pro-forma du prix du véhicule", type: "VEHICULE", category: "02-Véhicule" },
      { code: "ACTE_CESSION", label: "Acte de cession", type: "VEHICULE", category: "02-Véhicule" },
      { code: "CONTROLE_TECHNIQUE", label: "Contrôle technique à jour", type: "VEHICULE", category: "02-Véhicule" },
      { code: "RELEVE_INFO", label: "Relevé d'information (précédente assurance auto)", type: "ASSURANCE", category: "03-Assurance" },
      { code: "QUESTIONNAIRE_AUTO", label: "Questionnaire Auto", type: "SOUSCRIPTION", category: "04-Souscription" },
      { code: "RIB", label: "RIB", type: "BANQUE", category: "05-Bancaire" },
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
      // 01 — Souscripteur (selon sa nature juridique)
      { code: "CNI_PARTICULIER", label: "Pièce d'identité (si le souscripteur est un particulier)", type: "IDENTITE", category: "01-Souscripteur" },
      { code: "KBIS_SOC", label: "Extrait Kbis (si le souscripteur est une société)", type: "IDENTITE", category: "01-Souscripteur" },
      { code: "CNI_GERANT_SOC", label: "Pièce d'identité du gérant (si société)", type: "IDENTITE", category: "01-Souscripteur" },
      { code: "DBE_SOC", label: "Déclaration des bénéficiaires effectifs — DBE (si société)", type: "IDENTITE", category: "01-Souscripteur" },
      { code: "RECEP_PREF_ASSO", label: "Récépissé de déclaration à la préfecture (si association)", type: "IDENTITE", category: "01-Souscripteur" },
      { code: "CNI_PRESIDENT_ASSO", label: "Pièce d'identité du président (si association)", type: "IDENTITE", category: "01-Souscripteur" },
      // 02 — Autorisations & permis
      { code: "RECEP_DEPOT_PERMIS", label: "Récépissé de dépôt de permis", type: "ADMINISTRATIF", category: "02-Autorisations & permis" },
      { code: "PERMIS_CONSTRUIRE", label: "Permis de construire ou déclaration de travaux", type: "ADMINISTRATIF", category: "02-Autorisations & permis" },
      { code: "DOC", label: "Déclaration d'Ouverture de Chantier (DOC)", type: "ADMINISTRATIF", category: "02-Autorisations & permis" },
      // 03 — Plans
      { code: "JEU_PLANS", label: "Jeu de plans des travaux et/ou dossier de dépôt de permis", type: "TECHNIQUE", category: "03-Plans" },
      { code: "PLAN_SITUATION", label: "Plan de situation", type: "TECHNIQUE", category: "03-Plans" },
      { code: "PLAN_MASSE", label: "Plan de masse", type: "TECHNIQUE", category: "03-Plans" },
      { code: "PLAN_COUPE", label: "Plans de coupe", type: "TECHNIQUE", category: "03-Plans" },
      { code: "PLAN_VRD", label: "Plans de voiries et réseaux divers (VRD)", type: "TECHNIQUE", category: "03-Plans" },
      { code: "PLAN_DISTRIBUTION", label: "Plan de distribution", type: "TECHNIQUE", category: "03-Plans" },
      { code: "PLANS_BETON", label: "Plans béton", type: "TECHNIQUE", category: "03-Plans" },
      { code: "PHOTOS_EXISTANT", label: "Photos sous divers angles des existants (s'il y a des existants)", type: "TECHNIQUE", category: "03-Plans" },
      // 04 — Étude de sol
      { code: "RAPPORT_ETUDE_SOL", label: "Rapport(s) d'étude de sol", type: "TECHNIQUE", category: "04-Étude de sol" },
      { code: "FACT_ETUDE_SOL", label: "Devis et/ou facture d'étude de sol", type: "TECHNIQUE", category: "04-Étude de sol" },
      { code: "RCD_GEOTECHNICIEN", label: "RC Décennale du géotechnicien", type: "ASSURANCE", category: "04-Étude de sol" },
      // 05 — Maîtrise d'œuvre
      { code: "CCAP", label: "Cahier des Clauses Administratives Particulières — CCAP (s'il y a lieu)", type: "CONTRACTUEL", category: "05-Maîtrise d'œuvre" },
      { code: "CCTP", label: "Cahier des Clauses Techniques Particulières — CCTP (s'il y a lieu)", type: "CONTRACTUEL", category: "05-Maîtrise d'œuvre" },
      { code: "CONV_MOE", label: "Conventions de maîtrise d'œuvre (architecte et/ou bureaux d'études)", type: "CONTRACTUEL", category: "05-Maîtrise d'œuvre" },
      { code: "FACT_MOE", label: "Devis et/ou facture maître d'œuvre", type: "CONTRACTUEL", category: "05-Maîtrise d'œuvre" },
      { code: "RCD_MOE", label: "RC Décennale maître d'œuvre", type: "ASSURANCE", category: "05-Maîtrise d'œuvre" },
      // 06 — Bureau d'études techniques (BET)
      { code: "FACT_BET", label: "Devis et/ou facture Bureau d'études techniques (BET)", type: "CONTRACTUEL", category: "06-Bureau d'études (BET)" },
      { code: "RCD_BET", label: "RC Décennale BET", type: "ASSURANCE", category: "06-Bureau d'études (BET)" },
      // 07 — Contrôle technique
      { code: "CONV_CT", label: "Convention(s) contrôleur(s) technique", type: "CONTRACTUEL", category: "07-Contrôle technique" },
      { code: "RICT", label: "Rapport(s) initial(aux) de contrôle technique (RICT)", type: "TECHNIQUE", category: "07-Contrôle technique" },
      { code: "RFCT", label: "Rapport final de contrôle technique (RFCT)", type: "TECHNIQUE", category: "07-Contrôle technique" },
      { code: "FACT_CT", label: "Devis et/ou facture contrôleur technique", type: "CONTRACTUEL", category: "07-Contrôle technique" },
      { code: "RCD_CT", label: "RC Décennale contrôleur technique", type: "ASSURANCE", category: "07-Contrôle technique" },
      // 08 — Travaux par corps d'état (attestation RC Décennale + devis/facture)
      { code: "DEVIS_TRAVAUX_GEN", label: "Devis ou facture descriptif des travaux (général)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_GO", label: "Attestation RC Décennale — Gros œuvre (GO)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_GO", label: "Devis ou facture descriptif — Gros œuvre (GO)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_CHARP_COUV", label: "Attestation RC Décennale — Charpente/couverture", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_CHARP_COUV", label: "Devis ou facture descriptif — Charpente/couverture", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_COUV", label: "Attestation RC Décennale — Couverture", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_COUV", label: "Devis ou facture descriptif — Couverture", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_MENUIS_EXT", label: "Attestation RC Décennale — Menuiseries extérieures", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_MENUIS_EXT", label: "Devis ou facture descriptif — Menuiseries extérieures", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_PEINT_EXT", label: "Attestation RC Décennale — Peinture extérieure / enduits", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_PEINT_EXT", label: "Devis ou facture descriptif — Peinture extérieure / enduits", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_ELEC", label: "Attestation RC Décennale — Électricité", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_ELEC", label: "Devis ou facture descriptif — Électricité", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_PLOMB", label: "Attestation RC Décennale — Plomberie / assainissement", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_PLOMB", label: "Devis ou facture descriptif — Plomberie / assainissement", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_ETANCH", label: "Attestation RC Décennale — Étanchéité", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_ETANCH", label: "Devis ou facture descriptif — Étanchéité", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_PLATRERIE", label: "Attestation RC Décennale — Plâtrerie / isolation / peinture intérieure", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_PLATRERIE", label: "Devis ou facture descriptif — Plâtrerie / isolation / peinture intérieure", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_CARRELAGE", label: "Attestation RC Décennale — Carrelage", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_CARRELAGE", label: "Devis ou facture descriptif — Carrelage", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_BARDAGE", label: "Attestation RC Décennale — Bardage bois", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_BARDAGE", label: "Devis ou facture descriptif — Bardage bois", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_MENUIS_INT", label: "Attestation RC Décennale — Menuiserie intérieure", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_MENUIS_INT", label: "Devis ou facture descriptif — Menuiserie intérieure", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_ZINGUERIE", label: "Attestation RC Décennale — Zinguerie gouttières", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_ZINGUERIE", label: "Devis ou facture descriptif — Zinguerie gouttières", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_VRD", label: "Attestation RC Décennale — VRD / aménagement extérieur", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_VRD", label: "Devis ou facture descriptif — VRD / aménagement extérieur", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_AUTRE1", label: "Attestation RC Décennale — Autre corps d'état (1)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_AUTRE1", label: "Devis ou facture descriptif — Autre corps d'état (1)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_AUTRE2", label: "Attestation RC Décennale — Autre corps d'état (2)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_AUTRE2", label: "Devis ou facture descriptif — Autre corps d'état (2)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_AUTRE3", label: "Attestation RC Décennale — Autre corps d'état (3)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_AUTRE3", label: "Devis ou facture descriptif — Autre corps d'état (3)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "RCD_AUTRE4", label: "Attestation RC Décennale — Autre corps d'état (4)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      { code: "DEVIS_AUTRE4", label: "Devis ou facture descriptif — Autre corps d'état (4)", type: "TRAVAUX", category: "08-Travaux par corps d'état" },
      // 09 — Matériaux
      { code: "FACT_MATERIAUX_MO", label: "Factures des matériaux fournis par le maître d'ouvrage", type: "TRAVAUX", category: "09-Matériaux" },
      // 10 — Contrat Dommage Ouvrage
      { code: "DEVIS_DO_AGENCE", label: "Devis DO agence accepté (bon pour accord)", type: "CONTRACTUEL", category: "10-Contrat Dommage Ouvrage" },
      { code: "PROPOSITION_DO", label: "Proposition DO signée (BPA)", type: "CONTRACTUEL", category: "10-Contrat Dommage Ouvrage" },
      { code: "QUESTIONNAIRE_DO", label: "Questionnaire de déclaration risque — DO", type: "CONTRACTUEL", category: "10-Contrat Dommage Ouvrage" },
      { code: "CONTRAT_DO", label: "Contrat d'assurance DO signé", type: "CONTRACTUEL", category: "10-Contrat Dommage Ouvrage" },
      // 11 — Réception & clôture
      { code: "PV_RECEPTION", label: "PV de réception", type: "RECEPTION", category: "11-Réception & clôture" },
      { code: "DECL_COUT_GLOBAL", label: "Déclaration définitive du coût global du chantier", type: "RECEPTION", category: "11-Réception & clôture" },
      { code: "DAACT", label: "Déclaration attestant l'achèvement et la conformité des travaux (DAACT)", type: "RECEPTION", category: "11-Réception & clôture" },
      { code: "AVENANT_FIN", label: "Avenant fin de travaux signé", type: "RECEPTION", category: "11-Réception & clôture" },
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
