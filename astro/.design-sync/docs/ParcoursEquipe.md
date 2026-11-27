---
category: Sections
---

Grande section « équipe en chiffres » : en-tête centré (surtitre, H2 avec point orange, chapô), puis une photo à côté de 4 chiffres clés (décompte animé à l'arrivée à l'écran), deux panneaux (parité femmes / hommes en graphique dont la barre se remplit, et secteurs d'activité en bandeau qui défile tout seul : il se fige au survol ou au toucher, se fait défiler à la main ou au clavier, et boucle sans coupure), puis un texte accompagné d'une vidéo YouTube en façade (vignette et bouton, lecteur créé au clic). Assemble `ChiffresParcours` (photo, chiffres, parité, secteurs) et `TexteVideo` (texte + vidéo), qui ne s'utilisent qu'à l'intérieur de `ParcoursEquipe` : leur CSS est préfixé par sa classe racine.

- `chiffres.chiffres[]` : `libelle`, `valeur` (valeur finale, lisible même sans le décompte), `detail`, `accent` ; `parite` : `pourcentFemmes`, `pourcentHommes`, `note`, `ariaLabel` ; `secteurs.items[]` : `icone` (contenu SVG) et `texte`.
- `texteVideo.video.id` est l'identifiant YouTube ; `titreLecteur` est le `title` de l'iframe créée au clic.
- Respecte `prefers-reduced-motion` : pas de décompte, pas de défilement automatique (la liste reste défilable à la main).
- Une seule instance par page (ids internes fixes).

```jsx
<ParcoursEquipe
  surtitre="…"
  titre="…"
  chapo="…"
  chiffres={{ /* … */ }}
  texteVideo={{ /* … */ }}
/>
```
