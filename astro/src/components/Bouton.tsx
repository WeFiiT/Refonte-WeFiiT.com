// Bouton en pilule du site (.maincta, design-system.md §6) : majuscules, Work Sans 600 1rem,
// padding 1.0625rem 2.5rem. Trois variantes mesurées sur wefiit.com :
//   - orange : CTA principal, dégradé 270deg #e95400 → #f98f03, texte blanc ;
//   - bleu : dégradé 270deg #001d84 → #2a4cff, texte blanc (hero des pages d'expertise) ;
//   - clair : fond #edf0ff, texte #001d84 (« Être recontacté »).
// Sous 767px, pleine largeur et texte centré.
// Composant React (rendu en HTML statique par Astro, aucun JS envoyé au visiteur) : format
// lu par Claude Design.
import './Bouton.css';

export interface BoutonProps {
  libelle: string;
  lien: string;
  variante?: 'orange' | 'bleu' | 'clair';
  nouvelOnglet?: boolean;
}

/**
 * Bouton en pilule du site WeFiiT, en majuscules. Variante `orange` pour le CTA principal,
 * `bleu` dans les heros, `clair` pour une action secondaire (« Être recontacté »).
 * Pleine largeur sous 767px.
 */
export default function Bouton({ libelle, lien, variante = 'orange', nouvelOnglet = false }: BoutonProps) {
  const cible = nouvelOnglet ? { target: '_blank', rel: 'noopener' } : {};
  return (
    <a className={`wt-bouton wt-bouton-${variante}`} href={lien} {...cible}>
      {libelle}
    </a>
  );
}
