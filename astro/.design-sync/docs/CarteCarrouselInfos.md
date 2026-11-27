---
category: Témoignages et médias
---

Carte à deux zones sur fond blanc avec filet : à gauche un carrousel de photos paysage (flèches rondes bleues, indicateur de position en points dont le point actif s'allonge en trait, flèches du clavier, défilement natif par scroll-snap, glisser au doigt) ; à droite un texte (surtitre, titre, paragraphe avec lien externe) ; en bas une rangée d'infos pratiques (intitulé, valeur en grand, libellés). Sous 992px, le carrousel passe au-dessus du texte (16:9, puis 3:2 sur mobile) et les infos en 2 colonnes.

- `photos` : au moins une, paysage proche de 3:2 ; `srcset` ([url, largeur]), `sizes`, `largeur`, `hauteur`, `alt` ; toutes en lazy (le carrousel est sous le pli). Avec une seule photo : ni flèches ni points.
- `libelleCarrousel` nomme le carrousel pour les lecteurs d'écran.
- `infos[]` : `intitule`, `valeur` (HTML autorisé), `libelles` (une ligne par entrée), `lectureComplete` (phrase lue à la place de la valeur découpée, ex. horaires) et `enLigne` (première valeur et premier libellé sur la même ligne dès 768px).
- `texte` accepte `<strong>` et un lien externe (prévoir le « (nouvel onglet) » masqué).

```jsx
<CarteCarrouselInfos
  photos={[]}
  libelleCarrousel="…"
  titre="…"
  texte="…"
  infos={[]}
/>
```
