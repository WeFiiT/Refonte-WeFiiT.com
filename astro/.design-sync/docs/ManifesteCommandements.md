---
category: Sections
---

Liste numérotée de commandements ou de principes : sur desktop, une grille ouverte de 2 colonnes lue en Z (1 et 2 face à face, puis 3 et 4…), tout est visible ; sur mobile, un accordéon (un seul commandement ouvert à la fois, le premier ouvert au chargement). Le numéro de chaque cellule « se dépose » (fondu et descente) quand elle entre dans l'écran, une seule fois (sauf mouvement réduit).

- `commandements` : `titre` (l'énoncé, en semi-gras) et `texte` (une ou deux phrases) ; numérotés 1, 2… dans l'ordre. Prévu pour 10 éléments ; un nombre pair garde la grille régulière.
- `titre` sans point final ; `surtitre` et `intro` facultatifs.
- Le comportement bascule entre grille et accordéon selon la largeur (767px), même au redimensionnement.

```jsx
<ManifesteCommandements
  titre="…"
  commandements={[]}
/>
```
