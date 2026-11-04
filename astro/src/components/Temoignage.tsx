// Carte de témoignage : photo qui déborde en haut de la carte, guillemets SVG du site,
// texte et signature centrés. Avec ou sans bande de fond pleine largeur.
// Version composant des blocs pages/equipe/blocs/04, 07 et 09 (mêmes rendus, mêmes
// valeurs, couleurs lues dans les tokens --wf-*). Les trois blocs ne diffèrent que par
// la bande et quelques espacements : ce sont les props `bande` et `carteMobileHaut`.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import './Temoignage.css';

export interface TemoignageProps {
  personne: string; // identifiant court, ex. "yamila" : sert à l'id (#wt-temoignage-<personne>) et à data-person
  nom: string;
  role: string;
  texte: string;
  photo: string;
  bande?: { padding: string }; // fond --wf-blue-50 pleine largeur ; absent = bloc sur fond blanc
  carteMobileHaut?: string; // padding haut de la carte sous 767px
}

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const iconeHautGauche = `${CDN}63d6a06f6b5cd13d0c86e4a7_quotes-1.svg`;
const iconeBasDroite = `${CDN}63d6a06fcc3c397e769ef781_quotes.svg`;

/**
 * Carte de témoignage centrée : photo qui déborde en haut, guillemets du site, citation
 * et signature (nom en gras | fonction). Posée sur une bande bleu pâle pleine largeur si
 * `bande` est fourni, sinon sur fond blanc.
 */
export default function Temoignage({ personne, nom, role, texte, photo, bande, carteMobileHaut = '5rem' }: TemoignageProps) {
  // Contenu de la carte, identique dans les deux variantes (avec ou sans bande).
  const carte = (
    <div className="wtt-testimonial">
      <div className="wtt-card">
        <div className="wtt-photo" data-person={personne}>
          <img src={photo} alt={`${nom}, ${role}`} loading="lazy" />
        </div>
        <img className="wtt-quote-icon wtt-quote-icon-tl" src={iconeHautGauche} alt="" />
        <img className="wtt-quote-icon wtt-quote-icon-br" src={iconeBasDroite} alt="" />
        <p className="wtt-text">{texte}</p>
        <p className="wtt-author">
          <strong className="wtt-name">{nom}</strong> | {role}
        </p>
      </div>
    </div>
  );
  return (
    <section
      className={`wt-temoignage ${bande ? 'wtt-avec-bande' : 'wtt-sans-bande'}`}
      id={`wt-temoignage-${personne}`}
      aria-label={`Témoignage de ${nom}`}
      style={{ ['--wtt-carte-mobile-haut' as string]: carteMobileHaut }}
    >
      {bande ? (
        <div className="wtt-band" style={{ padding: bande.padding }}>
          <div className="wtt-inner">{carte}</div>
        </div>
      ) : (
        carte
      )}
    </section>
  );
}
