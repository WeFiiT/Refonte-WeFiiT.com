---
category: Actions
---

Widget flottant discret pour écouter un épisode de podcast sur Spotify. Fermé : une pastille bleu foncé en bas à droite (rond orange avec un casque, mention « Nouveau », libellé), qui apparaît après 2 secondes ; après 15 % de défilement de la page elle se replie en simple rond avec le casque et se redéploie au survol ; sur mobile elle reste toujours ronde. Ouvert (au clic) : une carte blanche avec une étiquette orange, le titre de l'émission, une présentation et le lecteur Spotify (chargé à l'ouverture seulement, via l'API iFrame de Spotify). Fermer la carte pendant l'écoute laisse le son continuer (la pastille passe à « En lecture », avec un anneau orange) ; fermer à l'arrêt retire le lecteur.

- `episode` est l'identifiant de l'épisode (la partie après `open.spotify.com/episode/`, sans `?si=`).
- Un seul widget par page (ids `wtp-card` et `wtp-title` fixes). `position: fixed` en bas à droite, sous le menu du site (`z-index` 900), masqué à l'impression.
- Rien de Spotify n'est chargé avant l'ouverture de la carte ; Échap referme la carte ; `prefers-reduced-motion` est respecté.
- Si l'API de Spotify ne se charge pas, le widget retombe sur un simple lecteur intégré (la fermeture arrête alors l'écoute).

```jsx
<WidgetPodcast
  titre="…"
  etiquette="…"
  texte="…"
  episode="…"
  libelle="…"
  libelleNouveau="…"
  libelleEnLecture="…"
  libelleFermer="…"
  titreLecteur="…"
/>
```
