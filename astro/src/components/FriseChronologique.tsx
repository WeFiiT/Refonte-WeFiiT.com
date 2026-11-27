// Frise chronologique : rail des années (points et libellés), vague SVG animée avec bateau qui
// avance jusqu'à l'étape active, puis cartes (photo 4:3, année, titre, texte) qui défilent,
// flèches et glisser. Version composant du bloc pages/culture/blocs/02-histoire.html (même rendu,
// même comportement, couleurs lues dans les tokens --wf-*).
// Composant React rendu en HTML statique par Astro ; la navigation entre étapes, le rail borné, le
// clavier et le glisser vivent dans FriseChronologique.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './FriseChronologique.comportement';
import './FriseChronologique.css';

export interface PhotoEtape {
  src: string;
  srcSet?: string; // liste « url largeur, url largeur » du CDN
  sizes?: string; // par défaut : la prop `tailles` du composant
  largeur: number; // attribut width (évite le décalage de mise en page)
  hauteur: number; // attribut height
  alt: string;
}
export interface Etape {
  annee: string; // libellé du rail et de la carte (texte, pas un nombre : « 2019 »)
  titre: string; // HTML autorisé (<br> pour couper un titre long)
  texte: string; // HTML autorisé (liens internes ou externes)
  photo: PhotoEtape;
  libelle?: string; // aria-label du bouton d'année quand « Aller à l'année … » ne suffit pas (années proches)
}
export interface LibellesFrise {
  precedent?: string; // aria-label de la flèche gauche
  suivant?: string; // aria-label de la flèche droite
  annee?: string; // modèle du aria-label des boutons d'année, `{annee}` est remplacé par l'année
}
export interface FriseChronologiqueProps {
  etapes: Etape[]; // dans l'ordre chronologique ; la première est active au chargement
  titreRegion?: string; // titre masqué visuellement, nom de la région (aria-labelledby) et H2 du plan de la page
  libelles?: LibellesFrise;
  tailles?: string; // attribut sizes des photos quand une étape n'a pas le sien
  id?: string;
}

// Les mêmes ondulations servent aux deux traits de la vague (pointillé et plein) : un départ à
// -40 puis 21 demi-périodes de 20 unités, soit une unité de plus que la zone visible (400) pour
// que la houle (décalage d'une longueur d'onde en boucle) ne montre jamais de bord.
const ONDE = 'M-40 6 q10 -6 20 0' + ' t20 0'.repeat(21);

/**
 * Frise « Notre histoire » : une étape par année, un bateau qui navigue de l'une à l'autre sur une
 * vague, des cartes à faire défiler (flèches, clic sur l'année ou la carte, clavier, glisser).
 * Les étapes sont des props, rien n'est propre à une page : le composant sert à toute chronologie.
 */
export default function FriseChronologique({
  etapes,
  titreRegion = 'Notre histoire',
  libelles = {},
  tailles = '(max-width: 479px) 100vw, 300px',
  id = 'wt-histoire',
}: FriseChronologiqueProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  const { precedent = 'Étape précédente', suivant = 'Étape suivante', annee: modeleAnnee = "Aller à l'année {annee}" } = libelles;
  // Id d'origine du titre quand l'id par défaut est gardé (identique au bloc) ; sinon dérivé de l'id pour rester unique.
  const titreId = id === 'wt-histoire' ? 'wth-title-heading' : `${id}-titre`;

  return (
    <section ref={ref} className="wt-histoire" id={id} aria-labelledby={titreId}>
      {/* Titre de la frise : masqué visuellement (la frise se lit sous le H1 de la page), mais présent dans le plan de la page
          et nom de la région ; les titres de cartes sont des H3 dessous. */}
      <h2 className="wth-sr-only" id={titreId}>{titreRegion}</h2>

      <div className="wth-inner">
        <div className="wth-timeline">
          <div className="wth-wave-zone">
            <svg className="wth-wave wth-wave-dashed" viewBox="0 0 400 12" preserveAspectRatio="none" aria-hidden="true">
              <path d={ONDE}></path>
            </svg>
            {/* clip-path de départ : vague pleine entièrement rognée (étape 0), le script l'ajuste ensuite. */}
            <svg
              className="wth-wave wth-wave-solid"
              viewBox="0 0 400 12"
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{ clipPath: 'inset(-0.25rem 100% -0.25rem 0)' }}
            >
              <path d={ONDE}></path>
            </svg>
            {/* Bateau provisoire : l'icône définitive remplacera le contenu de ce <svg> uniquement. */}
            <div className="wth-boat" style={{ left: '0%' }}>
              <svg viewBox="0 0 32 28" aria-hidden="true">
                <path d="M16 2 L16 19 L6 19 Z" fill="#2a4cff"></path>
                <path d="M18 6 L18 19 L26 19 Z" fill="#e95400"></path>
                <path d="M3 21 H29 L25 27 H7 Z" fill="#001d84"></path>
              </svg>
            </div>
          </div>
          <div className="wth-years">
            {etapes.map((e, i) => (
              <button
                type="button"
                className={i === 0 ? 'wth-year is-active' : 'wth-year'}
                data-step={i}
                aria-current={i === 0 ? 'step' : undefined}
                aria-label={e.libelle ?? modeleAnnee.replace('{annee}', e.annee)}
                key={i}
              >
                <span className="wth-year-dot-wrap"><span className="wth-year-dot"></span></span>
                <span className="wth-year-label">{e.annee}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="wth-rail-outer">
          <div className="wth-rail-wrap">
            <div className="wth-track">
              {etapes.map((e, i) => (
                <div className={i === 0 ? 'wth-card is-active' : 'wth-card'} data-step={i} key={i}>
                  <div className="wth-card-photo">
                    <img
                      className="wth-card-photo-img"
                      src={e.photo.src}
                      srcSet={e.photo.srcSet}
                      sizes={e.photo.sizes ?? tailles}
                      width={e.photo.largeur}
                      height={e.photo.hauteur}
                      decoding="async"
                      alt={e.photo.alt}
                      loading="lazy"
                    />
                  </div>
                  <div className="wth-card-body">
                    <div className="wth-card-year">{e.annee}</div>
                    {/* Contenus issus de nos fichiers (jamais d'un visiteur) : HTML injecté sans risque. */}
                    <h3 className="wth-card-title" dangerouslySetInnerHTML={{ __html: e.titre }} />
                    <p className="wth-card-text" dangerouslySetInnerHTML={{ __html: e.texte }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flèches : rond bleu au centre de la hauteur des cartes, sur les bords du rail. Elles se masquent
              quand il n'y a plus d'étape dans cette direction (la flèche gauche est désactivée au départ). */}
          <div className="wth-arrows">
            <button type="button" className="wth-arrow wth-arrow-left" aria-label={precedent} disabled aria-disabled="true">
              <svg viewBox="0 0 20 15" fill="none" aria-hidden="true">
                <path d="M8.667 1L2 7.665l6.667 6.665" stroke="#fff" strokeWidth="1.5"></path>
                <path d="M2 7.665h18" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"></path>
              </svg>
            </button>
            <button type="button" className="wth-arrow wth-arrow-right" aria-label={suivant}>
              <svg viewBox="0 0 20 15" fill="none" aria-hidden="true">
                <path d="M11.334 14.33L18 7.665 11.334 1" stroke="#fff" strokeWidth="1.5"></path>
                <path d="M18 7.665H0" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
