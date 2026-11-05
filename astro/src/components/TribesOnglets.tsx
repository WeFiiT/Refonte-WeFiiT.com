// Titre + intro, puis une barre d'onglets en pilule orange (une par tribe) qui affiche une
// carte : texte (objectif, Key Initiatives) à côté de la photo. Version composant du bloc
// pages/equipe/blocs/08-tribes.html (même rendu, même comportement, couleurs lues dans les
// tokens --wf-*).
// Sert aussi de composant d'onglets générique (ex. « Prendre soin » de la page RSE) grâce à
// des props optionnelles : sans elles, le rendu est exactement celui des Tribes.
//   - `etiquette` (par onglet) : texte au-dessus de l'objectif, « Tribe <nom> » par défaut,
//     chaîne vide = pas d'étiquette ;
//   - `titreListe` (global ou par onglet) : titre de la liste, « Key Initiatives » par défaut ;
//   - `alt` (par onglet) : description de la photo pour les lecteurs d'écran.
//   - `lien` (par onglet) : lien sous la liste, ex. « Prendre RDV pour échanger sur vos enjeux ».
//   - `formatPhoto` : « carre » réserve un cadre carré à la photo sur ordinateur (photos carrées
//     des pages d'expertise, ~940x950), au lieu du cadre large des Tribes qui les rognerait.
// Ids des onglets et des panneaux : ceux du bloc d'origine (wt-tab-N, wt-panel-N) avec l'id
// par défaut ; préfixés par `id` sinon, ce qui permet plusieurs instances sur une page.
// Composant React rendu en HTML statique par Astro ; le changement d'onglet vit dans
// TribesOnglets.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './TribesOnglets.comportement';
import './TribesOnglets.css';

export interface Initiative {
  texte: string;
  invitation?: boolean; // vrai = icône « + » (place laissée à une idée du lecteur), sinon coche
}
export interface Tribe {
  cle: string; // identifiant court, ex. "experience" (data-tribe)
  nom: string; // nom de l'onglet, repris dans « Tribe <nom> »
  objectif: string;
  initiatives: Initiative[];
  photo: string;
  etiquette?: string;
  titreListe?: string;
  alt?: string;
  lien?: { libelle: string; lien: string; nouvelOnglet?: boolean };
}
export interface TribesOngletsProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  intro: string; // HTML autorisé (<strong>, <br>)
  tribes: Tribe[];
  titreListe?: string;
  aideDefilement?: string; // texte lu par les lecteurs d'écran au-dessus des onglets
  formatPhoto?: 'paysage' | 'carre';
  id?: string;
}

/**
 * Bloc à onglets en pilule orange : un onglet par tribe (ou par thème), chacun affichant une
 * carte texte (étiquette, objectif, liste à coches) à côté d'une photo décalée sur fond bleu.
 * Sert aussi d'onglets génériques (page RSE, pages d'expertise) via les props optionnelles.
 */
export default function TribesOnglets({
  titre,
  intro,
  tribes,
  titreListe = 'Key Initiatives',
  aideDefilement = 'Faites glisser pour voir tous les tribes',
  formatPhoto = 'paysage',
  id = 'wt-tribes',
}: TribesOngletsProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  const prefixe = id === 'wt-tribes' ? 'wt' : id; // id par défaut : ids d'origine conservés
  const idTitre = id === 'wt-tribes' ? 'wt-title-heading' : `${id}-titre`;

  return (
    <section ref={ref} className={formatPhoto === 'carre' ? 'wt-tribes wt-photo-carree' : 'wt-tribes'} id={id} aria-labelledby={idTitre}>
      <h2 className="wt-title" id={idTitre}>
        {titre}
        <span className="wt-title-dot">.</span>
      </h2>
      <p className="wt-intro" dangerouslySetInnerHTML={{ __html: intro }} />

      <div className="wt-tabs-wrap">
        <span className="wt-sr-only">{aideDefilement}</span>
        <div className="wt-tabs" role="tablist">
          {tribes.map((t, i) => (
            <button
              key={t.cle}
              type="button"
              id={`${prefixe}-tab-${i}`}
              className={i === 0 ? 'wt-tab is-active' : 'wt-tab'}
              role="tab"
              aria-selected={i === 0 ? 'true' : 'false'}
              aria-controls={`${prefixe}-panel-${i}`}
              data-tab={i}
            >
              {t.nom}
            </button>
          ))}
        </div>
      </div>

      <div className="wt-panels">
        {tribes.map((t, i) => {
          const etiquette = t.etiquette ?? `Tribe ${t.nom}`;
          return (
            <div
              key={t.cle}
              className={i === 0 ? 'wt-panel is-active' : 'wt-panel'}
              id={`${prefixe}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${prefixe}-tab-${i}`}
              data-panel={i}
            >
              <div className="wt-card">
                <div className="wt-text">
                  {etiquette ? (
                    <div className="wt-label">
                      <span className="wt-line"></span>
                      {etiquette}
                    </div>
                  ) : null}
                  <p className="wt-objective">{t.objectif}</p>
                  <div className="wt-ki-title">{t.titreListe ?? titreListe}</div>
                  <ul className="wt-ki-list">
                    {t.initiatives.map((k) => (
                      <li key={k.texte}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <circle cx="12" cy="12" r="9.5" />
                          {k.invitation ? <path d="M12 8v8M8 12h8" /> : <path d="M8 12.3l2.5 2.5L16 9" />}
                        </svg>
                        {k.texte}
                      </li>
                    ))}
                  </ul>
                  {t.lien && (
                    <a className="wt-lien" href={t.lien.lien} {...(t.lien.nouvelOnglet ? { target: '_blank', rel: 'noopener' } : {})}>
                      {t.lien.libelle}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                  )}
                </div>
                <div className="wt-photo-frame">
                  <div
                    className="wt-photo"
                    data-tribe={t.cle}
                    style={{ backgroundImage: `url('${t.photo}')` }}
                    {...(t.alt ? { role: 'img', 'aria-label': t.alt } : {})}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
