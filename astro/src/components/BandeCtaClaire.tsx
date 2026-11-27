// Bande d'appel à l'action sur fond pâle (#f2f4ff), pleine largeur : titre à dégradé bleu avec
// point final orange, texte, et un ou deux boutons (principal orange, secondaire bleu), empilés
// en pleine largeur sur mobile. Version composant du bloc
// pages/culture/blocs/10-bienvenue-a-bord.html (même rendu, couleurs lues dans les tokens --wf-*).
// Pourquoi pas BandeCta ni Bouton : BandeCta est une bande bleue dégradée, titre blanc sans
// point orange, texte blanc, boutons orange et clair (mesurés sur les pages d'expertise).
// Ici le fond, le titre, le texte, le secondaire (dégradé bleu 290deg, texte #edf0ff) et la
// hauteur mini des boutons sont différents ; les étendre aurait réécrit presque toutes leurs
// règles. Les deux composants restent côte à côte, chacun fidèle à son modèle sur le site.
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import './BandeCtaClaire.css';

export interface BoutonBande {
  libelle: string;
  lien: string;
  variante?: 'principal' | 'secondaire'; // principal = dégradé orange ; secondaire = dégradé bleu
  nouvelOnglet?: boolean; // ajoute target="_blank", rel="noopener" et le texte caché « (nouvel onglet) »
}
export interface BandeCtaClaireProps {
  titre: string; // sans le point final : il est ajouté en dégradé orange
  texte: string;
  boutons: BoutonBande[];
  idTitre?: string;
  id?: string;
}

/**
 * Bande de fin de page sur fond bleu très clair : titre, texte et boutons en pilule. Sert de
 * dernier appel à l'action (recrutement, contact). Sous 767px, les boutons sont empilés en
 * pleine largeur, le principal au-dessus.
 */
export default function BandeCtaClaire({ titre, texte, boutons, idTitre = 'wtv-title', id = 'wt-bienvenue' }: BandeCtaClaireProps) {
  return (
    <section className="wt-bienvenue" id={id} aria-labelledby={idTitre}>
      <div className="wtv-band">
        <div className="wtv-inner">
          <h2 className="wtv-title" id={idTitre}>
            {titre}
            <span className="wtv-title-dot">.</span>
          </h2>
          <p className="wtv-text">{texte}</p>
          <div className="wtv-actions">
            {boutons.map((b) => {
              const cible = b.nouvelOnglet ? { target: '_blank', rel: 'noopener' } : {};
              return (
                <a
                  key={b.libelle}
                  className={`wtv-btn wtv-btn-${b.variante === 'secondaire' ? 'secondary' : 'primary'}`}
                  href={b.lien}
                  {...cible}
                >
                  {b.libelle}
                  {/* Le texte caché annonce l'ouverture dans un nouvel onglet aux lecteurs d'écran. */}
                  {b.nouvelOnglet && <span className="wtv-sr-only"> (nouvel onglet)</span>}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
