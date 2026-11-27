---
category: Sections
---

Frise chronologique : un rail d'années (points et libellés), une vague animée avec un bateau qui avance jusqu'à l'étape active, puis des cartes (photo 4:3, année, titre, texte) qui défilent avec des flèches et au glisser. Un clic sur une année ou une carte change d'étape ; le rail se déplace pour garder l'étape visible. Le titre de la section est masqué visuellement (la frise se lit sous le H1 de la page) mais présent pour les lecteurs d'écran et le plan de page ; chaque titre de carte est un H3.

- `etapes` est chronologique : la première est active au chargement. `annee` est un texte (« 2019 »). `titre` et `texte` acceptent du HTML (`<br>` pour couper un titre long, liens internes ou externes).
- Chaque `photo` porte `src`, `srcSet` (variantes du CDN), `sizes`, `largeur`, `hauteur` et `alt` ; elles sont chargées en lazy.
- `libelle` (par étape) remplace l'aria-label du bouton d'année quand « Aller à l'année … » ne suffit pas ; `libelles` règle les flèches.
- Respecte `prefers-reduced-motion` (vague et bateau fixes). Une seule frise par page.
- Éviter plus de 8 étapes : le rail devient trop dense sur mobile.

```jsx
<FriseChronologique
  etapes={[]}
/>
```
