---
category: Témoignages et médias
---

Section courte : un H2 centré (Geomanist Medium 51px, dégradé bleu, point final en dégradé orange vertical ajouté automatiquement) suivi d'une vidéo YouTube intégrée sur toute la largeur du bloc (1140px max, centré, fond blanc). Elle met en avant une vidéo d'ambiance, comme le récap annuel en haut de la page Équipe.

- `titre` : sans point final. Il reste centré à toutes les tailles (48px sous 767px, 40px sous 480px).
- `video` : URL d'intégration YouTube (`https://www.youtube.com/embed/<id>?...`), pas l'URL de la page `watch`.
- `titreVideo` : attribut `title` de l'iframe, pour l'accessibilité ; reprendre le titre de la vidéo.
- `id` : unique dans la page (défaut `wt-2025`).
- La vidéo garde le ratio de la vraie vidéo de la page Équipe (proche du 16:9), sans légende. Pour plusieurs vidéos avec légendes, utiliser `ParolesVideos`.
- Aucun JavaScript : c'est le lecteur YouTube natif.

```jsx
<TitreVideo
  titre="WeFiiT, c’est aussi ça"
  video="https://www.youtube.com/embed/PqlMplRXqpo?rel=0&controls=1&autoplay=0&mute=0&start=0"
  titreVideo="Nos rituels chez WeFiiT - Retour sur 2025 et cap sur 2026 ! ⛷️"
/>
```
