---
category: Sections
---

Données structurées (JSON-LD schema.org) d'une page : `WebPage` (et `AboutPage`), fil d'Ariane et lieu. Aucun rendu visuel : un simple `<script type="application/ld+json">`. L'organisation WeFiiT et le `WebSite` sont déjà déclarés sur tout le site : on s'y réfère par leur `@id`, sans les redéclarer. Un `FaqAccordeon` en mode `rubriques` ou `questions` se rattache à la page par `isPartOf`.

- `url`, `nom` et `description` doivent être identiques à l'adresse, au titre SEO et à la méta description réglés dans Webflow (Page Settings). `dateModification` (AAAA-MM-JJ) est à tenir à jour à chaque mise à jour du contenu.
- `filAriane` va du plus haut au plus bas (Accueil, puis la page) ; les positions sont numérotées automatiquement.
- `lieu` (facultatif) décrit le lieu dont parle la page : adresse postale, horaires (jours en anglais schema.org, heures « 08:30 »). Les `@id` sont dérivés de `url`.
- Ne rien déclarer qui ne soit pas visible dans la page.

```jsx
<DonneesStructurees
  url="…"
  nom="…"
  description="…"
  dateModification="…"
  filAriane={[]}
/>
```
