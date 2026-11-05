// Aperçus de BandeCta : un bouton (bilan carbone, /notre-engagement-rse) et deux boutons
// (« Prêts à embarquer », /product-management). Textes repris du site.
import { BandeCta } from 'wefiit-com';

export const UnBouton = () => (
  <BandeCta
    id="apercu-bande-un"
    titre="Ce qui ne se mesure pas, <br>ne s'améliore pas"
    texte="En 2025, nous avons réalisé notre bilan carbone pour l'année 2024, <br>en partenariat avec Carbo."
    cta={{ libelle: 'Découvrir le bilan complet', lien: 'https://pro.hellocarbo.com/reviews/wefiit-2024-1/public', nouvelOnglet: true }}
  />
);

export const DeuxBoutons = () => (
  <BandeCta
    id="apercu-bande-deux"
    titre="Prêts à embarquer avec nous pour votre prochaine success story ?"
    texte="WeFiiT vous accompagne pour construire ensemble des produits à impact, au cœur d’une équipe engagée et passionnée."
    cta={{ libelle: 'Prendre RDV maintenant', lien: 'https://outlook.office.com/book/WeFiiT2@wefiit.com/', nouvelOnglet: true }}
    ctaSecondaire={{ libelle: 'Être recontacté', lien: '#', nouvelOnglet: true }}
  />
);
