# CLAUDE.md — Plio (ex-axecime-agent)

> Ce fichier est la référence pour tout agent Claude travaillant sur ce projet.
> Il décrit l'architecture, les règles de développement et la vision produit.

---

## Identité produit

**Nom :** Plio  
**Tagline :** *Collectez. Signez. Avancez.*  
**Positionnement :** Portail de collecte documentaire sécurisé pour courtiers en assurance (IAS) et en prêt immobilier (IOBSP)  
**Cible :** Petits cabinets de courtage français (1–10 personnes)  
**Différenciateur :** Seul outil unifié IAS + IOBSP avec portail client sécurisé par lien tokenisé + IA embarquée + partage WhatsApp natif

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React 18 (Create React App) |
| UI Icons | Lucide React |
| Backend | Vercel Serverless Functions (Node.js) |
| Storage docs | Vercel Blob |
| State / metadata | Redis (Upstash via `REDIS_URL`) |
| IA | Anthropic API — `claude-sonnet-4-5` via `/api/chat.js` |
| Déploiement | Vercel (auto-deploy sur push `main`) |
| Cron | Vercel Cron — purge dossiers expirés à 3h UTC (`/api/cron/purge-expired`) |

---

## Structure du projet

```
/
├── api/                        # Serverless functions Vercel
│   ├── admin/                  # Routes protégées conseiller
│   ├── cron/purge-expired.js   # Nettoyage dossiers expirés
│   ├── chat.js                 # Proxy Anthropic API
│   ├── dossier.js              # CRUD dossier (GET/PATCH/DELETE)
│   ├── dossier-zip.js          # Export ZIP d'un dossier complet
│   ├── dossiers.js             # Liste tous les dossiers
│   ├── health.js               # Healthcheck Redis
│   └── upload.js               # Upload pièce vers Vercel Blob
├── src/
│   ├── components/             # Composants UI réutilisables
│   ├── data/
│   │   └── dossierTypes.js     # ⭐ Définition des types de dossiers et pièces
│   ├── lib/                    # Utilitaires (token, date, etc.)
│   ├── pages/
│   │   ├── Dashboard.js        # Interface conseiller
│   │   ├── ClientPortal.js     # Portail client (accès par lien tokenisé)
│   │   └── LoginPage.js        # Auth conseiller (mot de passe simple)
│   ├── theme.js                # Couleurs, typographie (branding Plio)
│   └── App.js                  # Router principal
├── public/
├── vercel.json                 # Config crons
└── package.json
```

---

## Modèle de données

### Dossier (stocké dans Redis sous la clé `dossier:<id>`)

```json
{
  "id": "uuid-v4",
  "type": "PRET_IMMO",
  "clientNom": "Marie Dupont",
  "conseillerNom": "Jean Martin",
  "createdAt": "ISO8601",
  "expiresAt": "ISO8601 (+30 jours)",
  "statut": "EN_COURS | COMPLET | INCOMPLET | EXPIRE",
  "pieces": [
    {
      "code": "CNI",
      "label": "Carte d'identité (recto-verso)",
      "type": "IDENTITE",
      "category": "01-Identité",
      "status": "MANQUANT | EN_ATTENTE | VALIDE | REJETE",
      "blobUrl": "https://...",
      "uploadedAt": "ISO8601"
    }
  ]
}
```

### Types de dossiers définis dans `src/data/dossierTypes.js`

| Clé | Label | Nb pièces |
|---|---|---|
| `PRET_IMMO` | Prêt Immobilier | 15 |
| `ASSUR_PRET` | Assurance de Prêt | 6 |
| `DEFISC` | Défiscalisation Pinel OM | 6 |
| `RACHAT_CREDIT` | Rachat de Crédit | 13 |
| `DOMMAGE_OUVRAGE` | Dommage Ouvrage | 16 |

---

## Variables d'environnement requises

```env
REDIS_URL=           # Upstash Redis connection string
BLOB_READ_WRITE_TOKEN= # Vercel Blob token
ANTHROPIC_API_KEY=   # Clé API Anthropic (pour /api/chat.js)
```

---

## Règles de développement

### Workflow GitHub (OBLIGATOIRE)
- **Toutes les modifications se font via `gh api` ou l'interface web GitHub**
- **Jamais de `git clone` en local**
- Toujours créer les fichiers avec `gh api repos/jmd971/plio/contents/<path>` (PUT)
- Pour modifier un fichier existant : récupérer son SHA d'abord, puis PUT avec le SHA

```bash
# Lire un fichier
gh api repos/jmd971/plio/contents/<path> --jq '.content' | base64 -d

# Créer ou modifier un fichier
CONTENT=$(echo '<contenu>' | base64)
SHA=$(gh api repos/jmd971/plio/contents/<path> --jq '.sha' 2>/dev/null || echo "")
gh api repos/jmd971/plio/contents/<path> \
  -X PUT \
  -f message="<commit message>" \
  -f content="$CONTENT" \
  ${SHA:+-f sha="$SHA"}
```

### Code
- Pas de TypeScript — le projet est en JavaScript (CRA + Node.js)
- Pas de commentaires sauf si le POURQUOI est non-évident
- Pas de refactoring au-delà du périmètre de la tâche
- Les serverless functions Vercel n'ont pas de `package.json` séparé — elles héritent de la racine
- Redis : toujours ouvrir et fermer la connexion dans chaque handler (`createClient` → `connect` → `quit`)
- Ne jamais stocker de données sensibles (santé, revenus) en clair dans les logs

### Sécurité
- Les liens client sont sécurisés par token UUID v4 (30 jours d'expiration)
- Vérification de l'identité client par date de naissance stockée hashée dans Redis
- Le mot de passe conseiller est actuellement en dur dans `dossierTypes.js` — **à migrer vers variable d'environnement** avant mise en production multi-cabinet
- Les fichiers uploadés sont stockés sur Vercel Blob avec URLs privées

---

## Évolutions prioritaires (roadmap)

### Phase 1 — Généricisation (P0)
- [ ] Rendre les types de dossiers **paramétrables** depuis l'interface admin (ajout/suppression de pièces)
- [ ] Support multi-conseillers avec gestion des rôles
- [ ] White-label : logo, couleurs et nom de domaine personnalisables par cabinet
- [ ] Notifications email automatiques au client (rappels si dossier incomplet)
- [ ] Migrer `CONSEILLER_PASSWORD` vers variable d'environnement

### Phase 2 — Différenciation (P1)
- [ ] Intégration e-signature (Yousign API)
- [ ] Commentaires courtier ↔ client par pièce
- [ ] Audit trail et historique pour conformité DDA/ACPR
- [ ] Export PDF récapitulatif du dossier

### Phase 3 — IA & Scale (P2)
- [ ] Analyse IA des documents uploadés (détection anomalies, pièces incorrectes)
- [ ] Assistant IA courtier — aide réglementaire, aide à la constitution de dossier
- [ ] Multi-langue (FR/EN pour cabinets Belgique/Suisse)
- [ ] API publique pour intégration partenaires

---

## Branding Plio

Les assets visuels du branding (palette, typographie, logo concept) sont documentés dans le repo ou dans les sessions de travail Claude Code.

**Palette :**
- Fond : `#08090F` (Nuit absolue)
- Surface : `#141520` (Charbon ardoise)  
- Accent : `#6366F1` (Indigo électrique)
- Highlight : `#A5F3FC` (Cyan glacier)

**Tagline :** *Collectez. Signez. Avancez.*

---

## Contexte marché

- **Concurrents IAS :** Lya Protect (leader, IA en déploiement), Assur Office (€129–400/mois), SKY CRM, Custy
- **Concurrents IOBSP :** Eliob (~€50/mois), Actelo (~€75/mois), Courtisia (~€66/mois), Eloa (~€69/mois)
- **Différenciateur unique :** Aucun concurrent ne propose de portail upload client sécurisé par lien + WhatsApp natif + couverture IAS ET IOBSP dans le même outil
- **Pricing cible :** Starter gratuit / Pro 49€ HT / Team 99€ HT / Cabinet 199€ HT

---

*Dernière mise à jour : 2026-06-04*