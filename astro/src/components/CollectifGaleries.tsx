// Bande de fond pleine largeur : titre + intro, onglets soulignés (une catégorie chacun), et
// pour chaque catégorie une description puis une galerie de vidéos YouTube qui défile
// horizontalement (scroll-snap + flèches), puis une phrase de conclusion. Version composant du
// bloc pages/equipe/blocs/06-collectif.html (même rendu, même comportement, couleurs lues dans
// les tokens --wf-*).
// Composant React rendu en HTML statique par Astro ; flèches, vignettes YouTube et onglets
// vivent dans CollectifGaleries.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './CollectifGaleries.comportement';
import './CollectifGaleries.css';

export interface Video {
  id: string; // identifiant YouTube
  titre: string; // title de l'iframe créée au clic et libellé du bouton lecture
  legende: string; // titre affiché sous la vignette (tronqué à 2 lignes)
}
export interface Categorie {
  id: number; // sert aux ids wtc-tab-<id> / wtc-panel-<id> et à data-cat
  nom: string; // libellé de l'onglet
  description: string;
  videos: Video[];
}
export interface CollectifGaleriesProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  intro: string; // HTML autorisé (<br>, <span class="wtc-highlight">)
  categories: Categorie[]; // dans l'ordre des onglets ; la première est active au chargement
  conclusion: string; // HTML autorisé (<strong>)
  id?: string;
}

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const flecheGauche = `${CDN}63eabf64b5d45c38647886aa_Arrow5.svg`;
const flecheDroite = `${CDN}63eabfbda7b0471dbc86a3ec_Arrow-Right.svg`;

/**
 * Bande bleu clair pleine largeur avec onglets soulignés : chaque catégorie affiche une
 * description et une galerie horizontale de vidéos YouTube (flèches, vignette haute
 * résolution, lecteur chargé au clic), puis une phrase de conclusion.
 */
export default function CollectifGaleries({ titre, intro, categories, conclusion, id = 'wt-collectif' }: CollectifGaleriesProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  // Les panneaux sont écrits dans l'ordre des ids, comme dans le bloc d'origine (les onglets,
  // eux, suivent l'ordre de `categories`).
  const panneaux = [...categories].sort((a, b) => a.id - b.id);
  const idActif = categories[0].id;

  return (
    <section ref={ref} className="wt-collectif" id={id} aria-labelledby="wtc-title-heading">
      <div className="wtc-band">
        <div className="wtc-inner">
          <h2 className="wtc-title" id="wtc-title-heading">
            {titre}
            <span className="wtc-title-dot">.</span>
          </h2>
          <p className="wtc-intro" dangerouslySetInnerHTML={{ __html: intro }} />

          <div className="wtc-tabs" role="tablist">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                id={`wtc-tab-${c.id}`}
                className={c.id === idActif ? 'wtc-tab is-active' : 'wtc-tab'}
                role="tab"
                aria-selected={c.id === idActif ? 'true' : 'false'}
                aria-controls={`wtc-panel-${c.id}`}
                data-tab={c.id}
              >
                {c.nom}
              </button>
            ))}
          </div>

          {panneaux.map((c) => (
            <div
              key={c.id}
              className={c.id === idActif ? 'wtc-panel is-active' : 'wtc-panel'}
              id={`wtc-panel-${c.id}`}
              role="tabpanel"
              aria-labelledby={`wtc-tab-${c.id}`}
              data-panel={c.id}
            >
              <p className="wtc-desc">{c.description}</p>
              <span className="wtc-sr-only">Faites glisser pour voir toutes les vidéos</span>
              <div className="wtc-scroller-wrap">
                <button type="button" className="wtc-arrow wtc-arrow-left" data-dir="-1" aria-label="Vidéos précédentes">
                  <img src={flecheGauche} alt="" />
                </button>
                <div className="wtc-scroller">
                  <div className="wtc-track">
                    {c.videos.map((v) => (
                      <div key={v.id} className="wtc-card" data-cat={c.id}>
                        <div className="wtc-media" data-yt-id={v.id} data-yt-title={v.titre}>
                          <img className="wtc-poster" src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`} alt="" loading="lazy" />
                          <button type="button" className="wtc-play" aria-label={`Lire la vidéo : ${v.titre}`}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8 5v14l11-7z" fill="#fff" />
                            </svg>
                          </button>
                        </div>
                        <div className="wtc-card-title">{v.legende}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="button" className="wtc-arrow wtc-arrow-right" data-dir="1" aria-label="Vidéos suivantes">
                  <img src={flecheDroite} alt="" />
                </button>
              </div>
            </div>
          ))}

          <p className="wtc-rituals" dangerouslySetInnerHTML={{ __html: conclusion }} />
        </div>
      </div>
    </section>
  );
}
