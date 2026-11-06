/* =====================================================================
   script.js — Interactions du portfolio (JavaScript « pur », sans framework)
   ---------------------------------------------------------------------
   Ce fichier est utilisé par toutes les pages (index.html,
   realisation.html, mentions-legales.html). Chaque partie vérifie
   d'abord que les éléments dont elle a besoin existent sur la page.

   Fichiers de données utilisés :
   - textes.js          : textes de l'interface
   - realisations.js    : liste des réalisations
   - competences-bloc1.js : compétences officielles du bloc 1

   Sommaire :
    0. Réglage du formulaire (Formspree)
    1. Outils de base
    2. Textes de l'interface
    3. Thème clair / sombre
    4. Menu mobile (hamburger)
    5. En-tête au défilement + lien actif dans le menu
    6. Réalisations : vignettes (fabriquées depuis realisations.js)
    7. Réalisations : filtres
    8. Page de détail d'une réalisation
    9. Apparition des éléments au défilement
   10. Compteurs animés (chiffres clés)
   11. Frise du parcours : ligne qui se remplit
   12. Bouton « Copier » l'adresse e-mail
   13. Formulaire de contact (envoi avec Formspree)
   14. Fenêtres (CV, BTS, captures)
   15. Divers : images de secours, année
   16. Démarrage
   ===================================================================== */


/* =====================================================================
   0. RÉGLAGE DU FORMULAIRE DE CONTACT (Formspree)
   ---------------------------------------------------------------------
   GitHub Pages ne peut pas envoyer d'e-mails tout seul. Le formulaire
   passe donc par Formspree, un service gratuit (50 messages par mois)
   qui reçoit le message et me le transfère par e-mail.

   Pour l'activer :
   1. Créer un compte sur https://formspree.io avec l'adresse
      danteciancilla@gmail.com et valider l'e-mail de confirmation.
   2. Cliquer sur « + New Form », l'appeler « Portfolio », valider.
   3. Formspree affiche une adresse du type https://formspree.io/f/xyzabcde
      → copier uniquement la fin (ici « xyzabcde »).
   4. La coller ci-dessous, entre les guillemets, à la place de
      VOTRE_ID_FORMSPREE, puis publier le site.
   5. Envoyer un message test depuis le site en ligne : il doit
      arriver dans ma boîte mail.
   ===================================================================== */
const FORMSPREE_ID = "VOTRE_ID_FORMSPREE";


document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ===================================================================
     1. OUTILS DE BASE
     =================================================================== */

  // Raccourcis pour sélectionner des éléments de la page
  const $ = (selecteur, parent = document) => parent.querySelector(selecteur);
  const $$ = (selecteur, parent = document) => Array.from(parent.querySelectorAll(selecteur));

  const root = document.documentElement; // la balise <html>

  // L'utilisateur a-t-il demandé moins d'animations dans son système ?
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Les fichiers de données sont-ils chargés sur cette page ?
  const listeRealisations = typeof REALISATIONS !== "undefined" ? REALISATIONS : [];
  const listeCompetences = typeof COMPETENCES_BLOC1 !== "undefined" ? COMPETENCES_BLOC1 : [];

  // Lecture / écriture dans le localStorage (mémoire du navigateur).
  // try/catch : en navigation privée, le localStorage peut être bloqué.
  function load(cle) {
    try { return localStorage.getItem(cle); } catch (e) { return null; }
  }
  function save(cle, valeur) {
    try { localStorage.setItem(cle, valeur); } catch (e) { /* on ignore */ }
  }

  // Annonce un message aux lecteurs d'écran (zone invisible #announcer)
  const announcer = $("#announcer");
  function announce(message) {
    if (announcer) announcer.textContent = message;
  }

  // Crée un élément HTML avec une classe et un texte (raccourci)
  function creer(balise, classe, texte) {
    const element = document.createElement(balise);
    if (classe) element.className = classe;
    if (texte !== undefined) element.textContent = texte;
    return element;
  }

  // Crée une icône de la bibliothèque (ex. icone("github"))
  function icone(nom) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#i-" + nom);
    svg.appendChild(use);
    return svg;
  }


  /* ===================================================================
     2. TEXTES DE L'INTERFACE (textes.js)
     =================================================================== */

  // Texte de l'interface à partir de sa clé (ex. t("nav.home"))
  function t(cle) {
    if (cle in TEXTES) return TEXTES[cle];
    return cle; // clé introuvable : on affiche son nom pour la repérer
  }

  // Un texte est un emplacement à remplir s'il commence par [À RÉDIGER ou [À VÉRIFIER
  function estAEcrire(texte) {
    return /^\[À (RÉDIGER|VÉRIFIER)/.test(String(texte).trim());
  }

  /* Emplacements [À RÉDIGER] / [À VÉRIFIER] : ils ne sont jamais affichés
     sur le site (la classe .is-placeholder les masque, voir style.css).
     On les note ici puis on les liste dans la console du navigateur (F12)
     pour pouvoir les retrouver et les remplir. */
  const emplacementsMasques = new Map();

  function signaler(ou, texte) {
    emplacementsMasques.set(ou, String(texte).replace(/<[^>]*>/g, "").slice(0, 100));
  }

  function afficherEmplacements() {
    if (!emplacementsMasques.size) return;
    console.warn("[Portfolio] " + emplacementsMasques.size + " texte(s) à rédiger ou à vérifier, masqué(s) sur cette page :");
    console.table(Array.from(emplacementsMasques, ([emplacement, texte]) => ({ emplacement, texte })));
    emplacementsMasques.clear();
  }

  // true si le texte peut être affiché ; sinon (vide ou emplacement) false,
  // et l'emplacement est signalé dans la console quand « ou » est indiqué
  function estRedige(texte, ou) {
    if (!texte) return false;
    if (estAEcrire(texte)) {
      if (ou) signaler(ou, texte);
      return false;
    }
    return true;
  }

  // Met un texte dans un élément ; un emplacement à remplir est masqué et signalé
  function setText(element, texte, avecHtml, ou) {
    if (avecHtml) {
      element.innerHTML = texte; // autorise <strong> et <p> dans les textes personnels
    } else {
      element.textContent = texte;
    }
    const aRemplir = estAEcrire(texte);
    element.classList.toggle("is-placeholder", aRemplir);
    if (aRemplir) signaler(ou || "texte", texte);
  }

  // Emplacements écrits directement dans le HTML (ex. mentions légales)
  function verifierEmplacementsHtml() {
    const page = window.location.pathname.split("/").pop() || "index.html";
    $$(".is-placeholder:not([data-texte]):not([data-texte-html])").forEach((el, numero) => {
      if (estAEcrire(el.textContent)) {
        signaler(page + " → n°" + (numero + 1), el.textContent.trim());
        // Titre qui n'a plus aucun texte visible sous lui : on le masque aussi
        const titre = el.previousElementSibling;
        const suivant = el.nextElementSibling;
        if (titre && /^H[2-4]$/.test(titre.tagName) && (!suivant || /^H[2-4]$/.test(suivant.tagName))) {
          titre.hidden = true;
        }
      } else {
        el.classList.remove("is-placeholder"); // texte rempli mais classe oubliée : on l'affiche
      }
    });
  }

  // Applique les textes de textes.js aux éléments marqués dans le HTML
  function applyStaticTexts() {
    // a) Textes simples : data-texte="cle"
    $$("[data-texte]").forEach((el) => setText(el, t(el.dataset.texte), false, "textes.js → " + el.dataset.texte));

    // b) Textes pouvant contenir du gras : data-texte-html="cle"
    $$("[data-texte-html]").forEach((el) => setText(el, t(el.dataset.texteHtml), true, "textes.js → " + el.dataset.texteHtml));

    // c) Attributs : data-texte-attr="aria-label:cle;alt:autre.cle"
    $$("[data-texte-attr]").forEach((el) => {
      el.dataset.texteAttr.split(";").forEach((paire) => {
        const [attribut, cle] = paire.split(":").map((s) => s.trim());
        if (attribut && cle) el.setAttribute(attribut, t(cle));
      });
    });
  }


  /* ===================================================================
     3. THÈME CLAIR / SOMBRE
     Le thème de départ (sombre par défaut, ou celui mémorisé) est déjà
     appliqué par le petit script du <head>.
     =================================================================== */
  const themeButton = $("#theme-toggle");

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function updateThemeButton() {
    if (!themeButton) return;
    // Le bouton annonce l'action qu'il va faire
    themeButton.setAttribute("aria-label", currentTheme() === "dark" ? t("theme.toLight") : t("theme.toDark"));
  }

  // Couleur de la barre du navigateur sur mobile, selon le thème
  const themeColorMeta = $("#theme-color");
  const THEME_COLORS = { light: "#F7F9FC", dark: "#0A0914" };

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeColorMeta) themeColorMeta.setAttribute("content", THEME_COLORS[theme]);
    updateThemeButton();
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const nouveau = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(nouveau);
      save("theme", nouveau); // choix mémorisé pour la prochaine visite
    });
  }


  /* ===================================================================
     4. MENU MOBILE (HAMBURGER)
     =================================================================== */
  const menuButton = $("#menu-toggle");
  const nav = $("#nav");

  function isMenuOpen() {
    return menuButton && menuButton.getAttribute("aria-expanded") === "true";
  }

  function updateMenuButton() {
    if (!menuButton) return;
    menuButton.setAttribute("aria-label", isMenuOpen() ? t("nav.menuClose") : t("nav.menuOpen"));
  }

  function setMenu(ouvert) {
    if (!menuButton || !nav) return;
    nav.classList.toggle("is-open", ouvert);
    menuButton.setAttribute("aria-expanded", String(ouvert));
    updateMenuButton();
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => setMenu(!isMenuOpen()));

    // On ferme le menu quand on clique sur un lien…
    $$(".nav__link", nav).forEach((lien) => lien.addEventListener("click", () => setMenu(false)));

    // … quand on appuie sur Échap (et on remet le focus sur le bouton)…
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMenuOpen()) {
        setMenu(false);
        menuButton.focus();
      }
    });

    // … quand on clique en dehors du menu…
    document.addEventListener("click", (e) => {
      if (isMenuOpen() && !nav.contains(e.target) && !menuButton.contains(e.target)) setMenu(false);
    });

    // … et quand la fenêtre redevient large (ordinateur)
    window.matchMedia("(min-width: 900px)").addEventListener("change", () => setMenu(false));
  }


  /* ===================================================================
     5. EN-TÊTE AU DÉFILEMENT + LIEN ACTIF DANS LE MENU
     =================================================================== */
  const header = $(".site-header");
  const backToTop = $("#back-to-top");

  // Appelée à chaque défilement (au maximum une fois par image affichée)
  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
    updateTimeline();
  }

  let enAttente = false;
  window.addEventListener("scroll", () => {
    if (enAttente) return;
    enAttente = true;
    requestAnimationFrame(() => {
      onScroll();
      enAttente = false;
    });
  }, { passive: true });

  // Lien actif : on surveille quelle section passe au milieu de l'écran
  const navLinks = $$(".nav__link");
  const sections = navLinks
    .map((lien) => {
      const cible = lien.getAttribute("href");
      return cible && cible.startsWith("#") ? document.querySelector(cible) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observerMenu = new IntersectionObserver((entrees) => {
      entrees.forEach((entree) => {
        if (!entree.isIntersecting) return;
        navLinks.forEach((lien) => {
          const actif = lien.getAttribute("href") === "#" + entree.target.id;
          lien.classList.toggle("is-active", actif);
          if (actif) lien.setAttribute("aria-current", "true");
          else lien.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" }); // une fine bande au milieu de l'écran

    sections.forEach((section) => observerMenu.observe(section));
  }


  /* ===================================================================
     6. RÉALISATIONS : VIGNETTES
     Les vignettes ne sont pas écrites dans index.html : elles sont
     fabriquées ici à partir de la liste REALISATIONS (realisations.js).
     =================================================================== */
  const projectsRoot = $("#projects-root");

  // Les 4 catégories, dans l'ordre d'affichage
  const GROUPES = [
    { categorie: "perso",   grille: "projects-grid projects-grid--two" },
    { categorie: "atelier", grille: "projects-grid projects-grid--two", misEnAvant: true },
    { categorie: "bloc1",   grille: "projects-grid" },
    { categorie: "bloc2",   grille: "projects-grid" }
  ];

  // Réalisations triées dans l'ordre d'affichage (par catégorie)
  function realisationsOrdonnees() {
    const ordre = GROUPES.map((g) => g.categorie);
    return listeRealisations
      .slice()
      .sort((a, b) => ordre.indexOf(a.categorie) - ordre.indexOf(b.categorie));
  }

  // Adresse de la page de détail d'une réalisation
  function lienDetail(projet) {
    return "realisation.html?id=" + encodeURIComponent(projet.id);
  }

  // Projet « À venir » : pas encore de page de détail accessible
  function estAVenir(projet) {
    return projet.statut === "upcoming";
  }

  // Texte d'une réalisation : l'accroche (première phrase) puis la description.
  // Un emplacement [À RÉDIGER] n'est pas affiché ; il est signalé dans la
  // console, sauf pour un projet « À venir ».
  function ajouterResume(parent, projet) {
    const ou = (champ) => (estAVenir(projet) ? null : "realisations.js → " + projet.id + " → " + champ);
    if (estRedige(projet.accroche, ou("accroche"))) {
      parent.appendChild(creer("p", "project__accroche", projet.accroche));
    }
    if (estRedige(projet.description, ou("description"))) {
      const description = creer("div", "project__desc");
      description.innerHTML = projet.description; // autorise <strong>
      parent.appendChild(description);
    }
  }

  // Codes courts des compétences couvertes (ex. ["B1.3", "B1.5"])
  function codesCompetences(projet) {
    const codes = (projet.competences || []).map((code) => code.split(".").slice(0, 2).join("."));
    return Array.from(new Set(codes)).sort();
  }

  // Les compétences du bloc 1 ne concernent que les réalisations de la formation
  // (scolaires, ateliers, stage) : jamais les projets personnels
  function compteDansLeBloc1(projet) {
    return projet.categorie !== "perso";
  }

  // Retrouve une compétence (B1.x) par son code
  function competence(code) {
    return listeCompetences.find((c) => c.code === code);
  }

  // Liste d'étiquettes (technologies)
  function listeTags(technologies) {
    const liste = creer("ul", "tags");
    liste.setAttribute("aria-label", t("detail.technologies"));
    technologies.forEach((techno) => liste.appendChild(creer("li", "tag", techno)));
    return liste;
  }

  // Badges des compétences du bloc 1 (codes courts)
  function listeBadges(projet) {
    const liste = creer("ul", "comp-badges");
    liste.setAttribute("aria-label", t("comp.label"));
    codesCompetences(projet).forEach((code) => {
      const comp = competence(code);
      const badge = creer("li", "comp-badge", code);
      if (comp) badge.title = code + " – " + comp.titre;
      liste.appendChild(badge);
    });
    return liste;
  }

  // Lien externe (site, jeu, GitHub, vidéo…) ; s'il n'a pas d'adresse : « Lien à venir »
  // Avec « afficherAdresse » (page de détail) : on écrit l'adresse du lien
  // (ex. cbiocoiffure.fr) suivie de l'icône « nouvel onglet »
  function lienExterne(lien, afficherAdresse) {
    const libelle = t("link." + lien.type);
    // Lien vers la section Contact du site : même onglet, icône e-mail
    if (lien.type === "contact") {
      const a = creer("a", "link-arrow", libelle);
      a.href = lien.url;
      a.appendChild(icone("mail"));
      return a;
    }
    if (!lien.url) {
      const vide = creer("span", "link-missing", libelle + " – " + t("link.missing"));
      return vide;
    }
    const a = creer("a", "link-arrow" + (afficherAdresse ? " link-arrow--url" : ""));
    a.href = lien.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    if (afficherAdresse) {
      a.title = libelle;
      a.append(creer("span", "", adresseLisible(lien.url)), creer("span", "sr-only", t("link.newTab")));
      a.appendChild(icone("external"));
    } else {
      a.append(creer("span", "", libelle), creer("span", "sr-only", t("link.newTab")));
      a.appendChild(icone(lien.type === "github" || lien.type === "linkedin" ? lien.type : "external"));
    }
    return a;
  }

  // Adresse plus lisible : sans « https:// » ni « / » à la fin
  function adresseLisible(url) {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  // Fabrique une vignette
  function creerVignette(projet, groupe, animer) {
    const aVenir = estAVenir(projet);
    const carte = creer("article", "project" + (groupe.misEnAvant ? " project--featured" : "") + (aVenir ? " project--upcoming" : "") + (animer ? " reveal" : ""));
    carte.dataset.category = projet.categorie;

    // Miniature (seulement si le projet en a une)
    if (projet.miniature) {
      const media = creer("div", "project__media");
      const image = document.createElement("img");
      image.src = projet.miniature;
      image.alt = projet.miniatureAlt || "";
      image.width = 1200;
      image.height = 600;
      image.loading = "lazy";
      image.dataset.fallback = "images/capture-placeholder.svg";
      media.appendChild(image);
      carte.appendChild(media);
    }

    const corps = creer("div", "project__body");

    // Statut et date
    const meta = creer("div", "project__meta");
    meta.append(
      creer("span", "status status--" + projet.statut, t("status." + projet.statut)),
      creer("span", "project__date", projet.date)
    );

    // Titre = lien vers la page de détail (toute la carte devient cliquable grâce au CSS).
    // Projet « À venir » : simple titre, pas de lien.
    const titre = creer("h4", "project__title");
    if (aVenir) {
      titre.textContent = projet.titre;
    } else {
      const lien = creer("a", "project__link", projet.titre);
      lien.href = lienDetail(projet);
      titre.appendChild(lien);
    }
    corps.append(meta, titre);

    if (projet.chiffres) corps.appendChild(creer("p", "project__stats", projet.chiffres));

    ajouterResume(corps, projet);

    if (projet.technologies && projet.technologies.length) corps.appendChild(listeTags(projet.technologies));
    if (compteDansLeBloc1(projet) && codesCompetences(projet).length) corps.appendChild(listeBadges(projet));

    // Liens : « Voir le détail » + liens externes qui ont une adresse
    const liens = creer("div", "project__links");
    const voir = creer("span", "link-arrow link-arrow--detail");
    voir.append(creer("span", "", t("link.detail")), icone("arrow-right"));
    if (aVenir) {
      // Lien désactivé tant que la réalisation est « À venir »
      voir.classList.add("is-disabled");
      voir.setAttribute("aria-disabled", "true");
      voir.title = t("link.detailSoon");
    } else {
      voir.setAttribute("aria-hidden", "true"); // le titre est déjà un lien vers le détail
    }
    liens.appendChild(voir);
    (projet.liens || []).filter((l) => l.url).forEach((l) => liens.appendChild(lienExterne(l)));
    corps.appendChild(liens);

    carte.appendChild(corps);
    return carte;
  }

  // Affiche toutes les vignettes, rangées par catégorie
  function renderProjects(animer) {
    if (!projectsRoot) return;
    projectsRoot.innerHTML = "";

    GROUPES.forEach((groupe) => {
      const projets = listeRealisations.filter((p) => p.categorie === groupe.categorie);
      if (!projets.length) return;

      const bloc = creer("div", "project-group" + (groupe.misEnAvant ? " project-group--featured" : ""));
      const entete = creer("div", "group-head" + (animer ? " reveal" : ""));
      entete.append(
        creer("h3", "group-title", t("group." + groupe.categorie + ".title")),
        creer("p", "group-sub", t("group." + groupe.categorie + ".sub"))
      );
      const grille = creer("div", groupe.grille);
      projets.forEach((projet) => grille.appendChild(creerVignette(projet, groupe, animer)));

      bloc.append(entete, grille);
      projectsRoot.appendChild(bloc);
    });

    applyFilter(currentFilter, false);
  }


  /* ===================================================================
     7. RÉALISATIONS : FILTRES
     Chaque bouton a un data-filter ("all", "perso", "bloc1", "bloc2"
     ou "atelier") qui correspond à la catégorie des vignettes.
     =================================================================== */
  const filterButtons = $$(".filter-btn");
  let currentFilter = "all";

  function applyFilter(filtre, annoncer) {
    if (!projectsRoot) return;
    currentFilter = filtre;
    let rang = 0;

    $$(".project", projectsRoot).forEach((carte) => {
      const afficher = filtre === "all" || carte.dataset.category === filtre;
      carte.hidden = !afficher;
      if (afficher) {
        // nouvelle cascade : chaque carte affichée attend un peu plus
        carte.style.setProperty("--d", Math.min(rang, 6) * 70 + "ms");
        rang++;
      }
    });

    // On cache une catégorie qui n'a plus aucune vignette visible
    $$(".project-group", projectsRoot).forEach((groupe) => {
      groupe.hidden = !$(".project:not([hidden])", groupe);
    });

    // Bouton sélectionné : aria-pressed="true"
    filterButtons.forEach((bouton) => {
      bouton.setAttribute("aria-pressed", String(bouton.dataset.filter === filtre));
    });

    if (annoncer) {
      announce(rang === 1 ? t("projects.countOne") : t("projects.countMany").replace("{n}", rang));
    }
  }

  filterButtons.forEach((bouton) => {
    bouton.addEventListener("click", () => applyFilter(bouton.dataset.filter, true));
  });


  /* ===================================================================
     8. PAGE DE DÉTAIL D'UNE RÉALISATION (realisation.html?id=...)
     La page lit l'identifiant dans l'adresse, retrouve la réalisation
     dans realisations.js et fabrique son contenu.
     =================================================================== */
  const detailRoot = $("#realisation-root");

  // Sous-compétences d'une compétence travaillées dans une réalisation
  function sousCompetencesCouvertes(projet, comp) {
    return comp.items.filter((item) => (projet.competences || []).includes(item.code));
  }

  // Section avec un titre et un texte ; null si le texte est un emplacement à remplir
  function sectionTexte(titre, texte, ou) {
    if (!estRedige(texte, ou)) return null;
    const section = creer("section", "detail-section");
    section.appendChild(creer("h2", "", titre));
    const contenu = creer("div", "detail-section__text");
    contenu.innerHTML = texte; // autorise <strong> et <p>
    section.appendChild(contenu);
    return section;
  }

  // Ajoute un élément seulement s'il existe
  function ajouter(parent, enfant) {
    if (enfant) parent.appendChild(enfant);
  }

  // Transforme un lien YouTube en lecteur intégré, ou un fichier .mp4 en lecteur vidéo
  function lecteurVideo(url) {
    const cadre = creer("div", "video-frame");
    const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (youtube) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + youtube[1];
      iframe.title = t("detail.video");
      iframe.allow = "accelerometer; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      cadre.appendChild(iframe);
    } else {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      cadre.appendChild(video);
    }
    return cadre;
  }

  function renderDetail() {
    if (!detailRoot) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const projet = listeRealisations.find((p) => p.id === id);
    detailRoot.innerHTML = "";

    // Identifiant inconnu : message + lien de retour
    if (!projet) {
      detailRoot.appendChild(creer("h1", "detail__title", t("detail.notFound")));
      document.title = t("detail.notFound") + " | Dante Ciancilla";
      return;
    }

    document.title = projet.titre + " | Dante Ciancilla";

    // Emplacements [À RÉDIGER] : masqués, et signalés dans la console
    // pour les projets réalisés ou en cours (pas pour les projets « À venir »)
    const aVenir = estAVenir(projet);
    const ou = (champ) => (aVenir ? null : "realisations.js → " + projet.id + " → " + champ);

    // --- En-tête : titre, statut, date, technologies ---
    detailRoot.appendChild(creer("h1", "detail__title", projet.titre));

    const meta = creer("div", "detail__meta");
    meta.append(
      creer("span", "status status--" + projet.statut, t("status." + projet.statut)),
      creer("span", "detail__date", projet.date)
    );
    detailRoot.appendChild(meta);

    if (projet.chiffres) detailRoot.appendChild(creer("p", "project__stats detail__stats", projet.chiffres));
    if (projet.technologies && projet.technologies.length) {
      const tags = listeTags(projet.technologies);
      tags.classList.add("detail__tags");
      detailRoot.appendChild(tags);
    }

    // --- Projet « À venir » : accroche et description (pas encore de description détaillée) ---
    if (aVenir) {
      const resume = creer("div", "detail__planned");
      ajouterResume(resume, projet);
      detailRoot.appendChild(resume);
    }

    // --- Cadre de réalisation et description détaillée ---
    ajouter(detailRoot, sectionTexte(t("detail.frame"), projet.cadre, ou("cadre")));
    ajouter(detailRoot, sectionTexte(t("detail.description"), projet.descriptionDetaillee, ou("descriptionDetaillee")));

    // --- Étapes du projet (ex. MediaTek86) ---
    if (projet.etapes && projet.etapes.length) {
      const section = creer("section", "detail-section");
      section.appendChild(creer("h2", "", t("detail.steps")));
      const liste = creer("ol", "steps");
      projet.etapes.forEach((etape, index) => {
        const li = creer("li", "step");
        li.appendChild(creer("span", "step__number", String(index + 1)));
        const contenu = creer("div", "step__content");
        contenu.appendChild(creer("h3", "step__title", etape.titre));
        if (estRedige(etape.texte, ou("etapes → étape " + (index + 1)))) {
          const texte = creer("div", "step__text");
          texte.innerHTML = etape.texte;
          contenu.appendChild(texte);
        }
        li.appendChild(contenu);
        liste.appendChild(li);
      });
      section.appendChild(liste);
      detailRoot.appendChild(section);
    }

    // --- Autres parties (ex. stage : entreprise, missions…) ---
    (projet.sections || []).forEach((partie) => {
      ajouter(detailRoot, sectionTexte(partie.titre, partie.texte, ou("sections → " + partie.titre)));
    });

    // --- Vidéo (seulement si le champ « video » existe) ---
    // Vidéo pas encore fournie : cadre « Vidéo à venir » pour un projet à venir,
    // section masquée (et signalée) pour un projet réalisé ou en cours.
    if (projet.video || (projet.video === "" && aVenir)) {
      const section = creer("section", "detail-section");
      section.appendChild(creer("h2", "", t("detail.video")));
      if (projet.video) {
        section.appendChild(lecteurVideo(projet.video));
      } else {
        const vide = creer("div", "video-frame video-frame--empty");
        vide.append(icone("play"), creer("span", "", t("detail.videoPlaceholder")));
        section.appendChild(vide);
      }
      detailRoot.appendChild(section);
    } else if (projet.video === "") {
      signaler(ou("video"), "(vidéo vide : section masquée)");
    }

    // --- Galerie de captures (dossier images/<id>/) ---
    // Pas encore de capture : images « Capture à venir » pour un projet à venir,
    // section masquée (et signalée) pour un projet réalisé ou en cours.
    const aDesCaptures = projet.galerie && projet.galerie.length > 0;
    if (!aDesCaptures && !aVenir) signaler(ou("galerie"), "(aucune capture : section masquée)");
    const galerie = creer("section", "detail-section");
    galerie.appendChild(creer("h2", "", t("detail.gallery")));
    const grille = creer("div", "gallery");
    const captures = aDesCaptures ? projet.galerie : aVenir ? [null, null] : [];
    captures.forEach((capture) => {
      const figure = creer("figure", "gallery__item");
      const image = document.createElement("img");
      image.loading = "lazy";
      image.width = 1200;
      image.height = 675;
      if (capture) {
        // Capture réelle : cliquable pour l'agrandir
        const bouton = creer("button", "gallery__button");
        bouton.type = "button";
        bouton.dataset.lightbox = "images/" + projet.id + "/" + capture.fichier;
        bouton.dataset.caption = capture.legende || "";
        bouton.setAttribute("aria-label", t("detail.enlarge") + " : " + (capture.legende || projet.titre));
        image.src = bouton.dataset.lightbox;
        image.alt = capture.legende || projet.titre;
        image.dataset.fallback = "images/capture-placeholder.svg";
        bouton.appendChild(image);
        figure.appendChild(bouton);
        if (capture.legende) figure.appendChild(creer("figcaption", "", capture.legende));
      } else {
        // Pas encore de capture : image provisoire
        image.src = "images/capture-placeholder.svg";
        image.alt = "";
        figure.classList.add("gallery__item--empty");
        figure.append(image, creer("figcaption", "", t("detail.galleryPlaceholder")));
      }
      grille.appendChild(figure);
    });
    galerie.appendChild(grille);
    if (captures.length) detailRoot.appendChild(galerie);

    // --- Liens ---
    const sectionLiens = creer("section", "detail-section");
    sectionLiens.appendChild(creer("h2", "", t("detail.links")));
    if (projet.liens && projet.liens.length) {
      const liste = creer("div", "detail__links");
      projet.liens.forEach((l) => liste.appendChild(lienExterne(l, true)));
      sectionLiens.appendChild(liste);
    } else {
      sectionLiens.appendChild(creer("p", "detail__empty", t("detail.noLinks")));
    }
    detailRoot.appendChild(sectionLiens);

    // --- Compétences du bloc 1 couvertes (libellés officiels) ---
    // Pas de compétences du bloc 1 pour un projet personnel
    if (!compteDansLeBloc1(projet)) return;
    const sectionComp = creer("section", "detail-section");
    sectionComp.appendChild(creer("h2", "", t("detail.skills")));
    sectionComp.appendChild(creer("p", "detail__bloc", (typeof BLOC1_TITRE !== "undefined" ? BLOC1_TITRE : "")));
    const groupes = listeCompetences
      .map((comp) => ({ comp, items: sousCompetencesCouvertes(projet, comp) }))
      .filter((g) => g.items.length);
    if (groupes.length) {
      const liste = creer("ul", "comp-list");
      groupes.forEach(({ comp, items }) => {
        const li = creer("li", "comp-list__group");
        const titre = creer("p", "comp-list__title");
        titre.append(creer("span", "comp-badge", comp.code), creer("span", "", comp.titre));
        const sousListe = creer("ul", "comp-list__items");
        items.forEach((item) => {
          const sli = creer("li", "");
          sli.append(icone("check"), creer("span", "", item.libelle));
          sousListe.appendChild(sli);
        });
        li.append(titre, sousListe);
        liste.appendChild(li);
      });
      sectionComp.appendChild(liste);
    } else {
      sectionComp.appendChild(creer("p", "detail__empty", t("detail.noSkills")));
    }
    detailRoot.appendChild(sectionComp);
  }

  // Fabrique tout le contenu qui vient des fichiers de données
  function renderDynamic(animer) {
    renderProjects(animer);
    renderDetail();
  }


  /* ===================================================================
     9. APPARITION DES ÉLÉMENTS AU DÉFILEMENT
     Les éléments .reveal sont invisibles au départ (voir style.css).
     Quand ils arrivent à l'écran, on leur ajoute la classe .is-visible
     qui lance l'animation « fondu + glissement vers le haut ».
     =================================================================== */
  function setupReveal() {
    const revealElements = $$(".reveal");

    // Effet « en cascade » : les éléments voisins apparaissent l'un après l'autre
    revealElements.forEach((el) => {
      const voisins = Array.from(el.parentElement.children).filter((enfant) => enfant.classList.contains("reveal"));
      const rang = Math.min(voisins.indexOf(el), 6);
      el.style.setProperty("--d", rang * 90 + "ms");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      // Pas d'animation : tout est affiché directement
      revealElements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observerReveal = new IntersectionObserver((entrees, observateur) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          entree.target.classList.add("is-visible");
          observateur.unobserve(entree.target); // l'animation ne se joue qu'une fois
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealElements.forEach((el) => observerReveal.observe(el));
  }


  /* ===================================================================
     10. COMPTEURS ANIMÉS (CHIFFRES CLÉS)
     data-count="2000"          → compte de 0 à 2000
     data-prefix="~"            → ajoute « ~ » devant
     data-steps="A1,A2,B1,…"    → fait défiler une liste de valeurs
     =================================================================== */
  const counters = $$(".counter");

  // Écrit un nombre à la française (ex. 2 000)
  function formatNumber(n) {
    return n.toLocaleString("fr-FR");
  }

  // Valeur affichée pour une progression p (0 = début, 1 = fin)
  function counterText(el, p) {
    if (el.dataset.steps) {
      const etapes = el.dataset.steps.split(",");
      const index = Math.min(etapes.length - 1, Math.floor(p * etapes.length));
      return etapes[index];
    }
    const valeur = Math.round(Number(el.dataset.count) * p);
    return (el.dataset.prefix || "") + formatNumber(valeur);
  }

  // Met la valeur finale (et le texte pour lecteurs d'écran)
  function refreshCounters() {
    counters.forEach((el) => {
      const final = counterText(el, 1);
      const texteLecteur = el.nextElementSibling;
      if (texteLecteur && texteLecteur.classList.contains("counter-sr")) texteLecteur.textContent = final;
      if (el.dataset.done === "true" || reduceMotion) el.textContent = final;
    });
  }

  function animateCounter(el) {
    const duree = el.dataset.steps ? 1400 : 1800; // en millisecondes
    const debut = performance.now();

    function etape(maintenant) {
      const p = Math.min((maintenant - debut) / duree, 1);
      const adouci = 1 - Math.pow(1 - p, 3); // ralentit vers la fin
      el.textContent = counterText(el, adouci);
      if (p < 1) {
        requestAnimationFrame(etape);
      } else {
        el.dataset.done = "true";
      }
    }
    requestAnimationFrame(etape);
  }

  function startCounters() {
    if (!counters.length) return;
    if (reduceMotion) {
      counters.forEach((el) => { el.dataset.done = "true"; });
      refreshCounters();
      return;
    }
    // On remet à zéro puis on lance l'animation quand les chiffres sont visibles
    counters.forEach((el) => { el.textContent = counterText(el, 0); });

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }
    const observerCompteurs = new IntersectionObserver((entrees, observateur) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          // petit délai pour laisser l'accueil apparaître d'abord
          setTimeout(() => animateCounter(entree.target), 500);
          observateur.unobserve(entree.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => observerCompteurs.observe(el));
  }


  /* ===================================================================
     11. FRISE DU PARCOURS : LIGNE QUI SE REMPLIT
     La ligne colorée (.timeline__fill) grandit de 0 % à 100 % selon la
     position de la frise par rapport au bas de l'écran.
     =================================================================== */
  const timeline = $("#timeline");
  const track = timeline ? $(".timeline__track", timeline) : null;
  const fill = timeline ? $(".timeline__fill", timeline) : null;
  const timelineItems = timeline ? $$(".timeline__item", timeline) : [];

  // Place la ligne grise exactement entre le premier et le dernier rond
  function sizeTimeline() {
    if (!timeline || !track || timelineItems.length < 2) return;
    const premier = $(".timeline__dot", timelineItems[0]);
    const dernier = $(".timeline__dot", timelineItems[timelineItems.length - 1]);
    const haut = premier.offsetTop + timelineItems[0].offsetTop + premier.offsetHeight / 2;
    const bas = dernier.offsetTop + timelineItems[timelineItems.length - 1].offsetTop + dernier.offsetHeight / 2;
    track.style.top = haut + "px";
    track.style.bottom = "auto";
    track.style.height = Math.max(0, bas - haut) + "px";
  }

  function updateTimeline() {
    if (!track || !fill) return;
    const ligneDeRepere = window.innerHeight * 0.65; // à 65 % de la hauteur de l'écran
    const zone = track.getBoundingClientRect();

    // Progression entre 0 et 1
    let progression = (ligneDeRepere - zone.top) / zone.height;
    progression = Math.max(0, Math.min(1, progression));
    if (reduceMotion) progression = 1;

    fill.style.transform = "scaleY(" + progression + ")";

    // Une étape devient « active » quand la ligne colorée atteint son rond
    timelineItems.forEach((item) => {
      const rond = $(".timeline__dot", item).getBoundingClientRect();
      const atteint = reduceMotion || rond.top + rond.height / 2 <= ligneDeRepere;
      item.classList.toggle("is-active", atteint);
    });
  }

  window.addEventListener("resize", () => {
    sizeTimeline();
    updateTimeline();
  });


  /* ===================================================================
     12. BOUTON « COPIER » L'ADRESSE E-MAIL
     =================================================================== */
  const copyButton = $("#copy-email");
  const toast = $("#toast");
  let toastTimer = null;

  // Petit message temporaire en bas de l'écran
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  async function copyText(texte) {
    // Méthode moderne
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(texte);
        return true;
      } catch (e) { /* on essaie la méthode de secours */ }
    }
    // Méthode de secours (anciens navigateurs, fichier ouvert en local)
    const zone = document.createElement("textarea");
    zone.value = texte;
    zone.setAttribute("readonly", "");
    zone.style.position = "fixed";
    zone.style.opacity = "0";
    document.body.appendChild(zone);
    zone.select();
    let reussi = false;
    try { reussi = document.execCommand("copy"); } catch (e) { reussi = false; }
    zone.remove();
    return reussi;
  }

  if (copyButton) {
    const libelle = $(".copy-btn__label", copyButton);
    copyButton.addEventListener("click", async () => {
      const reussi = await copyText(copyButton.dataset.copy);
      if (!reussi) {
        showToast(t("contact.copyError"));
        return;
      }
      copyButton.classList.add("is-copied");
      libelle.textContent = t("contact.copied");
      showToast(t("contact.copiedMsg"));
      // Après 2 secondes, le bouton redevient normal
      setTimeout(() => {
        copyButton.classList.remove("is-copied");
        libelle.textContent = t("contact.copy");
      }, 2000);
    });
  }


  /* ===================================================================
     13. FORMULAIRE DE CONTACT (envoi avec Formspree)
     1. On vérifie chaque champ et on affiche un message sous le champ
        s'il est mal rempli.
     2. Le champ caché « _gotcha » piège les robots : un humain ne le
        voit pas, donc s'il est rempli, c'est un robot (on n'envoie rien).
     3. On envoie le message à Formspree avec fetch(), sans quitter la page,
        puis on affiche un message de réussite ou d'erreur.
     =================================================================== */
  const form = $("#contact-form");

  if (form) {
    const formStatus = $("#form-status");
    const boutonEnvoi = $("button[type='submit']", form);
    const libelleEnvoi = $("[data-texte]", boutonEnvoi);
    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Règles de chaque champ : renvoie la clé du message d'erreur, ou "" si c'est bon
    const regles = {
      name: (v) => (v.length >= 2 ? "" : "form.errName"),
      email: (v) => (emailValide.test(v) ? "" : "form.errEmail"),
      subject: (v) => (v.length >= 2 ? "" : "form.errSubject"),
      message: (v) => (v.length >= 10 ? "" : "form.errMessage")
    };

    // Affiche (ou efface) le message d'erreur d'un champ
    function verifierChamp(champ) {
      const regle = regles[champ.name];
      if (!regle) return true;
      const cleErreur = regle(champ.value.trim());
      const zoneErreur = document.getElementById(champ.id + "-error");
      champ.setAttribute("aria-invalid", cleErreur ? "true" : "false");
      if (zoneErreur) zoneErreur.textContent = cleErreur ? t(cleErreur) : "";
      return !cleErreur;
    }

    // Message général sous le bouton (réussite ou erreur)
    function afficherStatut(cle, type) {
      if (!formStatus) return;
      formStatus.className = "form-status" + (type ? " form-status--" + type : "");
      formStatus.textContent = cle ? t(cle) : "";
    }

    // Bouton « Envoyer » ↔ « Envoi en cours… »
    function enCoursEnvoi(actif) {
      boutonEnvoi.disabled = actif;
      libelleEnvoi.textContent = t(actif ? "form.sending" : "form.send");
    }

    const champs = $$("input[name], textarea[name]", form).filter((c) => regles[c.name]);

    // Vérification quand on quitte un champ, puis en direct s'il était en erreur
    champs.forEach((champ) => {
      champ.addEventListener("blur", () => verifierChamp(champ));
      champ.addEventListener("input", () => {
        if (champ.getAttribute("aria-invalid") === "true") verifierChamp(champ);
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // on reste sur la page
      afficherStatut("", "");

      // 1. Vérification de tous les champs
      const invalides = champs.filter((champ) => !verifierChamp(champ));
      if (invalides.length) {
        invalides[0].focus();
        return;
      }

      // 2. Piège à robots rempli : on fait comme si tout allait bien
      if (form.elements._gotcha && form.elements._gotcha.value) {
        form.reset();
        afficherStatut("form.success", "success");
        return;
      }

      // 3. Formulaire pas encore relié à Formspree
      if (!FORMSPREE_ID || FORMSPREE_ID === "VOTRE_ID_FORMSPREE") {
        afficherStatut("form.notConfigured", "error");
        return;
      }

      // 4. Envoi à Formspree
      const donnees = new FormData(form);
      donnees.append("_subject", "Portfolio – " + donnees.get("subject"));
      enCoursEnvoi(true);
      try {
        const reponse = await fetch("https://formspree.io/f/" + FORMSPREE_ID, {
          method: "POST",
          body: donnees,
          headers: { Accept: "application/json" }
        });
        if (reponse.ok) {
          form.reset();
          champs.forEach((champ) => champ.setAttribute("aria-invalid", "false"));
          afficherStatut("form.success", "success");
        } else {
          afficherStatut("form.error", "error");
        }
      } catch (erreur) {
        // Pas de connexion, Formspree injoignable…
        afficherStatut("form.error", "error");
      } finally {
        enCoursEnvoi(false);
      }
    });
  }


  /* ===================================================================
     14. FENÊTRES (CV, BTS, captures)
     Balise <dialog> : showModal() l'ouvre, close() la ferme.
     La touche Échap la ferme automatiquement.
     On écoute les clics sur toute la page (« délégation ») : ça marche
     aussi pour les boutons fabriqués par JavaScript (galerie).
     =================================================================== */
  const lightbox = $("#lightbox");

  document.addEventListener("click", (e) => {
    // Bouton qui ouvre une fenêtre : data-open-dialog="id-de-la-fenetre"
    const ouvreur = e.target.closest("[data-open-dialog]");
    if (ouvreur) {
      const fenetre = document.getElementById(ouvreur.dataset.openDialog);
      if (fenetre && typeof fenetre.showModal === "function") fenetre.showModal();
      return;
    }

    // Capture de la galerie : on l'affiche en grand
    const capture = e.target.closest("[data-lightbox]");
    if (capture && lightbox && typeof lightbox.showModal === "function") {
      const image = $("img", lightbox);
      image.src = capture.dataset.lightbox;
      image.alt = capture.dataset.caption || "";
      $(".lightbox__caption", lightbox).textContent = capture.dataset.caption || "";
      lightbox.showModal();
    }
  });

  $$("dialog").forEach((fenetre) => {
    // Bouton de fermeture
    $$("[data-close-dialog]", fenetre).forEach((bouton) => {
      bouton.addEventListener("click", () => fenetre.close());
    });
    // Clic sur le fond sombre autour de la fenêtre
    fenetre.addEventListener("click", (e) => {
      if (e.target === fenetre) fenetre.close();
    });
  });


  /* ===================================================================
     15. DIVERS
     =================================================================== */

  // Images de secours : si une image (photo.jpg, capture…) n'existe pas
  // encore, on affiche l'image provisoire indiquée dans data-fallback.
  // L'écouteur est posé sur tout le document (phase de « capture ») :
  // il fonctionne aussi pour les images fabriquées par JavaScript.
  function utiliserSecours(image) {
    if (!image.dataset.fallback || image.dataset.failed) return; // évite une boucle si le secours manque aussi
    image.dataset.failed = "true";
    image.src = image.dataset.fallback;
  }
  document.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") utiliserSecours(e.target);
  }, true);

  // Année en cours dans le pied de page
  const annee = $("#year");
  if (annee) annee.textContent = new Date().getFullYear();


  /* ===================================================================
     16. DÉMARRAGE
     =================================================================== */
  verifierEmplacementsHtml();    // emplacements écrits dans le HTML (mentions légales)
  applyStaticTexts();            // textes de l'interface
  renderDynamic(true);           // vignettes, tableau, page de détail
  afficherEmplacements();        // liste des emplacements masqués dans la console (F12)
  setupReveal();                 // animations au défilement (après les vignettes)
  applyTheme(currentTheme());
  updateMenuButton();
  startCounters();
  refreshCounters();
  sizeTimeline();
  onScroll();

  // Images déjà en échec avant le chargement de ce script
  $$("img[data-fallback]").forEach((image) => {
    if (image.complete && image.naturalWidth === 0 && image.getAttribute("src")) utiliserSecours(image);
  });

  // Les polices peuvent changer la hauteur des blocs : on recalcule la frise
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      sizeTimeline();
      updateTimeline();
    });
  }

  // Signale au petit script du <head> que tout s'est bien lancé
  root.classList.add("js-ready");
});
