---
category: Sections
---

Énoncé centré sur une bande pâle pleine largeur (raison d'être, mission, promesse) : un surtitre en capitales bleues, puis une phrase en Allroundgothic dont le point final est orange. À l'arrivée du bloc à l'écran, une barre orange passe sur chaque ligne et révèle le texte ligne après ligne (une seule fois). Sans JavaScript ou avec animations réduites, la phrase est simplement affichée.

- `texte` est une seule phrase, point final compris : le script l'habille en orange et la découpe en lignes selon la largeur d'affichage.
- `surtitre` est le H2 de la section (rendu en eyebrow) ; `ariaLabel` nomme la région, par défaut le surtitre.
- Une instance par page conseillée : l'effet se joue au défilement et ne se rejoue pas.

```jsx
<RaisonEtre
  texte="…"
/>
```
