// Aperçus de TribesOnglets avec les trois usages réels : Tribes de la page Équipe
// (src/contenu/equipe.ts), « Prendre soin » de la page RSE (src/contenu/rse.ts) et
// « Votre partenaire Produit 360° » de /product-management (src/contenu/product-management.ts).
// Listes raccourcies (3 onglets / 2 onglets) ; textes inchangés.
import { TribesOnglets } from 'wefiit-com';

const CDN = 'https://cdn.prod.website-files.com/63d687e3cca00b36190024ea/';
const RDV = 'https://outlook.office.com/book/WeFiiT2@wefiit.com/?ismsaljsauthenabled';

export const EquipeTribes = () => (
  <TribesOnglets
    id="apercu-tribes"
    titre="Construire ensemble le WeFiiT de demain"
    intro="WeFiiT est une entreprise <strong>co‑construite par ses collaborateur·rice·s</strong>, où l’esprit d’initiative est pleinement encouragé.<br><br>Chaque WeFiiTer peut s’investir et contribuer concrètement à l’évolution de WeFiiT au sein de l’une de nos 5 tribes : <strong>Expérience collaborateurs, Excellence, Expertises, Business et Notoriété.</strong>"
    tribes={[
      {
        cle: 'experience',
        nom: 'Expérience collaborateurs',
        objectif: "Devenir la référence du conseil Product en faisant de l'expérience collaborateur l'un des moteurs de sa réussite et sa différenciation.",
        initiatives: [
          { texte: "Mise en place d'un programme d'engagement solidaire avec Komeet" },
          { texte: 'Déploiement de notre nouveau parcours de carrière : WeHorizon' },
          { texte: 'Une de tes brillantes idées', invitation: true },
        ],
        photo: `${CDN}65830dbb97aa2a27f503a401_Equipe%20-%20Tribe%20RH.webp`,
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
        photo: `${CDN}63ef9682a3c580c78d8a6490_Equipe%20-%20Tribe%20recrutement.webp`,
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
    ]}
  />
);

export const RsePrendreSoin = () => (
  <TribesOnglets
    id="apercu-soin"
    titre="Prendre soin"
    intro="Nous construisons une expérience collaborateurs humaine au quotidien.<br>En nous concentrant sur les WeFiiTers, leurs interactions et leurs aspirations."
    aideDefilement="Faites glisser pour voir tous les thèmes"
    tribes={[
      {
        cle: 'rh',
        etiquette: '',
        nom: 'RH = rendre heureux',
        objectif: 'Faire grandir les individus & renforcer le collectif. En créant un fort sentiment d’appartenance, en proposant des missions qui font grandir, et en permettant à chacun de co-construire WeFiiT.',
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
        objectif: "Notre parcours de carrière We.Horizon permet à chacun de se positionner dans un référentiel commun et définit clairement les attendus pour chaque niveau. Nous garantissons ainsi l'équité de traitement via la transparence des critères.",
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
    ]}
  />
);

export const ExpertiseCarre = () => (
  <TribesOnglets
    id="apercu-360"
    titre="Votre partenaire Produit 360°"
    intro="Stratégie, Discovery, Delivery : WeFiiT accompagne des grandes entreprises comme Accor, Louis Vuitton, FDJ, France TV et des scale-ups pour structurer, renforcer et faire grandir leurs équipes Produit."
    titreListe="Notre valeur ajoutée"
    formatPhoto="carre"
    aideDefilement="Faites glisser pour voir toutes les offres"
    tribes={[
      {
        cle: 'conseil',
        nom: 'Conseil',
        etiquette: '',
        objectif: 'Parce qu’il n’y a pas de produit réussi sans vision et stratégie partagées, WeFiiT vous accompagne dans la co-construction de vos organisations Produit.',
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
        cle: 'formation',
        nom: 'Formation',
        etiquette: '',
        objectif: 'Parce qu’on n’a jamais fini d’apprendre, WeFiiT vous accompagne dans la montée en compétences de vos équipes en Product Management.',
        initiatives: [
          { texte: 'Programme adapté à vos uses cases' },
          { texte: 'Coaching hard & soft skills de leaders Produit' },
          { texte: 'Formateurs reconnus par leurs pairs' },
          { texte: 'Programme bien-être et développement personnel' },
        ],
        lien: { libelle: 'Découvrir notre catalogue de formation', lien: '#' },
        photo: `${CDN}6720fc50353768f4faaf6f56_offre-formation.webp`,
        alt: "Photo d'un wefiiteur en train d'écrire sur un post it sur un board d'idées",
      },
    ]}
  />
);
