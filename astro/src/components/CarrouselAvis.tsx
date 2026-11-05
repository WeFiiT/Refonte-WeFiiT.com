// Titre + carrousel d'avis clients : cartes blanches arrondies avec guillemets (vraies icônes
// du site), texte, tag d'offre et logo client, 3 cartes visibles sur ordinateur, pagination
// par points. Reproduit « Ce que nos clients disent de nous » de /product-management (valeurs
// mesurées : carte ~305px, rayon 15px, ombre 0 0 5px -3px #001d84, texte 16px).
// Défilement natif (scroll-snap) : glisser au doigt ou au trackpad, les points suivent.
// Composant React rendu en HTML statique par Astro ; les points de pagination sont
// construits par CarrouselAvis.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './CarrouselAvis.comportement';
import './CarrouselAvis.css';

export interface Avis {
  texte: string;
  tag?: string; // ex. « Immersion »
  logo: string;
  alt: string;
}
export interface CarrouselAvisProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  avis: Avis[];
  id?: string;
}

const ICONES = 'https://cdn.prod.website-files.com/642a8bbf780d263188511f03/';

/**
 * Section « avis clients » : titre H2 à point orange et carrousel horizontal de cartes
 * (citation, tag d'offre, logo client), 3 visibles sur ordinateur, 2 en tablette, une et
 * demie en mobile. Défilement natif, points de pagination ajoutés en JavaScript.
 */
export default function CarrouselAvis({ titre, avis, id = 'wt-avis' }: CarrouselAvisProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  return (
    <section ref={ref} className="wt-avis" id={id} aria-labelledby={`${id}-titre`}>
      <h2 className="wt-titre" id={`${id}-titre`}>
        {titre}
        <span className="wt-point">.</span>
      </h2>

      <div className="wt-piste" tabIndex={0} aria-label="Avis clients, faire défiler horizontalement">
        {avis.map((a, i) => (
          <figure className="wt-carte" key={i}>
            <img className="wt-guillemet wt-guillemet-haut" src={`${ICONES}642a8bbf780d263ede511f4e_quotes-1.svg`} alt="" />
            <blockquote className="wt-texte">{a.texte}</blockquote>
            <figcaption className="wt-pied">
              {a.tag && <span className="wt-tag">{a.tag}</span>}
              <img className="wt-logo" src={a.logo} alt={a.alt} loading="lazy" />
            </figcaption>
            <img className="wt-guillemet wt-guillemet-bas" src={`${ICONES}642a8bbf780d266fb4511f6a_quotes.svg`} alt="" />
          </figure>
        ))}
      </div>

      <div className="wt-points" role="tablist" aria-label="Pages d'avis"></div>
    </section>
  );
}
