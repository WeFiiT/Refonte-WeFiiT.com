---
category: Sections
---

Section sur bande bleu très pâle pleine largeur (#f2f4ff), conteneur de 1140px. H2 en dégradé bleu terminé par un caractère en dégradé orange, sous-titre optionnel (24px 500) avec les 5 étoiles du site, puis des piliers en grille : titre centré (20.8px 600) et texte justifié. 3 piliers par ligne, dernière ligne centrée ; 2 colonnes sous 991px, 1 sous 767px. Utilisée sur /product-management pour « Chez WeFiiT on prend soin de vous ! ».

- Attention, `titre` ne suit pas la règle des autres sections : c'est le texte complet, et le dernier caractère se règle avec `point`. `point` vaut `'.'` par défaut ; `'!'` pour un titre exclamatif (finir alors `titre` par une espace, comme en français) ; `''` pour aucun.
- `sousTitre` est du texte simple. `etoiles` n'a d'effet que s'il y a un `sousTitre`.
- Le `texte` d'un pilier accepte `<strong>` et des liens `<a>`. Le `titre` de pilier sert de clé : pas de doublon.
- 3 ou 5 piliers donnent les rendus les plus équilibrés.
- `id` unique dans la page.

```jsx
<GrillePiliers
  id="prend-soin"
  titre="Chez WeFiiT on prend soin de vous "
  point="!"
  sousTitre="Bienvenue dans notre expérience client"
  etoiles
  piliers={[
    { titre: "Plus qu'un consultant, un équipage", texte: "WeFiiT c'est avant tout un <strong>équipage de consultants passionnés</strong> : partage d'expériences, mentorings entre pairs, formations dédiées, nous favorisons l'émulation collective pour relever vos challenges produits." },
  ]}
/>
```
