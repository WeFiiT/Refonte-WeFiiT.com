---
category: Sections
---

Bande pleine largeur (100vw) en dégradé bleu (110deg, #001d84 vers #2a4cff), placée entre deux sections pour pousser vers un contact. Contenu centré dans une colonne de 750px : titre de bande en Allroundgothic 40px (ce n'est pas le style des H2 de section, pas de point orange), texte blanc, puis un bouton orange et un bouton clair optionnel.

- `titre` et `texte` acceptent du HTML simple (`<br>`).
- `ctaSecondaire` ajoute le bouton clair à droite et élargit l'espace au-dessus des boutons.
- `espaceApres` ajoute 48px sous la bande quand la section suivante est sur fond blanc ; sans, la bande est collée au bloc suivant.

```jsx
<BandeCta
  titre="Prêts à embarquer avec nous pour votre prochaine success story ?"
  texte="WeFiiT vous accompagne pour construire ensemble des produits à impact, au cœur d'une équipe engagée et passionnée."
  cta={{ libelle: "Prendre RDV maintenant", lien: "https://outlook.office.com/book/WeFiiT2@wefiit.com/", nouvelOnglet: true }}
  ctaSecondaire={{ libelle: "Être recontacté", lien: "/contact" }}
/>
```
