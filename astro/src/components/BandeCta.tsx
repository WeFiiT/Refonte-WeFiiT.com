// Bande pleine largeur en dégradé bleu (110deg), titre blanc, texte et un ou deux boutons.
// Reproduit la section « bilan carbone » de /notre-engagement-rse et « Prêts à embarquer »
// des pages d'expertise (valeurs mesurées : padding 80px en haut, 60px en bas ; boutons à
// 32px d'écart). Sans marge : collée aux blocs voisins.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import Bouton from './Bouton';
import './BandeCta.css';

interface Cta {
  libelle: string;
  lien: string;
  nouvelOnglet?: boolean;
}
export interface BandeCtaProps {
  titre: string; // HTML autorisé (<br>) ; pas de point orange sur ce titre, comme sur le site
  texte: string; // HTML autorisé (<br>)
  cta: Cta; // bouton orange
  ctaSecondaire?: Cta; // bouton clair à droite, ex. « Être recontacté »
  espaceApres?: boolean; // vrai = 3rem de marge basse (bloc suivant sur fond blanc) ; faux = collée au bloc suivant
  id?: string;
}

/**
 * Bande pleine largeur en dégradé bleu : titre de bande (Allroundgothic, centré), texte
 * blanc, un bouton orange et un bouton clair optionnel. Sert de transition vers une prise
 * de contact entre deux sections.
 */
export default function BandeCta({ titre, texte, cta, ctaSecondaire, espaceApres = false, id = 'wt-bande-cta' }: BandeCtaProps) {
  return (
    <section className={`wt-bande-cta${espaceApres ? ' wt-espace-apres' : ''}`} id={id} aria-labelledby={`${id}-titre`}>
      <div className="wt-bande">
        <div className="wt-inner">
          {/* Titre et texte viennent de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
          <h2 className="wt-titre" id={`${id}-titre`} dangerouslySetInnerHTML={{ __html: titre }} />
          <p className="wt-texte" dangerouslySetInnerHTML={{ __html: texte }} />
          <div className={`wt-ctas${ctaSecondaire ? ' wt-ctas-double' : ''}`}>
            <Bouton {...cta} variante="orange" />
            {ctaSecondaire && <Bouton {...ctaSecondaire} variante="clair" />}
          </div>
        </div>
      </div>
    </section>
  );
}
