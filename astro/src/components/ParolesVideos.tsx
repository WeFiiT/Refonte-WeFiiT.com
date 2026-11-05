// Titre + intro, puis des vidéos : grille de 3 colonnes à partir de 768px, carrousel infini
// (glisser, flèches, pastilles) en dessous, puis un bouton d'appel à l'action. Version
// composant du bloc pages/equipe/blocs/05-paroles.html (même rendu, même comportement,
// couleurs lues dans les tokens --wf-*).
// Composant React rendu en HTML statique par Astro ; le carrousel est animé par
// ParolesVideos.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './ParolesVideos.comportement';
import './ParolesVideos.css';

export interface Video {
  src: string;
  titre: string; // title de l'iframe (accessibilité)
  legende: string; // texte affiché sous la vidéo
}
export interface ParolesVideosProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  intro: string; // HTML autorisé (<em>)
  videos: Video[];
  ctaTexte: string;
  ctaLien: string;
  id?: string;
}

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const flecheGauche = `${CDN}63eabf64b5d45c38647886aa_Arrow5.svg`;
const flecheDroite = `${CDN}63eabfbda7b0471dbc86a3ec_Arrow-Right.svg`;

const ALLOW_GRILLE = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
const ALLOW_CLONE = 'accelerometer; encrypted-media';

/**
 * Section « paroles » : titre et intro centrés, vidéos en grille de 3 colonnes sur desktop
 * et en carrousel infini (glisser, flèches, pastilles) sur mobile, puis un bouton orange.
 */
export default function ParolesVideos({ titre, intro, videos, ctaTexte, ctaLien, id = 'wt-paroles' }: ParolesVideosProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  const total = videos.length;
  // Piste du carrousel = [clone de la dernière, vidéos..., clone de la première] : le script saute
  // d'un clone à la vraie vidéo correspondante une fois l'animation finie (boucle infinie).
  const premiere = videos[0];
  const derniere = videos[total - 1];

  return (
    <section ref={ref} className="wt-paroles" id={id} aria-labelledby={`${id}-title`}>
      <h2 className="wt-title" id={`${id}-title`}>{titre}<span className="wt-title-dot">.</span></h2>
      {/* L'intro vient de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
      <p className="wt-intro" dangerouslySetInnerHTML={{ __html: intro }} />

      <div className="wt-grid">
        {videos.map((v, i) => (
          <div className="wt-square" key={i}>
            <div className="wt-video-frame">
              <iframe src={v.src} title={v.titre} loading="lazy" frameBorder="0" allow={ALLOW_GRILLE} allowFullScreen />
            </div>
            <div className="wt-caption">{v.legende}</div>
          </div>
        ))}
      </div>

      <div className="wt-carousel">
        <div className="wt-carousel-wrap">
          <button type="button" className="wt-arrow wt-arrow-left" data-dir="-1" aria-label="Vidéo précédente"><img src={flecheGauche} alt="" /></button>
          <div className="wt-carousel-viewport">
            <div className="wt-carousel-track">
              <div className="wt-slide" aria-hidden="true">
                <div className="wt-video-frame">
                  <iframe src={derniere.src} title="" tabIndex={-1} loading="lazy" frameBorder="0" allow={ALLOW_CLONE} allowFullScreen />
                </div>
                <div className="wt-caption">{derniere.legende}</div>
              </div>
              {videos.map((v, i) => (
                <div className="wt-slide" role="group" aria-label={`Vidéo ${i + 1} sur ${total}`} key={i}>
                  <div className="wt-video-frame">
                    <iframe src={v.src} title={v.titre} loading="lazy" frameBorder="0" allow={ALLOW_GRILLE} allowFullScreen />
                  </div>
                  <div className="wt-caption">{v.legende}</div>
                </div>
              ))}
              <div className="wt-slide" aria-hidden="true">
                <div className="wt-video-frame">
                  <iframe src={premiere.src} title="" tabIndex={-1} loading="lazy" frameBorder="0" allow={ALLOW_CLONE} allowFullScreen />
                </div>
                <div className="wt-caption">{premiere.legende}</div>
              </div>
            </div>
          </div>
          <button type="button" className="wt-arrow wt-arrow-right" data-dir="1" aria-label="Vidéo suivante"><img src={flecheDroite} alt="" /></button>
        </div>
        <div className="wt-dots">
          {videos.map((_, i) => (
            <button
              type="button"
              className={i === 0 ? 'wt-dot is-active' : 'wt-dot'}
              data-index={i}
              aria-label={`Aller à la vidéo ${i + 1} sur ${total}`}
              key={i}
            />
          ))}
        </div>
      </div>

      <a className="wt-cta" href={ctaLien}>{ctaTexte}</a>
    </section>
  );
}
