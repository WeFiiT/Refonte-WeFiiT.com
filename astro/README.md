# Site WeFiiT avec Astro

Projet Astro qui assemble les blocs de `../pages/<page>/blocs/` en pages complètes.
Les blocs ne sont **pas copiés** : Astro les lit tels quels (`?raw`), donc leur `<style>` et leur `<script>` restent intacts et un bloc reste collable dans un Embed Webflow. Modifier un bloc dans `../pages/` met à jour le site Astro.

## Lancer

Prérequis : Node.js 22.23 ou plus (installé via `winget install OpenJS.NodeJS.LTS`).

```bash
npm install      # une seule fois
npm run dev      # http://localhost:4321/equipe/
npm run build    # génère dist/ (site statique)
```

## Structure

- `src/layouts/Page.astro` : `<head>`, polices du site (même CDN que Webflow), `body` à 0 de marge, **menu (`EnTete`) et pied de page (`PiedDePage`) du site, communs à toutes les pages**.
- `src/pages/[page].astro` : page générique, assemble les blocs de la page dans l'ordre des numéros (`01-`, `02-`, ...).
- `src/pages/index.astro` : liste des pages.
- `src/pages-publiees.ts` : pages buildées. Seule `equipe` pour l'instant (Culture reste privée).
- `astro.config.mjs` : autorise Vite à lire le dossier parent (là où sont les blocs). Active aussi l'intégration React.

## Composants React (depuis le 2026-11-04)

Les 17 composants sont en React (`.tsx` + `.css` du même nom), pour pouvoir les synchroniser avec Claude Design (qui ne lit que du React). Raison et options écartées : [../docs/decisions.md](../docs/decisions.md).

- Un composant React est rendu en HTML au build : **aucun React envoyé au visiteur**. Ne pas ajouter de directive `client:*`.
- Comportement (onglets, carrousels, menu, FAQ...) : dans `<Nom>.comportement.ts`, qui exporte `selecteur` et `init(root)`. Sur le site, `src/comportements.ts` (chargé par le layout) appelle `init` sur chaque bloc ; dans Claude Design, c'est le `useEffect` du composant. Un nouveau composant interactif doit être ajouté à `src/comportements.ts`.
- Le CSS d'un composant React n'est pas isolé comme en `.astro` : chaque règle est préfixée par la classe racine du composant (`.wt-grille .wt-titre`).
- Un `.astro` peut utiliser un composant React, pas l'inverse.
- Claude Design : `src/design-system/index.ts` liste les composants envoyés ; configuration, fiches d'usage et aperçus dans `.design-sync/` (voir `.design-sync/NOTES.md`).

## Blocs convertis en composants

Un bloc converti remplace son fichier HTML dans la page : `src/contenu/<page>.ts` associe le nom du bloc (`01-hero`) à un composant de `src/components/` et à son contenu (props). Les couleurs viennent des tokens `src/styles/tokens.css` (`--wf-*`).

| Bloc | Composant | Statut |
|---|---|---|
| Équipe 01 hero | `HeroPhotoBande.tsx` | converti, rendu identique vérifié |
| Équipe 02 « WeFiiT en 2025 » | `TitreVideo.tsx` | converti, rendu identique vérifié |
| Équipe 04, 07, 09 témoignages | `Temoignage.tsx` (un seul composant, props `bande` et `carteMobileHaut` pour les variantes) | convertis, rendu identique vérifié |
| Équipe 10 photo pleine largeur | `PhotoPleineLargeur.tsx` | converti, rendu identique vérifié |
| Équipe 03 « Un cadre pour t'engager » | `CadrePrincipes.tsx` (apparition des points : `CadrePrincipes.comportement.ts`) | converti, rendu et comportement identiques vérifiés |
| Équipe 05 « Paroles de WeFiiTers » | `ParolesVideos.tsx` (grille de vidéos desktop, carrousel infini mobile, comportement dans `<Nom>.comportement.ts`) | converti, rendu et comportement identiques vérifiés |
| Équipe 08 « Construire ensemble le WeFiiT de demain » | `TribesOnglets.tsx` (5 onglets de tribes, comportement dans `<Nom>.comportement.ts` ; photos en `background-image` posé depuis la prop `photo`) | converti, rendu (5 onglets) et comportement identiques vérifiés |
| Équipe 06 « S'épanouir grâce au collectif » | `CollectifGaleries.tsx` (onglets de catégories, galeries à flèches, vignettes YouTube lues au clic ; comportement dans `<Nom>.comportement.ts` ; les catégories portent un `id` explicite car les onglets et les panneaux ne sont pas dans le même ordre) | converti, rendu (3 onglets) et comportement identiques vérifiés |

Les 10 blocs de la page Équipe sont maintenant des composants : plus aucun HTML brut. Attention : les fichiers `../pages/equipe/blocs/` (01 à 10) n'alimentent plus le site Astro, mais restent la version à coller dans Webflow. Tant que Webflow est utilisé, une modification de contenu ou de style du hero se fait aux deux endroits.

## Ajouter une page

1. Créer `../pages/<page>/blocs/01-...html`.
2. Ajouter `{ slug: '<page>', nom: '...' }` dans `src/pages-publiees.ts`.

Une page peut aussi être construite **directement en composants**, sans bloc HTML : il suffit de `src/contenu/<page>.ts` (clés `00-`, `01-`, ... pour l'ordre) et de l'entrée dans `src/pages-publiees.ts`. C'est le cas de la page RSE (POC) : `src/contenu/rse.ts`.

## Composants de la page RSE (POC)

| Bloc | Composant |
|---|---|
| Hero avec surtitre et chiffres clés | `HeroPhotoBande.tsx` (props optionnelles `surtitre` et `chiffres`, sans effet sur Équipe) |
| « Prendre soin » (onglets en pilule, carte texte + photo) | `TribesOnglets.tsx`, le composant des Tribes rendu générique par des props optionnelles : `etiquette` (vide = aucune), `titreListe`, `alt`, `aideDefilement`, ids préfixés par `id` (plusieurs instances possibles). Sans ces props, rendu Tribes inchangé. |
| Bilan carbone (bande bleue + bouton) | `BandeCta.tsx` (React) |
| « Agir et s'engager » (actions en zigzag) | `ActionsZigzag.tsx` |

Pas de version HTML à coller dans Webflow pour ces blocs.

Le menu (`EnTete.tsx`) et le pied de page (`PiedDePage.tsx`) sont dans le layout, pas dans les pages : toutes les pages les ont. Le menu marque la page courante grâce au champ `chemin` de `src/pages-publiees.ts` (adresse de la page sur wefiit.com).

## Étape suivante possible

Sur la page Équipe, rien : tous les blocs sont convertis. Pour une autre page (ex. Culture, restée privée), même méthode bloc par bloc : composant React `.tsx` (props pour les textes et photos, tokens `--wf-*`), enregistré dans `src/contenu/<page>.ts`, avec comparaison du rendu et du comportement avant de remplacer le bloc brut. Les blocs d'origine dupliquent volontairement leurs variables pour fonctionner dans un Embed Webflow.

## Pages d'expertise (Product Management, puis Data & IA, Marketing, Quality, Ops)

Les 5 pages partagent un socle commun ; Product Management est faite (`src/contenu/product-management.ts`), les autres suivront surtout par assemblage.

| Composant | Rôle |
|---|---|
| `Bouton.tsx` (React) | Pilule du site, variantes `orange`, `bleu`, `clair`. Utilisé par le hero, `BandeCta` et `GrilleCartes`. |
| `HeroPhotoBande.tsx` | + props optionnelles `ctas`, `logos` (bandeau qui défile) et `h1Surtitre` (H1 sur le surtitre, comme sur le site : choix SEO). |
| `TribesOnglets.tsx` | + prop optionnelle `lien` par onglet (« Prendre RDV pour échanger sur vos enjeux »). |
| `BandeCta.tsx` (React) | + props optionnelles `ctaSecondaire` (bouton clair) et `espaceApres` (marge basse quand le bloc suivant est sur fond blanc). |
| `GrilleCartes.tsx` (React) | Toutes les grilles de cartes : cas clients, formations, autres offres (`variante: 'offre'`), articles (`variante: 'blog'`). |
| `GrillePiliers.tsx` | Bande pâle, sous-titre avec étoiles, piliers en grille (« Chez WeFiiT on prend soin de vous »). |
| `CarrouselAvis.tsx` | Avis clients défilants avec pagination par points. |
| `FaqAccordeon.tsx` | Conversion du bloc neutre `faq-accordeon.html` de Paul, données structurées FAQPage générées depuis les props. |

### Contenus CMS (`src/cms/`)

Cas clients, formations et articles sont des collections du CMS Webflow, partagées entre plusieurs pages. Les pages les demandent par slug (`cartesCasClients([...])`, `cartesFormations`, `cartesArticles`) sans savoir d'où ils viennent.

- Aujourd'hui : `src/cms/instantane.ts`, relevé sur wefiit.com le 2026-11-03.
- Ensuite : lecture de l'API Webflow au build, clé dans `astro/.env` (`WEBFLOW_TOKEN`, jamais commitée). Seul `src/cms/index.ts` changera.
