---
category: Témoignages et médias
---

Photo affichée sur toute la largeur de la fenêtre (100vw), sans marge ni texte, à poser en dernière section juste avant le pied de page (sur la page Équipe : la photo de groupe des WeFiiTers). L'image est recadrée pour remplir la bande, dont la hauteur suit le ratio donné.

- `src` : URL de l'image principale.
- `srcset` : liste de paires `[url, largeur en px]` pour les tailles disponibles ; passer `[]` s'il n'y en a pas. Le composant déclare `sizes="100vw"`.
- `alt` : description de la photo, obligatoire.
- `ratio` : ratio réel de la photo sous la forme `"largeur / hauteur"` (ex. `"802 / 291"`). Il réserve la hauteur avant le chargement ; un ratio faux recadre la photo.
- `id` : unique dans la page (défaut `wt-photo-full`).
- Ne pas la mettre dans un conteneur étroit ni dans une carte : elle sort de son parent pour occuper toute la fenêtre. Aucun comportement interactif.

```jsx
<PhotoPleineLargeur
  src="https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/659bfd283ed39bb587c3e1b0_%C3%A9quipe-wefiit%20(1).avif"
  srcset={[
    ["https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/659bfd283ed39bb587c3e1b0_%C3%A9quipe-wefiit%20(1)-p-800.avif", 800],
    ["https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/659bfd283ed39bb587c3e1b0_%C3%A9quipe-wefiit%20(1).avif", 1878],
  ]}
  alt="L’équipe WeFiiT"
  ratio="802 / 291"
/>
```
