// Hero de page : titre H1 + intro + photo qui déborde sur une bande dégradée.
// Version composant du bloc pages/equipe/blocs/01-hero.html (même rendu, mêmes valeurs,
// couleurs lues dans les tokens --wf-*).
// Optionnels (sans effet sur Équipe qui ne les passe pas) :
//   - surtitre gris au-dessus du titre et rangée de chiffres clés sous l'intro (page RSE) ;
//   - boutons et bandeau de logos clients qui défile, entre l'intro et la photo (pages
//     d'expertise) ;
//   - h1Surtitre : la balise H1 porte le surtitre et non le grand titre, comme sur les pages
//     d'expertise de wefiit.com (H1 = mot-clé « Conseil Product Management », choix SEO).
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur : le bandeau de
// logos défile en CSS pur).
import Bouton from './Bouton';
import './HeroPhotoBande.css';

export interface Chiffre {
  valeur: string; // ex. "54"
  libelle: string; // ex. "e-NPS collaborateur"
}
export interface Cta {
  libelle: string;
  lien: string;
  variante?: 'orange' | 'bleu' | 'clair';
  nouvelOnglet?: boolean;
}
export interface Logo {
  src: string;
  alt: string;
}
export interface HeroPhotoBandeProps {
  titre: string; // sans le point final : il est ajouté en orange
  intro: string; // HTML autorisé (passages en <span> mis en avant, <br>)
  photo: string;
  alt: string;
  surtitre?: string;
  h1Surtitre?: boolean;
  chiffres?: Chiffre[];
  ctas?: Cta[];
  logos?: Logo[];
  id?: string;
}

/**
 * Hero de page : grand titre centré (dégradé bleu, point orange), intro, puis photo qui
 * déborde sur une bande dégradée pleine largeur. En option : surtitre, chiffres clés,
 * boutons et bandeau de logos clients qui défile.
 */
export default function HeroPhotoBande({
  titre,
  intro,
  photo,
  alt,
  surtitre,
  h1Surtitre = false,
  chiffres = [],
  ctas = [],
  logos = [],
  id = 'wt-hero',
}: HeroPhotoBandeProps) {
  const TitreTag = h1Surtitre ? 'p' : 'h1';
  const SurtitreTag = h1Surtitre ? 'h1' : 'p';
  return (
    <section className="wt-hero" id={id} aria-labelledby={`${id}-title`}>
      <div className="wt-inner">
        {surtitre && (
          <SurtitreTag className="wt-hero-surtitre" id={h1Surtitre ? `${id}-title` : undefined}>
            {surtitre}
          </SurtitreTag>
        )}
        <TitreTag className="wt-hero-title" id={h1Surtitre ? undefined : `${id}-title`}>
          {titre}
          <span className="wt-hero-dot">.</span>
        </TitreTag>
        {/* L'intro vient de nos fichiers de contenu (jamais d'un visiteur) : HTML injecté sans risque. */}
        <p className="wt-hero-intro" dangerouslySetInnerHTML={{ __html: intro }} />
        {chiffres.length > 0 && (
          <ul className="wt-hero-chiffres">
            {chiffres.map((c) => (
              <li key={c.libelle}>
                <span className="wt-hero-chiffre">{c.valeur}</span> {c.libelle}
              </li>
            ))}
          </ul>
        )}
        {ctas.length > 0 && (
          <div className="wt-hero-ctas">
            {ctas.map((c) => (
              <Bouton key={c.lien + c.libelle} {...c} />
            ))}
          </div>
        )}
        {logos.length > 0 && (
          <div className="wt-hero-logos" aria-label="Ils nous font confiance">
            {/* Liste doublée pour un défilement continu sans saut : l'animation va de 0 à -50%. */}
            <ul className="wt-hero-logos-piste">
              {[...logos, ...logos].map((l, i) => (
                <li key={i} aria-hidden={i >= logos.length ? 'true' : undefined}>
                  <img src={l.src} alt={i >= logos.length ? '' : l.alt} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="wt-hero-photo-frame">
          <div className="wt-hero-band"></div>
          <div className="wt-hero-photo">
            <img src={photo} alt={alt} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
