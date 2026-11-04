# WeFiiT.com : conventions

Composants du site wefiit.com (cabinet spécialisé dans les métiers produit). Tous les textes sont en français. Les composants sont sur `window.WefiitDS` :

- **Navigation** : `EnTete` (menu du site, en haut de chaque page), `PiedDePage` (en bas de chaque page).
- **Actions** : `Bouton`.
- **Sections** : `HeroPhotoBande` (premier bloc d'une page), `BandeCta`, `GrilleCartes`, `GrillePiliers`, `ActionsZigzag`, `CadrePrincipes`, `TribesOnglets`, `FaqAccordeon`.
- **Témoignages et médias** : `Temoignage`, `CarrouselAvis`, `TitreVideo`, `ParolesVideos`, `CollectifGaleries`, `PhotoPleineLargeur`.

## Mise en place

Aucun provider ni wrapper : chaque composant se rend seul et gère son propre comportement (onglets, carrousels, menu, FAQ). Il faut seulement `styles.css` (couleurs, polices, styles des composants). Fond de page blanc, texte de base en `"Work Sans v2", Arial, sans-serif`.

Une page se compose en empilant des sections, sans conteneur autour : `EnTete`, puis `HeroPhotoBande`, puis les sections, puis `PiedDePage`. Chaque section porte son propre conteneur, ses marges et son H2.

- Les bandes pleine largeur (`BandeCta`, la bande de `HeroPhotoBande`, `GrillePiliers`, `Temoignage` avec bande) se placent directement dans la page, jamais dans un conteneur étroit ni une carte.
- Ne pas ajouter de titre au-dessus d'une section : son H2 est une prop.
- Chaque section a un `id` unique dans la page (prop `id`).

## Style : variables CSS, pas de classes utilitaires

Pas de framework de classes. Pour la mise en page autour des composants, écrire du CSS (ou `style`) avec ces variables :

| Variable | Valeur | Usage |
|---|---|---|
| `--wf-blue-900` | #001d84 | bleu nuit, couleur principale, texte |
| `--wf-blue-800` | #002882 | texte courant, début des dégradés de titre |
| `--wf-blue-600` | #2a4cff | liens, fin des dégradés |
| `--wf-blue-75` / `--wf-blue-50` | #edf0ff / #f2f4ff | fonds pâles de bandes |
| `--wf-orange-500` / `--wf-orange-600` | #f98f03 / #e95400 | CTA et point final des titres |
| `--wf-grey-100` | #eff0f6 | séparateurs |
| `--wf-font-h2` | Geomanist | H2 de section (graisse 500) |

Polices : `Geomanist` (500) pour les H2, `Allroundgothic` (400) pour les titres de bande et les grands chiffres, `"Work Sans v2"` pour tout le reste. Les classes `wt-*` appartiennent aux composants : ne pas les réutiliser pour autre chose.

## Règles de marque

- Les H2 de section finissent par un **point orange** : `GrilleCartes` l'ajoute seul, ne jamais écrire le point dans `titre`.
- Un seul bouton orange par section. Bleu dans un hero, clair pour l'action secondaire (« Être recontacté »).
- Vocabulaire produit en anglais non traduit (Product Manager, Discovery, Product Ops).

## Où lire

`styles.css` et ses imports (`_ds_bundle.css`, `fonts/fonts.css`) font foi pour les valeurs. Chaque composant a sa fiche `components/<groupe>/<Nom>/<Nom>.prompt.md` (props et exemple avec les vrais textes du site).

## Exemple

```jsx
const { BandeCta, GrilleCartes } = window.WefiitDS;

<main style={{ background: '#fff' }}>
  <GrilleCartes
    id="formations"
    titre="Découvrez nos formations IA"
    cartes={[
      { titre: 'Formation Product Manager IA', lien: '/formation-product-manager-ia', texte: "Transformer l'IA générative en véritable levier de productivité et d'innovation." },
      { titre: 'Formation Product Owner IA', lien: '/formation-product-owner-ia', texte: "Utiliser l'IA pour la rédaction et la documentation" },
    ]}
    cta={{ libelle: 'Voir toutes nos formations', lien: '/formation-product-management' }}
  />
  <BandeCta
    id="embarquer"
    titre="Prêts à embarquer avec nous pour votre prochaine success story ?"
    texte="WeFiiT vous accompagne pour construire ensemble des produits à impact, au cœur d'une équipe engagée et passionnée."
    cta={{ libelle: 'Prendre RDV maintenant', lien: '/contact' }}
    ctaSecondaire={{ libelle: 'Être recontacté', lien: '/contact' }}
  />
</main>
```
