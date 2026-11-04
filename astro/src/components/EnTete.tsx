// Barre de navigation du site (navbar native Webflow reproduite) : logo, menus déroulants,
// deux CTA. Fixée en haut au défilement. Hamburger sous 992px. Valeurs mesurées sur
// wefiit.com (padding 10px 2vw, liens 16px 500 #001d84, CTA en pilule .9rem).
// Le menu est commun à tout le site : il vit ici, seule la page courante est passée en prop.
// Composant React rendu en HTML statique par Astro ; le comportement (burger, menus
// déroulants) vit dans EnTete.comportement.ts.
import { useEffect, useRef } from 'react';
import { init } from './EnTete.comportement';
import './EnTete.css';

export interface EnTeteProps {
  pageCourante?: string; // chemin de la page affichée, ex. "/notre-engagement-rse"
}

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const WTTJ = 'https://www.welcometothejungle.com/fr/companies/wefiit';
const RDV = 'https://outlook.office.com/book/WeFiiT2@wefiit.com/?ismsaljsauthenabled';

export type Lien = { libelle: string; lien: string; externe?: boolean };
export type Entree = { libelle: string; lien?: string; sousMenu?: Lien[] };
const menu: Entree[] = [
  {
    libelle: 'Expertises',
    sousMenu: [
      { libelle: 'Product Management', lien: '/product-management' },
      { libelle: 'Product Data & IA', lien: '/product-ia-data-management' },
      { libelle: 'Product Marketing', lien: '/product-marketing' },
      { libelle: 'Product Quality', lien: '/product-quality' },
      { libelle: 'Product Ops', lien: '/product-ops' },
    ],
  },
  { libelle: 'Cas clients', lien: '/cas-clients' },
  { libelle: 'Formation', lien: '/formation-product-management' },
  {
    libelle: 'Médias',
    sousMenu: [
      { libelle: 'We.Talk', lien: '/we-talk' },
      { libelle: 'Ressources', lien: '/product-management-ressources' },
      { libelle: 'Vidéos', lien: '/videos' },
      { libelle: 'Blog', lien: '/blog' },
    ],
  },
  {
    libelle: 'À propos',
    sousMenu: [
      { libelle: 'Être WeFiiTer', lien: '/equipe' },
      { libelle: 'Mission', lien: '/acteur-de-ta-mission' },
      { libelle: 'Engagement RSE', lien: '/notre-engagement-rse' },
      { libelle: 'Nous rejoindre', lien: WTTJ, externe: true },
    ],
  },
];
const externe = (l: Lien) => (l.externe ? { target: '_blank', rel: 'noopener' } : {});

/**
 * Barre de navigation commune à tout le site : logo, menus déroulants (Expertises, Médias,
 * À propos), CTA « Deviens WeFiiTer » et « Prendre RDV ». Collée en haut au défilement,
 * menu burger sous 992px. `pageCourante` marque le lien actif (aria-current).
 */
export default function EnTete({ pageCourante = '' }: EnTeteProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) init(ref.current);
  }, []);
  const courant = (lien?: string) => (lien && lien === pageCourante ? { 'aria-current': 'page' as const } : {});

  return (
    <header ref={ref} className="wt-entete" aria-label="Navigation principale">
      <div className="wt-barre">
        <a className="wt-logo" href="/">
          <img src={`${CDN}6710c9a846e54f6b5265ccd1_logo-wefiit-header.avif`} alt="WeFiiT - Cabinet Conseil Product Management" width="107" height="24" />
        </a>

        <button type="button" className="wt-burger" aria-label="Ouvrir le menu" aria-expanded="false">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div className="wt-menu">
          <ul className="wt-nav">
            {menu.map((e) =>
              e.sousMenu ? (
                <li className="wt-dd" key={e.libelle}>
                  <button type="button" className="wt-lien wt-toggle" aria-expanded="false">
                    {e.libelle}
                  </button>
                  <ul className="wt-liste">
                    {e.sousMenu.map((l) => (
                      <li key={l.lien}>
                        <a href={l.lien} {...externe(l)} {...courant(l.lien)}>
                          {l.libelle}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={e.libelle}>
                  <a className="wt-lien" href={e.lien} {...courant(e.lien)}>
                    {e.libelle}
                  </a>
                </li>
              ),
            )}
          </ul>
          <div className="wt-ctas">
            <a className="wt-cta wt-cta-orange" href={WTTJ} target="_blank" rel="noopener">
              Deviens&nbsp;WeFiiTer
            </a>
            <a className="wt-cta wt-cta-bleu" href={RDV} target="_blank" rel="noopener">
              Prendre&nbsp;RDV
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
