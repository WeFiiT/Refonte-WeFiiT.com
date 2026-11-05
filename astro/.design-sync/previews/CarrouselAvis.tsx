// Aperçu de CarrouselAvis : « Ce que nos clients disent de nous » de /product-management,
// 5 des 9 avis de src/contenu/product-management.ts (textes, tags et logos inchangés).
import { CarrouselAvis } from 'wefiit-com';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

export const AvisClients = () => (
  <CarrouselAvis
    id="apercu-avis"
    titre="Ce que nos clients disent de nous"
    avis={[
      { texte: "Un avant et un après dans cette squad, c'est le jour et la nuit. Les processus mis en place paraissent évidents maintenant mais ne l'étaient pas avant l'arrivée du coach Produit WeFiiT.", tag: 'Conseil', logo: `${CDN}67220b251028657350fbef37_l-leparisien.avif`, alt: 'Logo du Parisien' },
      { texte: "Une vraie synchronicité intellectuelle, de la méthode et des livrables précis, de l'orfèvrerie. Merci WeFiiT !", tag: 'Immersion', logo: `${CDN}63d6a48b821bb1549268e8cf_Decathlon.svg`, alt: 'Logo Décathlon' },
      { texte: 'Très satisfait du dispositif PO/PM de WeFiiT, avec notamment une bonne prise de hauteur sur le projet stratégique 2024.', tag: 'Immersion', logo: `${CDN}6722049aa40a6bd2d5bb3335_invivo-logo.avif`, alt: "Logo d'Invivo" },
      { texte: "Grosse bouffée d'oxygène & super satisfait du match avec les équipes. Du concret et du pragmatisme dans l'approche Ops proposée par WeFiiT.", tag: 'Conseil', logo: `${CDN}6734d4843550e43c9b3ffd81_lv.avif`, alt: 'Logo de Louis Vuitton' },
      { texte: "WeFiiT est un maillon essentiel sur tous nos sujets. L'équipe a réussi à manager notre team produit avec bienveillance et intelligence.", tag: 'Immersion', logo: `${CDN}63d6a48b09e719f88ae4b90a_FranceTv.svg`, alt: 'Logo France.TV' },
    ]}
  />
);
