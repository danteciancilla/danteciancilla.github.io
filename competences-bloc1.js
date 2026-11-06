/* =====================================================================
   competences-bloc1.js — Compétences officielles du BTS SIO, bloc 1
   « Support et mise à disposition de services informatiques »
   ---------------------------------------------------------------------
   - Les libellés français sont les libellés officiels du référentiel.
   - Chaque sous-compétence a un code (ex. "B1.3.2") : c'est une
     numérotation interne au site (pas officielle), qui sert à relier
     les réalisations (realisations.js) aux compétences.
   ===================================================================== */

const BLOC1_TITRE = "Support et mise à disposition de services informatiques";

const COMPETENCES_BLOC1 = [
  {
    code: "B1.1",
    titre: "Gérer le patrimoine informatique",
    items: [
      { code: "B1.1.1", libelle: "Recenser et identifier les ressources numériques" },
      { code: "B1.1.2", libelle: "Exploiter des référentiels, normes et standards adoptés par le prestataire informatique" },
      { code: "B1.1.3", libelle: "Mettre en place et vérifier les niveaux d’habilitation associés à un service" },
      { code: "B1.1.4", libelle: "Vérifier les conditions de la continuité d’un service informatique" },
      { code: "B1.1.5", libelle: "Gérer des sauvegardes" },
      { code: "B1.1.6", libelle: "Vérifier le respect des règles d’utilisation des ressources numériques" }
    ]
  },
  {
    code: "B1.2",
    titre: "Répondre aux incidents et aux demandes d’assistance et d’évolution",
    items: [
      { code: "B1.2.1", libelle: "Collecter, suivre et orienter des demandes" },
      { code: "B1.2.2", libelle: "Traiter des demandes concernant les services réseau et système, applicatifs" },
      { code: "B1.2.3", libelle: "Traiter des demandes concernant les applications" }
    ]
  },
  {
    code: "B1.3",
    titre: "Développer la présence en ligne de l’organisation",
    items: [
      { code: "B1.3.1", libelle: "Participer à la valorisation de l’image de l’organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques" },
      { code: "B1.3.2", libelle: "Référencer les services en ligne de l’organisation et mesurer leur visibilité" },
      { code: "B1.3.3", libelle: "Participer à l’évolution d’un site Web exploitant les données de l’organisation" }
    ]
  },
  {
    code: "B1.4",
    titre: "Travailler en mode projet",
    items: [
      { code: "B1.4.1", libelle: "Analyser les objectifs et les modalités d’organisation d’un projet" },
      { code: "B1.4.2", libelle: "Planifier les activités" },
      { code: "B1.4.3", libelle: "Évaluer les indicateurs de suivi d’un projet et analyser les écarts" }
    ]
  },
  {
    code: "B1.5",
    titre: "Mettre à disposition des utilisateurs un service informatique",
    items: [
      { code: "B1.5.1", libelle: "Réaliser les tests d’intégration et d’acceptation d’un service" },
      { code: "B1.5.2", libelle: "Déployer un service" },
      { code: "B1.5.3", libelle: "Accompagner les utilisateurs dans la mise en place d’un service" }
    ]
  },
  {
    code: "B1.6",
    titre: "Organiser son développement professionnel",
    items: [
      { code: "B1.6.1", libelle: "Mettre en place son environnement d’apprentissage personnel" },
      { code: "B1.6.2", libelle: "Mettre en œuvre des outils et stratégies de veille informationnelle" },
      { code: "B1.6.3", libelle: "Gérer son identité professionnelle" },
      { code: "B1.6.4", libelle: "Développer son projet professionnel" }
    ]
  }
];
