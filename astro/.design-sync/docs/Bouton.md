---
category: Actions
---

Bouton en pilule du site wefiit.com : texte en majuscules (Work Sans 600), padding 17px 40px, coins entièrement arrondis. C'est un lien (`<a>`), jamais un `<button>` de formulaire.

- `variante="orange"` (défaut) : CTA principal, dégradé orange. Un seul par section.
- `variante="bleu"` : dégradé bleu, utilisé dans les heros des pages d'expertise.
- `variante="clair"` : fond bleu très pâle, texte bleu nuit. Action secondaire (« Être recontacté »), souvent à côté d'un orange.

Sous 767px, le bouton prend toute la largeur. Deux boutons côte à côte sont espacés de 32px.

```jsx
<Bouton libelle="Prendre RDV maintenant" lien="https://outlook.office.com/book/WeFiiT2@wefiit.com/" nouvelOnglet />
<Bouton libelle="Être recontacté" lien="/contact" variante="clair" />
```
