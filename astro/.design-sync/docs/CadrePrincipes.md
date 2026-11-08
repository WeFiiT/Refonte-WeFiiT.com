---
category: Sections
---

Section sur bande bleu très pâle pleine largeur (#f2f4ff), conteneur de 1140px. H2 centré en dégradé bleu avec point orange (ajouté par le composant), puis une photo à côté de deux paragraphes de texte, et enfin une phrase d'accroche suivie de quatre cartes carrées numérotées (numéro en dégradé orange, titre, description) : 4 colonnes en desktop, 2 x 2 en tablette, 1 colonne en mobile. Sous 768px, tout s'empile et se centre. Utilisée sur la page Équipe (« Un cadre pour t'engager, évoluer et impacter »).

- `titre` sans point final. `intro` accepte `<br>` ; `suite` accepte `<br>`, `<strong>` (mots mis en avant : impact, compétences, rôle au sein du collectif) et `<span>`.
- `accroche` est du texte simple, sans HTML. Elle introduit les cartes : les titres sont à l'infinitif (« te permet de : Devenir spécialiste Produit, Apprendre… »).
- `points` : une carte par entrée, avec un `titre` court (une motivation du candidat) et un `texte` (une ou deux phrases). Les numéros (1, 2, 3…, sans zéro initial) sont ajoutés automatiquement. Viser 4 cartes (une ligne en desktop).
- `alt` décrit la photo ; vide par défaut, à renseigner si la photo porte du sens.
- Interactif : les cartes apparaissent en fondu, une par une, quand elles entrent à l'écran (affichées d'emblée si l'utilisateur réduit les animations). Au survol (souris, pas sous 479px), la carte prend l'ombre plate décalée bleu nuit des cartes du site.
- `id` unique dans la page.

```jsx
<CadrePrincipes
  id="cadre"
  titre="Un cadre pour t’engager, évoluer et impacter"
  photo="https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/65830dbb97aa2a27f503a401_Equipe%20-%20Tribe%20RH.webp"
  intro="Avoir un rôle actif dans ta mission est le point initial de ton parcours, pas une finalité."
  suite="Ton évolution chez WeFiiT se construit avec toi : en fonction de tes envies, de tes forces et des opportunités que tu choisis de saisir."
  accroche="En rejoignant WeFiiT, tu intègres un environnement qui te permet de :"
  points={[
    { titre: 'Devenir spécialiste Produit', texte: 'T’investir pleinement en mission, affiner ton expertise et faire reconnaître ton impact, auprès des clients comme en interne.' },
    { titre: 'Co-construire', texte: 'Participer à la construction du WeFiiT de demain en t’investissant sur des initiatives clés.' },
  ]}
/>
```

## Props

```ts
interface CadrePrincipesProps {
  titre: string;
  photo: string;
  alt?: string;
  intro: string;
  suite: string;
  accroche: string;
  points: Point[]; // { titre: string; texte: string }
  id?: string;
}
```
