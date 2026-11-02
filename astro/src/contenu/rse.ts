// Page « Notre engagement RSE » (/notre-engagement-rse), construite directement en
// composants Astro : pas de blocs HTML dans ../pages/rse/blocs/. Clé = position dans la
// page (ordre alphabétique). Le menu et le pied de page viennent du layout (Page.astro). Textes repris à l'identique du site en ligne.
import HeroPhotoBande from '../components/HeroPhotoBande.astro';
import TribesOnglets from '../components/TribesOnglets.astro';
import BandeCta from '../components/BandeCta.astro';
import ActionsZigzag from '../components/ActionsZigzag.astro';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';

export const composants = {
  '01-hero': {
    Composant: HeroPhotoBande,
    props: {
      id: 'wt-rse-hero',
      surtitre: 'Politique RSE',
      titre: 'Notre engagement',
      intro: 'Prendre soin de notre écosystème.<br>Mesurer et comprendre notre impact.<br>Passer à l’action tous ensemble.',
      chiffres: [
        { valeur: '54', libelle: 'e-NPS collaborateur' },
        { valeur: '2,3t', libelle: 'CO₂/employé en 2024' },
        { valeur: '25', libelle: "actions d'engagement /an" },
      ],
      photo: `${CDN}673c6311d040ec59186b9d65_WEFIIT-09-23-2000-24.avif`,
      alt: 'Equipe et consultants WeFiiT',
    },
  },
  '02-prendre-soin': {
    Composant: TribesOnglets,
    props: {
      id: 'wt-rse-soin',
      titre: 'Prendre soin',
      intro:
        'Nous construisons une expérience collaborateurs humaine au quotidien.<br>En nous concentrant sur les WeFiiTers, leurs interactions et leurs aspirations.',
      aideDefilement: 'Faites glisser pour voir tous les thèmes',
      tribes: [
        {
          cle: 'rh',
          etiquette: '',
          nom: 'RH = rendre heureux',
          objectif:
            'Faire grandir les individus & renforcer le collectif. En créant un fort sentiment d’appartenance, en proposant des missions qui font grandir, et en permettant à chacun de co-construire WeFiiT.',
          titreListe: 'Concrètement ?',
          initiatives: [
            { texte: 'Une organisation horizontale & participative' },
            { texte: "Un écosystème d'apprentissage évolutif & personnalisable" },
            { texte: 'Une culture du feedback continu' },
            { texte: 'Des événements qui nourrissent le lien' },
          ],
          photo: `${CDN}690e2279a91db9f3bdf06c75_WEFIIT-2000-4-p-800.avif`,
          alt: "Photo d'un wefiiter",
        },
        {
          cle: 'carriere',
          etiquette: '',
          nom: 'Parcours de carrière',
          objectif:
            "Notre parcours de carrière We.Horizon permet à chacun de se positionner dans un référentiel commun et définit clairement les attendus pour chaque niveau. Nous garantissons ainsi l'équité de traitement via la transparence des critères.",
          titreListe: 'Comment ça se traduit ?',
          initiatives: [
            { texte: 'Un outil interactif pour t’accompagner dans ton positionnement' },
            { texte: 'Une méthodologie transparente pour les revalorisations' },
            { texte: 'Un repère salarial défini pour chaque niveau' },
            { texte: 'Une revue collégiale pour passer au niveau suivant' },
          ],
          photo: `${CDN}690e241f651a9d2f75f994e8_WEFIIT-2000-53.avif`,
          alt: "Photo d'un wefiiter",
        },
        {
          cle: 'ethique',
          etiquette: '',
          nom: 'charte Éthique',
          objectif:
            "Nous tenons à faire de l’inclusion et la bienveillance les moteurs d’une équipe forte, créative et performante. Notre charte d'inclusion & égalité pose cette ambition par écrit.",
          titreListe: 'Quelques points clés :',
          initiatives: [
            { texte: 'Un recrutement basé sur des critères professionnels clairs' },
            { texte: 'Une interlocutrice dédiée pour remonter les alertes' },
            { texte: 'Un engagement collectif contre les discriminations' },
            { texte: 'Un accès équitable à la formation et aux outils' },
          ],
          photo: `${CDN}690e23ca47fa20e5f2c7a75e_WEFIIT-2000-34.avif`,
          alt: "Photo d'un wefiiter",
        },
      ],
    },
  },
  '03-bilan-carbone': {
    Composant: BandeCta,
    props: {
      id: 'wt-rse-bilan',
      titre: "Ce qui ne se mesure pas, <br>ne s'améliore pas",
      texte: "En 2025, nous avons réalisé notre bilan carbone pour l'année 2024, <br>en partenariat avec Carbo.",
      cta: {
        libelle: 'Découvrir le bilan complet',
        lien: 'https://pro.hellocarbo.com/reviews/wefiit-2024-1/public',
        nouvelOnglet: true,
      },
    },
  },
  '04-actions': {
    Composant: ActionsZigzag,
    props: {
      id: 'wt-rse-actions',
      titre: "Agir et s'engager, ensemble",
      intro:
        'En 2023, à l’initiative des WeFiiTers, la squad interne « Challengers » est née. Sa mission : <br>« Sensibiliser et engager tous les WeFiiTers autour d’actions utiles à la société et à l’environnement ».<br>Depuis, la squad fait vivre ces enjeux dans l’entreprise, voici quelques exemples de ses actions :',
      actions: [
        {
          titre: 'Clean walk',
          texte:
            'Et si on commençait par nettoyer devant notre porte ? Par une journée ensoleillée, nos WeFiiTers se sont mobilisés pour nettoyer l’Avenue du Maine.',
          photo: `${CDN}6904d2de30a28bd3b928ad8d_RSE_CleanWalk.avif`,
          alt: "L'équipe WeFiiT après un clean walk rue du Maine à Paris",
        },
        {
          titre: 'Collecte banques alimentaires',
          texte:
            'Pour contribuer à la collecte des banques alimentaires, quelques bras supplémentaires sont toujours les bienvenus ! Bravo et merci pour eux !',
          photo: `${CDN}6904d2dc6a09afedcc715456_RSE_BA_1.avif`,
          alt: 'Une consultante WeFiiT souriante en gilet orange collecte pour les banques alimentaires',
        },
        {
          titre: 'Don du sang',
          texte:
            'Merci à nos WeFiiTers qui ont courageusement bravé la seringue et participé à remplir les stocks de sang !',
          photo: `${CDN}6904d2dd34c035e76490a858_RSE_DonDuSang.avif`,
          alt: 'Deux consultantes WeFiiT sourient après avoir donné leur sang',
        },
        {
          titre: 'Ateliers DIY',
          texte:
            'Réparer ou fabriquer soi-même. C’est bien mieux que de jeter son jean troué !<br>5 fois par an, Challengers réunit les WeFiiTers autour d’une activité manuelle et ludique, pour changer ensemble le regard que nous portons sur les objets en fin de vie.',
          photo: `${CDN}6904d2dcaa14afde47114e9f_RSE_DIY_2.avif`,
          alt: 'Deux consultants WeFiiT réparent des vêtements abimés',
        },
        {
          titre: 'Fresque du climat',
          texte:
            'La star des ateliers de sensibilisation n’a pas oublié WeFiiT ! Répartis en 3 équipes, les WeFiiTers ont assemblé et pimpé leurs fresques. Un moment de créativité pour mieux comprendre les leviers du changement climatique.',
          photo: `${CDN}6904d2de5330c1a7254f92c6_RSE_FresqueClimat.avif`,
          alt: "L'équipe WeFiiT en train de réfléchir à sa fresque du climat",
        },
        {
          titre: 'Noël Solidaire',
          texte:
            'Noël, c’est aussi l’occasion de penser à ceux qui n’ont personne avec qui le fêter. Nos WeFiiTers ont préparé pour eux des cadeaux, distribués par la Ville de Paris.',
          photo: `${CDN}6904d2dba28dadf21babc0d7_RSE_NoelSolidaire.avif`,
          alt: 'Des cadeaux de Noël à destination des sans-abris, préparés par les WeFiiTers',
        },
      ],
    },
  },
};
