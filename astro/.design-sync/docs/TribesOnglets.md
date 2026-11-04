---
category: Sections
---

Section à onglets sur fond blanc, conteneur de 1140px. H2 centré en dégradé bleu avec point orange (ajouté par le composant) et intro, puis une barre d'onglets en pilule orange. Chaque onglet affiche une carte blanche (étiquette, objectif, titre de liste, liste à coches, lien optionnel) à côté d'une photo décalée sur un fond bleu. Conçue pour les 5 Tribes de la page Équipe, elle sert aussi d'onglets génériques (page RSE, pages d'expertise).

- `titre` sans point final ; `intro` accepte `<strong>` et `<br>`.
- `tribes` : un objet par onglet. `cle` unique et courte, `nom` = texte de l'onglet. `objectif` et les `initiatives` sont du texte simple.
- `etiquette` vaut « Tribe <nom> » par défaut : passer `''` pour la masquer (hors page Équipe, c'est presque toujours le cas).
- `titreListe` vaut « Key Initiatives » : à changer pour tout le bloc ou par onglet.
- `invitation: true` sur une initiative remplace la coche par un « + » (idée laissée au lecteur).
- `lien` par onglet : lien fléché sous la liste.
- `formatPhoto="carre"` pour des photos carrées (pages d'expertise) ; `paysage` par défaut.
- Interactif : un clic sur un onglet change la carte affichée ; sous 992px, la barre défile horizontalement (`aideDefilement` est lu par les lecteurs d'écran).
- `id` unique : il préfixe les ids des onglets, ce qui permet plusieurs instances par page.

```jsx
<TribesOnglets
  id="partenaire-360"
  titre="Votre partenaire Produit 360°"
  intro="Stratégie, Discovery, Delivery : WeFiiT accompagne des grandes entreprises comme Accor, Louis Vuitton, FDJ, France TV et des scale-ups pour structurer, renforcer et faire grandir leurs équipes Produit."
  titreListe="Notre valeur ajoutée"
  formatPhoto="carre"
  tribes={[{
    cle: 'formation', nom: 'Formation', etiquette: '',
    objectif: 'Parce qu’on n’a jamais fini d’apprendre, WeFiiT vous accompagne dans la montée en compétences de vos équipes en Product Management.',
    initiatives: [{ texte: 'Formateurs reconnus par leurs pairs' }],
    lien: { libelle: 'Découvrir notre catalogue de formation', lien: '/formation-product-management' },
    photo: 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/6720fc50353768f4faaf6f56_offre-formation.webp',
  }]}
/>
```
