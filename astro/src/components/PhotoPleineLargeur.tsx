// Photo pleine largeur de la fenêtre (bande par marges négatives), à poser juste avant le
// footer. Version composant du bloc pages/equipe/blocs/10-photo-pleine-largeur.html
// (même rendu, mêmes valeurs).
// Composant React rendu en HTML statique par Astro (aucun JS côté visiteur).
import './PhotoPleineLargeur.css';

export interface PhotoPleineLargeurProps {
  src: string;
  srcset: [string, number][]; // [url, largeur en px] ; vide = pas de srcset
  alt: string;
  ratio: string; // ratio réel de la photo, ex. "802 / 291" (évite un saut de mise en page au chargement)
  id?: string;
}

/**
 * Photo pleine largeur de la fenêtre, sans marge, à poser juste avant le pied de page.
 * Le ratio de la photo est réservé à l'avance pour éviter un saut de mise en page.
 */
export default function PhotoPleineLargeur({ src, srcset, alt, ratio, id = 'wt-photo-full' }: PhotoPleineLargeurProps) {
  const srcsetAttr = srcset.map(([url, largeur]) => `${url} ${largeur}w`).join(', ');
  return (
    <section className="wt-photo-bloc" id={id}>
      <div className="wt-full-photo" style={{ aspectRatio: ratio }}>
        {/* sizes="100vw" : l'image est toujours affichée pleine largeur. Le bloc natif du site
            déclare sizes="(max-width: 767px) 100vw, 802px", donc le navigateur choisit une image
            pensée pour 802px et la floute en pleine largeur. */}
        <img src={src} srcSet={srcsetAttr || undefined} sizes="100vw" loading="lazy" alt={alt} />
      </div>
    </section>
  );
}
