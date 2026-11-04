---
category: Sections
---

Hero de haut de page, juste sous l'`EnTete`. Grand titre centré en dégradé bleu avec point final orange (ajouté par le composant), intro centrée, puis une photo large qui déborde sur une bande dégradée bleue pleine largeur. Conteneur de 1140px. C'est le hero des pages Équipe, RSE et des pages d'expertise.

- `titre` sans point final. `intro` accepte du HTML simple : `<span>` pour les mots mis en avant, `<br>`.
- `photo` et `alt` sont obligatoires.
- `surtitre` : petit texte au-dessus du titre (« Politique RSE »).
- `h1Surtitre` : la balise H1 porte le surtitre et le grand titre devient un paragraphe. Choix SEO des pages d'expertise (H1 = « Conseil Product Management »). Seulement avec un `surtitre`.
- `chiffres` : rangée de chiffres clés sous l'intro (`valeur` en grand, `libelle` à côté). Trois au maximum.
- `ctas` : boutons sous l'intro. Dans un hero, le principal est `variante: 'bleu'`, le secondaire `'clair'` ; pas d'orange.
- `logos` : bandeau de logos clients qui défile en continu (CSS pur, arrêté si l'utilisateur réduit les animations).
- Un seul hero par page, avec un `id` unique.

```jsx
<HeroPhotoBande
  id="hero-rse"
  surtitre="Politique RSE"
  titre="Notre engagement"
  intro="Prendre soin de notre écosystème.<br>Mesurer et comprendre notre impact.<br>Passer à l’action tous ensemble."
  chiffres={[{ valeur: '54', libelle: 'e-NPS collaborateur' }, { valeur: '2,3t', libelle: 'CO₂/employé en 2024' }]}
  photo="https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/673c6311d040ec59186b9d65_WEFIIT-09-23-2000-24.avif"
  alt="Equipe et consultants WeFiiT"
/>
```
