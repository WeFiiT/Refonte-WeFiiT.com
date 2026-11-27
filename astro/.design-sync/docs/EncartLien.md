---
category: Navigation
---

Encart de maillage interne : un petit lien discret vers une autre page du site (surtitre en capitales, titre, description facultative, « Découvrir → »). Un seul `<a>` : toute la surface est cliquable. Ce n'est pas un titre HTML (ni H2 ni H3) : le bloc ne compte pas dans la hiérarchie des titres de la page.

- `nomAccessible` est le nom lu par les lecteurs d'écran (phrase complète, ex. « Découvrir nos engagements RSE »).
- `description` est facultative : sans elle, la ligne reste vide et masquée.
- À placer en fin de page, avant le pied de page, pour relier deux pages proches (ici Culture vers RSE).

```jsx
<EncartLien
  lien="…"
  titre="…"
  nomAccessible="…"
/>
```
