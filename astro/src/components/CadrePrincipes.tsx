// Bande de fond pleine largeur : titre H2, photo + texte d'intro/suite côte à côte (empilés
// sur mobile), puis une accroche et quatre cartes carrées numérotées qui apparaissent en fondu
// au défilement. Version composant du bloc pages/equipe/blocs/03-cadre.html (même rendu,
// même comportement, couleurs lues dans les tokens --wf-*).
// Composant React rendu en HTML statique par Astro ; l'apparition des points est gérée par
// CadrePrincipes.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './CadrePrincipes.comportement';
import './CadrePrincipes.css';

export interface Point {
  titre: string; // motivation du candidat (infinitif : « Apprendre »)
  texte: string; // une ou deux phrases
}
export interface CadrePrincipesProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  photo: string;
  alt?: string;
  intro: string; // HTML autorisé (<br>)
  suite: string; // HTML autorisé (<br>, <strong>, <span>)
  accroche: string; // phrase au-dessus de la liste
  points: Point[]; // une carte par entrée : numéro (1, 2…), titre, description
  id?: string;
}

/**
 * Bande bleu clair pleine largeur : titre H2 centré, photo et texte côte à côte (empilés et
 * centrés sur mobile), puis quatre cartes carrées numérotées (4 colonnes, 2 en tablette, 1 en mobile) qui
 * apparaissent en fondu au défilement.
 */
export default function CadrePrincipes({ titre, photo, alt = '', intro, suite, accroche, points, id = 'wt-cadrec' }: CadrePrincipesProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  return (
    <section ref={ref} className="wt-cadrec" id={id} aria-labelledby={`${id}-title`}>
      <div className="wt-band">
        <div className="wt-inner">
          <h2 className="wt-title" id={`${id}-title`}>{titre}<span className="wt-title-dot">.</span></h2>

          <div className="wt-layout">
            <div className="wt-layout-photo">
              <div className="wt-photo">
                <img src={photo} alt={alt} loading="lazy" />
              </div>
            </div>
            <div className="wt-layout-text">
              {/* Intro et suite viennent de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
              <p className="wt-intro" dangerouslySetInnerHTML={{ __html: intro }} />
              <p className="wt-outro" dangerouslySetInnerHTML={{ __html: suite }} />
            </div>
            <div className="wt-layout-list">
              <p className="wt-lead-in">{accroche}</p>
              <div className="wt-list">
                {points.map((point, i) => (
                  <div className="wt-item" key={i}>
                    <span className="wt-item-index">{i + 1}</span>
                    <h3 className="wt-item-title">{point.titre}</h3>
                    <p className="wt-item-text">{point.texte}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
