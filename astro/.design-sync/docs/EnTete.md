---
category: Navigation
---

Barre de navigation commune à tout le site wefiit.com, à placer tout en haut de la page, avant le hero. Fond blanc, logo WeFiiT à gauche, menus en Work Sans 16px 500 bleu nuit, puis deux boutons en pilule : « Deviens WeFiiTer » (orange) et « Prendre RDV » (bleu). Elle reste collée en haut de l'écran au défilement (`position: sticky`). Contenu centré dans 1140px.

- Le menu (Expertises, Cas clients, Formation, Médias, À propos) est figé dans le composant : il ne se passe pas en props, ne pas le recopier ni le modifier.
- `pageCourante` (optionnelle) : chemin de la page affichée, ex. `"/product-management"`. Le lien correspondant reçoit `aria-current="page"`. Mettre un chemin présent dans le menu, sinon aucun lien n'est marqué.
- Interactif : Expertises, Médias et À propos s'ouvrent en liste déroulante ; sous 992px, un bouton burger remplace les liens et ouvre le menu en panneau.
- Une seule EnTete par page. Ne pas la placer dans un conteneur étroit ni sous un autre élément fixe.

```jsx
<EnTete pageCourante="/product-management" />
```
