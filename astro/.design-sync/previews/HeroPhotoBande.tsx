// Aperçus de HeroPhotoBande avec les heros réels : page Équipe (src/contenu/equipe.ts),
// page RSE (src/contenu/rse.ts) et /product-management (src/contenu/product-management.ts).
import { HeroPhotoBande } from 'wefiit-com';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const RDV = 'https://outlook.office.com/book/WeFiiT2@wefiit.com/?ismsaljsauthenabled';

export const Equipe = () => (
  <HeroPhotoBande
    id="apercu-hero-equipe"
    titre="Faire partie de l’équipe WeFiiT"
    intro="WeFiiT, c’est d’abord et avant tout une histoire de FiiT entre <span>passionné·e·s de Product</span>, ayant <span>envie de grandir ensemble</span> tout en participant à la création du WeFiiT de demain !"
    photo={`${CDN}6adca7a1c9d07078437f2c1c_hero-equipe.jpg`}
    alt="L’équipe WeFiiT réunie"
  />
);

export const RseChiffres = () => (
  <HeroPhotoBande
    id="apercu-hero-rse"
    surtitre="Politique RSE"
    titre="Notre engagement"
    intro="Prendre soin de notre écosystème.<br>Mesurer et comprendre notre impact.<br>Passer à l’action tous ensemble."
    chiffres={[
      { valeur: '54', libelle: 'e-NPS collaborateur' },
      { valeur: '2,3t', libelle: 'CO₂/employé en 2024' },
      { valeur: '25', libelle: "actions d'engagement /an" },
    ]}
    photo={`${CDN}673c6311d040ec59186b9d65_WEFIIT-09-23-2000-24.avif`}
    alt="Equipe et consultants WeFiiT"
  />
);

export const ExpertiseCtasLogos = () => (
  <HeroPhotoBande
    id="apercu-hero-pm"
    surtitre="Conseil Product Management"
    h1Surtitre
    titre="À vos côtés pour relever tous vos défis produits"
    intro="WeFiiT vous accompagne pour construire ensemble des produits à <span>fort impact</span>, au cœur d’une équipe <span>engagée</span> et <span>passionnée</span>."
    chiffres={[
      { valeur: '110+', libelle: 'spécialistes Produit' },
      { valeur: '200+', libelle: 'missions réalisées' },
      { valeur: '5%', libelle: 'de sélectivité des profils' },
    ]}
    ctas={[
      { libelle: 'Prendre RDV maintenant', lien: RDV, variante: 'bleu', nouvelOnglet: true },
      { libelle: 'Être recontacté', lien: '#', variante: 'clair' },
    ]}
    logos={[
      { src: `${CDN}67220ba0edb15552d1e15963_l-accor.avif`, alt: 'Client WeFiiT Accor' },
      { src: `${CDN}63d6a48b9c1d37426e3ede64_MaisonsDuMonde.svg`, alt: 'Client WeFiiT Maisons du monde' },
      { src: `${CDN}63d6a48b09e719f88ae4b90a_FranceTv.svg`, alt: 'Client WeFiiT France TV' },
      { src: `${CDN}63d6a48b9010acd5882bb4c2_FDJ.svg`, alt: 'Client WeFiiT FDJ' },
      { src: `${CDN}672204f0854bc296cb5156cf_logo-seloger.avif`, alt: 'Client WeFiiT SeLoger' },
      { src: `${CDN}67220ce8130f088d637433e8_l-sephora.avif`, alt: 'Client WeFiiT Sephora' },
      { src: `${CDN}63d6a48b821bb1549268e8cf_Decathlon.svg`, alt: 'Client WeFiiT Decathlon' },
      { src: `${CDN}63d6a48bd50415db5bc9b7f1_RadioFrance.svg`, alt: 'Client WeFiiT radiofrance' },
    ]}
    photo={`${CDN}6728fc9209a9142cd05489f7_hero-offre.avif`}
    alt="Equipe et consultants WeFiiT"
  />
);
