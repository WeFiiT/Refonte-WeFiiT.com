# Design system WeFiiT (wefiit.com) : référence unifiée

> Ce document remplace les deux versions précédentes (le `design-system.md` de Claude Code et le design system tiré du CSS). Il en fusionne le contenu. Chaque valeur provient de la feuille Webflow `wefiit.webflow.shared.f9b049384.min.css` (copie dans `_source/webflow.css.txt`) ou d'une mesure faite sur la page en ligne. Quand les deux versions se contredisaient, c'est le CSS source qui a tranché. La section **Écarts résolus** en fin de document donne le détail de chaque arbitrage.
> Les tokens correspondants se trouvent dans `tokens/*.css` (préfixe `--wf-`). Les noms d'origine du site sont indiqués en commentaire.

## 1. Couleurs

| Token DS | Variable du site | Valeur | Usage |
|---|---|---|---|
| `--wf-blue-900` | `--midnight-blue` | `#001d84` | Couleur principale : `<p>`, titres, icônes, nav. Ombre de survol des cartes cas clients et blog |
| `--wf-blue-800` | `--dark_blue_wefiit` | `#002882` | Texte `body` (14px), fond du footer, départ du dégradé des titres. Ombre de survol des cartes WeFiiTer et formation |
| `--wf-blue-600` | `--slate-blue` / `--slate-blue-2` | `#2a4cff` | Liens, eyebrows (`.h3-heading`), H3, fin des dégradés, signature des témoignages |
| `--wf-blue-500` | (aucune) | `#4a3aff` | Titres d'activités dans les cartes d'offre (≥1280px) |
| `--wf-blue-300` | `--cornflower-blue` | `#858fd6` | Labels secondaires (« Key Initiatives ») |
| `--wf-blue-75` | (aucune) | `#edf0ff` | Fond du bouton secondaire `line`, texte du bouton `secondary` |
| `--wf-blue-50` | `--ghost-white` | `#f2f4ff` | Bandes de fond claires, tags, select |
| `--wf-orange-500` | `--light_orange_wefiit` / `--f98f03` | `#f98f03` | CTA, liens texte, point final, tab bar |
| `--wf-orange-600` | `--e95400` | `#e95400` | Idem (dégradés) |
| `--wf-grey-100` | `--elements-webflow-library--neutral--300` | `#eff0f6` | Bordures fines des cartes blanches |
| `--wf-ink` | `--systemflow-lite--neutral--100` | `#0e0f11` | Dernier élément du fil d'Ariane |

Les autres neutres du footer, des labels et du FAQ (`#dadde7`, `#b6bcce`, `#a0a3bd`, `#636b75`, `#e6e6e6`) sont dans `tokens/colors.css`.

**Dégradés**
- Titres H1/H2 et chiffres clés : `linear-gradient(270deg, #002882, #2a4cff)`, appliqué au texte avec `background-clip:text` **et** `-webkit-text-fill-color:transparent` (`color:transparent` seul ne suffit pas).
- **Point final des titres** : toujours dans un `<span>` à part, avec un dégradé orange **vertical** `linear-gradient(180deg, #e95400, #f98f03)` (`.orangegradient`, `-3`, `-4`). La page `/equipe` utilise `.orangegradient-2`, un aplat `#f98f03`. Les deux rendus sont quasi identiques et l'un ou l'autre convient. Ne jamais appliquer l'orange au titre entier.
- CTA principal : `linear-gradient(270deg, #e95400, #f98f03)`.
- CTA secondaire bleu : `linear-gradient(290deg, #001d84, #2a4cff)`. Le CTA du header utilise le même dégradé à 270deg.
- Bandes CTA et bloc sous le hero : `linear-gradient(110deg, #001d84, #2a4cff)`, ou `270deg, #002882 → #2a4cff` sous la photo du hero.
- Tab bar : `linear-gradient(90deg, #f98f03, #e95400)`.
- Survol des liens de nav : texte en `linear-gradient(290deg, #e95400, #f98f03)`.

## 2. Typographie

**Familles**
- Display : `Allroundgothic` (Demi), avec `Arial, sans-serif` en repli. **Toujours en poids 400.**
- Corps et UI : `"Work Sans v2"` (variable), avec `sans-serif` en repli.
- Icônes utilitaires : `Material Icons Outlined`.

**Titres (Allroundgothic)**

| Rôle | Classe | Desktop | ≤767 | ≤479 |
|---|---|---|---|---|
| Hero de la home | `.h1-heading-2` | 4.375rem / 100% / -0.02em | (aucune règle) | (aucune règle) |
| H1 de page | `.h1-heading` | 4rem / 100% / -0.02em (64px, -1.28px) | 2.5rem | 2.8125rem, centré |
| H2 de section, centré | `.h2-heading` | 3.2rem / 1.2 / -0.04em (51.2px, lh 61.44px) | 3rem / 1 | 2.5rem / 1em, aligné à gauche |
| H2 de section, à gauche | `.h2-heading.left` | **3rem** / 1.2 / -0.04em (48px) | 3rem | 2.6rem |
| H1 d'article | `.large-header` | 2.8125rem / 1.2 | (aucune règle) | (aucune règle) |
| Bande CTA | `.push-b2b` | 2.5rem / 44px, `#f2f4ff` | (aucune règle) | (aucune règle) |
| Chiffre clé | `.grandchiffres` | 4rem / 1em, dégradé | (aucune règle) | (aucune règle) |

H1 et H2 portent tous deux le dégradé bleu. Le `color:#e95400` déclaré sur `.h1-heading` n'est qu'une valeur de repli : il est masqué par `-webkit-text-fill-color:transparent`. **Le H1 s'affiche en bleu dégradé et non en orange.**

**Corps (Work Sans)**

| Rôle | Valeur |
|---|---|
| `body` (texte de base hors `<p>`) | .875rem / 1.25rem (14/20), 400, `#002882` |
| `<p>` (règle globale du site) | 1rem / 1.5rem (16/24), 400, `#001d84`, **`text-align:left` forcé**, marges 1rem. Passe à .9rem sous 479px |
| Intro sous le H1 (`.paragraph-h1`) | 1.15rem / 1.2em (18.4/22.08), -0.02em, `#002882` |
| Accroche du hero de la home | 1.125rem / 1.3em, 500 |
| Description de section | 1rem / 1.5, 500, centrée |
| Paragraphe long (`.a-paragraph-regular`) | 1rem / 1.7em |
| Eyebrow (`.h3-heading`) | 1rem / 1.2, 600, uppercase, +0.03em, `#2a4cff`, précédé d'un trait `1.5rem × 1px` |
| Eyebrow au-dessus du H1 (`.h1lp`) | 14px, `#a0a3bd` |
| Bouton | 1rem / 1.25rem, 600, uppercase (`sm` : .9rem) |
| Lien texte (`.link__texte`) | .8rem, 700, uppercase, dégradé orange à 90deg |
| Titre de carte CMS | 1.2rem / 1.3rem, 600 |
| Titre de carte vidéo | .875rem, 600, lh 1.35, sur fond blanc, limité à 2 lignes (voir §8) |
| Témoignage | 1rem, 500, lh 1.7, **centré**. Nom en `<strong>` 600 suivi du rôle en poids normal, en `#2a4cff`, centré |
| Tag | 12px, 500, padding 5px 20px |
| `<em>` | italique simple, même couleur que le texte |

## 3. Breakpoints

- Paliers descendants (Webflow) : tablette `≤991px`, mobile paysage `≤767px`, mobile portrait `≤479px`. Desktop = `≥992px`.
- Paliers montants utilisés par le site : `≥768px`, `≥1280px` (CTA du header, cartes d'offre), `≥1440px` (gouttières 4vw, gap de grille 64px), `≥1920px`.

## 4. Layout et espacements

**Pages natives Webflow**
- Conteneur de section (`.main-section`) : width 90%, max-width 71.25rem (1140px), padding `2.5vh 5vw` (4vw à partir de 1440px), marges `4.5vh` en haut et `5.5vh` en bas.
- Footer : max-width 70rem. Article : 50rem.
- Grille de cartes : 3 colonnes, gap 40px, et 64px à partir de 1440px.
- Navbar sticky blanche, padding `10px 2vw`. Rail social fixe sur le bord droit.

**Blocs custom (Embed Webflow)** : ces règles sont propres aux embeds, car leurs wrappers **ne fusionnent pas les marges** entre eux.
- **`margin-bottom` uniquement, jamais de `margin-top`.** Avec les deux, l'écart réel est doublé (12rem mesurés au lieu de 6rem).
- Bloc sur fond blanc : `margin: 0 0 5rem` (ou `0 auto 5rem` si le bloc est lui-même le conteneur centré).
- Bloc avec bande de fond pleine largeur : `margin: 0 0 3rem`. Padding vertical de la bande : 3rem par défaut, 4 à 5rem en bas selon le bloc.
- Premier bloc sous la navbar : `margin-top: 3rem` en desktop, **`0` sous 767px**.
- Bloc collé à ses voisins (photo pleine largeur avant le footer) : `margin: 0`.
- À l'intérieur d'un bloc : 3rem entre sous-sections, 1.25rem entre cartes, gouttière de 1rem dans un conteneur `max-width: 71.25rem` centré. Laisser au moins 2.5rem entre une grille et le texte qui la suit.
- Les marges adjacentes **à l'intérieur** d'un même bloc fusionnent (on garde la plus grande, elles ne s'additionnent pas). Utiliser du `padding` quand l'espace doit être garanti.

## 5. Formes et élévation

- **Rayons** : 0 pour les cartes de contenu et les images (aucun arrondi ajouté là où le site n'en a pas) ; 12px pour les dropdowns, la modale et l'image du header ; 24px pour les cartes citation, les cartes d'offre et le select ; 1.8rem pour les onglets ; pilule (`31.25rem`) pour les boutons et les tags ; 50% pour les avatars.
- **Cartes à ombre décalée** (`.article__item`, `.card__item` + `.shadow-type-1`) :
  - Au repos : ombre `1px 0 3px rgba(0,0,0,.08)`, sans bordure.
  - Au survol : ombre plate `-18px 18px 0 0`, avec `transition: .3s`. Couleur `#001d84` pour les cas clients et le blog (`--shadow-card-hover`), `#002882` pour « Pourquoi devenir WeFiiTer » et les formations (`--shadow-card-hover-alt`). Choisir la couleur qui contraste le mieux avec le fond.
  - Dans un conteneur en `overflow:hidden`, ajouter un padding de 18px en bas et à gauche pour ne pas couper l'ombre.
  - Sous 479px, l'ombre de survol est désactivée.
- Cartes citation et cartes d'offre : bordure `1px #eff0f6`, rayon 24px, ombre `0 2px 10px #14142b0f`.
- Image du hero : ombre `0 0 1.875rem #0000001a`.

## 6. Boutons

Il existe une seule forme de bouton, la pilule `.maincta` : uppercase, Work Sans 600 1rem, padding `1.0625rem 2.5rem`.
- **Primaire** : dégradé orange `270deg #e95400 → #f98f03`, texte blanc. C'est le CTA principal (« Prendre RDV maintenant »).
- **Secondaire** (`.blue.secondary`) : dégradé `290deg #001d84 → #2a4cff`, texte `#edf0ff`.
- **Secondaire line** : fond `#edf0ff`, texte `#001d84`, sans dégradé (« Être recontacté »).
- **Header** : dégradé `270deg #001d84 → #2a4cff`, padding `.9rem 1.7rem`, .9rem.
- Sous 767px, les boutons passent en pleine largeur et en texte centré.
- La pilule d'onglets en dégradé orange (`.tabs-menu-2`) sert à la **segmentation** : choix d'une offre ou d'une Tribe. Ce n'est pas un motif à réutiliser par défaut pour tout bloc à catégories (voir §9).

## 7. Contenu et ton

- Le site est en français. Les clients sont vouvoyés, les candidats tutoyés, l'entreprise parle à la 1re personne du pluriel. La marque s'écrit toujours **WeFiiT**, et ses membres sont des **WeFiiTers**.
- Les titres sont des phrases courtes terminées par le point orange. Garder l'espace avant « ? ».
- Les CTA sont à l'impératif et en majuscules.
- Les emojis sont réservés aux H2 des cas clients (🌊 🚀 💹).
- **Reprendre le texte du site à l'identique** : ponctuation, apostrophes typographiques (’), balises d'emphase. Pas de paraphrase.
- **Ne pas inventer de contenu manquant.** Mettre un placeholder explicite (📷 « Photo à venir ») et un commentaire en français indiquant où coller la vraie valeur.

## 8. Conventions de développement des blocs custom

1. Une `<section>` racine avec un id unique (`#wt-…`) et `aria-labelledby` pointant vers l'id du `<h2>`. Tout le CSS est scopé sous cet id.
2. Un `<style>` inline avec des variables locales qui **dupliquent les valeurs brutes** (les variables globales ne sont pas fiables dans un embed). Ces variables doivent reprendre les valeurs de ce document.
3. `box-sizing` remis à zéro uniquement dans le sous-arbre du bloc.
4. Garde d'initialisation `data-wt-init="1"` **posée par le script**, jamais écrite en dur dans le HTML livré.
5. Responsive : utiliser les breakpoints 991, 767 et 479. Restructurer la mise en page plutôt que masquer des éléments.
6. Onglets : `role="tablist"`, `role="tab"` + `aria-selected` + `aria-controls`, `role="tabpanel"` + `aria-labelledby`, avec de vrais `id`. Utiliser `.wt-sr-only` pour le texte réservé aux lecteurs d'écran.
7. Le texte reste toujours du vrai texte, même avec un dégradé. Images décoratives en `alt=""`. Les iframes ont un `title` et `loading="lazy"`.
8. Commenter l'intention quand une valeur reproduit volontairement le site. Laisser des points d'édition en clair, en français, pour Paul.
9. `text-align` directement sur chaque `<p>` : la règle globale `p{text-align:left}` du site l'emporte sur l'héritage.
10. Titres de carte limités à N lignes : `height` fixe (pas `min-height`) avec `-webkit-line-clamp`. Au-delà d'environ 60 caractères, raccourcir le texte.

### Pièges déjà rencontrés
- `clip-path` ou `box-shadow: 0 0 0 100vmax` pour un fond pleine largeur : ils cassent les éléments `position:fixed`. Utiliser `left:50%; margin-left:-50vw; width:100vw` sur un wrapper.
- `scrollBy()` sans limite : calculer une cible bornée et utiliser `scrollTo()`.
- Dimensions d'un élément en `display:none` : elles valent 0. Recalculer à chaque activation d'onglet.
- Glisser : utiliser les **Pointer Events**, avec un seuil de 8px avant de capturer. Pas de `setPointerCapture` au `pointerdown` s'il y a des éléments cliquables. Ne jamais laisser `isAnimating` bloqué sans `transitionend`.
- Media query qui n'a « aucun effet » : vérifier qu'une règle de base déclarée plus bas ne l'écrase pas (inspecter `document.styleSheets`).
- Placeholder photo : retirer le `<div>` quand la vraie photo est ajoutée, plutôt que de le masquer en CSS.
- `sizes` d'une image responsive : il doit refléter la largeur réellement affichée (`100vw` en pleine largeur).
- Vidéo qui continue après un changement de slide ou d'onglet : réinitialiser l'iframe (`about:blank` puis la source d'origine).
- YouTube floue dans une petite carte : afficher une vignette `maxresdefault.jpg` avec un bouton play, et ne créer l'iframe qu'au clic.
- Photos de témoignage à coins transparents : cadre en `background:transparent` aux proportions réelles de l'image, centré sur le bord haut de la carte (`top: -hauteur/2`).

## 9. Process avec Paul

- Ne prendre aucune liberté visuelle non demandée. Mesurer une valeur sur le site plutôt que l'inventer.
- Quand on modernise un bloc, ne changer que ce qui est demandé et garder le « genre » du bloc. Un changement de structure se confirme d'abord.
- Ne pas appliquer un motif d'un bloc aux autres par réflexe (les onglets en pilule orange appartiennent au bloc Tribes).
- Vérifier avant d'annoncer un correctif, et dire explicitement ce qui n'a pas pu être vérifié.
- Ne pas créer de fichier d'aperçu `blocks/apercu-*.html`.

## 10. Pages de référence
Home, `/equipe`, `/acteur-de-ta-mission`, les 5 pages d'expertise, `/cas-clients`, `/formation-product-management`, `/we-talk`, `/blog`, un article de blog, un cas client, `/notre-engagement-rse`, `/videos`, `/product-management-ressources`. Staging : https://wefiit.webflow.io/equipe-copy

---

## Écarts résolus entre les deux versions

| Sujet | Doc Claude Code | Design system issu du CSS | Version retenue (source) |
|---|---|---|---|
| Fond du CTA principal | `#3898EC` (bleu) | Dégradé orange | **Dégradé orange.** `#3898EC` est le style par défaut de `.w-button` dans Webflow, que `.maincta` remplace. Il ne réapparaît qu'en fond masqué sous un dégradé (`.b2bline` à 1920px) |
| Couleur du H1 | Orange `#e95400` | Dégradé bleu | **Dégradé bleu.** `#e95400` est déclaré en `color`, mais `-webkit-text-fill-color:transparent` + dégradé bleu le masquent. `getComputedStyle().color` renvoie bien l'orange, ce qui explique la confusion |
| Taille du H2 | 3.2rem, et 3rem mesuré sur `/equipe` | 3.2rem | **Les deux sont justes.** 3.2rem pour `.h2-heading` (centré), 3rem pour `.h2-heading.left` (utilisé sur `/equipe`) |
| H2 mobile | 2.25rem / 2.6rem | (non documenté) | **CSS : 3rem/1 sous 767px, 2.5rem/1em sous 479px.** 2.25rem n'existe pas sur le site, c'était une convention de bloc |
| Point final | Vertical `#e95400 → #f98f03` | Aplat `#f98f03` | **Vertical `#e95400 → #f98f03`** par défaut. L'aplat (`.orangegradient-2`, `/equipe`) reste admis |
| Ombre de survol | `#001d84` ou `#002882` | `#001d84` seul | **Les deux couleurs**, selon la section (token `-alt` ajouté) |
| Texte de base | 14/20 `#002882` | `<p>` 16/24 `#001d84` | **Les deux** : `body` = 14/20, `<p>` = 16/24 avec `text-align:left` forcé |
| Témoignage | Centré, nom en `<strong>` + rôle | Aligné à gauche | **Centré** (composant `QuoteCard` corrigé, prop `role` ajoutée) |
| Eyebrow | Avec trait de 1.5rem | Sans trait | **Avec trait** (composant `Eyebrow` ajouté) |
| Breakpoints | 991 / 767 / 479 | (non documentés) | **Les deux sens** : 991 / 767 / 479 et 768 / 1280 / 1440 / 1920 |
| Espacements | Conventions des embeds (5rem, 3rem…) | Sections natives (vh) | **Les deux, séparés** : pages natives et blocs custom (§4) |
| Container global | padding 10px 38.4px, pas de max-width | 71.25rem / 90% | **10px 2vw = navbar, 71.25rem = sections.** Le padding mesuré était celui de la navbar |
