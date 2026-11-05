---
category: Sections
---

Section sur bande gris clair pleine largeur (#f5f7fa) : H2 centré en dégradé bleu avec point orange (ajouté par le composant), intro centrée, puis une liste d'actions en zigzag. Chaque action associe un bloc texte (titre H3 + paragraphe) et une photo 4:3 ; la photo est à droite sur la première ligne, à gauche sur la suivante, et ainsi de suite. Conteneur étroit de 940px. Sous 991px, texte et photo s'empilent. Utilisée sur la page RSE pour « Agir et s'engager, ensemble ».

- `titre` sans point final. `intro` et le `texte` de chaque action acceptent du HTML simple (`<br>`).
- Chaque action demande `titre`, `texte`, `photo` et `alt`. Le `titre` sert de clé : deux actions ne doivent pas avoir le même.
- Prévoir au moins 2 actions pour que l'alternance se voie ; au-delà de 6, la section devient très longue.
- Textes courts (2 à 4 lignes) : la photo fixe la hauteur de la ligne.
- `id` unique dans la page.

```jsx
<ActionsZigzag
  id="actions"
  titre="Agir et s'engager, ensemble"
  intro="En 2023, à l’initiative des WeFiiTers, la squad interne « Challengers » est née."
  actions={[
    { titre: 'Clean walk', texte: 'Et si on commençait par nettoyer devant notre porte ? Par une journée ensoleillée, nos WeFiiTers se sont mobilisés pour nettoyer l’Avenue du Maine.', photo: 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/6904d2de30a28bd3b928ad8d_RSE_CleanWalk.avif', alt: "L'équipe WeFiiT après un clean walk rue du Maine à Paris" },
    { titre: 'Don du sang', texte: 'Merci à nos WeFiiTers qui ont courageusement bravé la seringue et participé à remplir les stocks de sang !', photo: 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/6904d2dd34c035e76490a858_RSE_DonDuSang.avif', alt: 'Deux consultantes WeFiiT sourient après avoir donné leur sang' },
  ]}
/>
```
