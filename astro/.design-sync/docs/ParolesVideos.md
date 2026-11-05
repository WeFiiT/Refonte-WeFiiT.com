---
category: Témoignages et médias
---

Section de vidéos de WeFiiTers, sur fond blanc (1140px max, centrée) : H2 centré (Geomanist Medium 51px, dégradé bleu, point final orange ajouté automatiquement), intro centrée, puis les vidéos avec leur légende et un bouton orange centré en bas. À partir de 768px, les vidéos sont en grille de 3 colonnes ; en dessous, elles passent en carrousel d'une vidéo par vue.

- `titre` : sans point final.
- `intro` : HTML autorisé (`<em>` pour une citation).
- `videos` : liste de `{ src, titre, legende }`. `src` est l'URL d'intégration (iframe Vimeo, YouTube...), `titre` le `title` de l'iframe, `legende` le texte sous la vidéo. Prévoir 3 vidéos (ou un multiple de 3) pour remplir la grille ; au moins une est obligatoire.
- `ctaTexte` / `ctaLien` : le bouton orange, seul bouton de la section ; pleine largeur sous 767px.
- `id` : unique dans la page (défaut `wt-paroles`).
- Interactif (mobile) : carrousel en boucle infinie, au glisser, par flèches gauche/droite ou par pastilles. Changer de vidéo met en pause celle qui jouait.

```jsx
<ParolesVideos
  titre="Paroles de WeFiiTers"
  intro="<em>« Diriger, c’est avant tout savoir bien s’entourer »</em> : une conviction que les WeFiiTers incarnent au quotidien. À travers ces vidéos, il·elle·s partagent leur rôle, leur manière de travailler et ce qui les a amenés à rejoindre l’aventure WeFiiT."
  videos={[
    { src: "https://player.vimeo.com/video/1014693029", titre: "Rencontrez Anne-Pauline - Product Manager", legende: "Rencontrez Anne-Pauline - Product Manager" },
    { src: "https://tube.rvere.com/embed?v=ueLmj4Ws03k", titre: "Rencontrez Louis - Quality Analyst", legende: "Rencontrez Louis - Quality Analyst" },
  ]}
  ctaTexte="REJOINS L'AVENTURE WEFIIT"
  ctaLien="https://www.welcometothejungle.com/fr/companies/wefiit/jobs"
/>
```
