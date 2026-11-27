// Haut et milieu du bloc « Des parcours qui se complètent » : photo d'équipe + titre + chiffres
// clés (décompte animé), puis deux panneaux côte à côte : parité en graphique (barre qui se
// remplit) et secteurs d'activité en bandeau qui défile tout seul. Version composant du bloc
// pages/culture/blocs/06-equipe.html.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur) ; le décompte, la
// barre et le défilement vivent dans ChiffresParcours.comportement.ts. Il rend deux frères
// (.wte-top et .wte-duo, sans enveloppe) : il se place dans un parent qui porte la classe
// .wt-notre-equipe et appelle son comportement (voir ParcoursEquipe).
import './ChiffresParcours.css';

export interface PhotoParcours {
  src: string;
  srcSet?: string;
  sizes?: string;
  largeur?: number;
  hauteur?: number;
  alt: string;
}
export interface ChiffreParcours {
  libelle: string;
  libelleMobile?: string; // version courte du libellé, affichée en mobile à la place de `libelle`
  valeur: string; // ex. « 78 », « 20 % » : c'est le texte que le décompte fait monter depuis 0
  detail: string;
  accent?: boolean; // chiffre en orange, détail masqué en mobile
}
export interface PariteParcours {
  titre: string;
  libelleFemmes: string;
  libelleHommes: string;
  pourcentFemmes: string; // ex. « 46 % » : la barre est calée dessus
  pourcentHommes: string;
  note: string; // mention sous la barre
  ariaLabel: string; // texte complet pour les lecteurs d'écran (le visuel est aria-hidden)
}
export interface SecteurParcours {
  icone: string; // contenu SVG (viewBox 24 x 24, trait 1.6) : <path>, <rect>...
  texte: string;
}
export interface SecteursParcours {
  titre: string;
  intro: string;
  ariaLabel: string;
  items: SecteurParcours[];
}
export interface ChiffresParcoursProps {
  photo: PhotoParcours;
  titreChiffres: string;
  chiffres: ChiffreParcours[];
  parite: PariteParcours;
  secteurs: SecteursParcours;
}

// La barre est calée sur le pourcentage de femmes ; sans JavaScript elle est déjà à cette largeur.
const largeurBarre = (pourcent: string) => {
  const n = parseFloat(pourcent.replace(',', '.'));
  return isNaN(n) ? undefined : `calc(${n}% - 1px)`;
};

/**
 * Photo + chiffres clés, puis parité femmes / hommes et secteurs d'activité en deux panneaux.
 */
export default function ChiffresParcours({ photo, titreChiffres, chiffres, parite, secteurs }: ChiffresParcoursProps) {
  return (
    <>
      <div className="wte-top">
        <div className="wte-photo">
          <img
            className="wte-photo-img"
            src={photo.src}
            srcSet={photo.srcSet}
            sizes={photo.sizes}
            width={photo.largeur}
            height={photo.hauteur}
            decoding="async"
            alt={photo.alt}
            loading="lazy"
          />
        </div>
        <div className="wte-stats-wrap">
          <h3 className="wte-stats-title">{titreChiffres}</h3>
          <dl className="wte-stats">
            {chiffres.map((c, i) => (
              <div key={i} className={c.accent ? 'wte-stat wte-stat-orange' : 'wte-stat'}>
                <dt className="wte-label">
                  {c.libelleMobile ? (
                    <>
                      <span className="wte-only-desktop">{c.libelle}</span>
                      <span className="wte-only-mobile">{c.libelleMobile}</span>
                    </>
                  ) : (
                    c.libelle
                  )}
                </dt>
                <dd className="wte-figure">{c.valeur}</dd>
                <dd className="wte-detail">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="wte-duo">
        <div className="wte-row">
          <div className="wte-row-text">
            <h3 className="wte-duo-title wte-eq-title">{parite.titre}</h3>
          </div>
          {/* Parité en graphique. Les deux pourcentages ne sont écrits qu'ici (data-wte-pct) : le
              comportement en tire la largeur de la barre. Le texte complet pour les lecteurs
              d'écran est dans aria-label. */}
          <div className="wte-eq-body" role="img" aria-label={parite.ariaLabel}>
            <div className="wte-parity-figs" aria-hidden="true">
              <div className="wte-par wte-par-f">
                <span className="wte-par-fig" data-wte-pct="f">{parite.pourcentFemmes}</span>
                <span className="wte-par-label">{parite.libelleFemmes}</span>
              </div>
              <div className="wte-par wte-par-m">
                <span className="wte-par-fig" data-wte-pct="m">{parite.pourcentHommes}</span>
                <span className="wte-par-label">{parite.libelleHommes}</span>
              </div>
            </div>
            <div className="wte-bar" aria-hidden="true">
              <span className="wte-bar-f" style={{ flexBasis: largeurBarre(parite.pourcentFemmes) }}></span>
              <span className="wte-bar-m"></span>
            </div>
            <p className="wte-eq-note" aria-hidden="true">{parite.note}</p>
          </div>
        </div>

        <div className="wte-row">
          <div className="wte-row-text">
            <h3 className="wte-duo-title wte-sec-title">{secteurs.titre}</h3>
            <p className="wte-duo-intro wte-sec-intro">{secteurs.intro}</p>
          </div>
          <div className="wte-sec-marquee">
            <ul className="wte-sec-list" tabIndex={0} aria-label={secteurs.ariaLabel}>
              {secteurs.items.map((s, i) => (
                <li key={i} className="wte-sec-item">
                  <span className="wte-sec-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      dangerouslySetInnerHTML={{ __html: s.icone }}
                    />
                  </span>
                  {s.texte}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
