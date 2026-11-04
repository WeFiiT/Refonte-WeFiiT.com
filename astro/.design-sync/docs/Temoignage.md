---
category: Témoignages et médias
---

Carte de témoignage d'un WeFiiTer, centrée dans une colonne de 640px : carte blanche à angles droits avec ombre bleutée diffuse, photo détourée qui déborde en haut de la carte, guillemets SVG du site dans deux coins opposés, citation en bleu (Work Sans 500), puis signature « **Nom** | fonction » en bleu vif. Elle s'intercale entre deux sections, sur fond blanc ou sur une bande bleu pâle pleine largeur (100vw).

- `personne` : identifiant court (« yamila ») ; il donne l'`id` de la section (`wt-temoignage-<personne>`), donc il doit être unique dans la page. Il n'y a pas de prop `id`.
- `texte`, `nom`, `role` : texte brut, pas de HTML. `role` s'affiche après la barre verticale.
- `photo` : portrait détouré d'environ 120 × 135px (fond transparent).
- `bande` : `{ padding }` pose la carte sur une bande `--wf-blue-50` pleine largeur. Le padding sert à prolonger la bande du bloc précédent (ex. `CollectifGaleries`, qui n'a pas de padding bas) : placer alors le témoignage juste après ce bloc. Sans `bande`, fond blanc et 80px de marge sous le bloc.
- `carteMobileHaut` : padding haut de la carte sous 767px (défaut `5rem`), à augmenter si la photo chevauche le texte.
- Aucun comportement interactif.

```jsx
<Temoignage
  personne="guillaume"
  nom="Guillaume"
  role="Consultant Product Leader"
  texte="J'ai tout de suite accroché à la vision des co-fondateurs pour WeFiiT, à savoir la construction d'un collectif d'experts bienveillants (...) où chacun peut apporter sa pierre à l'édifice pour construire un WeFiiT qui nous ressemble"
  photo="https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/64118ccd9e750a2969c2eb5b_Mission%20-%20T%C3%A9moignages%20WeFiiTers%20-%20Consultant%20Product%20Guillaume.webp"
/>
```
