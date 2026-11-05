// Page « Conseil Product Management » (/product-management), construite en composants.
// Clé = position dans la page. Textes repris à l'identique du site en ligne (relevé le
// 2026-11-03). Cas clients, formations et articles viennent du CMS (src/cms/).
// « Être recontacté » ouvre un formulaire Webflow sur le site : en attendant un service de
// formulaire, il pointe vers la prise de RDV.
import HeroPhotoBande from '../components/HeroPhotoBande';
import TribesOnglets from '../components/TribesOnglets';
import GrilleCartes from '../components/GrilleCartes';
import BandeCta from '../components/BandeCta';
import GrillePiliers from '../components/GrillePiliers';
import CarrouselAvis from '../components/CarrouselAvis';
import FaqAccordeon from '../components/FaqAccordeon';
import { cartesCasClients, cartesFormations, cartesArticles } from '../cms';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const RDV = 'https://outlook.office.com/book/WeFiiT2@wefiit.com/?ismsaljsauthenabled';
const RECONTACT = RDV; // à remplacer par le formulaire de contact

const logo = (fichier: string, nom: string) => ({ src: `${CDN}${fichier}`, alt: `Client WeFiiT ${nom}` });

export const composants = {
  '01-hero': {
    Composant: HeroPhotoBande,
    props: {
      id: 'wt-pm-hero',
      surtitre: 'Conseil Product Management',
      h1Surtitre: true,
      titre: 'À vos côtés pour relever tous vos défis produits',
      intro:
        'WeFiiT vous accompagne pour construire ensemble des produits à <span>fort impact</span>, au cœur d’une équipe <span>engagée</span> et <span>passionnée</span>.',
      chiffres: [
        { valeur: '110+', libelle: 'spécialistes Produit' },
        { valeur: '200+', libelle: 'missions réalisées' },
        { valeur: '5%', libelle: 'de sélectivité des profils' },
      ],
      ctas: [
        { libelle: 'Prendre RDV maintenant', lien: RDV, variante: 'bleu', nouvelOnglet: true },
        { libelle: 'Être recontacté', lien: RECONTACT, variante: 'clair', nouvelOnglet: true },
      ],
      logos: [
        logo('67220ba0edb15552d1e15963_l-accor.avif', 'Accor'),
        logo('63d6a48b9c1d37426e3ede64_MaisonsDuMonde.svg', 'Maisons du monde'),
        logo('63d6a48b09e719f88ae4b90a_FranceTv.svg', 'France TV'),
        logo('63d6a48b9010acd5882bb4c2_FDJ.svg', 'FDJ'),
        logo('672204f0854bc296cb5156cf_logo-seloger.avif', 'SeLoger'),
        logo('67220ce8130f088d637433e8_l-sephora.avif', 'Sephora'),
        logo('63d6a48b821bb1549268e8cf_Decathlon.svg', 'Decathlon'),
        logo('63d6a48bd50415db5bc9b7f1_RadioFrance.svg', 'radiofrance'),
        logo('672209fbb8bc69629265f098_l-invivo.avif', 'invivo'),
        logo('672209fcd6407e3dfdea7359_l-datanumia.avif', 'EDF'),
        logo('63d6a48bc043ed31bb79b46b_AirCall.svg', 'Aircall'),
        logo('67220b251028657350fbef37_l-leparisien.avif', 'LeParisien'),
        logo('67220bb2911b646e107ffb46_l-gl.avif', 'Galeries Lafayettes'),
        logo('63d6a48b9010ac097d2bb4c8_OpenClassroom.svg', 'Openclassrooms'),
      ],
      photo: `${CDN}6728fc9209a9142cd05489f7_hero-offre.avif`,
      alt: 'Equipe et consultants WeFiiT',
    },
  },
  '02-partenaire-360': {
    Composant: TribesOnglets,
    props: {
      id: 'wt-pm-360',
      titre: 'Votre partenaire Produit 360°',
      intro:
        'Stratégie, Discovery, Delivery : WeFiiT accompagne des grandes entreprises comme Accor, Louis Vuitton, FDJ, France TV et des scale-ups pour structurer, renforcer et faire grandir leurs équipes Produit.',
      titreListe: 'Notre valeur ajoutée',
      formatPhoto: 'carre',
      aideDefilement: 'Faites glisser pour voir toutes les offres',
      tribes: [
        {
          cle: 'conseil',
          nom: 'Conseil',
          etiquette: '',
          objectif:
            'Parce qu’il n’y a pas de produit réussi sans vision et stratégie partagées, WeFiiT vous accompagne dans la co-construction de vos organisations Produit.',
          initiatives: [
            { texte: 'Définition de vision & stratégie produit' },
            { texte: "Design et mise en œuvre d'organisations Produit" },
            { texte: 'Mise en place de démarches Discovery & Impact' },
            { texte: 'Sécurisation des processus Delivery & Qualité' },
          ],
          lien: { libelle: 'Prendre RDV pour échanger sur vos enjeux', lien: RDV, nouvelOnglet: true },
          photo: `${CDN}6720fb169fdef5f69e5e2a71_offre-conseil.webp`,
          alt: "Photo d'un wefiiteur en train de faire une présentation",
        },
        {
          cle: 'immersion',
          nom: 'Immersion',
          etiquette: '',
          // Phrase tronquée telle quelle sur le site en ligne (se termine par « des ») : à compléter.
          objectif:
            'Parce qu’une équipe performante commence par une somme d’individus, WeFiiT renforce vos équipes avec les meilleurs talents Product pour construire avec vous des',
          initiatives: [
            { texte: 'Taux de sélectivité de 5% des consultants' },
            { texte: 'De la théorie mais surtout de la pratique' },
            { texte: 'Travail main dans la main avec vos équipes' },
            { texte: 'Expertises Product Marketing, Ops, Data & IA' },
          ],
          lien: { libelle: 'Prendre RDV pour échanger sur vos enjeux', lien: RDV, nouvelOnglet: true },
          photo: `${CDN}6720fa899b600545702c0d78_offre-immersion.webp`,
        },
        {
          cle: 'formation',
          nom: 'Formation',
          etiquette: '',
          objectif:
            'Parce qu’on n’a jamais fini d’apprendre, WeFiiT vous accompagne dans la montée en compétences de vos équipes en Product Management.',
          initiatives: [
            { texte: 'Programme adapté à vos uses cases' },
            { texte: 'Coaching hard & soft skills de leaders Produit' },
            { texte: 'Formateurs reconnus par leurs pairs' },
            { texte: 'Programme bien-être et développement personnel' },
          ],
          lien: { libelle: 'Découvrir notre catalogue de formation', lien: '/formation-product-management' },
          photo: `${CDN}6720fc50353768f4faaf6f56_offre-formation.webp`,
          alt: "Photo d'un wefiiteur en train d'écrire sur un post it sur un board d'idées",
        },
      ],
    },
  },
  '03-cas-clients': {
    Composant: GrilleCartes,
    props: {
      id: 'wt-pm-cas',
      titre: 'Des exemples de nos belles histoires Produit',
      cartes: cartesCasClients([
        'culture-produit-augmente-ia',
        'marque-blanche-leader-recherche-immobiliere',
        'refonte-site-marque-luxe',
        'droit-ia-generative',
        'transformer-scale-up-product-centric',
        'reduire-impact-produits-physiques',
      ]),
      cta: { libelle: 'Voir tous nos cas clients', lien: '/cas-clients' },
    },
  },
  '04-embarquer': {
    Composant: BandeCta,
    props: {
      id: 'wt-pm-embarquer',
      espaceApres: true,
      titre: 'Prêts à embarquer avec nous pour votre prochaine success story ?',
      texte: 'WeFiiT vous accompagne pour construire ensemble des produits à impact, au cœur d’une équipe engagée et passionnée.',
      cta: { libelle: 'Prendre RDV maintenant', lien: RDV, nouvelOnglet: true },
      ctaSecondaire: { libelle: 'Être recontacté', lien: RECONTACT, nouvelOnglet: true },
    },
  },
  '05-formations': {
    Composant: GrilleCartes,
    props: {
      id: 'wt-pm-formations',
      titre: 'Découvrez nos formations IA',
      cartes: cartesFormations(['formation-product-manager-ia', 'formation-product-owner-ia', 'formation-quality-analyst-ia']),
      cta: { libelle: 'Voir toutes nos formations', lien: '/formation-product-management' },
    },
  },
  '06-autres-offres': {
    Composant: GrilleCartes,
    props: {
      id: 'wt-pm-offres',
      variante: 'offre',
      titre: 'Découvrir nos autres offres',
      cartes: [
        {
          titre: 'Product Data & IA',
          texte: "Construire aujourd'hui les Produits de demain.",
          lien: '/product-ia-data-management',
          image: `${CDN}6776a74bcde62a28b035bd77_vignette-data-ia.avif`,
          alt: "Photo de Etienne, Product Manager en train d'écrire sur un tableau blanc.",
        },
        {
          titre: 'Product Marketing',
          texte: "Faire décoller l'adoption de vos produits.",
          lien: '/product-marketing',
          image: `${CDN}671f632333f22cb26364ad48_product-marketing-square.webp`,
          alt: "Photo de Etienne, Product Manager en train d'écrire sur un tableau blanc.",
        },
        {
          titre: 'Product Quality',
          texte: 'Mettre la qualité au coeur de votre démarche Produit.',
          lien: '/product-quality',
          image: `${CDN}68028b27015e0084209866b0_product-quality.avif`,
          alt: "Photo de Etienne, Product Manager en train d'écrire sur un tableau blanc.",
        },
      ],
    },
  },
  '07-prend-soin': {
    Composant: GrillePiliers,
    props: {
      id: 'wt-pm-soin',
      titre: 'Chez WeFiiT on prend soin de vous ',
      point: '!',
      sousTitre: 'Bienvenue dans notre expérience client',
      etoiles: true,
      piliers: [
        {
          titre: 'Excellence en mission',
          texte:
            'Avec un <strong>taux de sélectivité de 5%</strong>, nous avons bâti une équipe regroupant les meilleurs talents Lead PM, Product Manager, Product Owner, Coach Produit, QA. Nos <a href="/">consultants PM</a> ont des expériences à la fois dans des grands groupes et en scale-ups, et délivrent avec un fort niveau de qualité (9/10 de CSAT).',
        },
        {
          titre: 'Proactivité, sur-mesure et rapidité',
          texte:
            '<strong>De la théorie mais surtout de la pratique</strong> : chaque WeFiiTer se distingue par sa capacité à embarquer et son pragmatisme dans son approche. Nous déployons des offres sur mesure qui peuvent prendre la forme de conseil, immersion &amp; coaching.',
        },
        {
          titre: "Plus qu'un consultant, un équipage",
          texte:
            "WeFiiT c'est avant tout un <strong>équipage de consultants passionnés</strong> : partage d'expériences, mentorings entre pairs, formations dédiées, nous favorisons l'émulation collective pour relever vos challenges produits.",
        },
        {
          titre: 'Du contenu spécialiste pour vous éclairer',
          texte:
            'Nous vous offrons un accès exclusif à une <strong>veille des tendances du marché,</strong> nos contenus vidéos IMPAQT, des articles de blog et des We.TalK animées par nos experts et influenceurs Produit.',
        },
        {
          titre: 'Accès à des services inclus exclusifs',
          texte:
            'Des <strong>journées offsite</strong>, des ateliers dans nos locaux, des rencontres entre pairs <strong>CPO/VP/Head of Product,</strong> des <strong>We.MeeT</strong> entre entreprises au même enjeu, <strong>coachings en développement personnel</strong> et leadership produit...',
        },
      ],
    },
  },
  '08-avis': {
    Composant: CarrouselAvis,
    props: {
      id: 'wt-pm-avis',
      titre: 'Ce que nos clients disent de nous',
      avis: [
        { texte: "Un avant et un après dans cette squad, c'est le jour et la nuit. Les processus mis en place paraissent évidents maintenant mais ne l'étaient pas avant l'arrivée du coach Produit WeFiiT.", tag: 'Conseil', logo: `${CDN}67220b251028657350fbef37_l-leparisien.avif`, alt: 'Logo du Parisien' },
        { texte: "Une vraie synchronicité intellectuelle, de la méthode et des livrables précis, de l'orfèvrerie. Merci WeFiiT !", tag: 'Immersion', logo: `${CDN}63d6a48b821bb1549268e8cf_Decathlon.svg`, alt: 'Logo Décathlon' },
        { texte: 'Très satisfait du dispositif PO/PM de WeFiiT, avec notamment une bonne prise de hauteur sur le projet stratégique 2024.', tag: 'Immersion', logo: `${CDN}6722049aa40a6bd2d5bb3335_invivo-logo.avif`, alt: "Logo d'Invivo" },
        { texte: "Grosse bouffée d'oxygène & super satisfait du match avec les équipes. Du concret et du pragmatisme dans l'approche Ops proposée par WeFiiT.", tag: 'Conseil', logo: `${CDN}6734d4843550e43c9b3ffd81_lv.avif`, alt: 'Logo de Louis Vuitton' },
        { texte: "WeFiiT est un maillon essentiel sur tous nos sujets. L'équipe a réussi à manager notre team produit avec bienveillance et intelligence.", tag: 'Immersion', logo: `${CDN}63d6a48b09e719f88ae4b90a_FranceTv.svg`, alt: 'Logo France.TV' },
        { texte: "Très bon trimestre, encore ! Le WeFiiTer fait briller toute la tribe App mobile & c'est hyper confortable pour nous (Lead PM & Head of Product) de l'avoir dans l'équipe.", tag: 'Immersion', logo: `${CDN}63d6a48b9010acd5882bb4c2_FDJ.svg`, alt: 'Logo FDJ' },
        { texte: 'Onboarding express, malgré un environnement complexe, les sujets ont avancé "miraculeusement". Les retours sont extrêmement positifs. Bravo !', tag: 'Immersion', logo: `${CDN}63d6a48b9c1d37426e3ede64_MaisonsDuMonde.svg`, alt: 'Logo Maison Du Monde' },
        { texte: 'Merci à WeFiiT pour leur rapidité d’exécution et leur capacité impressionnante de compréhension des enjeux et du contexte.', tag: 'Immersion', logo: `${CDN}6734d48466f4a616cb7e695f_edenred.avif`, alt: "Logo d'Edenred" },
        { texte: "Très bonne collaboration, autonome, force de proposition, donne de la visibilité sur ses sujets, très bonne entente avec toute l'équipe.", tag: 'Immersion', logo: `${CDN}6734d4846e8413f3dea43df6_franceinfo.avif`, alt: 'Logo de France Info' },
      ],
    },
  },
  '09-faq': {
    Composant: FaqAccordeon,
    props: {
      id: 'wt-pm-faq',
      titre: 'Foire aux Questions',
      questions: [
        {
          question: 'Qui sommes-nous ?',
          reponse:
            'WeFiiT est un cabinet de conseil français spécialisé en <a href="/blog/product-management">Product Management</a>, fondé en 2019 à Paris. Nous accompagnons grandes entreprises - Accor, Louis Vuitton, FDJ, France TV - et scale-ups pour structurer, renforcer et faire grandir leurs équipes Produit. Avec 110 consultants, plus de 200 missions réalisées et un CSAT client supérieur à 9/10, WeFiiT intervient en conseil, immersion et formation sur l\'ensemble du spectre produit.',
        },
        {
          question: "Dans quels secteurs d'activité sommes-nous présents ?",
          reponse:
            "Nous accompagnons des entreprises dans des secteurs variés : hôtellerie et luxe (Accor, Louis Vuitton), retail et sport (Decathlon), legal tech (LexisNexis), immobilier (SeLoger), médias (France TV, Le Parisien), jeux (FDJ) ou encore foodtech (ePack Pro). Nos consultants basés à Paris s'adaptent aux spécificités métier de chaque secteur pour délivrer un impact business mesurable.",
        },
        {
          question: "Quels sont nos retours d'expérience en transformation d'organisation ?",
          reponse:
            "Chez ePack Pro, nous avons accompagné la transformation en entreprise Product Centric : vision produit partagée, roadmap orientée impact et nouvelle organisation. Chez Louis Vuitton, nous sommes intervenus en Product Ops pour déployer un cadre de pratiques produit et piloter le passage du mode projet au mode Produit sur l'app mobile et le site e-commerce.",
        },
        {
          question: "Quels sont nos retours d'expérience en IA et Data ?",
          reponse:
            "Chez LexisNexis, nous avons accompagné le développement de Lexis+ AI, une solution d'IA générative pour les professionnels du droit. Chez Decathlon, nous avons construit la solution de calcul d'empreinte carbone de ses produits. Chez Energisme, nous avons transformé la plateforme de monitoring énergétique en outil d'aide à la décision exploitant des millions de données quotidiennes.",
        },
        {
          question: "Quels sont nos retours d'expérience en Product Quality ?",
          reponse:
            "Chez OUIGO, nous avons élaboré la stratégie qualité complète pour sécuriser le lancement de l'offre low cost en Espagne. Chez Datanumia (filiale d'EDF), nous avons harmonisé la stratégie de tests dans un contexte de fusion de deux entités. Chez France Info (groupe France Télévisions), nous avons repensé la stratégie QA de l'application mobile, de la conception des tests à l'outillage.",
        },
      ],
    },
  },
  '10-blog': {
    Composant: GrilleCartes,
    props: {
      id: 'wt-pm-blog',
      variante: 'blog',
      titre: 'Notre blog',
      cartes: cartesArticles(['le-role-de-ia-product-manager', 'product-marketing-management', 'product-discovery']),
      cta: { libelle: "Voir plus d'articles", lien: '/blog' },
    },
  },
};
