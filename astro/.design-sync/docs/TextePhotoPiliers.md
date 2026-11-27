---
category: Sections
---

Section pleine (sans bande colorée) : en haut, une photo (colonne de 2/5) avec le décalage bleu du site à côté d'un bloc de texte (surtitre, titre à gauche avec point orange, sous-titre, paragraphe) ; dessous, trois cartes « piliers » dont l'icône et le titre sont alignés sur une même ligne (le texte passe dessous, sur toute la largeur de la carte, sauf sur mobile). Pour expliquer un symbole, une méthode ou trois principes avec une image forte. Pour quatre cartes numérotées sur une bande, voir `CadrePrincipes`.

- `piliers[].icone` est un balisage `<svg>` complet, au trait (viewBox 24, trait arrondi, `currentColor`), décoratif.
- `photo` : `src`, `srcset` ([url, largeur]), `sizes`, `largeur`, `hauteur`, `alt` (chargée en lazy).
- `titre` sans point final.

```jsx
<TextePhotoPiliers
  titre="…"
  texte="…"
  photo={{ /* … */ }}
  piliers={[]}
/>
```
