# Décisions

Décisions d'architecture du projet, les plus récentes en haut.

## 2026-11-04 : composants en React (dans Astro)

**Décision** : les composants passent de `.astro` à React (`.tsx`), via l'intégration officielle `@astrojs/react`. Astro reste le cadre du site (pages, layout, CMS, build statique, SEO).

**Pourquoi** : Claude Design ne construit qu'avec des composants React. Avec des composants React, on peut les synchroniser dans Claude Design, les modifier là-bas, puis reporter la modification en dev. Avec des `.astro`, chaque modification faite dans Claude Design devrait être retraduite à la main.

**Coût** : les composants statiques n'envoient aucun JS au visiteur (rendu en HTML au build). Un composant interactif hydraté (`client:visible`) charge React, environ 45 Ko gzip.

**Écartés** :
- design system de référence dans Claude Design sans synchronisation : traduction manuelle à chaque modification ;
- partager seulement les tokens (couleurs, polices) : ne couvre pas les composants ;
- tout en HTML : duplication du menu, du pied de page et des composants, illisible pour Claude Design ;
- Next.js : trop lourd pour un site vitrine statique.

**Test** : `Bouton`, `BandeCta`, `GrilleCartes` convertis le 2026-11-04. HTML identique sur toutes les pages, rendu identique au pixel (234 éléments mesurés à 1536, 991 et 390 px), aucun JS chargé par les pages.

**Suite** : première synchronisation Claude Design sur ces 3 composants, puis conversion des 14 autres.

**Complément (2026-11-04, conversion des 14 autres)** : les composants interactifs ne sont **pas** hydratés (`client:*`), contrairement à ce qui était envisagé. Leur comportement est sorti dans `<Nom>.comportement.ts` (`init(root)`), appelé sur le site par un petit script commun (`src/comportements.ts`, ~7 Ko) et dans Claude Design par le `useEffect` du composant. Résultat : zéro React chez le visiteur, même code de comportement des deux côtés. Rendu identique vérifié élément par élément sur toutes les pages à 1536, 991 et 390 px ; 38 tests de comportement OK.
