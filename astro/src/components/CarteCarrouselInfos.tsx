// Carte à deux zones : à gauche un carrousel de photos paysage (flèches, points + trait de
// position, clavier, défilement natif par scroll-snap), à droite un texte (surtitre, titre,
// paragraphe avec lien externe), et en bas une rangée d'infos pratiques (intitulé, valeur,
// libellé). Version composant du bloc pages/culture/blocs/08-bureaux.html (même rendu, même
// comportement).
// Composant React rendu en HTML statique par Astro ; flèches, points et clavier sont gérés par
// CarteCarrouselInfos.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './CarteCarrouselInfos.comportement';
import './CarteCarrouselInfos.css';

export interface PhotoCarrousel {
  src: string;
  srcset?: [string, number][]; // [url, largeur en px] ; absent = pas de srcset
  sizes?: string;
  largeur?: number; // dimensions réelles du fichier : réservent la place avant le chargement
  hauteur?: number;
  alt: string;
}
export interface InfoPratique {
  intitule: string; // « Ouverture », « Accès »...
  valeur: string; // la valeur en grand ; HTML autorisé (ex. une étoile masquée aux lecteurs d'écran)
  libelles?: string[]; // une ligne de libellé par entrée sous la valeur
  lectureComplete?: string; // phrase lue par les lecteurs d'écran à la place de la valeur et des libellés (affichés mais masqués aux lecteurs)
  enLigne?: boolean; // première valeur et premier libellé sur une même ligne (dès 768px) : cellule « Accès »
}
export interface CarteCarrouselInfosProps {
  photos: PhotoCarrousel[]; // avec une seule photo : ni flèches ni points
  libelleCarrousel: string; // nom du carrousel pour les lecteurs d'écran
  surtitre?: string; // eyebrow au-dessus du titre
  titre: string; // sans le point final : il est ajouté en dégradé orange
  texte: string; // HTML autorisé (<strong>, lien externe)
  infos: InfoPratique[];
  fleches?: { gauche: string; droite: string }; // pictogrammes des flèches (ceux du site par défaut)
  id?: string;
}

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const FLECHES = { gauche: `${CDN}63eabf64b5d45c38647886aa_Arrow5.svg`, droite: `${CDN}63eabfbda7b0471dbc86a3ec_Arrow-Right.svg` };

/**
 * Carte avec carrousel de photos, texte et infos pratiques. Sur tablette et mobile : carrousel
 * (16:9 puis 3:2), texte, puis infos en 2 x 2.
 */
export default function CarteCarrouselInfos({ photos, libelleCarrousel, surtitre, titre, texte, infos, fleches = FLECHES, id = 'nos-bureaux' }: CarteCarrouselInfosProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  // Le bloc d'origine nomme son titre « wtb-title » : on garde cet id tant que l'id du bloc est
  // celui d'origine, sinon il est dérivé de l'id donné (plusieurs instances possibles).
  const idTitre = id === 'nos-bureaux' ? 'wtb-title' : `${id}-title`;

  return (
    <section ref={ref} className="wt-nos-bureaux" id={id} aria-labelledby={idTitre}>
      <div className="wtb-card">
        <div className="wtb-carousel" role="region" aria-roledescription="carrousel" aria-label={libelleCarrousel}>
          <div className="wtb-slides">
            {photos.map((p, i) => (
              <figure className="wtb-slide" role="group" aria-roledescription="diapositive" aria-label={`Photo ${i + 1} sur ${photos.length}`} key={p.src}>
                {/* Toutes les photos se chargent à la demande (le carrousel est sous le pli) et sont servies en variantes réduites par srcset. */}
                <img
                  className="wtb-slide-img"
                  src={p.src}
                  srcSet={p.srcset?.map(([url, largeur]) => `${url} ${largeur}w`).join(', ') || undefined}
                  sizes={p.sizes}
                  width={p.largeur}
                  height={p.hauteur}
                  decoding="async"
                  alt={p.alt}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
          <button type="button" className="wtb-arrow wtb-arrow-left" aria-label="Photo précédente">
            <img src={fleches.gauche} alt="" />
          </button>
          <button type="button" className="wtb-arrow wtb-arrow-right" aria-label="Photo suivante">
            <img src={fleches.droite} alt="" />
          </button>
          <div className="wtb-dots" role="group" aria-label="Choisir une photo"></div>
        </div>

        <div className="wtb-body">
          <div className="wtb-head">
            {surtitre && (
              <p className="wtb-eyebrow">
                <span className="wtb-eyebrow-line"></span>
                {surtitre}
              </p>
            )}
            <h2 className="wtb-title" id={idTitre}>
              {titre}
              <span className="wtb-title-dot">.</span>
            </h2>
          </div>
          {/* Texte issu de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
          <p className="wtb-text" dangerouslySetInnerHTML={{ __html: texte }} />
        </div>

        <dl className="wtb-infos">
          {infos.map((info) => {
            // Avec `lectureComplete`, la valeur et les libellés sont masqués aux lecteurs d'écran
            // (ils lisent la phrase complète à la place).
            const masque = info.lectureComplete ? ({ 'aria-hidden': true } as const) : {};
            return (
              <div className={info.enLigne ? 'wtb-info wtb-info--acces' : 'wtb-info'} key={info.intitule}>
                <dt className="wtb-info-k">{info.intitule}</dt>
                {info.lectureComplete && <dd className="wtb-sr-only">{info.lectureComplete}</dd>}
                <dd className="wtb-info-v" {...masque} dangerouslySetInnerHTML={{ __html: info.valeur }} />
                {info.libelles?.map((l) => (
                  <dd className="wtb-info-l" {...masque} key={l}>{l}</dd>
                ))}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
