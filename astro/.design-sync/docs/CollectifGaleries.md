---
category: Témoignages et médias
---

Grande section sur une bande bleu pâle pleine largeur (100vw, contenu centré sur 1140px) : H2 centré (Geomanist Medium 51px, dégradé bleu, point final orange ajouté automatiquement), intro centrée, onglets soulignés (un par catégorie), puis pour la catégorie active une description et une galerie horizontale de vidéos YouTube, et enfin une phrase de conclusion. La bande n'a pas de padding bas : elle est faite pour être suivie d'un `Temoignage` avec `bande`, qui la prolonge.

- `titre` : sans point final.
- `intro` : HTML autorisé (`<br>`, et `<span class="wtc-highlight">` pour mettre un nom de rituel en bleu gras).
- `categories` : liste de `{ id, nom, description, videos }`, dans l'ordre des onglets ; la première est active au chargement. `id` est un nombre unique par catégorie. `description` en texte brut.
- `videos` : `{ id, titre, legende }`, où `id` est l'identifiant YouTube (la vignette en est tirée). La légende est coupée à 2 lignes.
- `conclusion` : HTML autorisé (`<strong>`).
- Une seule instance par page : les ids internes (titre, onglets, panneaux) sont fixes. La prop `id` ne change que celui de la section.
- Interactif : clic sur un onglet pour changer de catégorie, flèches pour faire défiler la galerie ; le lecteur YouTube n'est chargé qu'au clic sur la vignette.

```jsx
<CollectifGaleries
  titre="S’épanouir grâce au collectif"
  intro={'Chaque deuxième jeudi du mois, nous prenons le temps de nous retrouver lors de nos rituels <span class="wtc-highlight">We.Talk</span>, <span class="wtc-highlight">We.Share</span> ou <span class="wtc-highlight">Afterworks</span> : des temps forts dédiés au partage d’expériences, d’expertises et de points de vue.'}
  categories={[
    { id: 2, nom: "We.Talk", description: "Une personne influente de la sphère Produit nous livre son expertise et ses best-practices.", videos: [
      { id: "A8a5QrMxt4g", titre: "We.Talk de Claire Rohaut", legende: "We.Talk - Claire Rohaut, Lead Product Manager chez PlayPlay" },
    ] },
  ]}
  conclusion="Et quand des WeFiiTers partagent une passion commune, de nouveaux rituels voient le jour pour faire vivre l'équipe : <strong>We.Swim, Nous.Lisons, We.Act</strong>, et bien d'autres encore."
/>
```
