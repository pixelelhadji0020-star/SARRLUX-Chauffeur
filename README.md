# 🚘 Template VTC Premium — Guide de personnalisation client

Ce template (basé sur SarrLux Chauffeur) permet de livrer un site/PWA
personnalisé à un nouveau client VTC **en moins de 10 minutes**, en ne
touchant qu'un seul fichier de configuration + un logo.

---

## 📁 Arborescence du projet

```
vtc-template/
├── assets/
│   └── logo-source.png          ← Logo du client (à déposer ici)
├── public/
│   ├── icons/                   ← Généré automatiquement (ne pas éditer)
│   ├── manifest.json            ← Généré automatiquement (ne pas éditer)
│   └── service-worker.js
├── scripts/
│   ├── generate-pwa.js          ← Génère manifest.json + index.html
│   └── generate-icons.js        ← Génère toutes les icônes depuis le logo
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Services.jsx
│   │   ├── BookingForm.jsx
│   │   └── Footer.jsx
│   ├── config/
│   │   └── siteConfig.js        ★ SEUL FICHIER À MODIFIER POUR CHAQUE CLIENT
│   ├── utils/
│   │   └── buildWhatsAppUrl.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.template.html          ← Source HTML (avec placeholders)
├── index.html                   ← Généré automatiquement (ne pas éditer)
├── tailwind.config.js           ← Lit les couleurs depuis siteConfig.js
├── vite.config.js
├── postcss.config.js
├── vercel.json
└── package.json
```

---

## ✅ Checklist — Livrer un nouveau client en 5 étapes

### Étape 1 — Dupliquer le template

```bash
cp -r vtc-template nouveau-client-vtc
cd nouveau-client-vtc
npm install
```

### Étape 2 — Déposer le logo du client

```bash
cp ~/Downloads/logo-client.png assets/logo-source.png
```

> 💡 Format recommandé : PNG carré, fond transparent, **min. 512×512px**.
> Garder ~10% de marge sur les bords (les icônes Android rognent les coins).

### Étape 3 — Modifier `src/config/siteConfig.js`

C'est **l'unique fichier** à éditer. Tableau récapitulatif des champs à changer :

| Section | Champs à modifier | Exemple |
|---|---|---|
| `branding` | `brandName`, `brandSuffix`, `slogan`, `sloganAccent` | `"Dakar Premium"`, `"VTC"` |
| `branding` | `siteTitle`, `siteDescription` | Pour le SEO et l'onglet navigateur |
| `branding.colors` | `primary`, `secondary`, `surface` | Nouvelle palette (voir ci-dessous) |
| `pwa` | `shortName`, `themeColor`, `backgroundColor` | Doit matcher `colors.surface[950]` |
| `contact` | `phoneDisplay`, `phoneE164`, `email`, `address` | Coordonnées du nouveau chauffeur |
| `contact.whatsapp` | `number` | Numéro WhatsApp du client |
| `content.services` | Labels, descriptions, tarifs (`priceFrom`) | Adapter aux prestations du client |
| `content.coverageZones` | Liste des quartiers desservis | Selon la ville du client |

**Générer une nouvelle palette de couleurs** : va sur
[uicolors.app/create](https://uicolors.app/create), choisis la couleur
dominante du client, copie les valeurs `50` à `950` dans
`branding.colors.primary` (et `secondary` pour l'accent).

### Étape 4 — Générer les icônes et la config PWA

```bash
npm run generate-icons
npm run generate-pwa
```

> Ces deux commandes tournent aussi **automatiquement** avant `npm run dev`
> et `npm run build` (hooks `predev`/`prebuild`) — tu peux donc sauter cette
> étape si tu lances directement le build à l'étape 5.

### Étape 5 — Build & déploiement

```bash
npm run build
```

Puis déployer le dossier `dist/` sur Vercel (ou connecter le repo GitHub
à Vercel pour un déploiement automatique à chaque push).

---

## 🔧 Commandes disponibles

| Commande | Effet |
|---|---|
| `npm install` | Installe les dépendances (une seule fois par client) |
| `npm run dev` | Lance le serveur local (régénère PWA automatiquement) |
| `npm run generate-icons` | Redimensionne `assets/logo-source.png` en 11 tailles d'icônes |
| `npm run generate-icons -- chemin/logo.png` | Idem, avec un chemin de logo explicite |
| `npm run generate-pwa` | Régénère `manifest.json` + `index.html` depuis `siteConfig.js` |
| `npm run build` | Build de production (régénère PWA automatiquement avant) |
| `npm run preview` | Prévisualise le build de production en local |

---

## ⚠️ Fichiers à NE JAMAIS modifier à la main

Ces fichiers sont **régénérés automatiquement** à chaque build — toute
modification manuelle sera écrasée :

- `public/manifest.json`
- `index.html`
- `public/icons/*.png`

Si tu dois changer leur contenu, modifie plutôt :
- `siteConfig.js` (branding, PWA, contact, services)
- `index.template.html` (structure HTML, si besoin d'un changement structurel rare)
- `assets/logo-source.png` (logo)

---

## 🧪 Vérification rapide avant livraison

```bash
npm run build && npm run preview
```

Ouvrir le lien local affiché et vérifier :
- [ ] Logo et nom de marque corrects dans le header
- [ ] Couleurs appliquées (cartes de services, boutons)
- [ ] Numéro de téléphone correct (header, footer, bouton "Appeler")
- [ ] Clic sur "Réserver" → ouvre bien WhatsApp avec le bon numéro et message
- [ ] Titre de l'onglet navigateur = nom du client
- [ ] Icône PWA visible si on installe le site sur mobile (Ajouter à l'écran d'accueil)

---

## 🆘 Problèmes fréquents

| Symptôme | Cause probable | Solution |
|---|---|---|
| Couleurs non appliquées | `tailwind.config.js` pas à jour | Vérifier qu'il importe bien `siteConfig.js` |
| Icônes floues sur mobile | Logo source < 512×512px | Fournir un logo en meilleure résolution |
| WhatsApp s'ouvre avec le mauvais numéro | `contact.whatsapp.number` non modifié | Vérifier ce champ dans `siteConfig.js` |
| Build échoue après modif de `siteConfig.js` | Erreur de syntaxe JS (virgule, guillemet) | Vérifier la console : `node scripts/generate-pwa.js` isolément |
| Ancien titre/manifest persiste après modif | Cache navigateur / build pas relancé | `npm run build` puis vider le cache (Ctrl+Maj+R) |

---

**Temps de livraison estimé pour un client déjà briefé : 8–10 minutes.**
