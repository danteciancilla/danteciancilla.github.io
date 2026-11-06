/* =====================================================================
   textes.js — Textes de l'interface du site
   ---------------------------------------------------------------------

   Fonctionnement :
   - Chaque texte possède une « clé », par exemple "nav.home".
   - Dans les pages HTML, l'élément <a data-texte="nav.home"> reçoit
     automatiquement le texte de cette clé.
   - Pour modifier un texte : le changer ICI.
   - Les textes des réalisations (projets) ne sont pas ici :
     ils sont dans realisations.js.

   ⚠ Textes personnels (règle du CNED : ils doivent être écrits par moi) :
   - Les lignes marquées « EXEMPLE IA » sont des exemples provisoires,
     rédigés à partir de mes informations. Je dois les réécrire avec mes
     propres mots avant l'évaluation (Ctrl+F « EXEMPLE IA » pour les trouver).
   - "profile.text" en français reprend ma présentation LinkedIn,
     que j'ai écrite moi-même.
   - Les textes qui commencent par "[À RÉDIGER" ou "[À VÉRIFIER" sont des
     emplacements à remplir : ils ne s'affichent pas sur le site (bloc
     masqué). La console du navigateur (F12, onglet « Console ») liste
     ceux de la page ouverte.
   - Dans ces textes, on peut mettre un mot en gras avec <strong>mot</strong>
     et faire plusieurs paragraphes avec <p>…</p>.
   ===================================================================== */
const TEXTES = {
  // --- Onglet du navigateur et moteurs de recherche ---
  "meta.title": "Dante Ciancilla – Portfolio | BTS SIO SLAM",
  "meta.description": "Portfolio de Dante Ciancilla, étudiant en BTS SIO option SLAM au CNED : projets, parcours, compétences et contact.",

  // --- Accessibilité et en-tête ---
  "skip": "Aller au contenu",
  "logo.label": "Dante Ciancilla – retour à l'accueil",
  "nav.label": "Navigation principale",
  "nav.home": "Accueil",
  "nav.profile": "Profil",
  "nav.projects": "Réalisations",
  "nav.journey": "Parcours",
  "nav.skills": "Compétences",
  "nav.contact": "Contact",
  "nav.menuOpen": "Ouvrir le menu",
  "nav.menuClose": "Fermer le menu",
  "theme.toDark": "Activer le mode sombre",
  "theme.toLight": "Activer le mode clair",

  // --- 1. Accueil ---
  "hero.eyebrow": "Portfolio",
  "hero.role": "Étudiant en informatique, développement d'applications",
  "hero.sub": "1re année BTS SIO option SLAM · CNED",
  // Texte écrit par Dante
  "hero.tagline": "Passionné par le développement, j'apprends à créer des applications, des sites web et des jeux.",
  "hero.ctaProjects": "Voir mes projets",
  "hero.ctaCv": "Télécharger mon CV",
  "hero.ctaContact": "Me contacter",
  "hero.photoAlt": "Photo de Dante Ciancilla",
  "hero.cardRole": "BTS SIO SLAM · CNED",
  "hero.location": "Sète (34)",
  "hero.linkedinLabel": "LinkedIn (nouvel onglet)",
  "hero.githubLabel": "GitHub (nouvel onglet)",
  "hero.emailLabel": "Envoyer un e-mail",
  "hero.phoneLabel": "Appeler le 07 82 70 72 39",

  // --- Chiffres clés ---
  "stats.label": "Chiffres clés",
  "stats.visits": "visites sur mon jeu Roblox",
  "stats.players": "joueurs simultanés",
  "stats.online": "projets en ligne",
  "stats.english": "Anglais",

  // --- 2. Profil ---
  "profile.eyebrow": "À propos",
  "profile.title": "Profil",
  // Ma présentation LinkedIn (écrite par moi), mise en forme avec du gras
  "profile.text": "<p>Étudiant en 1re année de <strong>BTS SIO option SLAM</strong> au CNED, je recherche un <strong>stage de 4 à 5 semaines</strong> en développement entre mai et août 2027, à Sète ou à Montpellier.</p><p>Venu au code par le jeu vidéo, j'ai co-créé un <strong>jeu Roblox</strong> qui approche les 2 000 visites, et réalisé le <strong>site professionnel d'une coiffeuse à domicile</strong>.</p><p>Scolarisé à distance depuis la 4e, je suis <strong>autonome</strong>, à l'aise en anglais (C1) et j'apprécie les retours francs.</p>",
  "training.title": "Formation actuelle",
  "training.name": "BTS SIO – Option SLAM",
  "training.school": "CNED · formation à distance",
  "training.more": "En savoir plus sur le BTS",
  "intern.title": "Recherche de stage",
  "intern.duration": "Durée",
  "intern.durationValue": "4 à 5 semaines",
  "intern.period": "Période",
  "intern.periodValue": "Entre mai et août 2027",
  "intern.field": "Domaine",
  "intern.fieldValue": "Développement d'applications (option SLAM)",
  "intern.place": "Lieu",
  "intern.placeValue": "Sète ou Montpellier",

  // --- Fenêtre « En savoir plus sur le BTS » ---
  "bts.title": "BTS SIO – Option SLAM",
  "bts.sio": "Services Informatiques aux Organisations",
  "bts.slamLabel": "Option SLAM",
  "bts.slam": "Solutions Logicielles et Applications Métiers",
  "bts.otherLabel": "Autre option",
  "bts.other": "SISR – Solutions d'Infrastructure, Systèmes et Réseaux",
  "bts.durationLabel": "Durée",
  "bts.duration": "2 ans (2026 – 2028)",
  "bts.schoolLabel": "Établissement",
  "bts.school": "CNED – formation à distance",
  "bts.close": "Fermer",

  // --- 3. Réalisations ---
  "projects.eyebrow": "Projets",
  "projects.title": "Réalisations professionnelles",
  "projects.countOne": "1 réalisation affichée",
  "projects.countMany": "{n} réalisations affichées",
  "filter.label": "Filtrer les réalisations",
  "filter.all": "Tous",
  "filter.perso": "Personnels",
  "filter.bloc1": "Scolaires – Bloc 1",
  "filter.bloc2": "Scolaires – Bloc 2",
  "filter.atelier": "Ateliers et stage",
  // Titres des catégories
  "group.perso.title": "Projets personnels",
  "group.perso.sub": "Projets réalisés en dehors de la formation",
  "group.atelier.title": "Ateliers de professionnalisation et stage",
  "group.atelier.sub": "Projets professionnels du BTS SIO",
  "group.bloc1.title": "Projets scolaires – Bloc 1",
  "group.bloc1.sub": "Support et mise à disposition de services informatiques",
  "group.bloc2.title": "Projets scolaires – Bloc 2 (option SLAM)",
  "group.bloc2.sub": "Conception et développement d'applications",
  // Statuts
  "status.done": "Réalisé",
  "status.progress": "En cours",
  "status.upcoming": "À venir",
  "status.obtained": "Obtenu",
  // Liens
  "link.detail": "Voir le détail",
  "link.site": "Voir le site",
  "link.play": "Voir le jeu sur Roblox",
  "link.github": "Projet sur GitHub",
  "link.video": "Vidéo de démonstration",
  "link.download": "Télécharger",
  "link.missing": "lien à venir",
  "link.newTab": "(nouvel onglet)",
  "link.linkedin": "Voir mon profil LinkedIn",
  "link.detailSoon": "Détail disponible une fois la réalisation terminée",

  // Vignettes des projets « À venir »
  "planned.program": "Au programme :",
  "comp.label": "Compétences du bloc 1 couvertes",


  // --- Page de détail d'une réalisation ---
  "detail.back": "Retour aux réalisations",
  "detail.notFound": "Réalisation introuvable",
  "detail.technologies": "Technologies",
  "detail.frame": "Cadre de réalisation",
  "detail.description": "Description détaillée",
  "detail.steps": "Déroulement du projet",
  "detail.video": "Documentation utilisateur (vidéo)",
  "detail.videoPlaceholder": "Vidéo à venir",
  "detail.gallery": "Captures d'écran",
  "detail.galleryPlaceholder": "Capture à venir",
  "detail.enlarge": "Agrandir la capture",
  "detail.links": "Liens",
  "detail.noLinks": "Aucun lien pour l'instant.",
  "detail.skills": "Compétences du bloc 1 couvertes",
  "detail.noSkills": "Aucune compétence du bloc 1 renseignée pour l'instant.",

  // --- 4. Parcours ---
  "journey.eyebrow": "Formation",
  "journey.title": "Parcours",
  "journey.sub": "Du plus récent au plus ancien",
  "journey.intern.date": "Entre mai et août 2027",
  "journey.intern.title": "Stage de 1re année",
  "journey.intern.sub": "4 à 5 semaines · Développement d'applications",
  "journey.bts.date": "Depuis oct. 2026 (2026 – 2028)",
  "journey.bts.title": "BTS SIO option SLAM",
  "journey.bts.full": "Brevet de Technicien Supérieur Services Informatiques aux Organisations, option Solutions Logicielles et Applications Métiers",
  "journey.bts.place": "CNED – formation à distance",
  "journey.bts.text": "[À RÉDIGER PAR DANTE – FR] Présentation du BTS SIO et de l'option SLAM (ce que l'on y apprend, les métiers visés)",
  "journey.bac.date": "2026",
  "journey.bac.title": "Baccalauréat général",
  "journey.bac.full": "Spécialités Mathématiques et Physique-Chimie",
  "journey.bac.place": "CNED – formation à distance",
  "journey.bac.mention": "[À VÉRIFIER PAR DANTE] Mention éventuelle (à indiquer, ou à supprimer s'il n'y en a pas)",

  // --- 5. Compétences ---
  "skills.eyebrow": "1re année",
  "skills.title": "Compétences",
  "skills.legend": "Niveaux :",
  "skills.cv": "Télécharger mon CV",
  "level.used": "Utilisé en projet",
  "level.learning": "En cours d'acquisition",
  "cat.languages": "Langages",
  "cat.web": "Web",
  "cat.db": "Bases de données",
  "cat.tools": "Outils",
  "cat.systems": "Systèmes et réseaux",
  "cat.soft": "Savoir-être",
  "cat.langs": "Langues",
  "skill.pc": "Montage d'un PC",
  "skill.windows": "Installation de Windows",
  "skill.autonomy": "Autonomie",
  "skill.team": "Travail en équipe",
  "skill.feedback": "Écoute des retours",
  "skill.english": "Anglais",
  "skill.italian": "Italien",

  // --- Bloc CV ---
  "cv.title": "Mon CV",
  "cv.zoom": "Agrandir",
  "cv.zoomLabel": "Agrandir l'aperçu du CV",
  "cv.dialogTitle": "CV de Dante Ciancilla",
  "cv.download": "Télécharger (PDF)",
  "cv.alt": "CV de Dante Ciancilla",

  // --- 6. Contact ---
  "contact.eyebrow": "Échangeons",
  "contact.title": "Contact",
  // EXEMPLE IA – à réécrire
  "contact.text": "Une question, une proposition de <strong>stage</strong> ou un projet ? N'hésitez pas à m'écrire, je vous répondrai avec plaisir.",
  "contact.emailLabel": "E-mail",
  "contact.copy": "Copier",
  "contact.copied": "Copié !",
  "contact.copiedMsg": "Adresse e-mail copiée",
  "contact.copyError": "Copie impossible : sélectionnez l'adresse à la main",
  "contact.phoneLabel": "Téléphone",
  "contact.phone": "07 82 70 72 39",
  "contact.locationLabel": "Localisation",
  "contact.location": "Sète (34200)",

  // --- Formulaire de contact ---
  "form.title": "Envoyer un message",
  "form.name": "Nom",
  "form.email": "E-mail",
  "form.subject": "Objet",
  "form.message": "Message",
  "form.send": "Envoyer",
  "form.sending": "Envoi en cours…",
  "form.privacy": "Vos données servent uniquement à vous répondre.",
  "form.privacyLink": "En savoir plus",
  "form.errName": "Indiquez votre nom (2 caractères minimum).",
  "form.errEmail": "Indiquez une adresse e-mail valide (exemple : nom@domaine.fr).",
  "form.errSubject": "Indiquez l'objet de votre message.",
  "form.errMessage": "Écrivez votre message (10 caractères minimum).",
  "form.success": "Merci, votre message a bien été envoyé.",
  "form.error": "L'envoi a échoué. Réessayez plus tard ou écrivez directement à danteciancilla@gmail.com.",
  "form.notConfigured": "Le formulaire n'est pas encore activé. Écrivez directement à danteciancilla@gmail.com.",

  // --- Pied de page ---
  "footer.text": "Portfolio BTS SIO SLAM",
  "footer.top": "Retour en haut",
  "footer.legal": "Mentions légales et confidentialité",

  // --- Page « Mentions légales et confidentialité » ---
  "legal.metaTitle": "Mentions légales et confidentialité | Dante Ciancilla",
  "legal.title": "Mentions légales et confidentialité",
  "legal.back": "Retour à l'accueil"
};
