/**
 * ════════════════════════════════════════════════════════════
 *  SITE CONFIG — Point d'entrée UNIQUE pour personnaliser
 *  un site VTC à partir du template SarrLux Chauffeur.
 *
 *  Pour livrer un nouveau client : ne modifier QUE ce fichier.
 *  Tout le reste (Hero, Booking, Footer, couleurs Tailwind,
 *  manifest PWA) se met à jour automatiquement.
 * ════════════════════════════════════════════════════════════
 */

const siteConfig = {

  /* ──────────────────────────────────────────
     1. BRANDING
  ────────────────────────────────────────── */
  branding: {
    brandName: "SarrLux",              // Nom court affiché dans le header/logo
    brandSuffix: "Chauffeur",          // Suffixe (ex: "Chauffeur", "VTC", "Driver")
    slogan: "Service de chauffeur privé haut de gamme à Dakar.",
    sloganAccent: "Discrétion. Élégance. Ponctualité.", // Partie mise en avant en couleur

    // Métadonnées SEO / PWA
    siteTitle: "SarrLux Chauffeur — Service privé à Dakar",
    siteDescription:
      "Chauffeur privé haut de gamme à Dakar. Trajets urbains, hors Dakar et navettes AIBD. Réservation instantanée par WhatsApp.",

    // Chemins vers les assets (à remplacer par client)
    logoPath: "/icons/logo.svg",       // Logo vectoriel custom (sinon fallback SVG générique)
    favicon192: "/icons/icon-192.png",
    favicon512: "/icons/icon-512.png",

    /**
     * Couleurs — alimentent directement tailwind.config.js (voir plus bas).
     * "primary"   = couleur dominante (ex: émeraude pour SarrLux, cyan pour O'Clear)
     * "secondary" = couleur d'accent VIP (or/ambre)
     * "bg"        = fond principal (dark ou light selon le thème du client)
     *
     * Chaque palette va de 50 (très clair) à 950 (très foncé),
     * exactement comme les palettes Tailwind natives.
     * Tu peux générer ces nuances rapidement sur https://uicolors.app/create
     */
    colors: {
      primary: {
        50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7",
        400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857",
        800: "#065f46", 900: "#064e3b", 950: "#022c22",
      },
      secondary: {
        50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d",
        400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309",
        800: "#92400e", 900: "#78350f", 950: "#451a03",
      },
      // Fond "anthracite" du thème dark premium
      surface: {
        50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db",
        400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151",
        800: "#1f2937", 900: "#111827", 950: "#030712",
      },
    },

    theme: "dark", // "dark" | "light" — pilote le fond global (gray-950 vs slate-50)
  },

  /* ──────────────────────────────────────────
     PWA — alimente manifest.json + index.html
     (généré automatiquement par scripts/generate-pwa.js,
      ne pas éditer manifest.json à la main)
  ────────────────────────────────────────── */
  pwa: {
    shortName: "SarrLux",              // Nom affiché sous l'icône (max ~12 caractères)
    themeColor: "#030712",             // Doit correspondre à surface.950 ci-dessus
    backgroundColor: "#030712",
    startUrl: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "fr",
    categories: ["travel", "lifestyle"],

    // Raccourci affiché au long-press de l'icône PWA (Android)
    shortcut: {
      name: "Réserver maintenant",
      shortName: "Réserver",
      url: "/#reservation",
    },
  },

  /* ──────────────────────────────────────────
     2. COORDONNÉES
  ────────────────────────────────────────── */
  contact: {
    phoneDisplay: "+221 77 654 32 10",   // Affiché à l'écran (formaté)
    phoneE164: "221776543210",           // Format international SANS le "+", pour tel: et wa.me

    email: "contact@sarrlux.sn",
    address: "Dakar, Sénégal",

    socials: {
      instagram: "",   // ex: "https://instagram.com/sarrlux"
      facebook: "",
    },

    whatsapp: {
      // Numéro déjà repris de phoneE164 par défaut — surchargeable si différent
      number: "221776543210",

      /**
       * Template du message pré-rempli.
       * Variables disponibles (remplacées dynamiquement par le formulaire) :
       * {{nom}} {{telephone}} {{service}} {{date}} {{heure}} {{depart}} {{arrivee}} {{notes}}
       */
      messageTemplate: [
        "🚘 *Demande de Réservation — {{brandFull}}*",
        "",
        "👤 *Nom :* {{nom}}",
        "📱 *Téléphone :* {{telephone}}",
        "🗂️ *Type de trajet :* {{service}}",
        "📅 *Date :* {{date}}",
        "⏰ *Heure souhaitée :* {{heure}}",
        "📍 *Départ :* {{depart}}",
        "🏁 *Arrivée :* {{arrivee}}",
        "{{notesLine}}",
        "",
        "Bonjour {{brandFull}}, je souhaite réserver ce trajet selon les informations ci-dessus. Merci de confirmer la disponibilité et le tarif.",
      ].join("\n"),
    },
  },

  /* ──────────────────────────────────────────
     3. CONTENUS — Services, tarifs, zones
  ────────────────────────────────────────── */
  content: {
    services: [
      {
        id: "dakar",
        label: "Trajets à Dakar",
        tagline: "Prestige urbain, ponctualité absolue",
        description:
          "Déplacements d'affaires, rendez-vous VIP, shopping haut de gamme, sorties nocturnes. Votre chauffeur privé au cœur de la capitale.",
        features: [
          "Prise en charge domicile/hôtel",
          "Attente sur place incluse",
          "Discrétion garantie",
        ],
        icon: "City",        // Référence vers le set d'icônes (City | Route | Plane)
        accent: "primary",   // "primary" ou "secondary" — détermine la couleur de la carte
        priceFrom: 5000,      // Tarif de simulation en FCFA — null si non communiqué
      },
      {
        id: "hors-dakar",
        label: "Trajets Hors Dakar",
        tagline: "Sénégal sur-mesure, confort premium",
        description:
          "Excursions vers Saly, Saint-Louis, Ziguinchor, Touba et toutes destinations. Voyages longue distance dans un confort d'exception.",
        features: [
          "Itinéraires personnalisés",
          "Pauses sur demande",
          "Véhicule climatisé 24/7",
        ],
        icon: "Route",
        accent: "secondary",
        priceFrom: 25000,
      },
      {
        id: "aibd",
        label: "Navettes AIBD",
        tagline: "Aéroport sans stress, accueil personnalisé",
        description:
          "Transferts sécurisés vers l'Aéroport International Blaise Diagne. Accueil panneau nominatif, assistance bagages, ponctualité garantie.",
        features: [
          "Suivi vol en temps réel",
          "Accueil personnalisé",
          "Transfert retour assuré",
        ],
        icon: "Plane",
        accent: "primary",
        priceFrom: 15000,
      },
    ],

    // Zones de prise en charge (utile pour SEO local + affichage "zones desservies")
    coverageZones: [
      "Plateau", "Almadies", "Ngor", "Mermoz", "Sacré-Cœur",
      "Point E", "Yoff", "AIBD", "Rufisque", "Saly",
    ],

    // Indicateurs de confiance affichés sous le Hero
    trustBadges: [
      { label: "Service 5★", icon: "Star" },
      { label: "Sécurisé", icon: "Shield" },
      { label: "24h/7j", icon: "Clock" },
    ],

    // Devise utilisée pour l'affichage des tarifs de simulation
    currency: "FCFA",
  },
};

export default siteConfig;
