---
category: Sections
---

Hero de page plein cadre : la photo couvre toute la largeur, le H1 blanc est posé en haut à gauche (point final orange ajouté par le composant) et une citation s'affiche dans un panneau de verre dépoli bleu en bas à droite. Sur mobile, le panneau passe en pleine largeur, collé en bas. Pour un premier bloc éditorial (culture, histoire). Pour un titre centré sur fond blanc avec une photo qui déborde sur une bande, voir `HeroPhotoBande`.

- `titre` sans point final. `citation` sans guillemets ; `auteur` est en gras, `fonction` suit après une virgule.
- La photo est l'élément le plus lourd de la page (élément LCP) : elle est chargée en priorité, jamais en lazy. Fournir `srcset`, `sizes`, `largeur` et `hauteur` pour éviter un décalage de mise en page et un téléchargement trop lourd.
- `cadrage` et `cadrageMobile` règlent le recadrage de la photo (`object-position`) sur desktop et sur mobile.
- `niveauTitre` vaut 1 par défaut ; mettre 2 si un autre H1 existe plus haut sur la page.

```jsx
<HeroPhotoCitation
  titre="…"
  photo="…"
  alt="…"
  citation="…"
  auteur="…"
  fonction="…"
/>
```
