// Énoncé centré sur bande pâle pleine largeur (raison d'être, mission, promesse), avec un
// surtitre en eyebrow et un effet de balayage orange qui révèle la phrase ligne par ligne à
// l'arrivée du bloc à l'écran. Version composant du bloc
// pages/culture/blocs/03-raison-etre.html (même rendu, même comportement, couleurs lues dans les
// tokens --wf-*).
// Composant React rendu en HTML statique par Astro ; le balayage est géré par
// RaisonEtre.comportement.ts. Sans JavaScript (ou animations réduites), la phrase est affichée
// telle quelle, point final compris.
import { useEffect, useRef } from 'react';
import { init } from './RaisonEtre.comportement';
import './RaisonEtre.css';

export interface RaisonEtreProps {
  texte: string; // une seule phrase, point final compris (le script l'habille en orange) ; texte brut
  surtitre?: string; // eyebrow au-dessus de l'énoncé (H2)
  ariaLabel?: string; // nom accessible de la section ; par défaut, le surtitre
  id?: string;
}

/**
 * Énoncé centré sur bande bleu clair pleine largeur : surtitre en eyebrow (trait + majuscules)
 * puis une phrase en Allroundgothic dont le point final est orange. À l'arrivée à l'écran, une
 * barre orange balaie chaque ligne et révèle le texte, une seule fois.
 */
export default function RaisonEtre({ texte, surtitre, ariaLabel, id = 'wt-raison-etre' }: RaisonEtreProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  return (
    <section ref={ref} className="wt-raison-etre" id={id} aria-label={ariaLabel ?? surtitre}>
      <div className="wtre-band">
        <div className="wtre-inner">
          {surtitre && (
            <h2 className="wtre-eyebrow">
              <span className="wtre-eyebrow-line"></span>
              {surtitre}
            </h2>
          )}
          <p className="wtre-text">{texte}</p>
        </div>
      </div>
    </section>
  );
}
