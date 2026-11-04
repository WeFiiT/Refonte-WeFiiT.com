---
category: Sections
---

Section complète : H2 aligné à gauche (Geomanist Medium 48px, dégradé bleu, point final orange ajouté automatiquement : ne pas mettre de point dans `titre`), intro optionnelle, grille de cartes cliquables, bouton orange optionnel centré dessous. Même conteneur que les sections du site (90 % de large, 1140px max). Grille de 3 colonnes, 2 sous 991px, 1 sous 767px.

Chaque carte est un lien blanc à ombre légère, avec une ombre plate bleu nuit décalée au survol. Seuls `titre` et `lien` sont obligatoires : n'afficher que les champs utiles.

- `variante="standard"` : cas clients (`surtitre` « Expertise | Client », `tags`) et formations.
- `variante="offre"` : autres offres, image plus haute (3:2), titre en Allroundgothic, `texte` court.
- `variante="blog"` : articles, avec `auteur`, `date` et `lire` (« Lire l'article », lien orange avec flèche).

```jsx
<GrilleCartes
  titre="Des exemples de nos belles histoires Produit"
  cartes={[
    { titre: "Faire émerger une culture produit augmentée par l'IA", lien: "/user-stories/culture-produit-augmente-ia", image: "https://cdn.prod.website-files.com/63eba97bee0a9ec170c4f859/6aa288411fb171c307a2264c_user-story-bpi.png", surtitre: "Product Management | BPI France", tags: ["Formation", "Secteur public"] },
    { titre: "Refondre un site e-commerce luxe en générant un impact business significatif", lien: "/user-stories/refonte-site-marque-luxe", image: "https://cdn.prod.website-files.com/63eba97bee0a9ec170c4f859/6721f2deacdc8aa70e4af8d2_user-stories-accor.png", alt: "Accor", surtitre: "Product Management | Accor", tags: ["Immersion", "Hôtellerie"] },
  ]}
  cta={{ libelle: "Voir tous nos cas clients", lien: "/cas-clients" }}
/>
```
