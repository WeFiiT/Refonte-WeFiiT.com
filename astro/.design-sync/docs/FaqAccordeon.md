---
category: Sections
---

Section de questions fréquentes, en général vers la fin d'une page, avant le blog ou le pied de page. Colonne étroite centrée (720px) sur fond blanc : surtitre optionnel en capitales bleues, H2 centré en dégradé bleu avec point orange (ajouté par le composant), intro optionnelle, puis les questions en accordéon, chacune avec une icône « + ».

- `titre` sans point final. `surtitre` et `intro` sont du texte simple.
- `questions` : chaque entrée a une `question` (texte simple) et une `reponse` qui accepte du HTML (`<p>`, `<a>`, `<strong>`). Une réponse sans balise est mise dans un `<p>`.
- Interactif : une seule réponse ouverte à la fois (balises `<details>` natives, sans JavaScript). Chaque question a une ancre `#question-1`, `#question-2`… ; un lien vers cette ancre ouvre la question.
- Le composant génère les données structurées schema.org `FAQPage` (utiles au SEO et au GEO) : ne pas les ajouter à la main.
- Une seule FAQ par page : les ancres `question-N` ne dépendent pas de l'`id` et se répéteraient.
- Des réponses factuelles et citables (chiffres, noms de clients) plutôt que des formules générales.

```jsx
<FaqAccordeon
  id="faq"
  titre="Foire aux Questions"
  questions={[
    { question: 'Qui sommes-nous ?', reponse: 'WeFiiT est un cabinet de conseil français spécialisé en <a href="/blog/product-management">Product Management</a>, fondé en 2019 à Paris.' },
  ]}
/>
```
