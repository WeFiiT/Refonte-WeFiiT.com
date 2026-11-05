// Blocs de la page Équipe déjà convertis en composants Astro, avec leur contenu.
// Clé = nom du fichier du bloc dans pages/equipe/blocs/ (sans .html). Les blocs absents
// d'ici sont rendus tels quels depuis leur fichier HTML.
import HeroPhotoBande from '../components/HeroPhotoBande';
import TitreVideo from '../components/TitreVideo';
import Temoignage from '../components/Temoignage';
import PhotoPleineLargeur from '../components/PhotoPleineLargeur';
import CadrePrincipes from '../components/CadrePrincipes';
import ParolesVideos from '../components/ParolesVideos';
import TribesOnglets from '../components/TribesOnglets';
import CollectifGaleries from '../components/CollectifGaleries';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const PHOTO_EQUIPE = `${CDN}659bfd283ed39bb587c3e1b0_%C3%A9quipe-wefiit%20(1)`;

export const composants = {
  '01-hero': {
    Composant: HeroPhotoBande,
    props: {
      titre: 'Faire partie de l’équipe WeFiiT',
      intro:
        'WeFiiT, c’est d’abord et avant tout une histoire de FiiT entre <span>passionné·e·s de Product</span>, ayant <span>envie de grandir ensemble</span> tout en participant à la création du WeFiiT de demain !',
      photo:
        'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/6adca7a1c9d07078437f2c1c_hero-equipe.jpg',
      alt: 'L’équipe WeFiiT réunie',
    },
  },
  '02-wefiit-2025': {
    Composant: TitreVideo,
    props: {
      titre: "WeFiiT en 2025 c'était ça",
      video: 'https://www.youtube.com/embed/PqlMplRXqpo?rel=0&controls=1&autoplay=0&mute=0&start=0',
      titreVideo: 'Nos rituels chez WeFiiT - Retour sur 2025 et cap sur 2026 ! ⛷️',
    },
  },
  '03-cadre': {
    Composant: CadrePrincipes,
    props: {
      titre: 'Un cadre pour t’engager, évoluer et impacter',
      // Photo de démo (déjà communiquée par Paul pour la tribe « Expérience collaborateurs »),
      // en attendant le choix définitif pour ce bloc.
      photo: `${CDN}65830dbb97aa2a27f503a401_Equipe%20-%20Tribe%20RH.webp`,
      intro:
        'Avoir un rôle actif dans ta mission est un point de départ, pas une finalité.<br><br>Chez WeFiiT, nous avons surtout à cœur de créer un cadre dans lequel tu peux t’inscrire dans la durée, progresser et t’impliquer selon ce qui te motive.',
      suite:
        'Ton évolution chez WeFiiT se construit avec toi : en fonction de tes envies, de tes forces et des opportunités que tu choisis de saisir.<br><br>Il ne s’agit pas de suivre une trajectoire toute tracée ou de gravir une échelle hiérarchique, mais de faire grandir progressivement ton <span>impact</span>, tes <strong>compétences</strong> et ton <strong>rôle au sein du collectif</strong>, à ton rythme.<br><br>Cette évolution s’appuie sur trois dimensions complémentaires : développer ton expertise, t’impliquer dans la vie de l’équipe et créer de l’impact, en mission comme en interne.',
      accroche: 'En rejoignant WeFiiT, tu intègres un environnement qui te permet de :',
      points: [
        { accent: 'T’investir pleinement en mission', reste: ', tout en bénéficiant d’un cadre de soutien, d’échange et de feedback' },
        { accent: 'Co-construire', reste: ' le WeFiiT de demain en t’investissant sur des initiatives clés' },
        { accent: 'Faire évoluer ton rôle et tes responsabilités', reste: ' au fil des expériences, sans parcours figé ni trajectoire imposée' },
        { accent: 'Développer tes compétences', reste: ', affiner tes expertises et faire reconnaître ton impact, auprès des clients comme en interne' },
      ],
    },
  },
  '04-temoignage-yamila': {
    Composant: Temoignage,
    props: {
      personne: 'yamila',
      nom: 'Yamila',
      role: 'Lead People Experience',
      texte:
        'L’université WeFiiT, c’est un programme de formation qu’on déploie tout au long de l’année, ce qui est assez différenciant des autres, c’est que ce sont les WeFiiTers qui choisissent les formations qu’ils veulent voir dans ce parcours, et on le fait évoluer tous les ans.',
      photo: `${CDN}6a8c35a519d54491c9ab5e1d_yamila.webp`,
      bande: { padding: '1rem 0 6rem' }, // haut : 3.5rem d'origine moins les 2.5rem de marge basse du bloc cadre
    },
  },
  '05-paroles': {
    Composant: ParolesVideos,
    props: {
      titre: 'Paroles de WeFiiTers',
      intro:
        '<em>« Diriger, c’est avant tout savoir bien s’entourer »</em> : une conviction que les WeFiiTers incarnent au quotidien. À travers ces vidéos, il·elle·s partagent leur rôle, leur manière de travailler et ce qui les a amenés à rejoindre l’aventure WeFiiT.',
      videos: [
        {
          src: 'https://player.vimeo.com/video/1014693029',
          titre: 'Rencontrez Anne-Pauline - Product Manager',
          legende: 'Rencontrez Anne-Pauline - Product Manager',
        },
        {
          src: 'https://tube.rvere.com/embed?v=ueLmj4Ws03k',
          titre: 'Rencontrez Louis - Quality Analyst',
          legende: 'Rencontrez Louis - Quality Analyst',
        },
        {
          src: 'https://tube.rvere.com/embed?v=g9pShBUcTDI',
          titre: 'Rencontrez Alice - Product Owner',
          legende: 'Rencontrez Alice - Product Owner',
        },
      ],
      ctaTexte: "REJOINS L'AVENTURE WEFIIT",
      ctaLien: 'https://www.welcometothejungle.com/fr/companies/wefiit/jobs',
    },
  },
  '06-collectif': {
    Composant: CollectifGaleries,
    props: {
      titre: 'S’épanouir grâce au collectif',
      intro:
        'Chez WeFiiT, nous sommes convaincus que l’épanouissement professionnel passe par le collectif. Grandir, partager, débattre et apprendre les uns des autres font partie intégrante de notre quotidien.<br><br>Chaque deuxième jeudi du mois, nous prenons le temps de nous retrouver lors de nos rituels <span class="wtc-highlight">We.Talk</span>, <span class="wtc-highlight">We.Share</span> ou <span class="wtc-highlight">Afterworks</span> : des temps forts dédiés au partage d’expériences, d’expertises et de points de vue.<br><br>Et tout au long de l’année, le <span class="wtc-highlight">WeFiiT Live</span>, les <span class="wtc-highlight">séminaires</span>, <span class="wtc-highlight">Armadas</span> et la <span class="wtc-highlight">Kermesse</span> annuelle nous permettent de prendre du recul, de célébrer le chemin parcouru et d’imaginer ensemble la suite de l’aventure WeFiiT.',
      categories: [
        {
          id: 2,
          nom: 'We.Talk',
          description: 'Une personne influente de la sphère Produit nous livre son expertise et ses best-practices.',
          videos: [
            { id: 'A8a5QrMxt4g', titre: 'We.Talk de Claire Rohaut', legende: 'We.Talk - Claire Rohaut, Lead Product Manager chez PlayPlay' },
            { id: 'Oa4EOYsvIRs', titre: 'We.Talk de Sylvain Grande', legende: 'We.Talk - Sylvain Grande, Chief Product Officer chez Payfit' },
            { id: '1PdKWaVdn-U', titre: 'We.Talk de Frédéric Bardolle', legende: 'We.Talk - Frédéric Bardolle, Head of Product chez Scaleway' },
            { id: 'MEWktufBlg4', titre: "We.Talk d'Anne-Claire Baschet", legende: 'We.Talk - Anne-Claire Baschet, Chief Data & AI Officer chez Mirakl' },
          ],
        },
        {
          id: 1,
          nom: 'WeFiiT Live & Séminaires',
          description:
            "Le WeFiiT Live c'est un moment de rencontres, de feedbacks, de sollicitation d'avis, de démo, de plaisir, de surprises… Sans oublier les séminaires, les Armadas et la Kermesse annuelle.",
          videos: [
            { id: '9qj77xJ6gjc', titre: 'WeFiiT Live', legende: 'WeFiiT Live - The Product Builder Show' },
            { id: 'ieVvuySbfHs', titre: 'WeFiiT Live Décembre 2025', legende: 'WeFiiT Live - Décembre 2025' },
            { id: 'aI5jmMEL5jg', titre: 'WeFiiT Live édition We.Sea', legende: 'WeFiiT Live - Édition We.Sea' },
            { id: 'PWjXb1Tc9eU', titre: "Kermesse de l'Université WeFiiT", legende: "Kermesse de l'Université WeFiiT 🎓" },
          ],
        },
        {
          id: 0,
          nom: 'We.Share & Afterworks',
          description:
            'Voyage, sport, gastronomie, art ; et si les passions étaient contagieuses ? Un ou plusieurs WeFiiTers nous partagent une expérience, un savoir-faire, un talent, une aventure... On a hâte de découvrir les tiennes !',
          videos: [
            { id: '7nBMmFm06v4', titre: 'We.Share magique', legende: 'We.Share magique ! 🪄' },
            { id: 'etNcPdHOB9M', titre: 'We.Share Musique', legende: 'We.Share Musique 🎵' },
            { id: 'rfbRoSief58', titre: 'We.Share Voyage', legende: 'We.Share Voyage ✈️' },
            { id: '1rXx5LouUKE', titre: 'We.Share édition We.Act', legende: 'We.Share - Édition We.Act 🎭' },
          ],
        },
      ],
      conclusion:
        "Et quand des WeFiiTers partagent une passion commune, de nouveaux rituels voient le jour pour faire vivre l'équipe : <strong>We.Swim, Nous.Lisons, We.Act</strong>, et bien d'autres encore.",
    },
  },
  '07-temoignage-anne-claire': {
    Composant: Temoignage,
    props: {
      personne: 'anne-claire',
      nom: 'Anne-Claire',
      role: 'Consultante Product Confirmée',
      texte: "Ce qui est fou chez WeFiiT c'est qu'on se connait tous mais au final on se rend compte qu'on a des talents cachés",
      photo: `${CDN}6a8c05d73b86dda0c4334ef0_anne-claire.webp`,
      bande: { padding: '2.75rem 0 5rem' },
      carteMobileHaut: '5.5rem',
    },
  },
  '08-tribes': {
    Composant: TribesOnglets,
    props: {
      titre: 'Construire ensemble le WeFiiT de demain',
      intro:
        'WeFiiT est une entreprise <strong>co‑construite par ses collaborateur·rice·s</strong>, où l’esprit d’initiative est pleinement encouragé.<br><br>Chaque WeFiiTer peut s’investir et contribuer concrètement à l’évolution de WeFiiT au sein de l’une de nos 5 tribes : <strong>Expérience collaborateurs, Excellence, Expertises, Business et Notoriété.</strong><br><br>L’université WeFiiT, la structuration de notre cadre de management, la création de nos contenus vidéos, l’organisation de nos événements ou encore la rédaction des articles de notre blog sont autant d’initiatives portées par des WeFiiTers.',
      tribes: [
        {
          cle: 'experience',
          nom: 'Expérience collaborateurs',
          objectif: "Devenir la référence du conseil Product en faisant de l'expérience collaborateur l'un des moteurs de sa réussite et sa différenciation.",
          initiatives: [
            { texte: "Mise en place d'un programme d'engagement solidaire avec Komeet" },
            { texte: 'Déploiement de notre nouveau parcours de carrière : WeHorizon' },
            { texte: 'Une de tes brillantes idées', invitation: true },
          ],
          photo: `${CDN}6aea62a1fabbe39cfe1ded9d_image-tribe-exp%C3%A9rience-collab.jpg`,
        },
        {
          cle: 'excellence',
          nom: 'Excellence',
          objectif: "Enrichir un écosystème d'Excellence de pointe où chaque WeFiiTer apprend, transmet et rayonne.",
          initiatives: [
            { texte: 'Elaboration du nouveau catalogue de formation' },
            { texte: "Mettre l'IA au service de nos clients & des WeFiiTers" },
            { texte: 'Et toi, tu ferais quoi ?', invitation: true },
          ],
          photo: `${CDN}6adcf8a9043cf26c1377f818_tribe-expertise.jpg`,
        },
        {
          cle: 'expertises',
          nom: 'Expertises',
          objectif: 'Devenir LA référence en France sur nos expertises Produit.',
          initiatives: [
            { texte: 'Veille trimestrielle sur les tendances et évolutions de nos métiers' },
            { texte: "Création d'offres d'expertise premium, prêtes à vendre et à délivrer" },
            { texte: 'Ton initiative pourrait être ici', invitation: true },
          ],
          photo: `${CDN}6ae9da9798aa5830fa77b9fe_tribe-expertise.jpg`,
        },
        {
          cle: 'business',
          nom: 'Business',
          objectif: 'Ancrer WeFiiT comme le partenaire stratégique des directions produit, Data business et tech.',
          initiatives: [
            { texte: "Déploiement d'outils IA au service du développement business" },
            { texte: 'Organisation de temps forts clients hors mission (offsites équipes & produits)' },
            { texte: 'Comment aimerais-tu contribuer ?', invitation: true },
          ],
          photo: `${CDN}6adcf9ab86ce994badb2262d_tribe-business.jpg`,
        },
        {
          cle: 'notoriete',
          nom: 'Notoriété',
          objectif: 'Faire de la notoriété un modèle Expertise-Led-Growth.',
          initiatives: [
            { texte: 'Création de nouveaux formats vidéos pour notre compte LinkedIn' },
            { texte: 'Organisation de nos prochains évènements We.Talk' },
            { texte: 'Refonte en vibe-coding de notre site WeFiiT.com' },
          ],
          photo: `${CDN}65830d592f789caac7e57bdf_Equipe%20-%20Tribe%20Notori%C3%A9t%C3%A9.webp`,
        },
      ],
    },
  },
  '09-temoignage-guillaume': {
    Composant: Temoignage,
    props: {
      personne: 'guillaume',
      nom: 'Guillaume',
      role: 'Consultant Product Leader',
      texte:
        "J'ai tout de suite accroché à la vision du CEO pour WeFiiT, à savoir la construction d'un collectif d'experts bienveillants où chacun peut apporter sa pierre à l'édifice pour construire un WeFiiT qui nous ressemble",
      photo: `${CDN}6ae9d7c7f41d4a586d31e592_guillaume.webp`,
    },
  },
  '10-photo-pleine-largeur': {
    Composant: PhotoPleineLargeur,
    props: {
      src: `${PHOTO_EQUIPE}.avif`,
      srcset: [
        [`${PHOTO_EQUIPE}-p-500.avif`, 500],
        [`${PHOTO_EQUIPE}-p-800.avif`, 800],
        [`${PHOTO_EQUIPE}-p-1080.avif`, 1080],
        [`${PHOTO_EQUIPE}.avif`, 1878],
      ],
      alt: 'L’équipe WeFiiT',
      ratio: '802 / 291', // ratio réel de la photo (802×291px)
    },
  },
} as Record<string, { Composant: any; props: Record<string, unknown> }>;
