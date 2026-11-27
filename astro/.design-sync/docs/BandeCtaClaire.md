---
category: Actions
---

Bande d'appel à l'action sur fond pâle (`wf-blue-50`), pleine largeur : titre en dégradé bleu avec point final orange, texte, puis un ou deux boutons (principal en dégradé orange, secondaire en dégradé bleu), empilés en pleine largeur sur mobile. Pour la fin d'une page de recrutement ou de présentation. La bande bleue de `BandeCta` reste celle des pages d'expertise : les deux composants ne se remplacent pas (fond, titre, texte et boutons sont différents).

- `titre` sans point final. `boutons` : `libelle`, `lien`, `variante` (`principal` par défaut ou `secondaire`) et `nouvelOnglet` (ajoute `target="_blank"`, `rel="noopener"` et un « (nouvel onglet) » lu par les lecteurs d'écran).
- Un seul bouton principal par bande.

```jsx
<BandeCtaClaire
  titre="…"
  texte="…"
  boutons={[]}
/>
```
