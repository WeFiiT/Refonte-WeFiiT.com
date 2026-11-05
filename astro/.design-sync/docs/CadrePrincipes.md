---
category: Sections
---

Section sur bande bleu très pâle pleine largeur (#f2f4ff), conteneur de 1140px. H2 centré en dégradé bleu avec point orange (ajouté par le composant), puis une photo à côté de deux paragraphes de texte, et enfin une phrase d'accroche suivie d'une liste de points numérotés en 2 colonnes (chiffres en dégradé orange). Sous 768px, tout s'empile et se centre. Utilisée sur la page Équipe (« Un cadre pour t'engager, évoluer et durer »).

- `titre` sans point final. `intro` accepte `<br>` ; `suite` accepte `<br>`, `<span>` (mot mis en avant) et `<strong>`.
- `accroche` est du texte simple, sans HTML.
- `points` : chaque point a un `accent` (début de phrase en bleu vif, gras) et un `reste` (suite de la phrase, qui commence en général par une virgule ou une espace). Les numéros sont ajoutés automatiquement. Viser 4 points (2 lignes de 2).
- `alt` décrit la photo ; vide par défaut, à renseigner si la photo porte du sens.
- Interactif : les points apparaissent en fondu, un par un, quand ils entrent à l'écran (affichés d'emblée si l'utilisateur réduit les animations).
- `id` unique dans la page.

```jsx
<CadrePrincipes
  id="cadre"
  titre="Un cadre pour t’engager, évoluer et durer"
  photo="https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/65830dbb97aa2a27f503a401_Equipe%20-%20Tribe%20RH.webp"
  intro="Avoir un rôle actif dans ta mission est un point de départ, pas une finalité."
  suite="Ton évolution chez WeFiiT se construit avec toi : en fonction de tes envies, de tes forces et des opportunités que tu choisis de saisir."
  accroche="En rejoignant WeFiiT, tu intègres un environnement qui te permet de :"
  points={[
    { accent: 'T’investir pleinement en mission', reste: ', tout en bénéficiant d’un cadre de soutien, d’échange et de feedback' },
    { accent: 'Co-construire', reste: ' le WeFiiT de demain en t’investissant sur des initiatives clés' },
  ]}
/>
```
