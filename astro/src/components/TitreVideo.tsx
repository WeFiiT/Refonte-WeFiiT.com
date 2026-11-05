// Titre H2 centré (dégradé bleu + point orange) suivi d'une vidéo YouTube pleine largeur.
// Version composant du bloc pages/equipe/blocs/02-wefiit-2025.html (même rendu, mêmes
// valeurs, couleurs lues dans les tokens --wf-*).
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import './TitreVideo.css';

export interface TitreVideoProps {
  titre: string; // sans le point final : il est ajouté en orange
  video: string; // URL de l'iframe YouTube
  titreVideo: string; // attribut title de l'iframe (accessibilité)
  id?: string;
}

/**
 * Section avec un H2 centré (dégradé bleu, point orange) et une vidéo YouTube intégrée
 * en pleine largeur du bloc, au ratio de la vidéo réelle de la page équipe.
 */
export default function TitreVideo({ titre, video, titreVideo, id = 'wt-2025' }: TitreVideoProps) {
  return (
    <section className="wt-titre-video" id={id} aria-labelledby={`${id}-title`}>
      <h2 className="wt-title" id={`${id}-title`}>
        {titre}
        <span className="wt-title-dot">.</span>
      </h2>

      <div className="wt-video-frame">
        <iframe src={video} title={titreVideo} loading="lazy" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      </div>
    </section>
  );
}
