// Titre centré + intro sur une bande gris clair pleine largeur, puis une liste d'actions en
// zigzag : texte et photo côte à côte, la photo alterne à droite puis à gauche. Reproduit
// la section « Agir et s'engager, ensemble » de /notre-engagement-rse (valeurs mesurées :
// fond rgb(245,247,250), conteneur 940px, photos 432×324, 20px entre deux lignes).
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import './ActionsZigzag.css';

export interface Action {
  titre: string;
  texte: string; // HTML autorisé (<br>)
  photo: string;
  alt: string;
}
export interface ActionsZigzagProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  intro: string; // HTML autorisé (<br>)
  actions: Action[];
  id?: string;
}

/**
 * Bande gris clair pleine largeur : titre centré (point orange) et intro, puis une liste
 * d'actions en zigzag (texte + photo, la photo alterne à droite puis à gauche). Empilé en
 * colonne sous 991px.
 */
export default function ActionsZigzag({ titre, intro, actions, id = 'wt-zigzag' }: ActionsZigzagProps) {
  return (
    <section className="wt-zigzag" id={id} aria-labelledby={`${id}-titre`}>
      <div className="wt-bande">
        <div className="wt-inner">
          <h2 className="wt-titre" id={`${id}-titre`}>
            {titre}
            <span className="wt-point">.</span>
          </h2>
          {/* Intro et textes viennent de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
          <p className="wt-intro" dangerouslySetInnerHTML={{ __html: intro }} />
          <ul className="wt-liste">
            {actions.map((a) => (
              <li className="wt-action" key={a.titre}>
                <div className="wt-texte">
                  <h3 className="wt-action-titre">{a.titre}</h3>
                  <p className="wt-action-texte" dangerouslySetInnerHTML={{ __html: a.texte }} />
                </div>
                <div className="wt-photo">
                  <img src={a.photo} alt={a.alt} loading="lazy" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
