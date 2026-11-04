// Titre de section (H2 aligné à gauche, point orange) + grille de cartes cliquables en 3
// colonnes + bouton optionnel. Un seul composant pour toutes les grilles du site : cas
// clients, formations, autres offres, articles de blog. Les champs de chaque carte sont tous
// optionnels sauf le titre et le lien : on n'affiche que ce qui est fourni.
// Valeurs mesurées sur /product-management (.article__item, .card__item) :
//   - carte blanche, ombre de repos 1px 0 3px rgba(0,0,0,.08), ombre plate -18px 18px au survol ;
//   - image 168px de haut (variante "offre" : 210px), contenu avec 20px de marge ;
//   - surtitre 12.8px 300, titre 16px 500 (variante "offre" : Allroundgothic 19.2px ;
//     "blog" : 19.2px 500), tags en pilule #f2f4ff 12px 500.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import Bouton from './Bouton';
import './GrilleCartes.css';

export interface Carte {
  titre: string;
  lien: string;
  image?: string;
  alt?: string;
  surtitre?: string; // ex. « BPI France | Product Management »
  texte?: string;
  tags?: string[];
  auteur?: string; // cartes d'articles : « Camille · 23 sept. 2026 »
  date?: string;
  lire?: string; // libellé du lien en bas de carte, ex. « Lire l'article »
}
export interface GrilleCartesProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  intro?: string; // HTML autorisé
  cartes: Carte[];
  cta?: { libelle: string; lien: string; nouvelOnglet?: boolean };
  variante?: 'standard' | 'offre' | 'blog';
  id?: string;
}

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

/**
 * Section avec un H2 aligné à gauche (point final orange) et une grille de cartes
 * cliquables en 3 colonnes (2 en tablette, 1 en mobile) : cas clients, formations, offres
 * (`variante="offre"`) ou articles (`variante="blog"`). Bouton orange optionnel dessous.
 */
export default function GrilleCartes({ titre, intro, cartes, cta, variante = 'standard', id = 'wt-grille' }: GrilleCartesProps) {
  return (
    <section className={`wt-grille wt-grille-${variante}`} id={id} aria-labelledby={`${id}-titre`}>
      <h2 className="wt-titre" id={`${id}-titre`}>
        {titre}
        <span className="wt-point">.</span>
      </h2>
      {intro && <p className="wt-intro" dangerouslySetInnerHTML={{ __html: intro }} />}

      <ul className="wt-cartes">
        {cartes.map((c) => (
          <li key={c.lien}>
            <a className="wt-carte" href={c.lien}>
              {c.image && <img className="wt-image" src={c.image} alt={c.alt ?? ''} loading="lazy" />}
              <div className="wt-contenu">
                {c.surtitre && <p className="wt-surtitre">{c.surtitre}</p>}
                <h3 className="wt-carte-titre">{c.titre}</h3>
                {c.texte && <p className="wt-texte">{c.texte}</p>}
                {c.tags && c.tags.length > 0 && (
                  <ul className="wt-tags">
                    {c.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {(c.auteur || c.date) && <p className="wt-auteur">{[c.auteur, c.date].filter(Boolean).join(' · ')}</p>}
                {c.lire && (
                  <span className="wt-lire">
                    {c.lire}
                    <img src={`${CDN}63d69d03bb2b54ad5d432ba8_arrow.svg`} alt="" />
                  </span>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>

      {cta && (
        <div className="wt-cta">
          <Bouton {...cta} variante="orange" />
        </div>
      )}
    </section>
  );
}
