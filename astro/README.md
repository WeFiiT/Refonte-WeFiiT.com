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
- `astro.config.mjs` : autorise Vite à lire le dossier parent (là où sont les blocs).

## Blocs convertis en composants

Un bloc converti remplace son fichier HTML dans la page : `src/contenu/<page>.ts` associe le nom du bloc (`01-hero`) à un composant de `src/components/` et à son contenu (props). Les couleurs viennent des tokens `src/styles/tokens.css` (`--wf-*`).

| Bloc | Composant | Statut |
|---|---|---|
| Équipe 01 hero | `HeroPhotoBande.astro` | converti, rendu identique vérifié |
| Équipe 02 « WeFiiT en 2025 » | `TitreVideo.astro` | converti, rendu identique vérifié |
| Équipe 04, 07, 09 témoignages | `Temoignage.astro` (un seul composant, props `bande` et `carteMobileHaut` pour les variantes) | convertis, rendu identique vérifié |
| Équipe 10 photo pleine largeur | `PhotoPleineLargeur.astro` | converti, rendu identique vérifié |
| Équipe 03 « Un cadre pour t'engager » | `CadrePrincipes.astro` (script d'apparition des points embarqué dans le composant) | converti, rendu et comportement identiques vérifiés |
| Équipe 05 « Paroles de WeFiiTers » | `ParolesVideos.astro` (grille de vidéos desktop, carrousel infini mobile, script embarqué) | converti, rendu et comportement identiques vérifiés |
| Équipe 08 « Construire ensemble le WeFiiT de demain » | `TribesOnglets.astro` (5 onglets de tribes, script embarqué ; photos en `background-image` posé depuis la prop `photo`) | converti, rendu (5 onglets) et comportement identiques vérifiés |
| Équipe 06 « S'épanouir grâce au collectif » | `CollectifGaleries.astro` (onglets de catégories, galeries à flèches, vignettes YouTube lues au clic ; script embarqué ; les catégories portent un `id` explicite car les onglets et les panneaux ne sont pas dans le même ordre) | converti, rendu (3 onglets) et comportement identiques vérifiés |

Les 10 blocs de la page Équipe sont maintenant des composants : plus aucun HTML brut. Attention : les fichiers `../pages/equipe/blocs/` (01 à 10) n'alimentent plus le site Astro, mais restent la version à coller dans Webflow. Tant que Webflow est utilisé, une modification de contenu ou de style du hero se fait aux deux endroits.

## Ajouter une page

1. Créer `../pages/<page>/blocs/01-...html`.
2. Ajouter `{ slug: '<page>', nom: '...' }` dans `src/pages-publiees.ts`.

Une page peut aussi être construite **directement en composants**, sans bloc HTML : il suffit de `src/contenu/<page>.ts` (clés `00-`, `01-`, ... pour l'ordre) et de l'entrée dans `src/pages-publiees.ts`. C'est le cas de la page RSE (POC) : `src/contenu/rse.ts`.

## Composants de la page RSE (POC)

| Bloc | Composant |
|---|---|
| Hero avec surtitre et chiffres clés | `HeroPhotoBande.astro` (props optionnelles `surtitre` et `chiffres`, sans effet sur Équipe) |
| « Prendre soin » (onglets en pilule, carte texte + photo) | `TribesOnglets.astro`, le composant des Tribes rendu générique par des props optionnelles : `etiquette` (vide = aucune), `titreListe`, `alt`, `aideDefilement`, ids préfixés par `id` (plusieurs instances possibles). Sans ces props, rendu Tribes inchangé. |
| Bilan carbone (bande bleue + bouton) | `BandeCta.astro` |
| « Agir et s'engager » (actions en zigzag) | `ActionsZigzag.astro` |

Pas de version HTML à coller dans Webflow pour ces blocs.

Le menu (`EnTete.astro`) et le pied de page (`PiedDePage.astro`) sont dans le layout, pas dans les pages : toutes les pages les ont. Le menu marque la page courante grâce au champ `chemin` de `src/pages-publiees.ts` (adresse de la page sur wefiit.com).

## Étape suivante possible

Sur la page Équipe, rien : tous les blocs sont convertis. Pour une autre page (ex. Culture, restée privée), même méthode bloc par bloc : composant `.astro` (props pour les textes et photos, tokens `--wf-*`), enregistré dans `src/contenu/<page>.ts`, avec comparaison du rendu et du comportement avant de remplacer le bloc brut. Les blocs d'origine dupliquent volontairement leurs variables pour fonctionner dans un Embed Webflow.
