---
category: Témoignages et médias
---

Section « avis clients » : H2 aligné à gauche (Geomanist Medium 48px, dégradé bleu, point final orange ajouté automatiquement), puis un carrousel horizontal de cartes blanches arrondies (rayon 15px, ombre légère). Chaque carte porte des guillemets qui débordent des coins, la citation en italique bleu nuit, un tag d'offre en pilule bleu pâle et le logo du client. Même conteneur que les sections du site (90 % de large, 1140px max), sur fond blanc.

- `titre` : sans point final.
- `avis` : liste de `{ texte, tag?, logo, alt }`. `texte` est du texte brut (pas de HTML). `tag` est l'offre (« Immersion », « Conseil »), facultatif. `alt` décrit le logo (« Logo Décathlon »).
- `id` : unique dans la page (défaut `wt-avis`) ; le H2 reçoit `<id>-titre`.
- Trois cartes visibles sur ordinateur, deux sous 991px, une carte et le début de la suivante sous 767px.
- Interactif : défilement natif au doigt, au trackpad ou au clavier (piste focusable), avec accroche des cartes. Les points de pagination sont créés en JavaScript, un par page de cartes, et suivent le défilement ; ils disparaissent s'il n'y a qu'une page. Prévoir au moins 4 avis pour que le carrousel ait un sens.

```jsx
<CarrouselAvis
  id="wt-pm-avis"
  titre="Ce que nos clients disent de nous"
  avis={[
    { texte: "Une vraie synchronicité intellectuelle, de la méthode et des livrables précis, de l'orfèvrerie. Merci WeFiiT !", tag: "Immersion", logo: "https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/63d6a48b821bb1549268e8cf_Decathlon.svg", alt: "Logo Décathlon" },
    { texte: "Grosse bouffée d'oxygène & super satisfait du match avec les équipes. Du concret et du pragmatisme dans l'approche Ops proposée par WeFiiT.", tag: "Conseil", logo: "https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/6734d4843550e43c9b3ffd81_lv.avif", alt: "Logo de Louis Vuitton" },
  ]}
/>
```
