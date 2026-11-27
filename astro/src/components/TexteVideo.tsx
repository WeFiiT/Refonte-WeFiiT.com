// Texte (surtitre, titre, paragraphes) à gauche et vidéo YouTube en façade à droite : version
// composant de la fin du bloc pages/culture/blocs/06-equipe.html (« Women in WeFiiT »).
// Façade : « Vidéo à venir » en rendu statique ; le comportement (TexteVideo.comportement.ts)
// insère la vignette, affiche le bouton lecture et crée l'iframe au clic. À la différence de
// TitreVideo (iframe directe) et de CollectifGaleries (vignette déjà dans le HTML), la
// vignette est ici posée par le script : un identifiant vide laisse « Vidéo à venir ».
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur) ; il se place dans
// un parent qui porte la classe .wt-notre-equipe (voir ParcoursEquipe).
import { useEffect, useRef } from 'react';
import { init } from './TexteVideo.comportement';
import './TexteVideo.css';

export interface ParagrapheTexteVideo {
  texte: string; // HTML autorisé (picto SVG, liens, <strong>)
  accroche?: boolean; // phrase d'accroche (bleu vif, graisse 500)
}
export interface VideoFacade {
  id: string; // identifiant YouTube (la partie après « v= »)
  libelleLecture: string; // aria-label du bouton lecture
  titreLecteur: string; // title de l'iframe créée au clic
  texteAbsent?: string; // affiché tant qu'il n'y a pas de vidéo
}
export interface TexteVideoProps {
  surtitre: string;
  titre: string; // sans le point final : il est ajouté en orange
  paragraphes: ParagrapheTexteVideo[];
  video: VideoFacade;
}

/**
 * Deux colonnes : texte à gauche, vidéo YouTube en façade (vignette + bouton lecture) à droite ;
 * empilées en mobile.
 */
export default function TexteVideo({ surtitre, titre, paragraphes, video }: TexteVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  return (
    <div ref={ref} className="wte-women">
      <div className="wte-women-text">
        <p className="wte-eyebrow">
          <span className="wte-eyebrow-line"></span>
          {surtitre}
        </p>
        <h3 className="wte-women-title">
          {titre}
          <span className="wte-women-dot">.</span>
        </h3>
        {paragraphes.map((p, i) => (
          <p key={i} className={p.accroche ? 'wte-hook' : undefined} dangerouslySetInnerHTML={{ __html: p.texte }} />
        ))}
      </div>
      {/* L'identifiant est dans data-yt-id ; data-yt-title est le titre de l'iframe (ajouté au
          balisage d'origine, où il était écrit en dur dans le script). */}
      <div className="wte-video" data-yt-id={video.id} data-yt-title={video.titreLecteur}>
        <div className="wte-video-placeholder">{video.texteAbsent ?? 'Vidéo à venir'}</div>
        <button type="button" className="wte-play" hidden aria-label={video.libelleLecture}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="#fff"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
