/* =====================================================================
   realisations.js — Toutes mes réalisations (projets)
   ---------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour ajouter, retirer ou mettre à
   jour une réalisation. Le site s'en sert pour fabriquer :
     - les vignettes de la section « Réalisations » (index.html) ;
     - la page de détail de chaque réalisation (realisation.html?id=...).

   AJOUTER UNE RÉALISATION
   1. Copier un bloc { ... } existant (de l'accolade ouvrante à
      l'accolade fermante, avec la virgule qui suit) et le coller
      à l'endroit voulu : l'ordre de la liste = l'ordre d'affichage.
   2. Changer « id » (minuscules, tirets, sans accent ni espace).
      Il sert dans l'adresse de la page (realisation.html?id=mon-projet)
      et pour le dossier des captures (images/mon-projet/).
   3. Remplir les autres champs (description ci-dessous).

   LES CHAMPS
   id            identifiant unique
   categorie     "perso"   : projet personnel
                 "atelier" : atelier de professionnalisation ou stage
                 "bloc1"   : projet scolaire du bloc 1
                 "bloc2"   : projet scolaire du bloc 2 (option SLAM)
   statut        "done" (Réalisé), "progress" (En cours), "upcoming" (À venir)
   titre         nom du projet
   date          date ou période
   chiffres      (facultatif) chiffres clés affichés sur la vignette
   accroche      (facultatif) première phrase de la vignette
   description   courte description de la vignette (<strong>mot</strong> = gras)
   technologies  liste des technologies
   miniature     (facultatif) image de la vignette, format 2:1 (ex. 1200 x 600)
   miniatureAlt  (facultatif) texte alternatif de la miniature
   galerie       captures rangées dans images/<id>/ :
                 { fichier: "capture-1.jpg", legende: "…" }
                 Liste vide [] = images provisoires « Capture à venir ».
   liens         { type: "site" | "play" | "github" | "linkedin" | "video" | "download", url: "…" }
                 Une url vide "" affiche « Lien à venir ».
   video         (facultatif) lien d'une vidéo (YouTube ou fichier .mp4).
                 "" = emplacement réservé « Vidéo à venir ».
   competences   codes des compétences du bloc 1 couvertes
                 (liste complète dans competences-bloc1.js).
                 Pas de compétences pour les projets personnels.
   cadre         texte « Cadre de réalisation » (page de détail)
   descriptionDetaillee   texte « Description détaillée » (page de détail)
   etapes        (facultatif) étapes du projet : { titre, texte }
   sections      (facultatif) autres parties : { titre, texte }

   PROJETS « À VENIR » (statut "upcoming")
   Le lien « Voir le détail » est désactivé tant que le statut est
   "upcoming".

   EMPLACEMENTS [À RÉDIGER] / [À VÉRIFIER]
   Ils ne sont jamais affichés sur le site : le bloc est masqué.
   Pour les retrouver : ouvrir la console du navigateur (touche F12,
   onglet « Console ») ou rechercher « [À RÉDIGER » dans ce fichier.

   Règle du CNED : les textes personnels sont écrits par moi.
   ===================================================================== */

const REALISATIONS = [

  /* =================== PROJETS PERSONNELS =================== */

  {
    id: "dig-incremental",
    categorie: "perso",
    statut: "progress",
    titre: "Dig Incremental",
    date: "Oct. 2026 – en cours",
    chiffres: "~2 000 visites · 32 favoris · 20 joueurs simultanés",
    // EXEMPLE IA – à réécrire
    description: "<strong>Jeu Roblox incrémental</strong> créé en binôme avec l'aide de l'IA, publié par notre groupe Lumel Studio.",
    technologies: ["Roblox Studio", "Luau", "GitHub", "Discord"],
    miniature: "images/dig-incremental/miniature.jpg",
    miniatureAlt: "Capture d'écran du jeu Dig Incremental",
    galerie: [
      { fichier: "capture-1.jpg", legende: "Capture du jeu" }
    ],
    // Le dépôt GitHub du jeu est privé : pas de lien GitHub.
    liens: [
      { type: "play", url: "https://www.roblox.com/games/119840465122444" }
    ],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation (contexte, organisation, durée, seul ou en équipe)",
    // Texte écrit par Dante
    descriptionDetaillee: "<p>Dig Incremental est un jeu incrémental sur Roblox. Tu creuses une mine pour gagner des pièces. Avec ces pièces, tu achètes de meilleures pioches et des améliorations qui te font creuser plus vite et plus profond.</p><p>Le but est d’aller toujours plus loin : descendre plus bas, débloquer de nouveaux mondes et repartir de zéro avec des bonus permanents (renaissances et prestiges) pour progresser encore plus vite.</p>"
  },

  {
    id: "cbio-coiffure",
    categorie: "perso",
    statut: "done",
    titre: "Site C&Bio coiffure",
    date: "Oct. 2026",
    // EXEMPLE IA – à réécrire
    description: "Site professionnel d'une <strong>coiffeuse à domicile</strong>, réalisé bénévolement avec l'aide de l'IA : <strong>réservation et paiement en ligne</strong>, boutique, cartes cadeaux et <strong>espace d'administration</strong>.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Netlify"],
    miniature: "images/cbio-coiffure/miniature.jpg",
    miniatureAlt: "Page d'accueil du site C&Bio coiffure",
    galerie: [
      { fichier: "capture-1.jpg", legende: "Page d'accueil" }
    ],
    liens: [
      { type: "site", url: "https://cbiocoiffure.fr" }
    ],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation (contexte, organisation, durée, seul ou en équipe)",
    // Texte écrit par Dante
    descriptionDetaillee: "<p>J’ai réalisé ce site pour une coiffeuse à domicile. Elle voulait pouvoir présenter son travail, mais aussi gérer toute son activité au même endroit.</p><p>Le site permet de réserver en ligne et de payer par carte ou par PayPal, y compris en plusieurs fois. On y trouve aussi une boutique, des demandes de devis, des cartes cadeaux et un système de parrainage. Les confirmations, les rappels et les factures sont envoyés automatiquement par e-mail.</p><p>Un espace d’administration permet de tout gérer sans toucher au code : rendez-vous, tarifs, disponibilités, boutique et suivi de l’activité.</p><p>Le site est développé en HTML, CSS et JavaScript, avec une partie serveur en Node.js hébergée sur Netlify. Les paiements passent par Stripe et PayPal.</p>"
  },

  /* ============ ATELIERS DE PROFESSIONNALISATION ET STAGE ============ */
  /* (vignettes mises en valeur)                                          */

  {
    id: "atelier1-developpement-professionnel",
    categorie: "atelier",
    statut: "done",
    titre: "Développement professionnel – Atelier 1",
    date: "Nov. 2026",
    // Textes écrits par Dante
    accroche: "Organiser ma façon d’apprendre et préparer mon parcours professionnel.",
    description: "J’organise mon environnement de travail pour suivre ma formation à distance et je mets en place une veille informatique avec Pearltrees. Je crée aussi mon profil LinkedIn et je réfléchis à mon projet professionnel avec une carte mentale sur MindMup.",
    technologies: ["LinkedIn", "Pearltrees", "MindMup", "LibreOffice"],
    galerie: [],
    liens: [
      { type: "linkedin", url: "https://www.linkedin.com/in/dante-ciancilla/" }
    ],
    // B1.6 : environnement d'apprentissage, veille, identité professionnelle, projet professionnel
    competences: ["B1.6.1", "B1.6.2", "B1.6.3", "B1.6.4"],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation (atelier 1, organisation, durée)",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée de l'atelier 1"
  },

  {
    id: "atelier2-mediatek86",
    categorie: "atelier",
    statut: "upcoming",
    titre: "Atelier 2 – MediaTek86",
    date: "Mai 2027",
    // Textes écrits par Dante
    accroche: "Un réseau de médiathèques a besoin d’une application pour gérer son personnel.",
    description: "Je développe une application de bureau en C#, en six étapes : la base de données MySQL, l’architecture MVC, la documentation technique, les fonctionnalités, une vidéo qui explique comment utiliser l’application, puis le déploiement.",
    technologies: ["C#", "MySQL", "MVC", "GitHub"],
    galerie: [],
    liens: [
      { type: "github", url: "" }   // à compléter : lien du dépôt GitHub
    ],
    video: "",                      // à compléter : lien de la documentation utilisateur en vidéo
    competences: [],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation (contexte MediaTek86, organisation, durée)",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée du projet",
    etapes: [
      {
        titre: "Préparer l'environnement et créer la base de données",
        texte: "[À RÉDIGER PAR DANTE – FR] Étape 1"
      },
      {
        titre: "Structurer l'application en MVC, créer le dépôt, coder le visuel",
        texte: "[À RÉDIGER PAR DANTE – FR] Étape 2"
      },
      {
        titre: "Coder le modèle et la connexion, générer la documentation technique",
        texte: "[À RÉDIGER PAR DANTE – FR] Étape 3"
      },
      {
        titre: "Coder les fonctionnalités à partir des cas d'utilisation",
        texte: "[À RÉDIGER PAR DANTE – FR] Étape 4"
      },
      {
        titre: "Réaliser une documentation utilisateur en vidéo",
        texte: "[À RÉDIGER PAR DANTE – FR] Étape 5"
      },
      {
        titre: "Déployer l'application, rédiger le Readme et créer une page dédiée dans ce portfolio",
        texte: "[À RÉDIGER PAR DANTE – FR] Étape 6"
      }
    ]
  },

  {
    id: "stage-1re-annee",
    categorie: "atelier",
    statut: "upcoming",
    titre: "Stage de 1re année",
    date: "Entre mai et août 2027",
    // Textes écrits par Dante
    accroche: "Un stage de 4 à 5 semaines en entreprise, dans le développement d’applications.",
    description: "[À RÉDIGER PAR DANTE – FR] Description courte du stage",
    technologies: [],
    galerie: [],
    liens: [],
    competences: [],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation (4 à 5 semaines, développement d'applications)",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée du stage",
    sections: [
      {
        titre: "Entreprise d'accueil",
        texte: "[À RÉDIGER PAR DANTE – FR] Entreprise (nom, activité, lieu, service)"
      },
      {
        titre: "Missions",
        texte: "[À RÉDIGER PAR DANTE – FR] Missions réalisées"
      },
      {
        titre: "Compétences mobilisées",
        texte: "[À RÉDIGER PAR DANTE – FR] Compétences mobilisées pendant le stage"
      }
    ]
  },

  /* =================== PROJETS SCOLAIRES – BLOC 1 =================== */

  {
    id: "application-bureau-csharp",
    categorie: "bloc1",
    statut: "upcoming",
    titre: "Application de bureau en C#",
    date: "Nov. – déc. 2026",
    // Textes écrits par Dante
    accroche: "Reprendre une application qui existe déjà pour la corriger et l’améliorer.",
    description: "Je vais revoir les bases de la programmation et apprendre à déboguer, à créer une interface graphique et à gérer les événements. Ensuite, je passerai à la programmation objet, avec une revue de code sur GitHub.",
    technologies: ["C#", "Visual Studio", "GitHub"],
    galerie: [],
    liens: [],
    competences: ["B1.2.1", "B1.2.2", "B1.2.3"],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  },

  {
    id: "patrimoine-informatique-lycee",
    categorie: "bloc1",
    statut: "upcoming",
    titre: "Gestion du patrimoine informatique d'un lycée",
    date: "Déc. 2026 – janv. 2027",
    // Textes écrits par Dante
    accroche: "Gérer le matériel informatique d’un lycée.",
    description: "Il faudra faire l’inventaire du matériel avec un logiciel de gestion de parc, mettre en place des partages de fichiers avec différents niveaux d’accès, appliquer des normes et gérer les sauvegardes.",
    technologies: [
      "Gestion de parc",
      "Partages de fichiers",
      "Habilitations",
      "Sauvegardes"
    ],
    galerie: [],
    liens: [],
    competences: ["B1.1.1", "B1.1.2", "B1.1.3", "B1.1.4", "B1.1.5", "B1.1.6"],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  },

  {
    id: "parc-reseau-lycee",
    categorie: "bloc1",
    statut: "upcoming",
    titre: "Évolution du parc et du réseau d'un lycée",
    date: "Janv. – févr. 2027",
    // Textes écrits par Dante
    accroche: "Faire évoluer le réseau de ce même lycée.",
    description: "J’installerai des machines virtuelles sous Windows 11 et Ubuntu, j’ajouterai des postes dans un domaine Active Directory et je diagnostiquerai des pannes. Je devrai aussi gérer les droits d’accès et faire évoluer l’architecture du réseau.",
    technologies: [
      "Windows 11", "Ubuntu", "Active Directory",
      "Machines virtuelles"
    ],
    galerie: [],
    liens: [],
    competences: ["B1.2.1", "B1.2.2", "B1.2.3"],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  },

  {
    id: "sites-web",
    categorie: "bloc1",
    statut: "upcoming",
    titre: "Sites web",
    date: "Févr. 2027",
    // Textes écrits par Dante
    accroche: "Refaire un site de vente en ligne.",
    description: "Je vais créer les pages en HTML et CSS, ajouter de l’interactivité en JavaScript et gérer la partie serveur en PHP. Je travaillerai aussi sur WordPress, la conformité RGPD, le référencement et la mise en ligne du site.",
    technologies: [
      "HTML", "CSS", "JavaScript", "PHP", "WordPress",
      "RGPD",
      "Référencement"
    ],
    galerie: [],
    liens: [],
    competences: ["B1.3.1", "B1.3.2", "B1.3.3"],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  },

  {
    id: "gestion-de-projet",
    categorie: "bloc1",
    statut: "upcoming",
    titre: "Gestion de projet",
    date: "Févr. 2027",
    // Textes écrits par Dante
    accroche: "Organiser un projet de développement.",
    description: "Le but est de planifier le projet avec MS Project (découpage des tâches, ressources, coûts), de travailler en méthode Agile et de gérer les versions avec Git, notamment les branches et les conflits.",
    technologies: [
      "MS Project",
      "Méthode Agile",
      "Git"
    ],
    galerie: [],
    liens: [],
    competences: ["B1.4.1", "B1.4.2", "B1.4.3"],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  },

  {
    id: "mise-a-disposition-service",
    categorie: "bloc1",
    statut: "upcoming",
    titre: "Mise à disposition d'un service",
    date: "Mars 2027",
    // Textes écrits par Dante
    accroche: "Déployer GLPI, un outil de gestion de parc.",
    description: "Je vais installer un équipement, préparer un environnement de test, puis déployer et tester GLPI. Je rédigerai ensuite la documentation technique et la documentation utilisateur.",
    technologies: [
      "GLPI",
      "Pré-production",
      "Documentation"
    ],
    galerie: [],
    liens: [],
    competences: ["B1.5.1", "B1.5.2", "B1.5.3"],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  },

  /* ============== PROJETS SCOLAIRES – BLOC 2 (OPTION SLAM) ============== */

  {
    id: "jeu-2d-java",
    categorie: "bloc2",
    statut: "upcoming",
    titre: "Jeu 2D",
    date: "Mars 2027",
    // Textes écrits par Dante
    accroche: "Créer un jeu en 2D.",
    description: "Je vais modéliser l’application, puis programmer le jeu en programmation objet (joueurs, murs, déplacements, combats). Je devrai aussi corriger les erreurs et écrire des tests unitaires.",
    technologies: ["Java"],
    galerie: [],
    liens: [],
    competences: [],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  },

  {
    id: "gestion-habilitations",
    categorie: "bloc2",
    statut: "upcoming",
    titre: "Application de gestion des habilitations",
    date: "Mars 2027",
    // Textes écrits par Dante
    accroche: "Gérer les accès des utilisateurs à une application.",
    description: "Il s’agit de créer une base de données et une application en C# qui s’y connecte, avec une authentification sécurisée.",
    technologies: ["C#", "SQL"],
    galerie: [],
    liens: [],
    competences: [],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  },

  {
    id: "bases-de-donnees",
    categorie: "bloc2",
    statut: "upcoming",
    titre: "Bases de données",
    date: "Avr. 2027",
    // Textes écrits par Dante
    accroche: "Concevoir et interroger des bases de données.",
    description: "J’apprendrai à analyser et interroger une base PostgreSQL avec des requêtes SQL et à concevoir une base de données (modèles MCD et MLD). Je découvrirai aussi le NoSQL avec MongoDB.",
    technologies: ["PostgreSQL", "MongoDB"],
    galerie: [],
    liens: [],
    competences: [],
    cadre: "[À RÉDIGER PAR DANTE – FR] Cadre de réalisation",
    descriptionDetaillee: "[À RÉDIGER PAR DANTE – FR] Description détaillée"
  }
];
