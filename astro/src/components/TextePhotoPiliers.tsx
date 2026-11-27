// Section pleine (sans bande colorée) : en haut, une photo (colonne de 2/5) avec le décalage
// bleu du site à côté d'un bloc de texte (surtitre, titre, sous-titre, paragraphe), puis une
// rangée de trois cartes « piliers » dont l'icône et le titre sont alignés (le texte passe
// dessous, sur toute la largeur de la carte, sauf sur mobile). Version composant du bloc
// pages/culture/blocs/04-mariniere.html (même rendu, mêmes valeurs ; issu du bloc neutre
// blocs-neutres/texte-photo-piliers.html).
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import './TextePhotoPiliers.css';

export interface PhotoPiliers {
  src: string;
  srcset?: [string, number][]; // [url, largeur en px] ; absent = pas de srcset
  sizes?: string;
  largeur?: number; // dimensions réelles du fichier : réservent la place avant le chargement
  hauteur?: number;
  alt: string;
}
export interface PilierIcone {
  icone: string; // balisage <svg> complet, pictogramme au trait (viewBox 24, trait 1.6, couleur héritée)
  titre: string;
  texte: string;
}
export interface TextePhotoPiliersProps {
  surtitre?: string; // eyebrow au-dessus du titre
  titre: string; // sans le point final : il est ajouté en dégradé orange
  sousTitre?: string;
  texte: string;
  photo: PhotoPiliers;
  piliers: PilierIcone[];
  id?: string;
}

/**
 * Photo (4:3, décalage bleu) à gauche et texte à droite, puis trois piliers avec icône. Sur
 * mobile : photo, texte, puis piliers en une colonne, icône à gauche de chaque carte.
 */
export default function TextePhotoPiliers({ surtitre, titre, sousTitre, texte, photo, piliers, id = 'wt-symbole' }: TextePhotoPiliersProps) {
  // Le bloc d'origine nomme son titre « wts-title » : on garde cet id tant que l'id du bloc est
  // celui d'origine, sinon il est dérivé de l'id donné (plusieurs instances possibles).
  const idTitre = id === 'wt-symbole' ? 'wts-title' : `${id}-title`;
  const srcset = photo.srcset?.map(([url, largeur]) => `${url} ${largeur}w`).join(', ');

  return (
    <section className="wt-symbole" id={id} aria-labelledby={idTitre}>
      <div className="wts-intro">
        <div className="wts-photo-frame">
          <div className="wts-photo">
            <img
              className="wts-photo-img"
              src={photo.src}
              srcSet={srcset || undefined}
              sizes={photo.sizes}
              width={photo.largeur}
              height={photo.hauteur}
              decoding="async"
              alt={photo.alt}
              loading="lazy"
            />
          </div>
        </div>

        <div className="wts-intro-text">
          {surtitre && (
            <p className="wts-eyebrow">
              <span className="wts-eyebrow-line"></span>
              {surtitre}
            </p>
          )}
          <h2 className="wts-title" id={idTitre}>
            {titre}
            <span className="wts-title-dot">.</span>
          </h2>
          {sousTitre && <h3 className="wts-subtitle">{sousTitre}</h3>}
          <p className="wts-text">{texte}</p>
        </div>
      </div>

      <ul className="wts-pillars">
        {piliers.map((p) => (
          <li className="wts-pillar" key={p.titre}>
            {/* Icône issue de nos fichiers de contenu (jamais d'un visiteur) : SVG injecté sans risque. */}
            <span className="wts-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: p.icone }} />
            <div className="wts-pillar-body">
              <h3 className="wts-pillar-title">{p.titre}</h3>
              <p className="wts-pillar-text">{p.texte}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
