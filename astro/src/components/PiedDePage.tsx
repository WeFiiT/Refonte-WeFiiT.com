// Pied de page du site (footer natif Webflow reproduit) : appel au rendez-vous à gauche,
// liens sur deux rangées à droite, trois traits blancs en bas. Valeurs mesurées sur
// wefiit.com (fond #002882, padding 40px 0 15px, liens 12.8px 300 blancs). Le logo blanc
// et les icônes réseaux du footer d'origine sont masqués sur ordinateur : non repris.
// Composant React rendu en HTML statique par Astro ; le lien « Cookies » est branché par
// PiedDePage.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './PiedDePage.comportement';
import './PiedDePage.css';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const RDV = 'https://outlook.office.com/book/WeFiiT2@wefiit.com/?ismsaljsauthenabled';

/**
 * Pied de page commun à tout le site, sur bande bleu foncé pleine largeur : invitation à
 * prendre rendez-vous à gauche, liens légaux et de navigation à droite, trois traits blancs
 * en bas. Le lien « Cookies » ouvre le bandeau Axeptio quand il est chargé. Aucune prop :
 * identique sur tout le site.
 */
export default function PiedDePage() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);

  return (
    <footer ref={ref} className="wt-pied" aria-label="Pied de page">
      <div className="wt-bande">
        <div className="wt-inner">
          <div>
            <p className="wt-texte">
              Envie de travailler avec nous ?<br />
              Prenez rendez-vous directement dans notre agenda.
            </p>
            <a className="wt-rdv" href={RDV} target="_blank" rel="noopener">
              <span>Prendre rendez-vous</span>
              <img src={`${CDN}63d69d03bb2b54ad5d432ba8_arrow.svg`} alt="" />
            </a>
          </div>
          <div className="wt-liens">
            <div className="wt-rangee">
              <a href="/">Conseil Product Management</a>
              <a href="/product-management">Offre</a>
              <a href="/formation-product-management">Formation</a>
              <a href="https://wefiit.welcomekit.co/" target="_blank" rel="noopener">
                Nous&nbsp;rejoindre
              </a>
            </div>
            <div className="wt-rangee">
              <a href="/mentions-legales">Mentions&nbsp;légales</a>
              <a href={`${CDN}69a195e3bf3302d31b9d1e3f_WeFiiT%20-%20D%C3%A9claration%20Index%20Egalit%C3%A9.pdf`} target="_blank" rel="noopener">
                Index d'égalité professionnelle
              </a>
              {/* Sur le site, « Cookies » ouvre le bandeau Axeptio : sans Axeptio, le lien ne fait rien. */}
              <a href="#" className="wt-cookies">
                Cookies
              </a>
            </div>
          </div>
        </div>
        <div className="wt-traits" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </footer>
  );
}
