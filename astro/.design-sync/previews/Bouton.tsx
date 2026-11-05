// Aperçus du Bouton pour Claude Design : les trois variantes, et le duo utilisé dans les
// heros des pages d'expertise (textes de /product-management).
import { Bouton } from 'wefiit-com';

const RDV = 'https://outlook.office.com/book/WeFiiT2@wefiit.com/';

export const Orange = () => <Bouton libelle="Prendre RDV maintenant" lien={RDV} nouvelOnglet />;

export const Bleu = () => <Bouton libelle="Prendre RDV maintenant" lien={RDV} variante="bleu" nouvelOnglet />;

export const Clair = () => <Bouton libelle="Être recontacté" lien="#" variante="clair" />;

export const DuoHero = () => (
  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
    <Bouton libelle="Prendre RDV maintenant" lien={RDV} variante="bleu" nouvelOnglet />
    <Bouton libelle="Être recontacté" lien="#" variante="clair" />
  </div>
);
