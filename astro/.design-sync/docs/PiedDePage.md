---
category: Navigation
---

Pied de page commun à tout le site wefiit.com, à placer en tout dernier dans la page. Bande pleine largeur bleu foncé (#002882) : à gauche, la phrase « Envie de travailler avec nous ? Prenez rendez-vous directement dans notre agenda. » et un lien « Prendre rendez-vous » fléché ; à droite, deux rangées de liens blancs en petit texte (Work Sans 12.8px 300) ; trois traits blancs en bas de la bande. Sous 767px, les deux colonnes s'empilent.

- Aucune prop : le contenu est identique sur tout le site. Ne pas essayer de changer les liens ni d'ajouter des colonnes.
- Le lien « Cookies » ouvre le bandeau de consentement Axeptio quand il est chargé sur la page ; dans un aperçu, il ne fait rien.
- Une seule fois par page, juste après la dernière section (souvent une `BandeCta` ou une `GrilleCartes` de blog). Ne pas l'envelopper dans un conteneur : la bande doit toucher les bords.

```jsx
<main>
  {/* ... sections de la page ... */}
</main>
<PiedDePage />
```
