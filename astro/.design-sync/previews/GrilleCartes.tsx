// Aperçus de GrilleCartes, une par variante, avec le contenu de /product-management
// (cas clients, autres offres, blog) tel que relevé dans src/cms/instantane.ts.
import { GrilleCartes } from 'wefiit-com';

const CMS = 'https://cdn.prod.website-files.com/63eba97bee0a9ec170c4f859/';
const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

export const CasClients = () => (
  <GrilleCartes
    id="apercu-cas"
    titre="Des exemples de nos belles histoires Produit"
    cartes={[
      { titre: 'Faire émerger une culture produit augmentée par l’IA', lien: '#', image: `${CMS}6aa288411fb171c307a2264c_user-story-bpi.png`, surtitre: 'Product Management | BPI France', tags: ['Formation', 'Secteur public'] },
      { titre: 'Déployer un produit marque blanche pour le leader de la recherche immobilière', lien: '#seloger', image: `${CMS}67a1235eca723d90c54b70f1_Vignettes%20User%20Story%20%20DEF%20(6).png`, alt: 'SeLoger', surtitre: 'Product Management | Seloger', tags: ['Immersion', 'Immobilier'] },
      { titre: 'Refondre un site e-commerce luxe en générant un impact business significatif', lien: '#accor', image: `${CMS}6721f2deacdc8aa70e4af8d2_user-stories-accor.png`, alt: 'Accor', surtitre: 'Product Management | Accor', tags: ['Immersion', 'Hôtellerie'] },
    ]}
    cta={{ libelle: 'Voir tous nos cas clients', lien: '#' }}
  />
);

export const Offres = () => (
  <GrilleCartes
    id="apercu-offres"
    variante="offre"
    titre="Découvrir nos autres offres"
    cartes={[
      { titre: 'Product Data & IA', texte: "Construire aujourd'hui les Produits de demain.", lien: '#', image: `${CDN}6776a74bcde62a28b035bd77_vignette-data-ia.avif`, alt: "Photo de Etienne, Product Manager en train d'écrire sur un tableau blanc." },
    ]}
  />
);

export const Blog = () => (
  <GrilleCartes
    id="apercu-blog"
    variante="blog"
    titre="Notre blog"
    cartes={[
      { titre: "Le rôle de l'IA Product Manager (PM)", lien: '#', image: `${CMS}678e932cd84b904424a03478_Group%2050-2.png`, auteur: 'Camille', date: '23 sept. 2026', lire: "Lire l'article" },
      { titre: 'Product Marketing Management (PMM) : définition, rôles, activités', lien: '#pmm', image: `${CMS}673f5fc85e5d0250b0f1967d_pmm.jpg`, auteur: 'Chris', date: '5 févr. 2026', lire: "Lire l'article" },
      { titre: 'Qu’est-ce que la Product Discovery ?', lien: '#discovery', image: `${CMS}64a3c864fb04147ed01c82ab_PRODUCT%20DISCOVERY.jpg`, auteur: 'Octavie', date: '23 juil. 2026', lire: "Lire l'article" },
    ]}
    cta={{ libelle: "Voir plus d'articles", lien: '#' }}
  />
);
