# Catalogue des blocs, site WeFiiT

Les blocs custom du site (HTML, CSS et JS autonomes, collés dans un Embed Webflow). Avant de construire un bloc, regarde ici si un pattern existant peut être repris tel quel plutôt que réinventé. Les règles générales (couleurs, typographie, espacements, conventions de code, process) sont dans [design-system.md](design-system.md), la référence unique.

## Deux jeux de blocs

- **`blocs-neutres/`** : les blocs **réutilisables**, sans contenu (textes en lorem ipsum, photos et vidéos « à venir »), rangés par typologie. C'est le point de départ pour construire une nouvelle page. Ils se parcourent dans la librairie visuelle (`librairie/index.html`).
- **`pages/<page>/blocs/`** : les blocs **réels** d'une page, avec leur contenu, numérotés dans l'ordre de la page (`NN-nom.html`). `pages/<page>/<page>.html` est la page assemblée.

Les blocs neutres sont **fabriqués à partir des blocs de pages** (même structure et même code) : quand un bloc de page évolue, on régénère le bloc neutre correspondant. Les identifiants internes (`#wt-…`, classes `wt…-`) sont ceux des blocs de pages : si deux blocs de même type se retrouvent sur une même page, renommer l'identifiant de l'un d'eux.

## Blocs neutres

| Bloc neutre | Typologies | Utilisé dans |
|---|---|---|
| [hero-photo-bande](../blocs-neutres/hero-photo-bande.html) | En-tête de page | Équipe 01 |
| [hero-photo-citation](../blocs-neutres/hero-photo-citation.html) | En-tête de page | Culture 01 |
| [video-titre](../blocs-neutres/video-titre.html) | Vidéo | Équipe 02 |
| [videos-grille-carrousel](../blocs-neutres/videos-grille-carrousel.html) | Vidéo | Équipe 05 |
| [onglets-galeries-videos](../blocs-neutres/onglets-galeries-videos.html) | Vidéo ; Onglets et galeries | Équipe 06 (Collectif), Culture 07 (Rituels) |
| [texte-photo-principes](../blocs-neutres/texte-photo-principes.html) | Texte et photo | Équipe 03 |
| [texte-photo-piliers](../blocs-neutres/texte-photo-piliers.html) | Texte et photo | Culture 04 |
| [carte-photo-infos](../blocs-neutres/carte-photo-infos.html) | Texte et photo | Culture 08 |
| [onglets-pilule-photo](../blocs-neutres/onglets-pilule-photo.html) | Texte et photo ; Onglets et galeries | Équipe 08 (Tribes) |
| [temoignage-fond-bleu](../blocs-neutres/temoignage-fond-bleu.html) | Témoignage | Équipe 04 et 07 |
| [temoignage-fond-blanc](../blocs-neutres/temoignage-fond-blanc.html) | Témoignage | Équipe 09 |
| [photo-pleine-largeur](../blocs-neutres/photo-pleine-largeur.html) | Bandeau photo | Équipe 10 |
| [frise-chronologique](../blocs-neutres/frise-chronologique.html) | Frise chronologique | Culture 02 |
| [bande-texte](../blocs-neutres/bande-texte.html) | Bandeau texte | Culture 03 |
| [faq-accordeon](../blocs-neutres/faq-accordeon.html) | FAQ et accordéons | Culture 09 |
| [liste-grille-accordeon](../blocs-neutres/liste-grille-accordeon.html) | FAQ et accordéons | Culture 05 |

Un bloc qui relève de plusieurs typologies apparaît dans chacune dans la librairie, avec la mention « Aussi dans ». « Nos rituels » (Culture 07) et « S'épanouir grâce au collectif » (Équipe 06) ont la même structure : un seul bloc neutre pour les deux. Le bloc « Notre équipe » (Culture 06, chiffres clés) n'a pas de version neutre pour l'instant : la page Culture n'est pas finalisée.

## Blocs des pages

**Page Équipe** (`pages/equipe/blocs/`, publiée dans le repo)

| N° | Bloc | Fichier | Statut |
|---|---|---|---|
| 01 | Faire partie de l'équipe WeFiiT (titre H1 et grande photo) | [01-hero.html](../pages/equipe/blocs/01-hero.html) | Sur `/equipe-copy` |
| 02 | WeFiiT en 2025 c'était ça (titre et vidéo) | [02-wefiit-2025.html](../pages/equipe/blocs/02-wefiit-2025.html) | Sur `/equipe-copy` |
| 03 | Un cadre pour t'engager, évoluer et durer (texte, photo, principes) | [03-cadre.html](../pages/equipe/blocs/03-cadre.html) | Sur `/equipe-copy` |
| 04 | Témoignage de Yamila (prolonge le bloc 03) | [04-temoignage-yamila.html](../pages/equipe/blocs/04-temoignage-yamila.html) | Sur `/equipe-copy` |
| 05 | Paroles de WeFiiTers (vidéos et bouton) | [05-paroles.html](../pages/equipe/blocs/05-paroles.html) | Sur `/equipe-copy` |
| 06 | S'épanouir grâce au collectif (onglets et vidéos) | [06-collectif.html](../pages/equipe/blocs/06-collectif.html) | Validé |
| 07 | Témoignage d'Anne-Claire (prolonge le bloc 06) | [07-temoignage-anne-claire.html](../pages/equipe/blocs/07-temoignage-anne-claire.html) | Validé |
| 08 | Construire ensemble le WeFiiT de demain (Tribes) | [08-tribes.html](../pages/equipe/blocs/08-tribes.html) | En prod |
| 09 | Témoignage de Guillaume (après le bloc 08) | [09-temoignage-guillaume.html](../pages/equipe/blocs/09-temoignage-guillaume.html) | En prod |
| 10 | Photo pleine largeur avant le footer | [10-photo-pleine-largeur.html](../pages/equipe/blocs/10-photo-pleine-largeur.html) | Sur `/equipe-copy` |

La page assemblée se génère avec `bash outils/assembler-page.sh <page>`, la librairie visuelle avec `bash librairie/build.sh`.

## Équipe 01 · Hero (`pages/equipe/blocs/01-hero.html`)

**Ce que c'est :** titre principal de la page (H1 en dégradé bleu avec son point orange), texte d'introduction, puis une grande photo qui déborde sur une bande dégradée.

**À retenir :**
- C'est le seul bloc qui porte un **H1** : un seul H1 par page. Il suit le dégradé bleu du design system (le `color` orange n'est qu'un repli).
- La bande dégradée est positionnée **par rapport à la photo** (une fraction de sa hauteur, jusqu'à 3rem en dessous) et non par rapport à la page : elle reste juste quelle que soit la hauteur de la photo. Sur mobile, elle est alignée exactement sur la photo.
- Premier bloc de la page : `margin-top: 3rem` en desktop et `0` sous 768px.

## Équipe 02 · WeFiiT en 2025 (`pages/equipe/blocs/02-wefiit-2025.html`)

**Ce que c'est :** le plus simple des blocs du projet — un titre (H2) suivi directement d'une vidéo YouTube native, rien d'autre. Repris à l'identique du bloc réel existant sur la page équipe en **prod** (pas `/equipe-copy`), avec un seul changement demandé par Paul : tout centrer.

**Patterns à réutiliser depuis ce bloc :**
- **Titre H2 simple** : reprend le pattern habituel (`.wt-title`, Allroundgothic, dégradé bleu 270deg, centré par défaut à toutes les tailles) — sauf le point final, qui est ici une **couleur pleine `#f98f03`**, pas le dégradé bicolore orange vertical utilisé sur les autres titres du projet. Mesuré directement sur le bloc réel : ne pas supposer que tous les points de titre du site partagent le même traitement, vérifier au cas par cas.
- **Vidéo seule en pleine largeur** (`.wt-video-frame`) : `position:relative; padding-top:<ratio mesuré>%;` avec l'iframe en `position:absolute;inset:0`. Le ratio n'est pas toujours un 16:9 propre — le mesurer sur l'iframe réelle plutôt que de supposer 56.25%.
- ⚠️ **Avant de reproduire un bloc "à l'identique"** : toujours aller l'inspecter en direct sur la page réelle (classes, dégradés exacts, ratios, espacements) plutôt que de réutiliser par défaut les valeurs déjà établies pour d'autres blocs du projet, même quand ça semble être "le même genre de titre".

## Équipe 03 · Cadre (`pages/equipe/blocs/03-cadre.html`)

**Ce que c'est :** photo et texte d'introduction côte à côte, quatre principes numérotés qui apparaissent au défilement, le tout sur une bande pâle pleine largeur. Le fichier s'appelait historiquement « cadre-sans-photos » alors qu'il contient une photo. Le témoignage qui suit est un bloc à part (04-temoignage-yamila.html).

**À retenir :**
- Bande de fond pleine largeur en marge négative (`left:50%; margin-left:-50vw; width:100vw`), jamais en `clip-path` ni en `box-shadow` géant.
- Carte de témoignage avec photo qui déborde : voir la recette détaillée dans la section « Équipe 04, 07 et 09 · Témoignage ».

## Équipe 04, 07 et 09 · Témoignage (`pages/equipe/blocs/04-temoignage-yamila.html`, `07-temoignage-anne-claire.html`, `09-temoignage-guillaume.html`)

**Ce que c'est :** la carte de témoignage, séparée des blocs où elle se trouvait (Cadre, Collectif, Tribes) : un bloc par témoignage, avec sa photo, son texte et sa signature. Trois fichiers de même structure, seul le contenu change.

**À retenir :**
- **Ils prolongent le bloc qui précède.** Les témoignages de Yamila et d'Anne-Claire sont sur la même bande pâle que le bloc précédent : celui-ci n'a plus de padding bas (et un `margin: 0`), c'est le bloc témoignage qui porte le bas de la bande. Les deux doivent donc se suivre directement dans la page. Le témoignage de Guillaume est sur fond blanc : le bloc Tribes garde une marge de 3.75rem, le témoignage porte la marge de fin.
- **Marge basse du dernier élément d'une bande** : un `margin-bottom` qui dépasse en bas d'une bande sans padding bas sort de la bande et laisse un trait blanc entre les deux blocs. La bande du bloc Cadre est en `display: flow-root` pour la garder dedans.

- **Carte témoignage avec photo qui déborde** (`.wtc-testimonial`/`.wtc-testi-card`/`.wtc-testi-photo`) : le débord de la photo est réservé en `padding-top` réel sur le wrapper (pas en marge négative), pour ne jamais empiéter sur le contenu avant/après le bloc. Guillemets = vraies icônes SVG du site (`quotes-1.svg` en haut-gauche, `quotes.svg` en bas-droite), pas une imitation en CSS. Ombre portée : `box-shadow: 0 0 30px 10px rgba(4,17,112,0.1)`.
  - ⚠️ **Photo : une vraie balise `<img>` avec `object-fit: fill` (pas `background-image` + `cover`)**. C'est la technique exacte du bloc de référence (page "Acteur de ta mission", photo de Guillaume, cadre 120×165px). `cover` rogne l'image pour remplir le cadre en gardant ses proportions — sur une photo dont le cadrage ne correspond pas exactement au ratio de la boîte, ça peut couper une bonne partie du visage (vécu avec la photo d'Anne-Claire). `fill` étire légèrement l'image pour remplir le cadre exactement, sans rien couper — c'est ce que fait le site réel.
  - ⚠️ **Les photos WeFiiT de ce type ont des coins transparents** (cadrage diagonal, vérifié en pixels alpha aux 4 coins de Guillaume et d'Anne-Claire). Sur la référence, ça ne se voit pas car la photo est posée sur le blanc de la carte, sans fond ni bordure sur le cadre. Dès qu'une vraie photo remplace le placeholder "Photo à venir", recette complète validée (bloc collectif, citation d'Anne-Claire) :
    1. **Fond du cadre en `transparent`, jamais une couleur pleine** — ni `--wt-ghost` (couleur du placeholder), ni `#fff` non plus : ce qu'il y a derrière change selon l'endroit (bande de couleur au-dessus de la carte, blanc en dessous), une couleur fixe y dessine un cadre visible.
    2. **Dimensionner le cadre au ratio réel de la photo** (mesurer ses dimensions naturelles, ex. 160×180px), pas copier aveuglément le cadre d'un autre bloc — avec `object-fit:fill`, un mauvais ratio étire l'image, distorsion très visible du fait des coins transparents.
    3. **Centrer la photo sur la ligne du haut de la carte** : `top` du cadre = `-(hauteur du cadre / 2)`. Ajuster en conséquence le `padding-top` de `.wtc-testimonial` (juste assez pour la moitié haute de la photo) et celui de `.wtc-testi-card` (strictement supérieur à la moitié basse de la photo, pour ne jamais chevaucher le texte de la citation).

## Équipe 05 · Paroles (`pages/equipe/blocs/05-paroles.html`)

**Ce que c'est :** trois vidéos de collaborateurs en grille sur ordinateur, carrousel infini glissable sur mobile, et un bouton d'appel à l'action orange.

**À retenir :**
- Carrousel glissable avec les **Pointer Events** et un **seuil de 8px** avant de capturer le pointeur : ne capture jamais au `pointerdown` quand le carrousel contient des éléments cliquables (iframes, liens).
- Une vidéo qui continue après un changement de slide est réinitialisée en rechargeant son iframe.
- Le bouton est la pilule orange du design system (`wf-gradient-orange`).

## Équipe 06 · Collectif (`pages/equipe/blocs/06-collectif.html`)

**Ce que c'est :** titre + texte d'intro, 3 catégories de vidéos en onglets soulignés (We.Share & Afterwork / WeFiiT Live / We.Talk), chaque catégorie affichant une galerie de vidéos YouTube natives en défilement horizontal, puis un texte « rituels ». Le témoignage qui suit est un bloc à part (07-temoignage-anne-claire.html).

**Patterns à réutiliser depuis ce bloc :**
- **Onglets soulignés (léger)** (`.wtc-tabs`/`.wtc-tab`) : juste un trait de couleur sous l'onglet actif, pas de fond plein. **C'est le pattern par défaut à utiliser pour tout futur bloc à onglets**, sauf besoin explicite de la pilule dégradée façon Tribes.
- **Galerie en défilement horizontal avec flèches** (`.wtc-scroller-wrap`/`.wtc-scroller`/`.wtc-track`) :
  - `scroll-snap-type: x mandatory` sur le conteneur, `scroll-snap-align: start` sur chaque carte.
  - Flèches (icônes `Arrow5.svg`/`Arrow-Right.svg` du site, pastille ronde `--wt-blue-2`) positionnées légèrement à l'extérieur du cadre (`left`/`right: -0.75rem`), **masquées par défaut** (`opacity:0;visibility:hidden;pointer-events:none`) et affichées via une classe `.is-visible` calculée en JS selon la position de scroll (gauche masquée tant qu'on n'a pas défilé, droite masquée en bout de course, les deux masquées si tout tient déjà dans la largeur visible).
  - Le clic sur une flèche utilise `scroller.scrollTo({left: cible})` avec la cible **toujours bornée** entre `0` et `scrollWidth - clientWidth` — jamais un `scrollBy` non borné, qui peut révéler du vide après la dernière carte.
  - ⚠️ Si les flèches sont dans un onglet caché (`display:none`) au chargement, leur premier calcul de visibilité est faux (`scrollWidth`/`clientWidth` valent 0 tant que l'élément est caché). Il faut **recalculer `updateArrows()` à chaque activation d'onglet**, pas seulement au chargement de la page (voir le JS du bloc pour le pattern : stocker `{wrap, update}` par galerie, rappeler `update()` dans le handler de clic sur l'onglet).
- **Cartes de hauteur uniforme entre onglets** : `.wtc-card-title` avec `min-height` + `-webkit-line-clamp: 2` (troncature à 2 lignes avec "…"), et `.wtc-desc` avec un `min-height` calé sur le texte le plus long des différents onglets. Sans ça, changer d'onglet fait sauter la hauteur du bloc.
- **Vignette + bouton lecture (chargement différé)**, pas d'iframe YouTube directe : `<img src="https://i.ytimg.com/vi/<ID>/maxresdefault.jpg">` + bouton `.wtc-play`, l'iframe (`youtube-nocookie.com/embed/<ID>?autoplay=1`) n'est créée en JS qu'au clic. Nécessaire car le lecteur YouTube intégré choisit lui-même une résolution de miniature dégradée sur un petit conteneur, même quand le vrai maxres existe (voir design-system.md, section Pièges techniques, 2026-09-29) — la version "iframe native directe" a été abandonnée pour cette raison.
- **Fond pleine largeur ("bande") derrière un contenu centré** (`.wtc-band`/`.wtc-inner`) : technique `position:relative; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw; width:100vw;` sur le wrapper de fond, contenu réel dans un enfant `max-width` centré. **Ne jamais utiliser `clip-path` ou un `box-shadow` géant (`0 0 0 100vmax`) pour ça** — ces propriétés créent un référentiel de positionnement pour tout élément `position:fixed` plus bas sur la page (lightbox, image plein écran...), ce qui peut casser leur affichage ailleurs sur la page sans lien apparent.

## Équipe 08 · Tribes (`pages/equipe/blocs/08-tribes.html`)

**Ce que c'est :** sélecteur à onglets (pilule dégradée orange) entre 5 Tribes, chaque onglet affichant un texte (label + objectif + Key Initiatives) à côté d'une photo qui déborde légèrement derrière une carte blanche.

**Patterns à réutiliser depuis ce bloc :**
- **Onglets en pilule dégradée** (`.wt-tabs`, fond `linear-gradient(--wt-orange, --wt-orange-2)`, onglet actif = fond blanc) — *pattern signature de ce bloc précis*, ne pas le redupliquer ailleurs sur la même page sous peine de faire "doublon visuel" (vécu avec le bloc collectif, voir plus bas). Réservé à un vrai sélecteur de catégories mis en avant.
- **Carte + photo qui déborde** : photo positionnée derrière une carte blanche via un décalage de fond (`::before` avec `background` translaté), photo elle-même en `position:relative` par-dessus.
- **Placeholder photo à venir** : boîte avec fond `--wt-ghost`, emoji 📷 + texte, et un commentaire CSS en clair indiquant où coller l'URL de la vraie image une fois disponible (`background-image: url('')`).

## Équipe 10 · Photo pleine largeur (`pages/equipe/blocs/10-photo-pleine-largeur.html`)

**Ce que c'est :** une seule photo en bande pleine largeur, juste avant le footer. Reconstruite pour corriger un vrai bug du bloc natif du site.

**Patterns à réutiliser depuis ce bloc :**
- **Image responsive en pleine largeur, robuste** : bande pleine largeur via la technique de marge négative (`left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;width:100vw` — jamais `clip-path` ni `box-shadow` géant, voir design-system.md), `aspect-ratio` réglé sur le ratio réel de la photo pour réserver la hauteur avant chargement (évite le saut de mise en page d'un `<img>` sans `width`/`height`), et surtout `sizes="100vw"` sur le `srcset` dès que l'image est affichée pleine largeur à toutes les tailles — un `sizes` sous-évalué fait choisir une source basse résolution ensuite étirée, ce qui se lit comme "l'image ne prend pas toute la largeur" ou "n'est pas nette".

## Voir aussi

- [design-system.md](design-system.md) : **référence unique** (couleurs, typographie, espacements, formes, boutons, conventions des embeds, pièges, process, écarts résolus). Les tokens `--wf-*` et la feuille de style source qu'il cite sont dans le skill `wefiit-design`, pas dans ce repo.
- [README du repo](../README.md) et [prise en main](prise-en-main.md) : par où commencer.
