// Widget flottant « podcast » : pastille en bas à droite de la fenêtre (qui apparaît après 2 secondes
// et se replie en rond quand on a défilé de 15 % de la page), qui s'ouvre à la demande en une carte avec
// le lecteur Spotify d'un épisode. Rien ne s'ouvre ni ne se lance seul ; fermer la carte pendant
// l'écoute laisse le son continuer (la pastille passe à « En lecture »). Version composant du bloc
// pages/culture/blocs/12-widget-podcast.html (même rendu, même comportement).
// Composant React rendu en HTML statique par Astro (aucun JS React côté visiteur) ; le lecteur Spotify
// (API iFrame, chargée à la première ouverture), le repli au défilement et la fermeture à Échap vivent
// dans WidgetPodcast.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './WidgetPodcast.comportement';
import './WidgetPodcast.css';

export interface WidgetPodcastProps {
  titre: string; // titre de l'émission dans la carte, sans le point final : il est ajouté en dégradé orange
  etiquette: string; // petit carré orange au-dessus du titre (ex. « Nouveau podcast »)
  texte: string; // présentation de l'émission dans la carte
  episode: string; // identifiant de l'épisode Spotify (open.spotify.com/episode/<identifiant>)
  libelle: string; // libellé de la pastille et nom accessible du bouton (ex. « Écouter notre podcast »)
  libelleNouveau: string; // mention orange de la pastille au repos (ex. « Nouveau »)
  libelleEnLecture: string; // mention orange de la pastille quand le podcast joue carte fermée (ex. « En lecture »)
  libelleFermer: string; // nom accessible du bouton de fermeture de la carte (ex. « Fermer le podcast »)
  titreLecteur: string; // title de l'iframe Spotify (ex. « Podcast All about US by WeFiiT sur Spotify »)
  id?: string;
}

/**
 * Pastille flottante (position: fixed, en bas à droite, sous le menu du site) qui ouvre une carte avec
 * le lecteur Spotify d'un épisode. Un seul widget par page : les ids de la carte (wtp-card, wtp-title)
 * sont fixes. Le lecteur n'est créé qu'à l'ouverture, pour ne rien charger de Spotify avant.
 */
export default function WidgetPodcast({
  titre,
  etiquette,
  texte,
  episode,
  libelle,
  libelleNouveau,
  libelleEnLecture,
  libelleFermer,
  titreLecteur,
  id = 'wt-podcast',
}: WidgetPodcastProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  return (
    <div ref={ref} className="wt-podcast" id={id}>
      {/* Carte ouverte (masquée au chargement) */}
      <div className="wtp-card" id="wtp-card" role="region" aria-labelledby="wtp-title" hidden>
        <button type="button" className="wtp-close" aria-label={libelleFermer}>
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
        <p className="wtp-tag">{etiquette}</p>
        <p className="wtp-title" id="wtp-title">
          {titre}
          <span className="wtp-title-dot">.</span>
        </p>
        <p className="wtp-text">{texte}</p>
        {/* Le lecteur Spotify est ajouté ici par le script à la 1re ouverture. Pour changer d'épisode, ne modifier que
            la prop `episode` (data-spotify-episode). */}
        <div className="wtp-player-slot" data-spotify-episode={episode} data-spotify-title={titreLecteur}></div>
      </div>

      {/* Pastille (visible quand la carte est fermée) */}
      <button type="button" className="wtp-pill" aria-expanded="false" aria-controls="wtp-card">
        <span className="wtp-pill-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
            <rect x="3" y="13.5" width="4.5" height="6.5" rx="1.75" />
            <rect x="16.5" y="13.5" width="4.5" height="6.5" rx="1.75" />
          </svg>
        </span>
        <span className="wtp-pill-text">
          <span className="wtp-pill-text-in">
            <span className="wtp-pill-new">
              <span className="wtp-pill-new-a">{libelleNouveau}</span>
              <span className="wtp-pill-new-b">{libelleEnLecture}</span>
            </span>
            <span className="wtp-pill-label">{libelle}</span>
          </span>
        </span>
      </button>
    </div>
  );
}
