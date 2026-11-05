// Instantané des collections CMS Webflow (cas clients, formations, articles de blog), relevé
// le 2026-11-03 sur les pages publiques de wefiit.com. Sert tant que le site Astro n'est pas
// branché sur l'API Webflow (voir ./index.ts) : mêmes champs que ce qu'affichent les cartes.
// Ne pas enrichir à la main : c'est le CMS qui fait foi.

const CMS = 'https://cdn.prod.website-files.com/63eba97bee0a9ec170c4f859/';

export interface CasClient {
  slug: string;
  client: string;
  offre: string; // expertise : « Product Management », « Product Data & IA »...
  titre: string;
  tags: string[]; // type de mission puis secteur
  image: string;
  alt: string;
}
export interface Formation {
  slug: string;
  titre: string;
  accroche: string;
  categorie: string;
  image: string;
}
export interface Article {
  slug: string;
  titre: string;
  auteur: string;
  date: string; // AAAA-MM-JJ
  image: string;
}

export const casClients: CasClient[] = [
  {
    slug: 'culture-produit-augmente-ia',
    client: 'BPI France',
    offre: 'Product Management',
    titre: 'Faire émerger une culture produit augmentée par l’IA',
    tags: ['Formation', 'Secteur public'],
    image: `${CMS}6aa288411fb171c307a2264c_user-story-bpi.png`,
    alt: '',
  },
  {
    slug: 'marque-blanche-leader-recherche-immobiliere',
    client: 'Seloger',
    offre: 'Product Management',
    titre: 'Déployer un produit marque blanche pour le leader de la recherche immobilière',
    tags: ['Immersion', 'Immobilier'],
    image: `${CMS}67a1235eca723d90c54b70f1_Vignettes%20User%20Story%20%20DEF%20(6).png`,
    alt: 'SeLoger',
  },
  {
    slug: 'refonte-site-marque-luxe',
    client: 'Accor',
    offre: 'Product Management',
    titre: 'Refondre un site e-commerce luxe en générant un impact business significatif',
    tags: ['Immersion', 'Hôtellerie'],
    image: `${CMS}6721f2deacdc8aa70e4af8d2_user-stories-accor.png`,
    alt: 'Accor',
  },
  {
    slug: 'droit-ia-generative',
    client: 'Lexis Nexis',
    offre: 'Product Data & IA',
    titre: 'Réinventer le quotidien des professionnels du droit grâce à une IA générative',
    tags: ['Immersion', 'Legal'],
    image: `${CMS}6721f34db9aaa4a71fd090b9_user-stories-lexis-nexis.png`,
    alt: 'LexisNexis',
  },
  {
    slug: 'transformer-scale-up-product-centric',
    client: 'ePack Pro',
    offre: 'Product Management',
    titre: 'Transformer une scale-up industrielle en entreprise Product Centric',
    tags: ['Conseil', 'Industrie'],
    image: `${CMS}6721f2b3bb24ffb8b159911f_user-stories-epack.png`,
    alt: 'ePack Pro',
  },
  {
    slug: 'reduire-impact-produits-physiques',
    client: 'Decathlon',
    offre: 'Product Data & IA',
    titre: "Réduire l'impact environnemental de produits physiques grâce au digital",
    tags: ['Immersion', 'Retail'],
    image: `${CMS}677f97b4238ac2aab57a4ef9_Vignettes%20User%20Story%20%20DEF%20(5).png`,
    alt: 'Decathlon',
  },
];

export const formations: Formation[] = [
  {
    slug: 'formation-product-manager-ia',
    titre: 'Formation Product Manager IA',
    accroche: 'Transformer l’IA générative en véritable levier de productivité et d’innovation.',
    categorie: 'Product Management IA',
    image: `${CMS}6915ff04ca4f0a240e083606_68028b27015e0084209866b0_product-quality.avif`,
  },
  {
    slug: 'formation-product-owner-ia',
    titre: 'Formation Product Owner IA',
    accroche: "Utiliser l'IA pour la rédaction et la documentation",
    categorie: 'Product Management IA',
    image: `${CMS}69b580ced9baa13733e31ab2_formation-product-owner-ia.avif`,
  },
  {
    slug: 'formation-quality-analyst-ia',
    titre: 'Formation Quality Analyst IA',
    accroche: 'Introduction à l’utilisation de l’IA dans les métiers de la QA',
    categorie: 'Product Management IA',
    image: `${CMS}69b58383da4734440dd11253_formation-quality-analyst-ia.avif`,
  },
];

export const articles: Article[] = [
  {
    slug: 'le-role-de-ia-product-manager',
    titre: "Le rôle de l'IA Product Manager (PM)",
    auteur: 'Camille',
    date: '2026-09-23',
    image: `${CMS}678e932cd84b904424a03478_Group%2050-2.png`,
  },
  {
    slug: 'product-marketing-management',
    titre: 'Product Marketing Management (PMM) : définition, rôles, activités',
    auteur: 'Chris',
    date: '2026-02-05',
    image: `${CMS}673f5fc85e5d0250b0f1967d_pmm.jpg`,
  },
  {
    slug: 'product-discovery',
    titre: 'Qu’est-ce que la Product Discovery ?',
    auteur: 'Octavie',
    date: '2026-07-23',
    image: `${CMS}64a3c864fb04147ed01c82ab_PRODUCT%20DISCOVERY.jpg`,
  },
];
