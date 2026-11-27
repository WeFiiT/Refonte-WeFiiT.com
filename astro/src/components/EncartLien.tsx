// Encart de maillage interne : petit lien discret vers une autre page du site (surtitre, titre,
// description optionnelle, « Découvrir → »). Un seul <a> : toute la surface est cliquable.
// Version composant du bloc pages/culture/blocs/11-lien-rse.html (même rendu, couleurs lues
// dans les tokens --wf-*). Ce n'est pas un titre HTML (pas de H2/H3) : le bloc ne compte pas
// dans la hiérarchie des titres de la page.
// Aucun composant existant n'a cette base : GrilleCartes et BandeCta sont des blocs de section.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import './EncartLien.css';

export interface EncartLienProps {
  lien: string;
  titre: string; // titre visible, ex. « Nos engagements RSE »
  surtitre?: string; // petit libellé en majuscules au-dessus du titre, ex. « À découvrir aussi »
  description?: string; // optionnelle : le span reste vide (et masqué) sans elle
  libelleAction?: string; // à droite du titre, avec la flèche (« Découvrir »)
  nomAccessible: string; // nom lu par les lecteurs d'écran, ex. « Découvrir nos engagements RSE » (texte caché)
  ariaLabel?: string; // nom accessible de l'encart ; par défaut, le surtitre
  id?: string;
}

/**
 * Encart de maillage : bordure fine, sans fond, surtitre, titre et « Découvrir → » à droite
 * (sous le titre sur mobile). Le surtitre, le titre visible et la flèche sont masqués aux
 * lecteurs d'écran, qui lisent seulement le texte caché pour ne pas répéter.
 */
export default function EncartLien({
  lien,
  titre,
  surtitre,
  description = '',
  libelleAction = 'Découvrir',
  nomAccessible,
  ariaLabel,
  id = 'wt-lien-rse',
}: EncartLienProps) {
  return (
    <aside className="wt-lien-rse" id={id} aria-label={ariaLabel ?? surtitre}>
      <a className="wtl-card" href={lien}>
        <span className="wtl-text">
          {surtitre && (
            <span className="wtl-kicker" aria-hidden="true">
              {surtitre}
            </span>
          )}
          <span className="wtl-title" aria-hidden="true">
            {titre}
          </span>
          {/* Description optionnelle : le span vide est masqué par le CSS (:empty). */}
          <span className="wtl-desc">{description}</span>
          <span className="wtl-sr-only">{nomAccessible}</span>
        </span>
        <span className="wtl-more" aria-hidden="true">
          {`${libelleAction} `}
          <span className="wtl-arrow">→</span>
        </span>
      </a>
    </aside>
  );
}
