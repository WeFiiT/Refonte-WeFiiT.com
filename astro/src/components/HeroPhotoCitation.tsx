// Hero de page plein cadre : photo en fond sur toute la largeur, grand titre en haut à gauche
// et panneau de citation en verre dépoli en bas à droite (collé en bas, pleine largeur, sur
// mobile). Version composant du bloc pages/culture/blocs/01-hero.html (même rendu, mêmes
// valeurs, couleurs lues dans les tokens --wf-*).
// Pourquoi pas HeroPhotoBande : sa base est différente (titre centré sur fond blanc, intro,
// puis photo qui déborde sur une bande dégradée). Ici la photo est le fond du hero et le texte
// est posé dessus : étendre l'autre composant aurait demandé de tout conditionner.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import type { CSSProperties } from 'react';
import './HeroPhotoCitation.css';

export interface HeroPhotoCitationProps {
  titre: string; // sans le point final : il est ajouté en orange
  photo: string;
  alt: string;
  srcset?: string; // variantes de la photo (ex. « …-p-500.jpg 500w, … ») ; la photo est l'élément LCP de la page
  sizes?: string; // ex. « 100vw »
  largeur?: number; // dimensions réelles de la photo : évitent le décalage de mise en page
  hauteur?: number;
  citation: string; // texte de la citation, sans les guillemets (le guillemet ouvrant est décoratif)
  auteur: string; // en gras dans la légende
  fonction: string; // après l'auteur, séparée par une virgule
  cadrage?: string; // object-position desktop de la photo (ex. « 50% 30% » pour garder les visages)
  cadrageMobile?: string; // idem sur mobile (photo recadrée en portrait)
  niveauTitre?: 1 | 2; // 1 par défaut ; 2 si un autre H1 apparaît plus haut sur la page
  idTitre?: string;
  id?: string;
}

/**
 * Hero photo plein cadre : titre (point final orange) en haut à gauche, citation d'un
 * fondateur ou d'un témoin dans un panneau bleu translucide en bas à droite. La photo est
 * une vraie balise img (alt, srcset), chargée en priorité car c'est l'élément LCP.
 */
export default function HeroPhotoCitation({
  titre,
  photo,
  alt,
  srcset,
  sizes,
  largeur,
  hauteur,
  citation,
  auteur,
  fonction,
  cadrage,
  cadrageMobile,
  niveauTitre = 1,
  idTitre = 'wth-title-heading',
  id = 'wt-histoire-hero',
}: HeroPhotoCitationProps) {
  const TitreTag = niveauTitre === 1 ? 'h1' : 'h2';
  // Les variables de cadrage ne sont posées que si la prop est donnée : sinon les valeurs par défaut du CSS (50% 50%) s'appliquent.
  const style: Record<string, string> = {};
  if (cadrage) style['--wth-hero-pos'] = cadrage;
  if (cadrageMobile) style['--wth-hero-pos-mobile'] = cadrageMobile;
  return (
    <section
      className="wt-histoire-hero"
      id={id}
      aria-labelledby={idTitre}
      style={Object.keys(style).length ? (style as CSSProperties) : undefined}
    >
      <div className="wth-hero">
        <img
          fetchPriority="high"
          className="wth-hero-img"
          src={photo}
          srcSet={srcset}
          sizes={sizes}
          width={largeur}
          height={hauteur}
          decoding="async"
          alt={alt}
          loading="eager"
        />

        <div className="wth-hero-head">
          <TitreTag className="wth-title" id={idTitre}>
            {titre}
            <span className="wth-title-dot">.</span>
          </TitreTag>
        </div>

        <figure className="wth-hero-quote">
          <span className="wth-hero-qmark" aria-hidden="true">
            “
          </span>
          <blockquote>
            <p>{citation}</p>
          </blockquote>
          <figcaption>
            <strong>{auteur}</strong>
            {`, ${fonction}`}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
