// Bande pâle pleine largeur : titre, sous-titre avec étoiles optionnelles, puis des piliers
// (titre centré + texte) en grille, 3 par ligne, la dernière ligne centrée. Reproduit « Chez
// WeFiiT on prend soin de vous ! » de /product-management (valeurs mesurées : fond #f2f4ff,
// sous-titre 24px 500, titre de pilier 20.8px 600 centré, texte 14.4px 500 justifié).
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import './GrillePiliers.css';

export interface Pilier {
  titre: string;
  texte: string; // HTML autorisé (<strong>, liens)
}
export interface GrillePiliersProps {
  titre: string; // texte complet, ponctuation comprise
  point?: string; // caractère final en dégradé orange, '.' par défaut, '' pour aucun
  sousTitre?: string;
  etoiles?: boolean; // affiche les 5 étoiles du site à côté du sous-titre
  piliers: Pilier[];
  id?: string;
}

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

/**
 * Bande pâle pleine largeur avec un H2 (point orange optionnel), un sous-titre avec les
 * 5 étoiles du site en option, puis des piliers (titre + texte) en grille de 3, dernière
 * ligne centrée. 2 colonnes en tablette, 1 en mobile.
 */
export default function GrillePiliers({ titre, point = '.', sousTitre, etoiles = false, piliers, id = 'wt-piliers' }: GrillePiliersProps) {
  return (
    <section className="wt-piliers" id={id} aria-labelledby={`${id}-titre`}>
      <div className="wt-bande">
        <div className="wt-inner">
          <h2 className="wt-titre" id={`${id}-titre`}>
            {titre}
            {point && <span className="wt-point">{point}</span>}
          </h2>
          {sousTitre && (
            <p className="wt-sous-titre">
              {sousTitre}
              {etoiles && <img src={`${CDN}6682821a064891f21da4b90c_5%20Etoiles.svg`} alt="5 étoiles" width="120" height="21" />}
            </p>
          )}
          <ul className="wt-liste">
            {piliers.map((p) => (
              <li key={p.titre}>
                <h3 className="wt-pilier-titre">{p.titre}</h3>
                {/* Texte issu de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
                <p className="wt-pilier-texte" dangerouslySetInnerHTML={{ __html: p.texte }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
