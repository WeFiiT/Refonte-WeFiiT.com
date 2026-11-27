// Liste numérotée de commandements (ou de principes) : sur desktop une grille ouverte de
// 2 colonnes lue en Z (1 et 2 face à face, puis 3 et 4...), tout visible ; sur mobile un
// accordéon (un seul commandement ouvert à la fois). Le numéro de chaque cellule « se dépose »
// (fondu + descente) quand elle entre dans l'écran. Version composant du bloc
// pages/culture/blocs/05-manifesto.html (même rendu, même comportement).
// Composant React rendu en HTML statique par Astro ; accordéon, bascule desktop / mobile et
// apparition des numéros sont gérés par ManifesteCommandements.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './ManifesteCommandements.comportement';
import './ManifesteCommandements.css';

export interface Commandement {
  titre: string; // l'énoncé, en semi-gras
  texte: string; // une ou deux phrases
}
export interface ManifesteCommandementsProps {
  surtitre?: string; // eyebrow au-dessus du titre
  titre: string; // sans le point final : il est ajouté en dégradé orange
  intro?: string; // chapô sous le titre
  commandements: Commandement[]; // numérotés 1, 2... dans l'ordre
  id?: string;
}

/**
 * Commandements numérotés : grille de 2 colonnes en Z sur desktop, accordéon sur mobile
 * (premier commandement ouvert). Sans JavaScript, tout reste ouvert et lisible.
 */
export default function ManifesteCommandements({ surtitre, titre, intro, commandements, id = 'wt-manifesto' }: ManifesteCommandementsProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  // Le bloc d'origine préfixe ses ids par « wtm » (wtm-title, wtm-b1, wtm-p1) : on garde ce
  // préfixe tant que l'id du bloc est celui d'origine, sinon il vient de l'id donné.
  const base = id === 'wt-manifesto' ? 'wtm' : id;

  return (
    <section ref={ref} className="wt-manifesto" id={id} aria-labelledby={`${base}-title`}>
      <header className="wtm-head">
        {surtitre && (
          <p className="wtm-eyebrow">
            <span className="wtm-eyebrow-line"></span>
            {surtitre}
          </p>
        )}
        <h2 className="wtm-title" id={`${base}-title`}>
          {titre}
          <span className="wtm-title-dot">.</span>
        </h2>
        {intro && <p className="wtm-lead">{intro}</p>}
      </header>

      {/* Même balisage pour desktop et mobile (pas de contenu dupliqué). Desktop : tout est
          affiché et les boutons sont neutralisés. Mobile : accordéon géré par le comportement.
          Sans JavaScript : tout reste ouvert. */}
      <ol className="wtm-list">
        {commandements.map((c, i) => (
          <li className="wtm-item" key={i}>
            <h3 className="wtm-h">
              <button type="button" className="wtm-btn" id={`${base}-b${i + 1}`} aria-expanded="true" aria-controls={`${base}-p${i + 1}`}>
                <span className="wtm-num" aria-hidden="true">{i + 1}</span>
                <span className="wtm-q">{c.titre}</span>
                <span className="wtm-icon" aria-hidden="true"></span>
              </button>
            </h3>
            <div className="wtm-panel" id={`${base}-p${i + 1}`}>
              <div className="wtm-panel-in">
                <p className="wtm-text">{c.texte}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
